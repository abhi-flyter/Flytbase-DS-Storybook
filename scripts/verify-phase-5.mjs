import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const expectedMcpName = 'fb-design-system-sb-mcp';
const requiredComponents = [
  'Badge',
  'Banner',
  'Button',
  'ButtonGroup',
  'Checkbox',
  'Chip',
  'CircularBadge',
  'DatePicker',
  'Divider',
  'FilterSortButton',
  'FilterWidget',
  'IconButton',
  'InputField',
  'List',
  'Loader',
  'Menu',
  'Modal',
  'ProgressIndicator',
  'RadioButton',
  'Search',
  'SegmentedButton',
  'Slider',
  'Snackbar',
  'SortWidget',
  'Table',
  'Tabs',
  'TextField',
  'Toast',
  'ToggleButton',
  'ToggleSwitch',
  'Tooltip'
];

function readRequired(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Missing required file: ${filePath}`);
  }
  return readFileSync(filePath, 'utf8');
}

function assertIncludes(source, needle, label) {
  if (!source.includes(needle)) {
    throw new Error(`${label} is missing required text: ${needle}`);
  }
}

const packageJson = JSON.parse(readRequired('package.json'));
const storybookMain = readRequired(path.join('.storybook', 'main.ts'));
const agents = readRequired('AGENTS.md');
const claude = readRequired('CLAUDE.md');
const readiness = readRequired(path.join('docs', 'phase-5', 'storybook-mcp-readiness.md'));
const vitestConfig = readRequired('vitest.config.ts');
const mcpConfig = JSON.parse(readRequired('.mcp.json'));
const manifestPath = path.join('storybook-static', 'manifests', 'components.json');
const manifest = JSON.parse(readRequired(manifestPath));
const components = manifest.components ?? {};

if (!packageJson.devDependencies?.['@storybook/addon-mcp']) {
  throw new Error('Missing @storybook/addon-mcp devDependency.');
}
if (!packageJson.devDependencies?.['@storybook/addon-vitest']) {
  throw new Error('Missing @storybook/addon-vitest devDependency.');
}
if (!packageJson.devDependencies?.vitest) {
  throw new Error('Missing vitest devDependency.');
}
if (!packageJson.devDependencies?.playwright) {
  throw new Error('Missing playwright devDependency.');
}
if (packageJson.scripts?.['test-storybook'] !== 'vitest --project=storybook') {
  throw new Error('Missing package script: "test-storybook": "vitest --project=storybook".');
}
if (packageJson.scripts?.['verify:tokens'] !== 'node scripts/verify-token-contract.mjs') {
  throw new Error('Missing package script: "verify:tokens": "node scripts/verify-token-contract.mjs".');
}
if (packageJson.scripts?.['verify:icons'] !== 'node scripts/verify-icons.mjs') {
  throw new Error('Missing package script: "verify:icons": "node scripts/verify-icons.mjs".');
}
if (packageJson.scripts?.['verify:component-contracts'] !== 'node scripts/verify-component-contracts.mjs') {
  throw new Error('Missing package script: "verify:component-contracts": "node scripts/verify-component-contracts.mjs".');
}
if (packageJson.scripts?.['verify:figma-storybook-parity'] !== 'node scripts/verify-figma-storybook-parity.mjs') {
  throw new Error('Missing package script: "verify:figma-storybook-parity": "node scripts/verify-figma-storybook-parity.mjs".');
}
if (packageJson.exports?.['./tokens.css'] !== './tokens/index.css') {
  throw new Error('Missing package export: "./tokens.css": "./tokens/index.css".');
}

assertIncludes(storybookMain, "'@storybook/addon-mcp'", 'Storybook config');
assertIncludes(storybookMain, "'@storybook/addon-vitest'", 'Storybook config');
assertIncludes(storybookMain, 'experimentalComponentsManifest: true', 'Storybook config');
assertIncludes(storybookMain, 'experimentalCodeExamples: true', 'Storybook config');
assertIncludes(vitestConfig, 'storybookTest', 'Vitest config');
assertIncludes(vitestConfig, "configDir: path.join(dirname, '.storybook')", 'Vitest config');
assertIncludes(vitestConfig, "name: 'storybook'", 'Vitest config');
assertIncludes(vitestConfig, 'provider: playwright({})', 'Vitest config');

const mcpServer = mcpConfig.mcpServers?.[expectedMcpName];
if (!mcpServer) {
  throw new Error(`.mcp.json is missing mcpServers.${expectedMcpName}.`);
}
if (mcpServer.type !== 'http' || mcpServer.url !== 'http://localhost:6006/mcp') {
  throw new Error(`.mcp.json server ${expectedMcpName} must use http://localhost:6006/mcp.`);
}

for (const [label, source] of [
  ['AGENTS.md', agents],
  ['CLAUDE.md', claude],
  ['Phase 5 readiness doc', readiness]
]) {
  assertIncludes(source, expectedMcpName, label);
  assertIncludes(source, 'list-all-documentation', label);
  assertIncludes(source, 'get-documentation', label);
  assertIncludes(source, 'get-documentation-for-story', label);
  assertIncludes(source, 'get-storybook-story-instructions', label);
  assertIncludes(source, 'run-story-tests', label);
  assertIncludes(source, 'Never hallucinate component properties', label);
  assertIncludes(source, 'foundations-tokens', label);
  assertIncludes(source, '--color-fds-background-bg', label);
  assertIncludes(source, '--fds-color-surface', label);
  assertIncludes(source, 'Never invent token aliases', label);
}

const missingComponents = requiredComponents
  .map((name) => `components-${name.toLowerCase()}`)
  .filter((id) => !components[id]);

const componentsWithoutDocs = requiredComponents
  .map((name) => ({ name, id: `components-${name.toLowerCase()}` }))
  .filter(({ id }) => !components[id]?.reactDocgen?.description?.trim())
  .map(({ name }) => name);

const report = {
  mcpServerName: expectedMcpName,
  addonConfigured: true,
  manifestComponents: Object.keys(components).length,
  expectedComponents: requiredComponents.length,
  missingComponents,
  componentsWithoutDocs,
  agentInstructionFiles: ['AGENTS.md', 'CLAUDE.md'],
  mcpConfig: '.mcp.json',
  readinessDoc: 'docs/phase-5/storybook-mcp-readiness.md',
  tokenContractScript: packageJson.scripts['verify:tokens'],
  componentContractScript: packageJson.scripts['verify:component-contracts'],
  parityReportScript: packageJson.scripts['verify:figma-storybook-parity'],
  parityReport: 'docs/phase-5/figma-storybook-parity-report.md',
  tokenCssExport: packageJson.exports['./tokens.css'],
  storybookTestScript: packageJson.scripts['test-storybook']
};

console.log(JSON.stringify(report, null, 2));

if (missingComponents.length > 0 || componentsWithoutDocs.length > 0) {
  process.exit(1);
}

const tokenContract = spawnSync(process.execPath, ['scripts/verify-token-contract.mjs'], {
  stdio: 'inherit',
  shell: false
});

if (tokenContract.status !== 0) {
  console.error('\nPhase 5 token contract verification failed.');
  process.exit(tokenContract.status ?? 1);
}

const iconContract = spawnSync(process.execPath, ['scripts/verify-icons.mjs'], {
  stdio: 'inherit',
  shell: false
});

if (iconContract.status !== 0) {
  console.error('\nPhase 5 icon contract verification failed.');
  process.exit(iconContract.status ?? 1);
}

const componentContract = spawnSync(process.execPath, ['scripts/verify-component-contracts.mjs'], {
  stdio: 'inherit',
  shell: false
});

if (componentContract.status !== 0) {
  console.error('\nPhase 5 component contract verification failed.');
  process.exit(componentContract.status ?? 1);
}

const figmaStorybookParity = spawnSync(process.execPath, ['scripts/verify-figma-storybook-parity.mjs'], {
  stdio: 'inherit',
  shell: false
});

if (figmaStorybookParity.status !== 0) {
  console.error('\nPhase 5 Figma-to-Storybook parity verification failed.');
  process.exit(figmaStorybookParity.status ?? 1);
}
