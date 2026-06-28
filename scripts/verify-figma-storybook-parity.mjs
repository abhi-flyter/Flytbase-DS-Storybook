import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const reportPath = path.join('docs', 'phase-5', 'figma-storybook-parity-report.md');
const expectedFigmaFileKey = 'WRXdNp9M1SEjWPaUhU67pg';
const productReadiness = new Set(['production-ready', 'pattern-derived']);
const unmappedPropWords = new Set([
  'app',
  'owned',
  'provider',
  'props',
  'var',
  'various',
  'variant',
  'variants',
  'via'
]);

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

function storySourcePath(component) {
  return path.join('src', 'components', component, `${component}.stories.tsx`);
}

function componentSourcePath(component) {
  return path.join('src', 'components', component, `${component}.tsx`);
}

function extractMappedProps(mappingValue) {
  return [...new Set(
    mappingValue
      .replace(/\[\]/g, '')
      .split(/[^A-Za-z0-9_]+/)
      .map((part) => part.trim())
      .filter((part) => /^[a-z][A-Za-z0-9_]*$/.test(part))
      .filter((part) => !unmappedPropWords.has(part))
  )];
}

function extractPropOptions(prop) {
  const type = prop?.tsType;
  if (!type) return '';
  if (type.name === 'union' && Array.isArray(type.elements)) {
    return type.elements
      .map((element) => element.value ?? element.name)
      .filter(Boolean)
      .join(', ');
  }
  return type.raw ?? type.name ?? '';
}

function hasInteractionEvidence(contract, storySource) {
  if (contract.requiredInteractionTests.length === 0) return true;
  return storySource.includes('play: async') || storySource.includes('play:');
}

function hasTokenEvidence(componentSource, storySource, stylesSource) {
  const combined = `${componentSource}\n${storySource}\n${stylesSource}`;
  return combined.includes('fds-') && combined.includes('var(--');
}

function statusLabel(condition) {
  return condition ? 'pass' : 'fail';
}

const { designSystemComponentContracts } = await loadContracts();
const manifest = JSON.parse(readRequired(path.join('storybook-static', 'manifests', 'components.json')));
const storyIndex = JSON.parse(readRequired(path.join('storybook-static', 'index.json')));
const manifestComponents = manifest.components ?? {};
const storyEntries = storyIndex.entries ?? {};
const stylesSource = readRequired(path.join('src', 'components', 'styles.css'));
const tokenManifest = JSON.parse(readRequired(path.join('tokens', 'tokens.manifest.json')));
const iconIndex = readRequired(path.join('src', 'icons', 'index.tsx'));
const failures = [];
const warnings = [];
const rows = [];

for (const contract of designSystemComponentContracts) {
  const manifestEntry = manifestComponents[contract.storybookId];
  const props = manifestEntry?.reactDocgen?.props ?? {};
  const storySource = existsSync(storySourcePath(contract.component)) ? readFileSync(storySourcePath(contract.component), 'utf8') : '';
  const componentSource = existsSync(componentSourcePath(contract.component))
    ? readFileSync(componentSourcePath(contract.component), 'utf8')
    : '';
  const mappedProps = Object.values(contract.reactPropMapping).flatMap(extractMappedProps);
  const uniqueMappedProps = [...new Set(mappedProps)];
  const mappedPropsInStorybook = uniqueMappedProps.filter((prop) => Boolean(props[prop]));
  const usageStoryStatus = contract.requiredUsageStoryIds.every((storyId) => Boolean(storyEntries[storyId]));
  const hasSourceNode =
    contract.figmaSourceNodes.length > 0 ||
    contract.readiness === 'pattern-derived' ||
    contract.unsupportedFigmaFeatures.some((feature) => feature.toLowerCase().includes('no figma component'));
  const hasNodeIds =
    Boolean(contract.figmaPage?.nodeId) &&
    contract.figmaSourceNodes.every((node) => Boolean(node.nodeId) && Boolean(node.name) && Boolean(node.kind));
  const hasProps = Object.keys(props).length > 0;
  const hasStories = (manifestEntry?.stories?.length ?? 0) > 0;
  const hasUsageStory = contract.requiredUsageStoryIds.length === 0 || usageStoryStatus;
  const hasInteractionTests = hasInteractionEvidence(contract, storySource);
  const hasTokenUse = hasTokenEvidence(componentSource, storySource, stylesSource);
  const mappedPropCoverage = uniqueMappedProps.length === 0 || mappedPropsInStorybook.length > 0;
  const unmappedFigmaAxes = contract.supportedVariantAxes.filter((axis) => !Object.prototype.hasOwnProperty.call(contract.reactPropMapping, axis));
  const readinessAccepted = productReadiness.has(contract.readiness) || contract.readiness === 'partial';

  if (!manifestEntry) failures.push(`${contract.component}: missing Storybook manifest entry ${contract.storybookId}.`);
  if (!hasSourceNode) failures.push(`${contract.component}: missing Figma source-node mapping.`);
  if (!hasNodeIds) failures.push(`${contract.component}: Figma page/source node IDs are incomplete.`);
  if (!hasProps) failures.push(`${contract.component}: Storybook manifest has no prop metadata.`);
  if (!hasStories) failures.push(`${contract.component}: Storybook manifest has no stories.`);
  if (!hasUsageStory) failures.push(`${contract.component}: required usage story is missing from Storybook index.`);
  if (!hasInteractionTests) warnings.push(`${contract.component}: required interaction tests are declared but no story play function exists.`);
  if (!mappedPropCoverage) failures.push(`${contract.component}: React prop mapping does not match Storybook prop metadata.`);
  if (!readinessAccepted) failures.push(`${contract.component}: unknown readiness value ${contract.readiness}.`);
  if (unmappedFigmaAxes.length > 0) {
    failures.push(`${contract.component}: supported Figma axes lack React prop mapping: ${unmappedFigmaAxes.join(', ')}.`);
  }
  rows.push({
    component: contract.component,
    figmaPage: `${contract.figmaPage.name} (${contract.figmaPage.nodeId})`,
    sourceNodes: contract.figmaSourceNodes.map((node) => `${node.name} (${node.nodeId})`).join('<br>') || 'pattern-derived',
    axes: contract.supportedVariantAxes.join(', '),
    mappedProps: uniqueMappedProps.join(', ') || 'none',
    storybookProps: Object.keys(props).join(', ') || 'none',
    usageStories: contract.requiredUsageStoryIds.join(', ') || 'none required',
    readiness: contract.readiness,
    interactionStatus: contract.interactionStatus,
    tokenUse: statusLabel(hasTokenUse),
    interactionEvidence: statusLabel(hasInteractionTests),
    propOptions: Object.entries(props)
      .map(([name, prop]) => {
        const options = extractPropOptions(prop);
        return options ? `${name}: ${options}` : '';
      })
      .filter(Boolean)
      .join('<br>')
  });
}

const report = [
  '# Phase 5 Figma To Storybook Parity Report',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  `Figma source file: \`${expectedFigmaFileKey}\``,
  `Contract entries: ${designSystemComponentContracts.length}`,
  `Storybook manifest components: ${Object.keys(manifestComponents).length}`,
  `Storybook index entries: ${Object.keys(storyEntries).length}`,
  `Token manifest entries: ${Object.keys(tokenManifest).length}`,
  `Icon export source present: ${iconIndex.includes('export const icons') ? 'yes' : 'no'}`,
  `Failures: ${failures.length}`,
  `Warnings: ${warnings.length}`,
  '',
  '## CI Gate',
  '',
  'This report is generated from `src/components/contracts.ts`, `storybook-static/manifests/components.json`, `storybook-static/index.json`, token exports, icon exports, component source, and story source.',
  '',
  'CI fails when a public Figma component contract is missing source nodes, mapped variant axes, Storybook prop metadata, or required usage stories. Interaction-test evidence is reported as a warning until the lower-risk components finish the remaining play-test rollout. This makes new Figma source changes explicit: add or update the contract entry first, then map it to Storybook props and stories.',
  '',
  '## Component Matrix',
  '',
  '| Component | Figma Page | Figma Source Nodes | Figma Axes / Properties | Storybook Props | Usage Stories | Readiness | Interaction | Tokens | Tests |',
  '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ...rows.map((row) =>
    [
      row.component,
      row.figmaPage,
      row.sourceNodes,
      row.axes,
      row.storybookProps,
      row.usageStories,
      row.readiness,
      row.interactionStatus,
      row.tokenUse,
      row.interactionEvidence
    ].join(' | ').replace(/^/, '| ').replace(/$/, ' |')
  ),
  '',
  '## Prop Option Snapshot',
  '',
  ...rows.flatMap((row) => [
    `### ${row.component}`,
    '',
    `- Figma axes/properties: ${row.axes}`,
    `- React prop mapping: ${row.mappedProps}`,
    `- Storybook prop options: ${row.propOptions || 'No union options exported in docgen.'}`,
    ''
  ]),
  '## Warnings',
  '',
  ...(warnings.length > 0 ? warnings.map((warning) => `- ${warning}`) : ['- None']),
  '',
  '## Failures',
  '',
  ...(failures.length > 0 ? failures.map((failure) => `- ${failure}`) : ['- None']),
  ''
].join('\n');

mkdirSync(path.dirname(reportPath), { recursive: true });
writeFileSync(reportPath, report);

console.log(
  JSON.stringify(
    {
      status: failures.length > 0 ? 'failed' : 'passed',
      reportPath,
      contracts: designSystemComponentContracts.length,
      manifestComponents: Object.keys(manifestComponents).length,
      storyEntries: Object.keys(storyEntries).length,
      warnings,
      failures
    },
    null,
    2
  )
);

if (failures.length > 0) {
  process.exit(1);
}
