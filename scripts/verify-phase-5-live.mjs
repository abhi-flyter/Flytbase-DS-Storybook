import { readFile } from 'node:fs/promises';
import { createStorybookMcpHandler } from '@storybook/mcp';

const requiredTools = ['list-all-documentation', 'get-documentation', 'get-documentation-for-story'];
const requiredServerTools = [
  'preview-stories',
  'get-storybook-story-instructions',
  'run-story-tests',
  ...requiredTools
];
const requiredDocumentation = ['components-button', 'components-textfield', 'components-table'];
const remoteMcpUrl = process.env.STORYBOOK_MCP_URL;

const handler = remoteMcpUrl
  ? null
  : await createStorybookMcpHandler({
      manifestProvider: async (_request, manifestPath) => {
        const localPath = manifestPath.replace(/^\.\//, 'storybook-static/');
        return readFile(localPath, 'utf8');
      }
    });

async function callMcp(method, params = {}) {
  const request = new Request(remoteMcpUrl ?? 'http://localhost/mcp', {
    method: 'POST',
    headers: {
      accept: 'application/json, text/event-stream',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method,
      params
    })
  });

  const response = remoteMcpUrl
    ? await fetch(request)
    : await handler(
        request
      );

  const raw = await response.text();
  if (!response.ok) {
    throw new Error(`MCP ${method} failed with ${response.status}: ${raw}`);
  }

  const dataLine = raw
    .split('\n')
    .find((line) => line.startsWith('data: '));

  if (!dataLine) {
    throw new Error(`MCP ${method} response did not include an SSE data line: ${raw.slice(0, 500)}`);
  }

  const message = JSON.parse(dataLine.slice('data: '.length));
  if (message.error) {
    throw new Error(`MCP ${method} returned error: ${JSON.stringify(message.error)}`);
  }

  return message.result;
}

const initialize = await callMcp('initialize', {
  protocolVersion: '2024-11-05',
  capabilities: {},
  clientInfo: {
    name: 'phase5-verifier',
    version: '1.0.0'
  }
});

const tools = await callMcp('tools/list');
const toolNames = tools.tools.map((tool) => tool.name);
const expectedTools = remoteMcpUrl ? requiredServerTools : requiredTools;
const missingTools = expectedTools.filter((tool) => !toolNames.includes(tool));

const docs = await callMcp('tools/call', {
  name: 'list-all-documentation',
  arguments: {
    withStoryIds: true
  }
});
const docsText = docs.content?.map((entry) => entry.text ?? '').join('\n') ?? '';
const missingDocumentation = requiredDocumentation.filter((id) => !docsText.includes(id));

const buttonDocs = await callMcp('tools/call', {
  name: 'get-documentation',
  arguments: {
    id: 'components-button'
  }
});
const buttonDocsText = buttonDocs.content?.map((entry) => entry.text ?? '').join('\n') ?? '';
const buttonDocsHasProps =
  buttonDocsText.includes('variant') &&
  buttonDocsText.includes('size') &&
  buttonDocsText.includes('disabled');

let storyInstructionsChars = null;
let focusedStoryTestPassed = null;

if (remoteMcpUrl) {
  const instructions = await callMcp('tools/call', {
    name: 'get-storybook-story-instructions',
    arguments: {}
  });
  storyInstructionsChars = instructions.content?.map((entry) => entry.text ?? '').join('\n').length ?? 0;

  const storyTest = await callMcp('tools/call', {
    name: 'run-story-tests',
    arguments: {
      stories: [{ storyId: 'components-button--playground' }],
      a11y: false
    }
  });
  const storyTestText = storyTest.content?.map((entry) => entry.text ?? '').join('\n') ?? '';
  focusedStoryTestPassed = storyTestText.includes('## Passing Stories') &&
    storyTestText.includes('components-button--playground');
}

const report = {
  mode: remoteMcpUrl ? 'running-storybook-server' : 'static-manifest-handler',
  mcpUrl: remoteMcpUrl ?? null,
  serverName: initialize.serverInfo?.name,
  serverVersion: initialize.serverInfo?.version,
  protocolVersion: initialize.protocolVersion,
  tools: toolNames,
  requiredTools: expectedTools,
  missingTools,
  checkedDocumentation: requiredDocumentation,
  missingDocumentation,
  buttonDocsHasProps,
  storyInstructionsChars,
  focusedStoryTestPassed
};

console.log(JSON.stringify(report, null, 2));

if (
  missingTools.length > 0 ||
  missingDocumentation.length > 0 ||
  !buttonDocsHasProps ||
  (remoteMcpUrl && (!storyInstructionsChars || !focusedStoryTestPassed))
) {
  process.exit(1);
}
