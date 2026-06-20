import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const expectedComponents = [
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

const importantStories = [
  'components-button--all-variants',
  'components-menu--all-variants',
  'components-modal--all-variants',
  'components-loader--all-variants',
  'components-datepicker--all-variants',
  'components-filtersortbutton--all-variants',
  'components-table--operational-table',
  'components-tabs--all-variants',
  'components-tooltip--all-variants'
];

const indexPath = path.join('storybook-static', 'index.json');
const componentManifestPath = path.join('storybook-static', 'manifests', 'components.json');

if (!existsSync(indexPath)) {
  throw new Error('Missing storybook-static/index.json. Run `npm run build-storybook` first.');
}

if (!existsSync(componentManifestPath)) {
  throw new Error('Missing storybook-static/manifests/components.json. Run `npm run build-storybook` first.');
}

const storyIndex = JSON.parse(readFileSync(indexPath, 'utf8'));
const componentManifest = JSON.parse(readFileSync(componentManifestPath, 'utf8'));
const entries = storyIndex.entries ?? {};
const components = componentManifest.components ?? {};

const missingComponents = expectedComponents
  .map((name) => `components-${name.toLowerCase()}`)
  .filter((id) => !components[id]);

const missingStories = importantStories.filter((id) => !entries[id]);
const componentStoryGaps = expectedComponents
  .map((name) => {
    const id = `components-${name.toLowerCase()}`;
    return {
      name,
      stories: components[id]?.stories?.length ?? 0,
      hasDocsEntry: Boolean(entries[`${id}--docs`])
    };
  })
  .filter((item) => item.stories < 2 || !item.hasDocsEntry);
const componentsWithoutDocs = expectedComponents
  .map((name) => ({ id: `components-${name.toLowerCase()}`, name }))
  .filter(({ id }) => !components[id]?.reactDocgen?.description?.trim())
  .map(({ name }) => name);

const report = {
  expectedComponents: expectedComponents.length,
  manifestComponentEntries: Object.keys(components).length,
  storyIndexEntries: Object.keys(entries).length,
  importantStories: importantStories.length,
  missingComponents,
  missingStories,
  componentStoryGaps,
  componentsWithoutDocs
};

console.log(JSON.stringify(report, null, 2));

if (
  missingComponents.length > 0 ||
  missingStories.length > 0 ||
  componentStoryGaps.length > 0 ||
  componentsWithoutDocs.length > 0
) {
  process.exit(1);
}
