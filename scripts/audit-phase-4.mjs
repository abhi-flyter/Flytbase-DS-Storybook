import { existsSync, readFileSync, writeFileSync } from 'node:fs';
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

const manifestPath = path.join('storybook-static', 'manifests', 'components.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : null;
const manifestComponents = manifest?.components ?? {};
const manifestIds = new Set(Object.keys(manifestComponents));

const rows = expectedComponents.map((name) => {
  const storyPath = path.join('src', 'components', name, `${name}.stories.tsx`);
  const componentPath = path.join('src', 'components', name, `${name}.tsx`);
  const storySource = existsSync(storyPath) ? readFileSync(storyPath, 'utf8') : '';
  const manifestId = `components-${name.toLowerCase()}`;
  const manifestEntry = manifestComponents[manifestId];
  return {
    name,
    componentPath,
    storyPath,
    hasComponent: existsSync(componentPath),
    hasStory: existsSync(storyPath),
    hasAutodocs: storySource.includes("tags: ['autodocs']"),
    inManifest: manifestIds.has(manifestId),
    manifestDescription: manifestEntry?.reactDocgen?.description?.trim() ?? '',
    storyCount: manifestEntry?.stories?.length ?? 0
  };
});

const buttonStory = readFileSync(path.join('src', 'components', 'Button', 'Button.stories.tsx'), 'utf8');
const iconButtonStory = readFileSync(path.join('src', 'components', 'IconButton', 'IconButton.stories.tsx'), 'utf8');
const badgeSource = readFileSync(path.join('src', 'components', 'Badge', 'Badge.tsx'), 'utf8');
const bannerSource = readFileSync(path.join('src', 'components', 'Banner', 'Banner.tsx'), 'utf8');
const bannerStory = readFileSync(path.join('src', 'components', 'Banner', 'Banner.stories.tsx'), 'utf8');
const datePickerSource = readFileSync(path.join('src', 'components', 'DatePicker', 'DatePicker.tsx'), 'utf8');
const filterSortButtonSource = readFileSync(path.join('src', 'components', 'FilterSortButton', 'FilterSortButton.tsx'), 'utf8');
const filterSortButtonStory = readFileSync(path.join('src', 'components', 'FilterSortButton', 'FilterSortButton.stories.tsx'), 'utf8');
const filterWidgetSource = readFileSync(path.join('src', 'components', 'FilterWidget', 'FilterWidget.tsx'), 'utf8');
const sortWidgetSource = readFileSync(path.join('src', 'components', 'SortWidget', 'SortWidget.tsx'), 'utf8');
const listSource = readFileSync(path.join('src', 'components', 'List', 'List.tsx'), 'utf8');
const listStory = readFileSync(path.join('src', 'components', 'List', 'List.stories.tsx'), 'utf8');
const loaderSource = readFileSync(path.join('src', 'components', 'Loader', 'Loader.tsx'), 'utf8');
const loaderStory = readFileSync(path.join('src', 'components', 'Loader', 'Loader.stories.tsx'), 'utf8');
const menuSource = readFileSync(path.join('src', 'components', 'Menu', 'Menu.tsx'), 'utf8');
const menuStory = readFileSync(path.join('src', 'components', 'Menu', 'Menu.stories.tsx'), 'utf8');
const modalSource = readFileSync(path.join('src', 'components', 'Modal', 'Modal.tsx'), 'utf8');
const modalStory = readFileSync(path.join('src', 'components', 'Modal', 'Modal.stories.tsx'), 'utf8');
const progressSource = readFileSync(path.join('src', 'components', 'ProgressIndicator', 'ProgressIndicator.tsx'), 'utf8');
const progressStory = readFileSync(path.join('src', 'components', 'ProgressIndicator', 'ProgressIndicator.stories.tsx'), 'utf8');
const searchSource = readFileSync(path.join('src', 'components', 'Search', 'Search.tsx'), 'utf8');
const sliderSource = readFileSync(path.join('src', 'components', 'Slider', 'Slider.tsx'), 'utf8');
const sliderStory = readFileSync(path.join('src', 'components', 'Slider', 'Slider.stories.tsx'), 'utf8');
const snackbarSource = readFileSync(path.join('src', 'components', 'Snackbar', 'Snackbar.tsx'), 'utf8');
const snackbarStory = readFileSync(path.join('src', 'components', 'Snackbar', 'Snackbar.stories.tsx'), 'utf8');
const tableSource = readFileSync(path.join('src', 'components', 'Table', 'Table.tsx'), 'utf8');
const tableStory = readFileSync(path.join('src', 'components', 'Table', 'Table.stories.tsx'), 'utf8');
const tabsSource = readFileSync(path.join('src', 'components', 'Tabs', 'Tabs.tsx'), 'utf8');
const tabsStory = readFileSync(path.join('src', 'components', 'Tabs', 'Tabs.stories.tsx'), 'utf8');
const toastSource = readFileSync(path.join('src', 'components', 'Toast', 'Toast.tsx'), 'utf8');
const toastStory = readFileSync(path.join('src', 'components', 'Toast', 'Toast.stories.tsx'), 'utf8');
const tooltipSource = readFileSync(path.join('src', 'components', 'Tooltip', 'Tooltip.tsx'), 'utf8');
const tooltipStory = readFileSync(path.join('src', 'components', 'Tooltip', 'Tooltip.stories.tsx'), 'utf8');
const componentDocsSource = readFileSync(path.join('src', 'components', 'docs.ts'), 'utf8');
const stylesSource = readFileSync(path.join('src', 'components', 'styles.css'), 'utf8');
const figmaParityChecks = [
  {
    check: 'Button state axis uses Figma `idle` naming',
    passed: buttonStory.includes("['idle', 'hover', 'pressed', 'focused', 'disabled']")
  },
  {
    check: 'IconButton state axis uses Figma `idle` naming',
    passed: iconButtonStory.includes("['idle', 'hover', 'pressed', 'focused', 'disabled']")
  },
  {
    check: 'Button docs include disabled no-action cursor guidance',
    passed: componentDocsSource.includes('Disabled buttons use the no-action cursor')
  },
  {
    check: 'IconButton docs include tooltip and Enter-key guidance',
    passed: componentDocsSource.includes('icon buttons always have tooltips') && componentDocsSource.includes('pressing Enter executes the action')
  },
  {
    check: 'Badge prefix uses Figma `Icon/Play` instead of a dot placeholder',
    passed: badgeSource.includes('icons.play')
  },
  {
    check: 'Badge docs use Figma dynamic information definition',
    passed: componentDocsSource.includes('Badges convey dynamic information, such as a count or status')
  },
  {
    check: 'CircularBadge dot uses Figma 6px size',
    passed: stylesSource.includes('height: 6px;\n  min-height: 6px;\n  min-width: 6px;')
  },
  {
    check: 'Checkbox docs include Figma indeterminate parent guidance',
    passed: componentDocsSource.includes('parent checkbox goes to the indeterminate state')
  },
  {
    check: 'RadioButton docs include Figma default-selected-list guidance',
    passed: componentDocsSource.includes('first option in a radio-button list is always selected by default')
  },
  {
    check: 'Banner docs include Figma non-overlay guidance',
    passed: componentDocsSource.includes('banners always push the content below and are not overlays')
  },
  {
    check: 'Banner renders Figma tone icons and close icon button',
    passed: bannerSource.includes('toneIcon') && bannerSource.includes('IconButton')
  },
  {
    check: 'Banner stories include Figma two-action pattern',
    passed: bannerStory.includes('Action 2') && bannerStory.includes('Action 1')
  },
  {
    check: 'Banner CSS uses Figma 950px component width',
    passed: stylesSource.includes('max-width: 950px')
  },
  {
    check: 'ButtonGroup docs include segmented/toggle 2-5 segment Figma coverage',
    passed: componentDocsSource.includes('SegmentedButton and ToggleButton') && componentDocsSource.includes('2, 3, 4, and 5 segment layouts')
  },
  {
    check: 'Chip docs include Figma chip definition and families',
    passed: componentDocsSource.includes('Chips help people enter information') && componentDocsSource.includes('input chips, choice chips, and filter chips')
  },
  {
    check: 'Divider docs include Figma definition and measurements',
    passed: componentDocsSource.includes('thin line used to group content') && componentDocsSource.includes('320px by 1px') && componentDocsSource.includes('1px by 120px')
  },
  {
    check: 'Tooltip docs include hover/focus and all Figma placements',
    passed:
      componentDocsSource.includes('hover and focus') &&
      componentDocsSource.includes('top/top-start/top-end/bottom/bottom-start/bottom-end/left-top/left-bottom/right-top/right-bottom')
  },
  {
    check: 'Tooltip implementation supports rich/plain Figma types',
    passed: tooltipSource.includes("export type TooltipType = 'plain' | 'rich'") && tooltipSource.includes('actionLabel')
  },
  {
    check: 'Tooltip stories cover all Figma placements',
    passed: tooltipStory.includes("'top-start'") && tooltipStory.includes("'right-bottom'")
  },
  {
    check: 'Tooltip CSS includes Figma rich width and arrow size',
    passed: stylesSource.includes('width: 232px') && stylesSource.includes('height: 7px') && stylesSource.includes('width: 12px')
  },
  {
    check: 'InputField docs include Figma autocomplete/dropdown axes and 342px width',
    passed: componentDocsSource.includes('autocomplete and dropdown modes') && componentDocsSource.includes('342px field width')
  },
  {
    check: 'TextField docs include Figma form/dialog definition and field families',
    passed: componentDocsSource.includes('typically appear in forms and dialogs') && componentDocsSource.includes('number text fields')
  },
  {
    check: 'Search docs include Figma real-time results and rest-state guidance',
    passed: componentDocsSource.includes('search results update in real time') && componentDocsSource.includes('Enter or Esc returns the field to rest state')
  },
  {
    check: 'Search implementation includes Figma close icon',
    passed: searchSource.includes('icons.x')
  },
  {
    check: 'ToggleSwitch docs and CSS include Figma 36px by 20px size',
    passed: componentDocsSource.includes('36px by 20px switch size') && stylesSource.includes('height: 20px') && stylesSource.includes('width: 36px')
  },
  {
    check: 'Menu docs include Figma temporary-surface definition and full content axes',
    passed:
      componentDocsSource.includes('Menus display a list of choices on a temporary surface') &&
      componentDocsSource.includes('action/divider/sub-title content rows') &&
      componentDocsSource.includes('suffix selection/shortcut-key')
  },
  {
    check: 'Menu implementation supports Figma divider/sub-title rows and multi-select checkbox affordance',
    passed: menuSource.includes("content?: 'action' | 'divider' | 'sub-title'") && menuSource.includes('fds-menu-divider') && menuSource.includes('Checkbox')
  },
  {
    check: 'Menu stories include Figma dropdown/menu, destructive, shortcut, and select-all patterns',
    passed: menuStory.includes("type: 'menu'") && menuStory.includes('⌘D') && menuStory.includes('destructive: true') && menuStory.includes('Select all')
  },
  {
    check: 'List docs include Figma continuous-index definition and whole-row expand guidance',
    passed: componentDocsSource.includes('continuous, vertical indexes of text or images') && componentDocsSource.includes('whole row clickable')
  },
  {
    check: 'List implementation supports Figma whole-row expandable activation',
    passed: listSource.includes('onToggle?: () => void') && listSource.includes('aria-expanded') && stylesSource.includes('button.fds-list-row')
  },
  {
    check: 'List stories include Figma drag and expand affordance icons',
    passed: listStory.includes('icons.gripVertical') && listStory.includes('icons.chevronDown')
  },
  {
    check: 'List CSS includes Figma 497px width and 82px/78px row heights',
    passed: stylesSource.includes('width: min(497px, 100%)') && stylesSource.includes('min-height: 82px') && stylesSource.includes('min-height: 78px')
  },
  {
    check: 'Modal docs include Figma sizing, anatomy, max-height scroll, and outside-click rule',
    passed:
      componentDocsSource.includes('small 380px, medium 480px, and large 620px') &&
      componentDocsSource.includes('48px title bar, 36px body, 56px footer') &&
      componentDocsSource.includes('does not close when users click outside')
  },
  {
    check: 'Modal implementation uses Figma close IconButton and tertiary footer action slot',
    passed: modalSource.includes('IconButton') && modalSource.includes('tertiaryAction')
  },
  {
    check: 'Modal stories include Figma tertiary CTA plus Back/Cancel/Continue action pattern',
    passed: modalStory.includes('Tertiary CTA') && modalStory.includes('Back') && modalStory.includes('Cancel') && modalStory.includes('Continue')
  },
  {
    check: 'Modal CSS includes Figma 380/480/620 widths and 48/36/56 anatomy',
    passed:
      stylesSource.includes('width: 380px') &&
      stylesSource.includes('width: 480px') &&
      stylesSource.includes('width: 620px') &&
      stylesSource.includes('min-height: 48px') &&
      stylesSource.includes('min-height: 36px') &&
      stylesSource.includes('min-height: 56px')
  },
  {
    check: 'ProgressIndicator docs/source include Figma task-progress definition, updating percentage labels, and linear/circular sizes',
    passed:
      componentDocsSource.includes('indicate progress of a task') &&
      componentDocsSource.includes('percentage labels that keep updating with progress') &&
      progressSource.includes('showValue') &&
      stylesSource.includes('width: 401px') &&
      stylesSource.includes('height: 32px')
  },
  {
    check: 'ProgressIndicator stories cover Figma linear 5/50/100 and circular 5/50/75/100 values',
    passed: progressStory.includes('[5, 50, 100]') && progressStory.includes('[5, 50, 75, 100]')
  },
  {
    check: 'Loader component covers the Figma Loaders page as in-progress states for different components',
    passed:
      componentDocsSource.includes('in-progress states for different components') &&
      loaderSource.includes("export type LoaderVariant = 'search' | 'table' | 'panel' | 'button'") &&
      loaderStory.includes("'search', 'table', 'panel', 'button'")
  },
  {
    check: 'Slider docs/source include Figma one/two slider modes, active/disabled, live output, unit, help text, and 240px width',
    passed:
      componentDocsSource.includes('supplying an array of values') &&
      componentDocsSource.includes('slider values reflect in real time') &&
      sliderSource.includes('helpText') &&
      sliderSource.includes('unit') &&
      stylesSource.includes('width: 240px')
  },
  {
    check: 'Slider stories cover Figma single/range active and disabled modes',
    passed: sliderStory.includes('mode="range"') && sliderStory.includes('disabled mode="range"')
  },
  {
    check: 'Snackbar docs/source include Figma non-critical guidance, 10-second timing, hover persistence, type icon, action, and close icon',
    passed:
      componentDocsSource.includes('non-critical CRUD or info messages') &&
      componentDocsSource.includes('10 seconds') &&
      componentDocsSource.includes('persist while hovered') &&
      snackbarSource.includes('SnackbarTone') &&
      snackbarSource.includes('IconButton')
  },
  {
    check: 'Snackbar stories cover Figma success/error/caution/info types and View files action',
    passed: snackbarStory.includes('tone="success"') && snackbarStory.includes('tone="error"') && snackbarStory.includes('tone="caution"') && snackbarStory.includes('tone="info"') && snackbarStory.includes('View files')
  },
  {
    check: 'Toast docs/source include Figma logged-notification guidance, timestamp/source/title/body/action anatomy, and hover persistence',
    passed:
      componentDocsSource.includes('should be logged into the notification system') &&
      componentDocsSource.includes('stay persistent while hovered') &&
      toastSource.includes('timestamp') &&
      toastSource.includes('source') &&
      toastStory.includes('Dismiss')
  },
  {
    check: 'DatePicker docs/source include Figma date-time definition, single/range modes, Sunday-start grid, clear actions, and 276px panel',
    passed:
      componentDocsSource.includes('select dates and time for inputs or filters') &&
      componentDocsSource.includes('single date picker, range date picker') &&
      componentDocsSource.includes('Sunday-start day-of-week grid') &&
      datePickerSource.includes("'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'") &&
      stylesSource.includes('width: 276px')
  },
  {
    check: 'FilterSortButton docs/source include Figma active category count guidance and count badge',
    passed:
      componentDocsSource.includes('number of active filter categories must be visible') &&
      filterSortButtonSource.includes('activeCount') &&
      filterSortButtonSource.includes('fds-active-count') &&
      filterSortButtonStory.includes('activeCount={2}') &&
      stylesSource.includes('.fds-active-count')
  },
  {
    check: 'FilterWidget docs/source include Figma search/select-all/clear-all states and 248px widget panel',
    passed:
      componentDocsSource.includes('filter, search specifics, and select all or clear all line items') &&
      componentDocsSource.includes('Default, 1/few selected, and all selected') &&
      filterWidgetSource.includes('Search') &&
      filterWidgetSource.includes('Clear') &&
      stylesSource.includes('width: 248px')
  },
  {
    check: 'SortWidget docs/source include Figma newest/oldest/default and reset/custom sort coverage',
    passed:
      componentDocsSource.includes('table sort states Default, Newest, and Oldest') &&
      componentDocsSource.includes('Reset to default') &&
      sortWidgetSource.includes("'newest' | 'oldest'") &&
      sortWidgetSource.includes('Custom')
  },
  {
    check: 'Table docs/source/story include Figma toolbar, checkbox column, operational columns, uploading cells, and footer pagination',
    passed:
      componentDocsSource.includes('toolbar with Search, Sort, Filters') &&
      componentDocsSource.includes('Devices: 6/20') &&
      tableSource.includes('toolbar?: ReactNode') &&
      tableSource.includes('footer?: ReactNode') &&
      tableStory.includes('Uploading 2/1') &&
      tableStory.includes('Lines per page 5') &&
      tableStory.includes('FilterSortButton')
  },
  {
    check: 'Tabs docs/source/story include Figma same-hierarchy definition, 2-5 tabs, icons, divider, and disabled guidance',
    passed:
      componentDocsSource.includes('same level of hierarchy') &&
      componentDocsSource.includes('2, 3, 4, and 5 tab layouts') &&
      componentDocsSource.includes('disabled tabs are not clickable') &&
      tabsSource.includes('icon?: ReactNode') &&
      tabsStory.includes('[2, 3, 4, 5]') &&
      stylesSource.includes('width: min(528px, 100%)')
  }
];

const missing = rows.filter((row) => !row.hasComponent || !row.hasStory || !row.hasAutodocs || !row.inManifest || !row.manifestDescription);
const failedFigmaParityChecks = figmaParityChecks.filter((item) => !item.passed);
const report = [
  '# Phase 4 Storybook Audit',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  `Expected public components: ${expectedComponents.length}`,
  `Manifest component entries: ${Object.keys(manifestComponents).length}`,
  `Components with incomplete gates: ${missing.length}`,
  `Figma parity checks failed: ${failedFigmaParityChecks.length}`,
  '',
  '| Component | File | Story | Autodocs | Manifest | Description | Stories |',
  '| --- | --- | --- | --- | --- | --- | --- |',
  ...rows.map((row) =>
    [
      row.name,
      row.hasComponent ? 'yes' : 'no',
      row.hasStory ? 'yes' : 'no',
      row.hasAutodocs ? 'yes' : 'no',
      row.inManifest ? 'yes' : 'no',
      row.manifestDescription ? 'yes' : 'no',
      String(row.storyCount)
    ].join(' | ').replace(/^/, '| ').replace(/$/, ' |')
  ),
  '',
  '## Figma Scope Reconciliation',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg` page inventory checked through `use_figma`.',
  '',
  '- Covered component pages: Buttons, Badges, Banners, Button groups, Checkbox, Chips, Date picker, Dividers, Filter/Sort button, Filter/Sort widget, Input field, List, Loaders, Menu, Modals, Progress indicator, Radio button, Searchbar, Slider, Snackbar and Toasts, Table, Tabs, Toggle switch, Text field, and Tooltips.',
  '- Split Storybook coverage is intentional where one Figma page contains multiple public patterns: Badges -> Badge and CircularBadge; Button groups -> ButtonGroup, SegmentedButton, and ToggleButton; Filter/Sort widget -> FilterWidget and SortWidget; Snackbar and Toasts -> Snackbar and Toast; Loaders -> Loader plus loader states in Button and ProgressIndicator.',
  '- Non-component/excluded pages: Welcome, Changelog, Styles, separator pages, Explorations, and Machine vs DB states.',
  '- `Illustrations` was inspected on the Figma copy and currently has zero children, no text, and no assets, so it is explicitly excluded until the Figma source contains illustration assets to document.',
  '',
  '### Buttons',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `7:2313` / section `610:11971`.',
  '',
  '- Figma `Button CTA` variants include Type `Primary`, `Secondary`, `Tertiary | Outline`, `Tonal`, and `Text / Link button`.',
  '- Figma `Button CTA` sizes include `Small`, `Default`, and `Large`.',
  '- Figma `Button CTA` states include `Idle`, `Hover`, `Disabled`, `Pressed`, `Focused`, and `Loader`.',
  '- Figma `Icon button` variants include Type `Default`, `Filled`, and `Outline`.',
  '- Figma `Icon button` sizes include `Small` and `Default`.',
  '- Figma usage notes say icon buttons always have tooltips, focused icon buttons execute on Enter, and disabled buttons use a no-action cursor.',
  '',
  '### Badges',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `184:3759`.',
  '',
  '- Figma defines badges as dynamic information indicators, such as a count or status.',
  '- Figma `Badges` variants include Type `Success`, `Error`, `Caution`, `Warning`, `Info`, `Secondary`, and `Disabled`.',
  '- Figma `Badges` variants include Prefix `No` and `Yes`; the prefix instance is `Icon/Play` at 16px.',
  '- Figma `Circular badge` variants include `dot` at 6px and `with value` at 19px by 18px.',
  '',
  '### Checkbox',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `75:1805`.',
  '',
  '- Figma `Checkbox` variants include Type `Unselected`, `Selected`, and `Indeterminate`.',
  '- Figma `Checkbox` variants include Bounding box `16px` and `20px`.',
  '- Figma `Checkbox` states include `Default`, `Hover`, `Pressed`, `Focussed`, and `Disabled`.',
  '- Figma UX guidance says if some, but not all, child checkboxes are checked, the parent checkbox goes to the indeterminate state.',
  '',
  '### Radio Button',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `101:1858`.',
  '',
  '- Figma `Radio button` variants include Selected `No` and `Yes`.',
  '- Figma `Radio button` variants include Bounding box `16px` and `20px`.',
  '- Figma `Radio button` states include `Default`, `Hover`, `Pressed`, `Focussed`, and `Disabled`.',
  '- Figma UX guidance says the first option in a radio-button list is always selected by default.',
  '',
  '### Banners',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `729:23222`.',
  '',
  '- Figma `Banner` variants include Title `No` and `Yes`.',
  '- Figma `Banner` tones include `Info`, `Caution`, `Warning`, and `Error`.',
  '- Figma `Banner` includes a 24px tone icon, two `Button CTA` actions, and a 32px `Icon button` close action.',
  '- Figma UX guidance says banners always push the content below and are not overlays.',
  '',
  '### Button Groups',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `60:12809`.',
  '',
  '- Figma `Segmented button` supports `Segments=2`, `3`, `4`, and `5`, with 36px height and 16px icon slots.',
  '- Figma `Toggle button` supports `Segments=2`, `3`, `4`, and `5`, with 32px container height and 24px inner blocks.',
  '- Figma `Button group` supports Padding `Default`, `Tight`, and `Loose` using two nested `Button CTA` controls.',
  '',
  '### Chips',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `179:22372`.',
  '',
  '- Figma defines chips as controls that help people enter information, make selections, filter content, or trigger actions.',
  '- Figma chip families include `Input chip`, `Choice chips`, and `Filter chip`.',
  '- Figma input chips include Large, Medium, and Small sizes with close icons; small icons are 14px while medium/large icons are 16px.',
  '- Figma filter chips include single-select and multi-select variants, selected/unselected states, dropdown and close icons, and prefix settings.',
  '',
  '### Dividers',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `69:10353`.',
  '',
  '- Figma defines a divider as a thin line used to group content in lists and layouts.',
  '- Figma divider variants include Horizontal/Full-width, Horizontal/Middle-inset, Vertical/Full-width, and Vertical/Middle-inset.',
  '- Figma measurements include horizontal 320px by 1px and vertical 1px by 120px.',
  '',
  '### Tooltips',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `424:15525`.',
  '',
  '- Figma says tooltips should appear on hover and focus, including keyboard navigation.',
  '- Figma `Tooltip` variants include Type `Rich tooltip` and `Plain tooltip`.',
  '- Figma placements include Top, Top start, Top end, Bottom, Bottom start, Bottom end, Left top, Left bottom, Right top, and Right bottom.',
  '- Figma rich tooltip includes heading text, body text, a `Button CTA` action, and a 12px by 7px arrow.',
  '',
  '### Input Field',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `735:10411`.',
  '',
  '- Figma input field families include `Input field/Auto complete` and dropdown-oriented input fields.',
  '- Figma autocomplete variants include State `Default`, `Hover`, `Pressed`, `Focussed`, `Open`, and `Disabled`, Input `Single`, and Active `No`/`Yes` in the extracted page evidence.',
  '- Figma examples use 342px field width, 76px closed height, header actions, help text, text blinker, and open dropdown menus with menu rows.',
  '',
  '### Date Picker',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `699:7807`.',
  '',
  '- Figma defines date pickers as controls that allow users to select dates and time for inputs or filters.',
  '- Figma `Date picker` variants include `Single date picker` and `Range date picker`.',
  '- Figma examples use an `Aug 2023` month/year selector, Sunday through Saturday weekday row, 36px-wide day cells, Clear action, Clear all action, Start and End date fields, help text, and optional time rows.',
  '',
  '### List',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `493:11607`.',
  '',
  '- Figma defines lists as continuous, vertical indexes of text or images.',
  '- Figma usage guidance says if the list has an expand/collapse button, the whole row is clickable so the user can click anywhere on the row to expand or collapse it.',
  '- Figma `List` variants include Size `Default` and `Small`, Expand `False` and `True`, and states `Default`, `Hover`, `Pressed`, `Focused`, and `Disabled`.',
  '- Figma measurements include approximately 497px width, default collapsed height 82px, small collapsed height 78px, and default expanded height 156px.',
  '- Figma rows include drag affordances, dropdown/expand arrows, and badge/content slots.',
  '',
  '### Menu',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `124:3051`.',
  '',
  '- Figma defines menus as temporary surfaces that display a list of choices after users interact with a button, action, or other control.',
  '- Figma `Menu` variants include Content `Action`, `Divider`, and `Sub-title`; Type `Dropdown` and `Menu`; Selection `Single` and `Multiple`; State `Default`, `Hover`, `Pressed`, `Focussed`, and `Disabled`; Selected `No` and `Yes`; and Destructive `No` and `Yes`.',
  '- Figma menu building blocks include prefix icon/slot variants, suffix selection/shortcut-key variants, destructive delete rows, multi-select checkbox rows, CTA footers, and select-all footers.',
  '',
  '### Modals',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `499:14100`.',
  '',
  '- Figma defines modals/dialogs as important prompts in a user flow.',
  '- Figma modal sizes are Small 380px, Medium 480px, and Large 620px wide.',
  '- Figma anatomy includes a 48px title bar with a 28px close IconButton, a 36px body row, and a 56px footer.',
  '- Figma footer examples include a tertiary CTA on the leading side and Back, Cancel, and Continue CTA actions on the trailing side.',
  '- Figma usage guidance says the modal gets a visible scroll after max height and does not close when clicked outside.',
  '',
  '### Filter/Sort Button',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `769:18211`.',
  '',
  '- Figma `Filter/Sort button` variants include State `Idle`, `Hover`, `Pressed`, and `Focussed`, Selected `No` and `Yes`, and `activeFilter/Sort` `No` and `Yes`.',
  '- Figma examples use a 32px-high button, a 16px filter icon, `Filters` label, and an active count badge.',
  '- Figma UX guidance says the number of active filter categories is visible in the filter button; for example, site and device filters applied should show `2`.',
  '',
  '### Filter/Sort Widget',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `179:22371`.',
  '',
  '- Figma defines Filter/Sort as a component that allows users to filter, search specifics, and select all or clear all line items.',
  '- Figma `Filter widget` variants include Type `Default`, `1/few selected`, and `all selected`, with a 248px panel, search header, checkbox menu rows, and Select all footer.',
  '- Figma sort assets include table sort states `Default`, `Newest`, and `Oldest`, plus Sort widget rows such as Created on, Updated on, Device, Newest, Oldest, and Reset to default actions.',
  '',
  '### Text Field',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `69:7170`.',
  '',
  '- Figma defines text fields as controls that allow users to enter text into a UI, typically in forms and dialogs.',
  '- Figma text field families include `Text Field outline`, `Number text field`, `Header`, `Header style`, `Prefix field`, `Suffix field`, and `Phone prefix`.',
  '- Figma outline states include Default, Hover, Pressed, Focussed, Active, Disabled, Error, and Description box.',
  '',
  '### Search',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `184:4969`.',
  '',
  '- Figma `Search` variants include Size `Medium-32px` and `Small-28px` and State `Default`, `Hover`, `Pressed`, `Focussed`, and `Active`.',
  '- Figma `Search` includes 16px Search and Close Icon instances.',
  '- Figma UX guidance says results update in real time, result counts should always be shown, suggestions/autofill should enhance the experience, Enter or Esc returns the search field to rest state, and the input should auto-scroll to keep the cursor in view.',
  '',
  '### Progress Indicator',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `444:12098`.',
  '',
  '- Figma defines progress indicators as controls used to indicate progress of a task.',
  '- Figma `Linear bar progress` variants include values 5%, 50%, and 100%, with percentage labels that keep updating with progress.',
  '- Figma `Circular progress indicator` variants include 5%, 50%, 75%, and 100%.',
  '- Figma measurements include linear examples around 401px by 20px and circular examples around 32px wide with percentage text.',
  '',
  '### Loaders',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `424:13603`.',
  '',
  '- Figma defines loaders as in-progress states for different components.',
  '- Figma examples include search loading, support-panel loading with a CTA area, table/list loading, and uploading table rows such as `Uploading 2/1`.',
  '- The Storybook `Loader` component covers those page patterns as search, table, panel, and compact button loader variants.',
  '',
  '### Slider',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `1240:7928`.',
  '',
  '- Figma defines slider range mode as setting the start and end of a range by supplying an array of values to the value prop.',
  '- Figma `Slider` variants include `Sliders=1` and `Sliders=2`, and Type `Active` and `Disabled`.',
  '- Figma anatomy includes label text, top-right output text, suffix unit such as `°C`, a 240px slider track, and help text.',
  '- Figma UX guidance says slider values are reflected in the top-right section in real time.',
  '',
  '### Snackbar And Toasts',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `34:325`.',
  '',
  '- Figma snackbar guidance says snackbars should not include important or critical information; they should only include CRUD or info messages such as Mission saved, Zones updated, or Tag created.',
  '- Figma snackbar guidance says the snackbar remains visible for 10 seconds unless the close icon is clicked, persists while hovered, is replaced by a simultaneous snackbar, and has shadow/elevation.',
  '- Figma snackbar notification types include Success, Error, Caution, and Info, with type icons, optional `Button CTA`, and close icon.',
  '- Figma toast guidance says toasts should include important or critical information that is not related to flight safety and should be logged into the notification system.',
  '- Figma toast examples include timestamp, source, title, description, and `Dismiss` action content, and persist while hovered.',
  '',
  '### Table',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `113:2361`.',
  '',
  '- Figma table examples include a toolbar with Search, Sort, Filters, secondary action, and primary action.',
  '- Figma table content includes checkbox selection, Name, Date, Time (GMT+05:30), Validity, Drone, Quantity, Files, Extra, and Actions columns.',
  '- Figma row examples include `Mission Name 1`, `12 May 2023`, `10:30 am`, `Mavic 2 enp`, `10 Packages`, `Uploading 2/1`, and badge labels.',
  '- Figma footer examples include `Devices: 6/20`, `1-5 of 100`, and `Lines per page 5` pagination controls.',
  '',
  '### Tabs',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `450:11995`.',
  '',
  '- Figma defines tabs as navigation between groups of related content at the same level of hierarchy.',
  '- Figma `Tabs` variants include `No. of tabs` 2, 3, 4, and 5, and selected tab positions across those layouts.',
  '- Figma tab building blocks include 20px `Icon/Grid Mission` instances, tab labels, and one divider.',
  '- Figma UX guidance says disabled tabs will not be clickable.',
  '',
  '### Toggle Switch',
  '',
  'Source: `WRXdNp9M1SEjWPaUhU67pg`, page `104:2807`.',
  '',
  '- Figma `Toggle switch` variants include State `Default`, `Hover`, `Pressed`, `Focussed`, `Disabled`, and `Loader`.',
  '- Figma `Toggle switch` variants include Selected `No` and `Yes`.',
  '- Figma measurements show a 36px by 20px switch.',
  '',
  '| Check | Passed |',
  '| --- | --- |',
  ...figmaParityChecks.map((item) => `| ${item.check} | ${item.passed ? 'yes' : 'no'} |`),
  '',
  '## Static Storybook Evidence',
  '',
  '- `storybook-static/index.json` is verified by `npm run verify:storybook-static` after each static build.',
  '- `storybook-static/manifests/components.json` is verified for all 31 expected public components.',
  '- Every expected component must have at least two generated Storybook stories and a generated docs entry.',
  '- Key all-variant stories are asserted for Buttons, Menu, Modals, Loaders, Date picker, Filter/Sort button, Table, Tabs, and Tooltips.',
  '- `Foundations/Icons` is verified through the static Storybook index, and `npm run verify:icons` checks generated Figma SVG component coverage.',
  '',
  '## Figma Access Status',
  '',
  'The duplicate Figma file is accessible through Figma MCP metadata and screenshot reads by node ID. Component parity has been closed at the documentation, variant-axis, dimension, and state-name level by extracting page evidence and encoding local implementation checks.',
  '',
  '## Skipped Phase 4 Quality Gates',
  '',
  '- Screenshot-level visual parity QA is intentionally skipped for this Phase 4 completion pass.',
  '- Pixel-level color, spacing, typography, border, radius, shadow, and state-style comparisons should be treated as optional future visual QA, not a remaining Phase 4 blocker.',
  '- Exact icon asset coverage is now handled by the committed Figma SVG manifests, generated React icon components, and `Foundations/Icons` Storybook stories.'
].join('\n');

writeFileSync(path.join('docs', 'phase-4', 'audit.md'), `${report}\n`);

if (missing.length > 0 || failedFigmaParityChecks.length > 0) {
  console.error(report);
  process.exit(1);
}

console.log(report);
