import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const requiredPublicComponents = [
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

const statefulComponentPattern =
  /(Date|Picker|Input|Field|Search|Filter|Sort|Menu|Modal|Tooltip|Table|Tabs|Toggle|Checkbox|Radio|Slider|Chip|List|Snackbar|Toast)/;
const controlledContractPattern =
  /(value|defaultValue|selection|defaultSelection|selected|defaultSelected|order|defaultOrder|selectedRowIds|defaultSelectedRowIds)\/[^,]*on[A-Z]|on(Change|SelectionChange|SelectedChange|OrderChange|RowSelectionChange)/;

function readRequired(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Missing required file: ${filePath}`);
  }
  return readFileSync(filePath, 'utf8');
}

async function loadContracts() {
  const source = readRequired(path.join('src', 'components', 'contracts.ts'));
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove
    },
    fileName: 'contracts.ts'
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString('base64')}`;
  return import(moduleUrl);
}

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function assert(condition, failures, message) {
  if (!condition) {
    failures.push(message);
  }
}

const { designSystemComponentContracts } = await loadContracts();
const manifest = JSON.parse(readRequired(path.join('storybook-static', 'manifests', 'components.json')));
const manifestComponents = manifest.components ?? {};
const storyIndex = JSON.parse(readRequired(path.join('storybook-static', 'index.json')));
const storyEntries = storyIndex.entries ?? {};
const failures = [];
const warnings = [];

const componentNames = designSystemComponentContracts.map((contract) => contract.component);
const duplicateNames = componentNames.filter((name, index) => componentNames.indexOf(name) !== index);
const missingContracts = requiredPublicComponents.filter((name) => !componentNames.includes(name));
const extraContracts = componentNames.filter((name) => !requiredPublicComponents.includes(name));

assert(duplicateNames.length === 0, failures, `Duplicate contract entries: ${duplicateNames.join(', ')}`);
assert(missingContracts.length === 0, failures, `Missing contract entries: ${missingContracts.join(', ')}`);
assert(extraContracts.length === 0, failures, `Unknown contract entries: ${extraContracts.join(', ')}`);
assert(
  Boolean(manifestComponents['foundations-component-contracts']),
  failures,
  'Storybook manifest is missing Foundations/Component Contracts docs.'
);
assert(
  Boolean(storyEntries['foundations-component-contracts--registry']),
  failures,
  'Storybook index is missing foundations-component-contracts--registry.'
);

for (const contract of designSystemComponentContracts) {
  const label = contract.component;
  const manifestEntry = manifestComponents[contract.storybookId];
  const mappingText = Object.values(contract.reactPropMapping).join(' ');
  const hasControlledApi = controlledContractPattern.test(mappingText);
  const isStateful = statefulComponentPattern.test(label);
  const usageStoriesExist = contract.requiredUsageStoryIds.every((storyId) => Boolean(storyEntries[storyId]));
  const previewPropsMapped = contract.previewOnlyProps.every((prop) => mappingText.includes(prop));

  assert(Boolean(manifestEntry), failures, `${label}: missing Storybook manifest entry ${contract.storybookId}.`);
  assert(hasText(contract.interactionStatus), failures, `${label}: missing interactionStatus.`);
  assert(hasText(contract.readiness), failures, `${label}: missing readiness.`);
  assert(contract.publicComponentNames.length > 0, failures, `${label}: missing publicComponentNames.`);
  assert(hasText(contract.figmaPage?.name), failures, `${label}: missing figmaPage.name.`);
  assert(hasText(contract.figmaPage?.nodeId), failures, `${label}: missing figmaPage.nodeId.`);
  assert(contract.supportedVariantAxes.length > 0, failures, `${label}: missing supportedVariantAxes.`);
  assert(Object.keys(contract.reactPropMapping).length > 0, failures, `${label}: missing reactPropMapping.`);
  assert(previewPropsMapped, failures, `${label}: previewOnlyProps must also appear in reactPropMapping.`);

  if (contract.readiness === 'production-ready') {
    assert(
      contract.interactionStatus !== 'display' || !isStateful,
      failures,
      `${label}: stateful production-ready component cannot be display-only.`
    );
  }

  if (contract.readiness === 'presentational-only') {
    assert(
      contract.unsupportedFigmaFeatures.length > 0,
      failures,
      `${label}: presentational-only components must list unsupported Figma/product features.`
    );
    assert(
      contract.interactionStatus === 'display',
      failures,
      `${label}: presentational-only components must use display interactionStatus.`
    );
  }

  if (contract.readiness === 'pattern-derived') {
    assert(
      contract.figmaSourceNodes.length === 0 || contract.unsupportedFigmaFeatures.length > 0,
      failures,
      `${label}: pattern-derived components must explain their source abstraction.`
    );
  }

  if (contract.interactionStatus === 'interactive' || contract.interactionStatus === 'composite') {
    assert(
      contract.requiredInteractionTests.length > 0,
      failures,
      `${label}: ${contract.interactionStatus} components must declare required interaction tests.`
    );
  }

  if (contract.interactionStatus === 'app-owned-lifecycle') {
    assert(
      contract.appOwnedBehaviors.length > 0,
      failures,
      `${label}: app-owned lifecycle components must document appOwnedBehaviors.`
    );
    assert(
      contract.unsupportedFigmaFeatures.length > 0,
      failures,
      `${label}: app-owned lifecycle components must document unsupported or deferred DS lifecycle APIs.`
    );
  }

  if (hasControlledApi) {
    assert(
      contract.requiredUsageStoryIds.length > 0,
      failures,
      `${label}: controlled product APIs require at least one usage story ID.`
    );
    assert(usageStoriesExist, failures, `${label}: required usage stories missing from Storybook index.`);
  }

  if (isStateful && contract.interactionStatus === 'display' && contract.readiness !== 'presentational-only') {
    failures.push(`${label}: stateful Figma component is display-only without a presentational-only readiness boundary.`);
  }

  if (contract.requiredInteractionTests.length > 0 && contract.readiness !== 'production-ready') {
    warnings.push(`${label}: declares future interaction tests while readiness is ${contract.readiness}.`);
  }
}

const report = {
  status: failures.length > 0 ? 'failed' : 'passed',
  contracts: designSystemComponentContracts.length,
  requiredPublicComponents: requiredPublicComponents.length,
  manifestComponents: Object.keys(manifestComponents).length,
  storyEntries: Object.keys(storyEntries).length,
  presentationalOnly: designSystemComponentContracts
    .filter((contract) => contract.readiness === 'presentational-only')
    .map((contract) => contract.component),
  appOwnedLifecycle: designSystemComponentContracts
    .filter((contract) => contract.interactionStatus === 'app-owned-lifecycle')
    .map((contract) => contract.component),
  warnings,
  failures
};

console.log(JSON.stringify(report, null, 2));

if (failures.length > 0) {
  process.exit(1);
}
