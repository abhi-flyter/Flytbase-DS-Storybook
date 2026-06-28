import type { DocumentedComponentName } from './docs';

export type ComponentInteractionStatus =
  | 'static'
  | 'display'
  | 'interactive'
  | 'composite'
  | 'app-owned-lifecycle';

export type ComponentReadiness =
  | 'production-ready'
  | 'partial'
  | 'presentational-only'
  | 'pattern-derived';

export type FigmaSourceNode = {
  name: string;
  nodeId: string;
  kind: 'component-set' | 'component';
};

export type ComponentContract = {
  component: DocumentedComponentName;
  storybookId: string;
  figmaPage: {
    name: string;
    nodeId: string;
  };
  figmaSourceNodes: FigmaSourceNode[];
  publicComponentNames: string[];
  supportedVariantAxes: string[];
  reactPropMapping: Record<string, string>;
  previewOnlyProps: string[];
  interactionStatus: ComponentInteractionStatus;
  readiness: ComponentReadiness;
  requiredUsageStoryIds: string[];
  requiredInteractionTests: string[];
  appOwnedBehaviors: string[];
  unsupportedFigmaFeatures: string[];
};

export const designSystemComponentContracts = [
  {
    component: 'Badge',
    storybookId: 'components-badge',
    figmaPage: { name: 'Badges', nodeId: '184:3759' },
    figmaSourceNodes: [{ name: 'Badges', nodeId: '184:3935', kind: 'component-set' }],
    publicComponentNames: ['Badge'],
    supportedVariantAxes: ['Type', 'Prefix'],
    reactPropMapping: { Type: 'tone', Prefix: 'prefix' },
    previewOnlyProps: [],
    interactionStatus: 'display',
    readiness: 'production-ready',
    requiredUsageStoryIds: [],
    requiredInteractionTests: [],
    appOwnedBehaviors: [],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'Banner',
    storybookId: 'components-banner',
    figmaPage: { name: 'Banners', nodeId: '729:23222' },
    figmaSourceNodes: [{ name: 'Banner', nodeId: '817:10892', kind: 'component-set' }],
    publicComponentNames: ['Banner'],
    supportedVariantAxes: ['Title', 'Tone', 'Actions', 'Dismissable'],
    reactPropMapping: { Title: 'title', Tone: 'tone', Actions: 'primaryAction/secondaryAction', Dismissable: 'onDismiss' },
    previewOnlyProps: [],
    interactionStatus: 'composite',
    readiness: 'partial',
    requiredUsageStoryIds: [],
    requiredInteractionTests: ['dismiss action', 'primary action', 'secondary action'],
    appOwnedBehaviors: ['Action callbacks are owned by the product surface.'],
    unsupportedFigmaFeatures: ['Action layout booleans are normalized into action slots.']
  },
  {
    component: 'Button',
    storybookId: 'components-button',
    figmaPage: { name: 'Buttons', nodeId: '7:2313' },
    figmaSourceNodes: [{ name: 'Button CTA', nodeId: '588:1437', kind: 'component-set' }],
    publicComponentNames: ['Button'],
    supportedVariantAxes: ['Type', 'Size', 'States'],
    reactPropMapping: { Type: 'variant', Size: 'size', States: 'visualState/loading/disabled' },
    previewOnlyProps: ['visualState'],
    interactionStatus: 'interactive',
    readiness: 'production-ready',
    requiredUsageStoryIds: [],
    requiredInteractionTests: ['click action', 'disabled blocks action', 'loading state'],
    appOwnedBehaviors: ['Button click effects are owned by the product surface.'],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'ButtonGroup',
    storybookId: 'components-buttongroup',
    figmaPage: { name: 'Button groups', nodeId: '60:12809' },
    figmaSourceNodes: [{ name: 'Button group', nodeId: '823:16948', kind: 'component-set' }],
    publicComponentNames: ['ButtonGroup'],
    supportedVariantAxes: ['Padding'],
    reactPropMapping: { Padding: 'padding' },
    previewOnlyProps: [],
    interactionStatus: 'static',
    readiness: 'production-ready',
    requiredUsageStoryIds: [],
    requiredInteractionTests: [],
    appOwnedBehaviors: [],
    unsupportedFigmaFeatures: ['Segmented and toggle controls are separate public React components.']
  },
  {
    component: 'Checkbox',
    storybookId: 'components-checkbox',
    figmaPage: { name: 'Checkbox', nodeId: '75:1805' },
    figmaSourceNodes: [{ name: 'Checkbox', nodeId: '101:1705', kind: 'component-set' }],
    publicComponentNames: ['Checkbox'],
    supportedVariantAxes: ['Type', 'Bounding box', 'State'],
    reactPropMapping: { Type: 'selection/defaultSelection', 'Bounding box': 'boxSize', State: 'visualState' },
    previewOnlyProps: ['visualState'],
    interactionStatus: 'interactive',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-checkbox--usage'],
    requiredInteractionTests: ['controlled selection', 'indeterminate state', 'disabled state'],
    appOwnedBehaviors: ['Parent-child selection aggregation is owned by the product surface.'],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'Chip',
    storybookId: 'components-chip',
    figmaPage: { name: 'Chips', nodeId: '179:22372' },
    figmaSourceNodes: [
      { name: 'Input chip', nodeId: '702:15975', kind: 'component-set' },
      { name: 'Choice chips', nodeId: '1191:3712', kind: 'component-set' },
      { name: 'Filter chip', nodeId: '1355:2289', kind: 'component-set' }
    ],
    publicComponentNames: ['Chip'],
    supportedVariantAxes: ['Size', 'State', 'Selected', 'Selection type', 'Prefix'],
    reactPropMapping: { Size: 'size', State: 'visualState', Selected: 'selected', Prefix: 'prefix', 'Selection type': 'selectionType' },
    previewOnlyProps: ['visualState'],
    interactionStatus: 'interactive',
    readiness: 'partial',
    requiredUsageStoryIds: [],
    requiredInteractionTests: ['selection toggle', 'remove action', 'disabled state'],
    appOwnedBehaviors: ['Filtering or submitted chip collections are owned by the product surface.'],
    unsupportedFigmaFeatures: ['Avatar prefix variants are not fully exported as a public avatar API.']
  },
  {
    component: 'CircularBadge',
    storybookId: 'components-circularbadge',
    figmaPage: { name: 'Badges', nodeId: '184:3759' },
    figmaSourceNodes: [{ name: 'Circular badge', nodeId: '184:3951', kind: 'component-set' }],
    publicComponentNames: ['CircularBadge'],
    supportedVariantAxes: ['Property 1'],
    reactPropMapping: { 'Property 1': 'variant' },
    previewOnlyProps: [],
    interactionStatus: 'display',
    readiness: 'production-ready',
    requiredUsageStoryIds: [],
    requiredInteractionTests: [],
    appOwnedBehaviors: [],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'DatePicker',
    storybookId: 'components-datepicker',
    figmaPage: { name: 'Date picker', nodeId: '699:7807' },
    figmaSourceNodes: [
      { name: 'Date picker', nodeId: '699:8000', kind: 'component-set' },
      { name: 'Day', nodeId: '699:7857', kind: 'component-set' },
      { name: 'Day range', nodeId: '699:7869', kind: 'component-set' },
      { name: 'Month', nodeId: '699:7894', kind: 'component-set' },
      { name: 'Year selection', nodeId: '699:7993', kind: 'component-set' },
      { name: 'Time selection', nodeId: '1290:33702', kind: 'component-set' },
      { name: 'Time', nodeId: '699:14560', kind: 'component-set' }
    ],
    publicComponentNames: ['DatePicker'],
    supportedVariantAxes: ['Property 1', 'state', 'day of range', 'Time'],
    reactPropMapping: {
      'Property 1': 'mode',
      Month: 'month',
      Time: 'showTime/timeValue/defaultTimeValue/onTimeChange',
      Value: 'value/defaultValue/onChange',
      'Visible month': 'visibleMonth/defaultVisibleMonth/onVisibleMonthChange',
      Constraints: 'minDate/maxDate/disabledDates',
      Clear: 'onClear/onClearAll',
      state: 'selected visual rendering',
      'day of range': 'selected range visual rendering'
    },
    previewOnlyProps: ['month', 'selected'],
    interactionStatus: 'interactive',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-datepicker--usage'],
    requiredInteractionTests: [
      'single date selection',
      'range selection',
      'disabled date blocking',
      'month navigation',
      'keyboard selection',
      'clear action'
    ],
    appOwnedBehaviors: ['Applying filters and closing the surrounding popover after selection are owned by the product surface.'],
    unsupportedFigmaFeatures: ['Year selection and full time-panel selection are not exported as separate public subcomponents.']
  },
  {
    component: 'Divider',
    storybookId: 'components-divider',
    figmaPage: { name: 'Dividers', nodeId: '69:10353' },
    figmaSourceNodes: [
      { name: 'Horizontal/Full-width', nodeId: '143:12746', kind: 'component' },
      { name: 'Horizontal/Middle-inset', nodeId: '143:12745', kind: 'component' },
      { name: 'Vertical/Middle-inset', nodeId: '143:12744', kind: 'component' },
      { name: 'Vertical/Full-width', nodeId: '143:12743', kind: 'component' }
    ],
    publicComponentNames: ['Divider'],
    supportedVariantAxes: ['Orientation', 'Inset'],
    reactPropMapping: { Orientation: 'orientation', Inset: 'inset' },
    previewOnlyProps: [],
    interactionStatus: 'static',
    readiness: 'production-ready',
    requiredUsageStoryIds: [],
    requiredInteractionTests: [],
    appOwnedBehaviors: [],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'FilterSortButton',
    storybookId: 'components-filtersortbutton',
    figmaPage: { name: 'Filter/Sort button', nodeId: '769:18211' },
    figmaSourceNodes: [
      { name: 'Filter/Sort button', nodeId: '795:10889', kind: 'component-set' },
      { name: 'Filter/Sort button compact', nodeId: '1392:13097', kind: 'component-set' },
      { name: 'Active', nodeId: '1392:13222', kind: 'component-set' }
    ],
    publicComponentNames: ['FilterSortButton'],
    supportedVariantAxes: ['State', 'Selected', 'activeFilter/Sort'],
    reactPropMapping: { State: 'visualState', Selected: 'selected', 'activeFilter/Sort': 'activeCount' },
    previewOnlyProps: ['visualState'],
    interactionStatus: 'interactive',
    readiness: 'partial',
    requiredUsageStoryIds: [],
    requiredInteractionTests: ['trigger action', 'active count rendering', 'selected state'],
    appOwnedBehaviors: ['Popover open/close and filter/sort application are owned by the product surface.'],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'FilterWidget',
    storybookId: 'components-filterwidget',
    figmaPage: { name: 'Filter/Sort widget', nodeId: '179:22371' },
    figmaSourceNodes: [
      { name: 'Filter widget', nodeId: '795:30885', kind: 'component-set' },
      { name: 'Header with Search', nodeId: '2176:7783', kind: 'component-set' }
    ],
    publicComponentNames: ['FilterWidget'],
    supportedVariantAxes: ['State'],
    reactPropMapping: { State: 'state', Search: 'searchValue/onSearchChange', Selection: 'selectedValues/onSelectionChange' },
    previewOnlyProps: ['state'],
    interactionStatus: 'composite',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-filterwidget--usage'],
    requiredInteractionTests: ['search filtering', 'select all', 'clear all', 'apply/cancel actions'],
    appOwnedBehaviors: ['Filter persistence and query serialization are owned by the product surface.'],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'IconButton',
    storybookId: 'components-iconbutton',
    figmaPage: { name: 'Buttons', nodeId: '7:2313' },
    figmaSourceNodes: [{ name: 'Icon button', nodeId: '610:9055', kind: 'component-set' }],
    publicComponentNames: ['IconButton'],
    supportedVariantAxes: ['Type', 'Size', 'States'],
    reactPropMapping: { Type: 'variant', Size: 'size', States: 'visualState/disabled' },
    previewOnlyProps: ['visualState'],
    interactionStatus: 'interactive',
    readiness: 'production-ready',
    requiredUsageStoryIds: [],
    requiredInteractionTests: ['click action', 'disabled blocks action', 'aria label required'],
    appOwnedBehaviors: ['Tooltip pairing and command execution are owned by the product surface.'],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'InputField',
    storybookId: 'components-inputfield',
    figmaPage: { name: 'Input field', nodeId: '735:10411' },
    figmaSourceNodes: [
      { name: 'Input field/Auto complete', nodeId: '688:10727', kind: 'component-set' },
      { name: 'Input field/Dropdown', nodeId: '1368:5084', kind: 'component-set' }
    ],
    publicComponentNames: ['InputField'],
    supportedVariantAxes: ['Mode', 'Selection', 'Active', 'State'],
    reactPropMapping: {
      Mode: 'mode',
      Selection: 'selection',
      Active: 'active',
      State: 'visualState/open/defaultOpen/onOpenChange',
      Value: 'value/defaultValue/onChange'
    },
    previewOnlyProps: ['visualState'],
    interactionStatus: 'composite',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-inputfield--usage'],
    requiredInteractionTests: ['controlled value', 'open menu', 'keyboard option selection', 'disabled state'],
    appOwnedBehaviors: ['Async option fetching is owned by the product surface.'],
    unsupportedFigmaFeatures: ['Async autocomplete filtering and remote option loading are product-owned.']
  },
  {
    component: 'List',
    storybookId: 'components-list',
    figmaPage: { name: 'List', nodeId: '493:11607' },
    figmaSourceNodes: [{ name: 'List', nodeId: '493:12241', kind: 'component-set' }],
    publicComponentNames: ['List'],
    supportedVariantAxes: ['Size', 'State', 'Expanded', 'Drag', 'Slot'],
    reactPropMapping: {
      Size: 'size',
      State: 'visualState/disabled',
      Expanded: 'expanded/defaultExpanded/onExpandedChange',
      Drag: 'app-owned',
      Slot: 'prefix/suffix/children'
    },
    previewOnlyProps: ['visualState'],
    interactionStatus: 'interactive',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-list--usage'],
    requiredInteractionTests: ['row click', 'expand toggle', 'disabled state'],
    appOwnedBehaviors: ['List collection state, drag/drop ordering, and row navigation roles are owned by the product surface.'],
    unsupportedFigmaFeatures: ['Drag/drop ordering is product-owned.']
  },
  {
    component: 'Loader',
    storybookId: 'components-loader',
    figmaPage: { name: 'Loaders', nodeId: '424:13603' },
    figmaSourceNodes: [],
    publicComponentNames: ['Loader'],
    supportedVariantAxes: ['Pattern'],
    reactPropMapping: { Pattern: 'variant' },
    previewOnlyProps: [],
    interactionStatus: 'display',
    readiness: 'pattern-derived',
    requiredUsageStoryIds: [],
    requiredInteractionTests: [],
    appOwnedBehaviors: ['Loading timing and data fetching are owned by the product surface.'],
    unsupportedFigmaFeatures: ['No Figma component set exists on the Loaders page.']
  },
  {
    component: 'Menu',
    storybookId: 'components-menu',
    figmaPage: { name: 'Menu', nodeId: '124:3051' },
    figmaSourceNodes: [
      { name: 'Final Building block- Menu', nodeId: '550:7762', kind: 'component-set' },
      { name: 'Dropdown Menu', nodeId: '663:11903', kind: 'component-set' },
      { name: 'Suffix icon', nodeId: '550:7743', kind: 'component-set' },
      { name: 'Prefix', nodeId: '550:7748', kind: 'component-set' },
      { name: 'Footer', nodeId: '550:7753', kind: 'component-set' }
    ],
    publicComponentNames: ['Menu'],
    supportedVariantAxes: ['Type', 'State', 'Selected', 'Prefix', 'Suffix', 'Footer'],
    reactPropMapping: {
      Type: 'type',
      State: 'visualState',
      Selected: 'selectedValues/defaultSelectedValues/onSelectionChange',
      Action: 'onAction',
      Prefix: 'prefix',
      Suffix: 'suffix',
      Footer: 'footer'
    },
    previewOnlyProps: ['visualState'],
    interactionStatus: 'composite',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-menu--usage'],
    requiredInteractionTests: ['item action', 'single selection', 'multi selection', 'keyboard navigation'],
    appOwnedBehaviors: ['Trigger, positioning, and open/close lifecycle are owned by the product surface until a popover API exists.'],
    unsupportedFigmaFeatures: ['No exported trigger, portal, collision, or popover positioning API.']
  },
  {
    component: 'Modal',
    storybookId: 'components-modal',
    figmaPage: { name: 'Modals', nodeId: '499:14100' },
    figmaSourceNodes: [
      { name: 'Modal', nodeId: '821:15145', kind: 'component-set' },
      { name: 'Title bar', nodeId: '821:17174', kind: 'component' },
      { name: 'Footer', nodeId: '821:17751', kind: 'component' },
      { name: 'Body', nodeId: '821:29090', kind: 'component' }
    ],
    publicComponentNames: ['Modal'],
    supportedVariantAxes: ['Size'],
    reactPropMapping: {
      Size: 'size',
      Lifecycle: 'open/defaultOpen/onOpenChange',
      Title: 'title',
      Footer: 'footer',
      Body: 'children',
      Close: 'closeLabel'
    },
    previewOnlyProps: [],
    interactionStatus: 'composite',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-modal--usage'],
    requiredInteractionTests: ['close action', 'escape key', 'focus trap', 'aria labelling'],
    appOwnedBehaviors: ['Portal mounting, backdrop rendering, and route blocking are currently owned by the product surface.'],
    unsupportedFigmaFeatures: ['No exported backdrop or portal component.']
  },
  {
    component: 'ProgressIndicator',
    storybookId: 'components-progressindicator',
    figmaPage: { name: 'Progress indicator', nodeId: '444:12098' },
    figmaSourceNodes: [
      { name: 'Linear bar progress', nodeId: '474:10410', kind: 'component-set' },
      { name: 'Circular progress indicator', nodeId: '474:10699', kind: 'component-set' }
    ],
    publicComponentNames: ['ProgressIndicator'],
    supportedVariantAxes: ['Type', 'Progress'],
    reactPropMapping: { Type: 'variant', Progress: 'value' },
    previewOnlyProps: [],
    interactionStatus: 'display',
    readiness: 'production-ready',
    requiredUsageStoryIds: [],
    requiredInteractionTests: ['aria value range', 'label rendering'],
    appOwnedBehaviors: ['Progress calculation is owned by the product surface.'],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'RadioButton',
    storybookId: 'components-radiobutton',
    figmaPage: { name: 'Radio button', nodeId: '101:1858' },
    figmaSourceNodes: [{ name: 'Radio button', nodeId: '102:851', kind: 'component-set' }],
    publicComponentNames: ['RadioButton'],
    supportedVariantAxes: ['Selected', 'Bounding box', 'State'],
    reactPropMapping: { Selected: 'selected/defaultSelected/onSelectedChange', 'Bounding box': 'boxSize', State: 'visualState' },
    previewOnlyProps: ['visualState'],
    interactionStatus: 'interactive',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-radiobutton--usage'],
    requiredInteractionTests: ['controlled selection', 'keyboard group behavior', 'disabled state'],
    appOwnedBehaviors: ['Radio group composition is owned by the product surface.'],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'Search',
    storybookId: 'components-search',
    figmaPage: { name: 'Searchbar', nodeId: '184:4969' },
    figmaSourceNodes: [{ name: 'Search', nodeId: '646:13880', kind: 'component-set' }],
    publicComponentNames: ['Search'],
    supportedVariantAxes: ['Size', 'State'],
    reactPropMapping: { Size: 'size', State: 'visualState', Query: 'value/defaultValue/onChange', Clear: 'onClear' },
    previewOnlyProps: ['visualState'],
    interactionStatus: 'interactive',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-search--usage'],
    requiredInteractionTests: ['controlled query', 'clear action', 'escape behavior'],
    appOwnedBehaviors: ['Search result fetching and suggestion ranking are owned by the product surface.'],
    unsupportedFigmaFeatures: ['Suggestions/autofill are documented guidance, not an exported component API.']
  },
  {
    component: 'SegmentedButton',
    storybookId: 'components-segmentedbutton',
    figmaPage: { name: 'Button groups', nodeId: '60:12809' },
    figmaSourceNodes: [
      { name: 'Segmented button', nodeId: '60:15223', kind: 'component-set' },
      { name: 'Start Segmented Button', nodeId: '60:15116', kind: 'component-set' },
      { name: 'Center Segmented Button', nodeId: '60:15157', kind: 'component-set' },
      { name: 'End Segmented Button', nodeId: '60:15190', kind: 'component-set' }
    ],
    publicComponentNames: ['SegmentedButton'],
    supportedVariantAxes: ['Segments', 'Selected', 'State'],
    reactPropMapping: { Segments: 'options', Selected: 'value/onChange', State: 'visualState' },
    previewOnlyProps: ['visualState'],
    interactionStatus: 'interactive',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-segmentedbutton--usage'],
    requiredInteractionTests: ['controlled value', 'disabled option', 'keyboard navigation'],
    appOwnedBehaviors: [],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'Slider',
    storybookId: 'components-slider',
    figmaPage: { name: 'Slider', nodeId: '1240:7928' },
    figmaSourceNodes: [
      { name: 'Slider', nodeId: '1240:8345', kind: 'component-set' },
      { name: 'Slider range', nodeId: '1247:6419', kind: 'component-set' },
      { name: 'Slider compact', nodeId: '1247:6748', kind: 'component-set' }
    ],
    publicComponentNames: ['Slider'],
    supportedVariantAxes: ['Type', 'Mode', 'Disabled'],
    reactPropMapping: { Type: 'variant', Mode: 'range', Disabled: 'disabled', Value: 'value/defaultValue/onChange' },
    previewOnlyProps: [],
    interactionStatus: 'interactive',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-slider--usage'],
    requiredInteractionTests: ['single value change', 'range value change', 'disabled state'],
    appOwnedBehaviors: ['Value formatting and unit conversion are owned by the product surface.'],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'Snackbar',
    storybookId: 'components-snackbar',
    figmaPage: { name: 'Snackbar and Toasts', nodeId: '34:325' },
    figmaSourceNodes: [{ name: 'Snackbar- Notifications', nodeId: '36:3144', kind: 'component-set' }],
    publicComponentNames: ['Snackbar'],
    supportedVariantAxes: ['Type', 'Action'],
    reactPropMapping: {
      Type: 'tone',
      Lifecycle: 'open/defaultOpen/onOpenChange',
      Action: 'actionLabel/onAction',
      Duration: 'duration',
      Dismiss: 'dismissLabel'
    },
    previewOnlyProps: [],
    interactionStatus: 'composite',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-snackbar--usage'],
    requiredInteractionTests: ['dismiss action', 'action click', 'hover persistence'],
    appOwnedBehaviors: ['Queueing and replacement policy are currently owned by the product surface.'],
    unsupportedFigmaFeatures: ['No exported snackbar provider or queue API.']
  },
  {
    component: 'SortWidget',
    storybookId: 'components-sortwidget',
    figmaPage: { name: 'Filter/Sort widget', nodeId: '179:22371' },
    figmaSourceNodes: [
      { name: 'Sort widget', nodeId: '795:33195', kind: 'component-set' },
      { name: 'sort for table', nodeId: '164:12688', kind: 'component-set' }
    ],
    publicComponentNames: ['SortWidget'],
    supportedVariantAxes: ['Type', 'Order'],
    reactPropMapping: { Type: 'variant', Order: 'order/defaultOrder/onOrderChange' },
    previewOnlyProps: [],
    interactionStatus: 'composite',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-sortwidget--usage'],
    requiredInteractionTests: ['order change', 'reset to default', 'apply/cancel actions'],
    appOwnedBehaviors: ['Sorting field mapping is owned by the product surface.'],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'Table',
    storybookId: 'components-table',
    figmaPage: { name: 'Table', nodeId: '113:2361' },
    figmaSourceNodes: [
      { name: 'Table', nodeId: '113:3564', kind: 'component-set' },
      { name: 'Table header', nodeId: '1100:7094', kind: 'component-set' },
      { name: 'Block type', nodeId: '113:3458', kind: 'component-set' },
      { name: 'Pagination', nodeId: '113:3586', kind: 'component' }
    ],
    publicComponentNames: ['Table'],
    supportedVariantAxes: ['Columns', 'Selection', 'Hover', 'Pagination'],
    reactPropMapping: {
      Columns: 'columns',
      Rows: 'rows',
      Selection: 'selectedRowIds/defaultSelectedRowIds/onRowSelectionChange',
      Hover: 'css row hover state',
      Sorting: 'columns[].sortable + sort/defaultSort/onSortChange',
      Pagination: 'pagination/defaultPagination/onPaginationChange'
    },
    previewOnlyProps: [],
    interactionStatus: 'composite',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-table--usage'],
    requiredInteractionTests: ['row selection', 'sort change', 'pagination change', 'empty state'],
    appOwnedBehaviors: ['Toolbar filtering, row actions, upload progress, and server-side data fetching are product-owned.'],
    unsupportedFigmaFeatures: ['Server-side pagination and column-specific sort comparators are product-owned.']
  },
  {
    component: 'Tabs',
    storybookId: 'components-tabs',
    figmaPage: { name: 'Tabs', nodeId: '450:11995' },
    figmaSourceNodes: [
      { name: 'Tabs', nodeId: '1294:2064', kind: 'component-set' },
      { name: 'Building blocks', nodeId: '1234:39323', kind: 'component-set' }
    ],
    publicComponentNames: ['Tabs'],
    supportedVariantAxes: ['Tabs', 'Selected', 'State'],
    reactPropMapping: { Tabs: 'tabs', Selected: 'value/onChange', State: 'visualState' },
    previewOnlyProps: ['visualState'],
    interactionStatus: 'interactive',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-tabs--usage'],
    requiredInteractionTests: ['controlled value', 'disabled tab', 'keyboard navigation'],
    appOwnedBehaviors: ['Panel rendering is owned by the product surface.'],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'TextField',
    storybookId: 'components-textfield',
    figmaPage: { name: 'Text field', nodeId: '69:7170' },
    figmaSourceNodes: [
      { name: 'Text Field outline', nodeId: '646:15381', kind: 'component-set' },
      { name: 'Number text field', nodeId: '809:14872', kind: 'component-set' },
      { name: 'Suffix field', nodeId: '382:6070', kind: 'component-set' },
      { name: 'Prefix field', nodeId: '384:6080', kind: 'component-set' },
      { name: 'Header style', nodeId: '384:6094', kind: 'component-set' }
    ],
    publicComponentNames: ['TextField'],
    supportedVariantAxes: ['State', 'Requirement', 'Prefix', 'Suffix', 'Multiline', 'Number controls'],
    reactPropMapping: {
      State: 'visualState/disabled/readOnly',
      Requirement: 'required/optional',
      Prefix: 'prefix',
      Suffix: 'suffix',
      Multiline: 'multiline',
      'Number controls': 'type/min/max/step',
      Value: 'value/defaultValue/onChange'
    },
    previewOnlyProps: ['visualState'],
    interactionStatus: 'interactive',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-textfield--usage'],
    requiredInteractionTests: ['controlled value', 'helper/error text', 'disabled/readOnly state', 'number controls'],
    appOwnedBehaviors: ['Validation rules and formatting are owned by the product surface.'],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'Toast',
    storybookId: 'components-toast',
    figmaPage: { name: 'Snackbar and Toasts', nodeId: '34:325' },
    figmaSourceNodes: [{ name: 'Toasts- Notifications', nodeId: '60:12761', kind: 'component-set' }],
    publicComponentNames: ['Toast'],
    supportedVariantAxes: ['Type'],
    reactPropMapping: {
      Type: 'tone',
      Lifecycle: 'open/defaultOpen/onOpenChange',
      Timestamp: 'timestamp',
      Source: 'source',
      Action: 'actionLabel/onAction',
      Duration: 'duration',
      Dismiss: 'dismissLabel'
    },
    previewOnlyProps: [],
    interactionStatus: 'composite',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-toast--usage'],
    requiredInteractionTests: ['dismiss action', 'hover persistence', 'notification metadata rendering'],
    appOwnedBehaviors: ['Notification persistence, queueing, logging, and notification-center integration are currently product-owned.'],
    unsupportedFigmaFeatures: ['No exported toast provider or notification-center integration API.']
  },
  {
    component: 'ToggleButton',
    storybookId: 'components-togglebutton',
    figmaPage: { name: 'Button groups', nodeId: '60:12809' },
    figmaSourceNodes: [
      { name: 'Toggle button', nodeId: '69:6503', kind: 'component-set' },
      { name: 'Building block for toggle button', nodeId: '60:16790', kind: 'component-set' }
    ],
    publicComponentNames: ['ToggleButton'],
    supportedVariantAxes: ['Segments', 'Selected', 'State'],
    reactPropMapping: { Segments: 'options', Selected: 'values/onChange', State: 'visualState' },
    previewOnlyProps: ['visualState'],
    interactionStatus: 'interactive',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-togglebutton--usage'],
    requiredInteractionTests: ['multi select values', 'disabled option', 'keyboard navigation'],
    appOwnedBehaviors: [],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'ToggleSwitch',
    storybookId: 'components-toggleswitch',
    figmaPage: { name: 'Toggle switch', nodeId: '104:2807' },
    figmaSourceNodes: [{ name: 'Toggle switch', nodeId: '113:7424', kind: 'component-set' }],
    publicComponentNames: ['ToggleSwitch'],
    supportedVariantAxes: ['Selected', 'State'],
    reactPropMapping: { Selected: 'selected/defaultSelected/onSelectedChange', State: 'visualState/loading/disabled' },
    previewOnlyProps: ['visualState'],
    interactionStatus: 'interactive',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-toggleswitch--usage'],
    requiredInteractionTests: ['controlled selected state', 'loading state', 'disabled state'],
    appOwnedBehaviors: ['Setting persistence is owned by the product surface.'],
    unsupportedFigmaFeatures: []
  },
  {
    component: 'Tooltip',
    storybookId: 'components-tooltip',
    figmaPage: { name: 'Tooltips', nodeId: '424:15525' },
    figmaSourceNodes: [
      { name: 'Tooltip', nodeId: '754:36947', kind: 'component-set' },
      { name: 'Arrow', nodeId: '821:12851', kind: 'component-set' }
    ],
    publicComponentNames: ['Tooltip'],
    supportedVariantAxes: ['Type', 'Placement', 'Arrow'],
    reactPropMapping: {
      Type: 'variant',
      Placement: 'placement',
      Lifecycle: 'open/defaultOpen/onOpenChange',
      Arrow: 'arrow',
      Action: 'actionLabel/onAction'
    },
    previewOnlyProps: [],
    interactionStatus: 'composite',
    readiness: 'production-ready',
    requiredUsageStoryIds: ['components-tooltip--usage'],
    requiredInteractionTests: ['hover open', 'focus open', 'escape close', 'placement rendering'],
    appOwnedBehaviors: ['Portal mounting, collision handling, and delay timing are currently app-owned.'],
    unsupportedFigmaFeatures: ['No exported portal, collision, or delay-provider API.']
  }
] as const satisfies readonly ComponentContract[];

export type DesignSystemComponentContract = (typeof designSystemComponentContracts)[number];

export const designSystemComponentContractByName = Object.fromEntries(
  designSystemComponentContracts.map((contract) => [contract.component, contract])
) as Record<DocumentedComponentName, DesignSystemComponentContract>;
