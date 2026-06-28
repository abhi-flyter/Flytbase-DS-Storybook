import { readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { createStorybookMcpHandler } from '@storybook/mcp';

const remoteMcpUrl = process.env.STORYBOOK_MCP_URL;
const requiredRemoteTools = ['list-all-documentation', 'get-documentation', 'get-documentation-for-story'];
const requiredLocalTools = [
  'preview-stories',
  'get-storybook-story-instructions',
  'run-story-tests',
  ...requiredRemoteTools
];
const requiredDocs = [
  'foundations-builder-safety',
  'foundations-component-contracts',
  'foundations-tokens',
  'foundations-icons',
  'components-datepicker',
  'components-table'
];
const requiredStories = [
  'foundations-builder-safety--remote-and-local-mcp-contract',
  'foundations-component-contracts--registry',
  'foundations-tokens--usage-contract',
  'foundations-icons--icon-gallery',
  'components-datepicker--usage',
  'components-table--usage'
];
const requiredBuilderSafetyText = [
  'Remote Chromatic MCP Must Expose',
  'Local MCP Must Additionally Expose',
  'Component docs',
  'Usage stories',
  'API contract status',
  'Unsupported features',
  'Figma source page IDs',
  'Token rules',
  'Icon export list',
  'Do not use presentational-only or partial components as drop-in product controls',
  'get-storybook-story-instructions',
  'run-story-tests',
  'preview-stories',
  '--color-fds-background-bg',
  '--fds-color-surface'
];
const requiredContractText = [
  'Figma Source Nodes',
  'Prop Mapping',
  'Builder Boundary',
  'unsupported Figma features',
  'preview-only props'
];
const requiredStaticFiles = [
  'storybook-static/index.json',
  'storybook-static/manifests/components.json',
  'docs/phase-5/figma-storybook-parity-report.md'
];

for (const filePath of requiredStaticFiles) {
  if (!existsSync(filePath)) {
    throw new Error(`Missing required Phase 6 evidence file: ${filePath}`);
  }
}

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

  const response = remoteMcpUrl ? await fetch(request) : await handler(request);
  const raw = await response.text();
  if (!response.ok) {
    throw new Error(`MCP ${method} failed with ${response.status}: ${raw}`);
  }

  const dataLine = raw.split('\n').find((line) => line.startsWith('data: '));
  if (!dataLine) {
    throw new Error(`MCP ${method} response did not include an SSE data line: ${raw.slice(0, 500)}`);
  }

  const message = JSON.parse(dataLine.slice('data: '.length));
  if (message.error) {
    throw new Error(`MCP ${method} returned error: ${JSON.stringify(message.error)}`);
  }

  return message.result;
}

function getText(result) {
  return result.content?.map((entry) => entry.text ?? '').join('\n') ?? '';
}

const initialize = await callMcp('initialize', {
  protocolVersion: '2024-11-05',
  capabilities: {},
  clientInfo: {
    name: 'phase6-builder-safety-verifier',
    version: '1.0.0'
  }
});
const tools = await callMcp('tools/list');
const toolNames = tools.tools.map((tool) => tool.name);
const expectedTools = remoteMcpUrl ? requiredLocalTools : requiredRemoteTools;
const missingTools = expectedTools.filter((tool) => !toolNames.includes(tool));

const allDocs = await callMcp('tools/call', {
  name: 'list-all-documentation',
  arguments: { withStoryIds: true }
});
const allDocsText = getText(allDocs);
const missingDocs = requiredDocs.filter((docId) => !allDocsText.includes(docId));
const missingStories = requiredStories.filter((storyId) => !allDocsText.includes(storyId));

const builderSafety = await callMcp('tools/call', {
  name: 'get-documentation',
  arguments: { id: 'foundations-builder-safety' }
});
const builderSafetyText = getText(builderSafety);
const missingBuilderSafetyText = requiredBuilderSafetyText.filter((text) => !builderSafetyText.includes(text));

const contracts = await callMcp('tools/call', {
  name: 'get-documentation',
  arguments: { id: 'foundations-component-contracts' }
});
const contractsText = getText(contracts);
const missingContractText = requiredContractText.filter((text) => !contractsText.includes(text));

const datePickerUsage = await callMcp('tools/call', {
  name: 'get-documentation-for-story',
  arguments: {
    componentId: 'components-datepicker',
    storyName: 'Usage'
  }
});
const datePickerUsageText = getText(datePickerUsage);
const datePickerUsageHasFunctionalApi =
  datePickerUsageText.includes('onChange') &&
  datePickerUsageText.includes('onVisibleMonthChange') &&
  datePickerUsageText.includes('disabledDates');

let localStoryInstructionsChars = null;
let localStoryTestRunnable = null;

if (remoteMcpUrl) {
  const instructions = await callMcp('tools/call', {
    name: 'get-storybook-story-instructions',
    arguments: {}
  });
  localStoryInstructionsChars = getText(instructions).length;

  const storyTest = await callMcp('tools/call', {
    name: 'run-story-tests',
    arguments: {
      stories: [{ storyId: 'foundations-builder-safety--remote-and-local-mcp-contract' }],
      a11y: false
    }
  });
  localStoryTestRunnable = getText(storyTest).includes('## Passing Stories');
}

const parityReport = readFileSync('docs/phase-5/figma-storybook-parity-report.md', 'utf8');
const parityReportHasBuilderEvidence =
  parityReport.includes('Figma source file') &&
  parityReport.includes('Component Matrix') &&
  parityReport.includes('Failures: 0');

const report = {
  mode: remoteMcpUrl ? 'running-storybook-server' : 'static-manifest-handler',
  mcpUrl: remoteMcpUrl ?? null,
  serverName: initialize.serverInfo?.name,
  serverVersion: initialize.serverInfo?.version,
  tools: toolNames,
  requiredTools: expectedTools,
  missingTools,
  missingDocs,
  missingStories,
  missingBuilderSafetyText,
  missingContractText,
  datePickerUsageHasFunctionalApi,
  parityReportHasBuilderEvidence,
  localStoryInstructionsChars,
  localStoryTestRunnable
};

console.log(JSON.stringify(report, null, 2));

if (
  missingTools.length > 0 ||
  missingDocs.length > 0 ||
  missingStories.length > 0 ||
  missingBuilderSafetyText.length > 0 ||
  missingContractText.length > 0 ||
  !datePickerUsageHasFunctionalApi ||
  !parityReportHasBuilderEvidence ||
  (remoteMcpUrl && (!localStoryInstructionsChars || !localStoryTestRunnable))
) {
  process.exit(1);
}
