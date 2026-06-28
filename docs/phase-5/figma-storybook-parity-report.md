# Phase 5 Figma To Storybook Parity Report

Generated: 2026-06-28T17:27:33.426Z

Figma source file: `WRXdNp9M1SEjWPaUhU67pg`
Contract entries: 31
Storybook manifest components: 35
Storybook index entries: 132
Token manifest entries: 5
Icon export source present: no
Failures: 0
Warnings: 17

## CI Gate

This report is generated from `src/components/contracts.ts`, `storybook-static/manifests/components.json`, `storybook-static/index.json`, token exports, icon exports, component source, and story source.

CI fails when a public Figma component contract is missing source nodes, mapped variant axes, Storybook prop metadata, or required usage stories. Interaction-test evidence is reported as a warning until the lower-risk components finish the remaining play-test rollout. This makes new Figma source changes explicit: add or update the contract entry first, then map it to Storybook props and stories.

## Component Matrix

| Component | Figma Page | Figma Source Nodes | Figma Axes / Properties | Storybook Props | Usage Stories | Readiness | Interaction | Tokens | Tests |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Badge | Badges (184:3759) | Badges (184:3935) | Type, Prefix | tone, hasPrefix, children, className | none required | production-ready | display | pass | pass |
| Banner | Banners (729:23222) | Banner (817:10892) | Title, Tone, Actions, Dismissable | tone, title, children, actions, dismissible, dismissLabel, onDismiss, className | none required | partial | composite | pass | fail |
| Button | Buttons (7:2313) | Button CTA (588:1437) | Type, Size, States | variant, size, visualState, leading, trailing, loading | none required | production-ready | interactive | pass | fail |
| ButtonGroup | Button groups (60:12809) | Button group (823:16948) | Padding | padding, children, className | none required | production-ready | static | pass | pass |
| Checkbox | Checkbox (75:1805) | Checkbox (101:1705) | Type, Bounding box, State | label, selection, defaultSelection, onSelectionChange, boxSize, visualState | components-checkbox--usage | production-ready | interactive | pass | fail |
| Chip | Chips (179:22372) | Input chip (702:15975)<br>Choice chips (1191:3712)<br>Filter chip (1355:2289) | Size, State, Selected, Selection type, Prefix | kind, size, selected, selectionType, visualState, prefix, children | none required | partial | interactive | pass | fail |
| CircularBadge | Badges (184:3759) | Circular badge (184:3951) | Property 1 | variant, value, ariaLabel, className | none required | production-ready | display | pass | pass |
| DatePicker | Date picker (699:7807) | Date picker (699:8000)<br>Day (699:7857)<br>Day range (699:7869)<br>Month (699:7894)<br>Year selection (699:7993)<br>Time selection (1290:33702)<br>Time (699:14560) | Property 1, state, day of range, Time | mode, value, defaultValue, onChange, visibleMonth, defaultVisibleMonth, onVisibleMonthChange, minDate, maxDate, disabledDates, showTime, timeValue, defaultTimeValue, onTimeChange, onClear, onClearAll, month, selected, ariaLabel, className | components-datepicker--usage | production-ready | interactive | pass | pass |
| Divider | Dividers (69:10353) | Horizontal/Full-width (143:12746)<br>Horizontal/Middle-inset (143:12745)<br>Vertical/Middle-inset (143:12744)<br>Vertical/Full-width (143:12743) | Orientation, Inset | orientation, inset, className | none required | production-ready | static | pass | pass |
| FilterSortButton | Filter/Sort button (769:18211) | Filter/Sort button (795:10889)<br>Filter/Sort button compact (1392:13097)<br>Active (1392:13222) | State, Selected, activeFilter/Sort | kind, selected, active, activeCount, visualState | none required | partial | interactive | pass | fail |
| FilterWidget | Filter/Sort widget (179:22371) | Filter widget (795:30885)<br>Header with Search (2176:7783) | State | state, options, selectedValues, defaultSelectedValues, onSelectionChange, searchValue, defaultSearchValue, onSearchChange, onClear, onApply, onCancel, className | components-filterwidget--usage | production-ready | composite | pass | fail |
| IconButton | Buttons (7:2313) | Icon button (610:9055) | Type, Size, States | ariaLabel, variant, size, visualState, icon | none required | production-ready | interactive | pass | fail |
| InputField | Input field (735:10411) | Input field/Auto complete (688:10727)<br>Input field/Dropdown (1368:5084) | Mode, Selection, Active, State | label, mode, visualState, selection, active, value, defaultValue, onChange, open, defaultOpen, onOpenChange, placeholder, options | components-inputfield--usage | production-ready | composite | pass | pass |
| List | List (493:11607) | List (493:12241) | Size, State, Expanded, Drag, Slot | label, description, prefix, suffix, size, expanded, defaultExpanded, onExpandedChange, onToggle, disabled, children, visualState, className | components-list--usage | production-ready | interactive | pass | pass |
| Loader | Loaders (424:13603) | pattern-derived | Pattern | variant, label, className | none required | pattern-derived | display | pass | pass |
| Menu | Menu (124:3051) | Final Building block- Menu (550:7762)<br>Dropdown Menu (663:11903)<br>Suffix icon (550:7743)<br>Prefix (550:7748)<br>Footer (550:7753) | Type, State, Selected, Prefix, Suffix, Footer | items, selectionType, selectedValues, defaultSelectedValues, onSelectionChange, onAction, type, title, footer, visualState, ariaLabel, className | components-menu--usage | production-ready | composite | pass | pass |
| Modal | Modals (499:14100) | Modal (821:15145)<br>Title bar (821:17174)<br>Footer (821:17751)<br>Body (821:29090) | Size | size, open, defaultOpen, onOpenChange, title, children, tertiaryAction, footer, closeLabel, className | components-modal--usage | production-ready | composite | pass | pass |
| ProgressIndicator | Progress indicator (444:12098) | Linear bar progress (474:10410)<br>Circular progress indicator (474:10699) | Type, Progress | variant, value, showValue, ariaLabel, className | none required | production-ready | display | pass | fail |
| RadioButton | Radio button (101:1858) | Radio button (102:851) | Selected, Bounding box, State | label, selected, defaultSelected, onSelectedChange, boxSize, visualState | components-radiobutton--usage | production-ready | interactive | pass | fail |
| Search | Searchbar (184:4969) | Search (646:13880) | Size, State | ariaLabel, size, visualState, onClear, placeholder | components-search--usage | production-ready | interactive | pass | fail |
| SegmentedButton | Button groups (60:12809) | Segmented button (60:15223)<br>Start Segmented Button (60:15116)<br>Center Segmented Button (60:15157)<br>End Segmented Button (60:15190) | Segments, Selected, State | items, value, visualState, onChange, ariaLabel, className | components-segmentedbutton--usage | production-ready | interactive | pass | fail |
| Slider | Slider (1240:7928) | Slider (1240:8345)<br>Slider range (1247:6419)<br>Slider compact (1247:6748) | Type, Mode, Disabled | mode, label, value, defaultValue, onChange, min, max, step, unit, helpText, disabled, className | components-slider--usage | production-ready | interactive | pass | fail |
| Snackbar | Snackbar and Toasts (34:325) | Snackbar- Notifications (36:3144) | Type, Action | children, tone, open, defaultOpen, onOpenChange, actionLabel, onAction, action, duration, dismissLabel, className | components-snackbar--usage | production-ready | composite | pass | pass |
| SortWidget | Filter/Sort widget (179:22371) | Sort widget (795:33195)<br>sort for table (164:12688) | Type, Order | type, order, defaultOrder, onOrderChange, onApply, onCancel, className | components-sortwidget--usage | production-ready | composite | pass | fail |
| Table | Table (113:2361) | Table (113:3564)<br>Table header (1100:7094)<br>Block type (113:3458)<br>Pagination (113:3586) | Columns, Selection, Hover, Pagination | columns, rows, caption, toolbar, footer, getRowId, selectedRowIds, defaultSelectedRowIds, onRowSelectionChange, sort, defaultSort, onSortChange, pagination, defaultPagination, onPaginationChange, emptyState, className | components-table--usage | production-ready | composite | pass | pass |
| Tabs | Tabs (450:11995) | Tabs (1294:2064)<br>Building blocks (1234:39323) | Tabs, Selected, State | items, value, visualState, onChange, className | components-tabs--usage | production-ready | interactive | pass | fail |
| TextField | Text field (69:7170) | Text Field outline (646:15381)<br>Number text field (809:14872)<br>Suffix field (382:6070)<br>Prefix field (384:6080)<br>Header style (384:6094) | State, Requirement, Prefix, Suffix, Multiline, Number controls | label, visualState, requirement, prefix, suffix, helperText, multiline, numberControls, onChange | components-textfield--usage | production-ready | interactive | pass | fail |
| Toast | Snackbar and Toasts (34:325) | Toasts- Notifications (60:12761) | Type | tone, open, defaultOpen, onOpenChange, duration, timestamp, source, title, children, actionLabel, onAction, action, dismissLabel, className | components-toast--usage | production-ready | composite | pass | pass |
| ToggleButton | Button groups (60:12809) | Toggle button (69:6503)<br>Building block for toggle button (60:16790) | Segments, Selected, State | items, values, visualState, onChange, ariaLabel, className | components-togglebutton--usage | production-ready | interactive | pass | fail |
| ToggleSwitch | Toggle switch (104:2807) | Toggle switch (113:7424) | Selected, State | label, selected, defaultSelected, onSelectedChange, visualState | components-toggleswitch--usage | production-ready | interactive | pass | fail |
| Tooltip | Tooltips (424:15525) | Tooltip (754:36947)<br>Arrow (821:12851) | Type, Placement, Arrow | children, content, open, defaultOpen, onOpenChange, type, title, actionLabel, onAction, placement, className | components-tooltip--usage | production-ready | composite | pass | pass |

## Prop Option Snapshot

### Badge

- Figma axes/properties: Type, Prefix
- React prop mapping: tone, prefix
- Storybook prop options: tone: 'success', 'error', 'caution', 'warning', 'info', 'secondary', 'disabled'<br>hasPrefix: boolean<br>children: ReactNode<br>className: string

### Banner

- Figma axes/properties: Title, Tone, Actions, Dismissable
- React prop mapping: title, tone, primaryAction, secondaryAction, onDismiss
- Storybook prop options: tone: 'warning', 'info', 'caution', 'error'<br>title: string<br>children: ReactNode<br>actions: ReactNode<br>dismissible: boolean<br>dismissLabel: string<br>onDismiss: () => void<br>className: string

### Button

- Figma axes/properties: Type, Size, States
- React prop mapping: size, visualState, loading, disabled
- Storybook prop options: variant: 'primary', 'secondary', 'outline', 'tonal', 'text', 'link'<br>size: 'small', 'default', 'large'<br>visualState: 'idle', 'hover', 'pressed', 'focused', 'disabled'<br>leading: ReactNode<br>trailing: ReactNode<br>loading: boolean

### ButtonGroup

- Figma axes/properties: Padding
- React prop mapping: padding
- Storybook prop options: padding: 'default', 'tight', 'loose'<br>children: ReactNode<br>className: string

### Checkbox

- Figma axes/properties: Type, Bounding box, State
- React prop mapping: selection, defaultSelection, boxSize, visualState
- Storybook prop options: label: string<br>selection: 'unselected', 'selected', 'indeterminate'<br>defaultSelection: 'unselected', 'selected', 'indeterminate'<br>onSelectionChange: (selection: CheckboxSelection) => void<br>boxSize: '16px', '20px'<br>visualState: 'default', 'hover', 'pressed', 'focused', 'disabled'

### Chip

- Figma axes/properties: Size, State, Selected, Selection type, Prefix
- React prop mapping: size, visualState, selected, prefix, selectionType
- Storybook prop options: kind: 'input', 'choice', 'filter'<br>size: 'small', 'medium', 'large'<br>selected: boolean<br>selectionType: 'single', 'multi'<br>visualState: 'default', 'hover', 'pressed', 'focused', 'disabled'<br>prefix: ReactNode<br>children: ReactNode

### CircularBadge

- Figma axes/properties: Property 1
- React prop mapping: none
- Storybook prop options: variant: 'dot', 'value'<br>value: string, number<br>ariaLabel: string<br>className: string

### DatePicker

- Figma axes/properties: Property 1, state, day of range, Time
- React prop mapping: mode, month, showTime, timeValue, defaultTimeValue, onTimeChange, value, defaultValue, onChange, visibleMonth, defaultVisibleMonth, onVisibleMonthChange, minDate, maxDate, disabledDates, onClear, onClearAll, selected, visual, rendering, range
- Storybook prop options: mode: 'single', 'range'<br>value: Date, signature, null<br>defaultValue: Date, signature, null<br>onChange: (value: DatePickerValue) => void<br>visibleMonth: Date<br>defaultVisibleMonth: Date<br>onVisibleMonthChange: (month: Date) => void<br>minDate: Date<br>maxDate: Date<br>disabledDates: DatePickerDisabledMatcher[]<br>showTime: boolean<br>timeValue: string<br>defaultTimeValue: string<br>onTimeChange: (time: string) => void<br>onClear: () => void<br>onClearAll: () => void<br>month: string<br>selected: number, tuple<br>ariaLabel: string<br>className: string

### Divider

- Figma axes/properties: Orientation, Inset
- React prop mapping: orientation, inset
- Storybook prop options: orientation: 'horizontal', 'vertical'<br>inset: 'full', 'middle'<br>className: string

### FilterSortButton

- Figma axes/properties: State, Selected, activeFilter/Sort
- React prop mapping: visualState, selected, activeCount
- Storybook prop options: kind: 'filter', 'sort'<br>selected: boolean<br>active: boolean<br>activeCount: number<br>visualState: 'default', 'hover', 'pressed', 'focused', 'disabled'

### FilterWidget

- Figma axes/properties: State
- React prop mapping: state, searchValue, onSearchChange, selectedValues, onSelectionChange
- Storybook prop options: state: 'default', 'fewSelected', 'allSelected'<br>options: FilterOption[]<br>selectedValues: string[]<br>defaultSelectedValues: string[]<br>onSelectionChange: (values: string[]) => void<br>searchValue: string<br>defaultSearchValue: string<br>onSearchChange: (value: string) => void<br>onClear: () => void<br>onApply: (values: string[]) => void<br>onCancel: () => void<br>className: string

### IconButton

- Figma axes/properties: Type, Size, States
- React prop mapping: size, visualState, disabled
- Storybook prop options: ariaLabel: string<br>variant: 'default', 'filled', 'outline'<br>size: Exclude<ButtonSize, 'large'><br>visualState: 'idle', 'hover', 'pressed', 'focused', 'disabled'<br>icon: ComponentType<IconProps>

### InputField

- Figma axes/properties: Mode, Selection, Active, State
- React prop mapping: mode, selection, active, visualState, open, defaultOpen, onOpenChange, value, defaultValue, onChange
- Storybook prop options: label: string<br>mode: 'autocomplete', 'dropdown'<br>visualState: 'default', 'hover', 'pressed', 'focused', 'disabled', 'open'<br>selection: 'single', 'multiple'<br>active: boolean<br>value: string, Array<br>defaultValue: string, Array<br>onChange: (value: InputFieldValue) => void<br>open: boolean<br>defaultOpen: boolean<br>onOpenChange: (open: boolean) => void<br>placeholder: string<br>options: string[]

### List

- Figma axes/properties: Size, State, Expanded, Drag, Slot
- React prop mapping: size, visualState, disabled, expanded, defaultExpanded, onExpandedChange, prefix, suffix, children
- Storybook prop options: label: ReactNode<br>description: ReactNode<br>prefix: ReactNode<br>suffix: ReactNode<br>size: 'default', 'small'<br>expanded: boolean<br>defaultExpanded: boolean<br>onExpandedChange: (expanded: boolean) => void<br>onToggle: () => void<br>disabled: boolean<br>children: ReactNode<br>visualState: 'default', 'hover', 'pressed', 'focused', 'disabled'<br>className: string

### Loader

- Figma axes/properties: Pattern
- React prop mapping: none
- Storybook prop options: variant: 'search', 'table', 'panel', 'button'<br>label: string<br>className: string

### Menu

- Figma axes/properties: Type, State, Selected, Prefix, Suffix, Footer
- React prop mapping: type, visualState, selectedValues, defaultSelectedValues, onSelectionChange, onAction, prefix, suffix, footer
- Storybook prop options: items: MenuItem[]<br>selectionType: 'single', 'multi', 'action'<br>selectedValues: string[]<br>defaultSelectedValues: string[]<br>onSelectionChange: (values: string[]) => void<br>onAction: (value: string, item: MenuItem) => void<br>type: 'menu', 'dropdown'<br>title: string<br>footer: ReactNode<br>visualState: 'default', 'hover', 'pressed', 'focused', 'disabled'<br>ariaLabel: string<br>className: string

### Modal

- Figma axes/properties: Size
- React prop mapping: size, open, defaultOpen, onOpenChange, title, footer, children, closeLabel
- Storybook prop options: size: 'small', 'medium', 'large'<br>open: boolean<br>defaultOpen: boolean<br>onOpenChange: (open: boolean) => void<br>title: ReactNode<br>children: ReactNode<br>tertiaryAction: ReactNode<br>footer: ReactNode<br>closeLabel: string<br>className: string

### ProgressIndicator

- Figma axes/properties: Type, Progress
- React prop mapping: value
- Storybook prop options: variant: 'linear', 'circular'<br>value: 5, 50, 75, 100, number<br>showValue: boolean<br>ariaLabel: string<br>className: string

### RadioButton

- Figma axes/properties: Selected, Bounding box, State
- React prop mapping: selected, defaultSelected, onSelectedChange, boxSize, visualState
- Storybook prop options: label: string<br>selected: boolean<br>defaultSelected: boolean<br>onSelectedChange: (selected: boolean) => void<br>boxSize: '16px', '20px'<br>visualState: 'default', 'hover', 'pressed', 'focused', 'disabled'

### Search

- Figma axes/properties: Size, State
- React prop mapping: size, visualState, value, defaultValue, onChange, onClear
- Storybook prop options: ariaLabel: string<br>size: 'small', 'medium'<br>visualState: 'default', 'hover', 'pressed', 'focused', 'active'<br>onClear: () => void

### SegmentedButton

- Figma axes/properties: Segments, Selected, State
- React prop mapping: options, value, onChange, visualState
- Storybook prop options: items: SegmentedButtonItem[]<br>value: string<br>visualState: 'default', 'hover', 'pressed', 'focused', 'disabled'<br>onChange: (value: string) => void<br>ariaLabel: string<br>className: string

### Slider

- Figma axes/properties: Type, Mode, Disabled
- React prop mapping: range, disabled, value, defaultValue, onChange
- Storybook prop options: mode: 'single', 'range'<br>label: string<br>value: number, tuple<br>defaultValue: number, tuple<br>onChange: (value: SliderValue) => void<br>min: number<br>max: number<br>step: number<br>unit: string<br>helpText: string<br>disabled: boolean<br>className: string

### Snackbar

- Figma axes/properties: Type, Action
- React prop mapping: tone, open, defaultOpen, onOpenChange, actionLabel, onAction, duration, dismissLabel
- Storybook prop options: children: ReactNode<br>tone: 'success', 'error', 'caution', 'info'<br>open: boolean<br>defaultOpen: boolean<br>onOpenChange: (open: boolean) => void<br>actionLabel: string<br>onAction: () => void<br>action: ReactNode<br>duration: number, null<br>dismissLabel: string<br>className: string

### SortWidget

- Figma axes/properties: Type, Order
- React prop mapping: order, defaultOrder, onOrderChange
- Storybook prop options: type: 'default', 'custom'<br>order: 'newest', 'oldest'<br>defaultOrder: 'newest', 'oldest'<br>onOrderChange: (order: SortOrder) => void<br>onApply: (order: SortOrder) => void<br>onCancel: () => void<br>className: string

### Table

- Figma axes/properties: Columns, Selection, Hover, Pagination
- React prop mapping: columns, rows, selectedRowIds, defaultSelectedRowIds, onRowSelectionChange, css, row, hover, state, sortable, sort, defaultSort, onSortChange, pagination, defaultPagination, onPaginationChange
- Storybook prop options: columns: ReadonlyArray<TableColumn<Row>><br>rows: ReadonlyArray<Row><br>caption: string<br>toolbar: ReactNode<br>footer: ReactNode<br>getRowId: (row: Row, index: number) => string<br>selectedRowIds: string[]<br>defaultSelectedRowIds: string[]<br>onRowSelectionChange: (rowIds: string[]) => void<br>sort: TableSortState, null<br>defaultSort: TableSortState, null<br>onSortChange: (sort: TableSortState<Row> | null) => void<br>pagination: TablePaginationState<br>defaultPagination: TablePaginationState<br>onPaginationChange: (pagination: TablePaginationState) => void<br>emptyState: ReactNode<br>className: string

### Tabs

- Figma axes/properties: Tabs, Selected, State
- React prop mapping: tabs, value, onChange, visualState
- Storybook prop options: items: TabItem[]<br>value: string<br>visualState: 'default', 'hover', 'pressed', 'focused', 'disabled'<br>onChange: (value: string) => void<br>className: string

### TextField

- Figma axes/properties: State, Requirement, Prefix, Suffix, Multiline, Number controls
- React prop mapping: visualState, disabled, readOnly, required, optional, prefix, suffix, multiline, type, min, max, step, value, defaultValue, onChange
- Storybook prop options: label: string<br>visualState: 'default', 'hover', 'pressed', 'focused', 'disabled', 'error', 'active', 'description'<br>requirement: 'default', 'optional', 'mandatory'<br>prefix: ReactNode<br>suffix: ReactNode<br>helperText: string<br>multiline: boolean<br>numberControls: 'icon', 'number'<br>onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>

### Toast

- Figma axes/properties: Type
- React prop mapping: tone, open, defaultOpen, onOpenChange, timestamp, source, actionLabel, onAction, duration, dismissLabel
- Storybook prop options: tone: 'success', 'error', 'warning', 'info'<br>open: boolean<br>defaultOpen: boolean<br>onOpenChange: (open: boolean) => void<br>duration: number, null<br>timestamp: ReactNode<br>source: ReactNode<br>title: ReactNode<br>children: ReactNode<br>actionLabel: string<br>onAction: () => void<br>action: ReactNode<br>dismissLabel: string<br>className: string

### ToggleButton

- Figma axes/properties: Segments, Selected, State
- React prop mapping: options, values, onChange, visualState
- Storybook prop options: items: ToggleButtonItem[]<br>values: string[]<br>visualState: 'default', 'hover', 'pressed', 'focused', 'disabled'<br>onChange: (values: string[]) => void<br>ariaLabel: string<br>className: string

### ToggleSwitch

- Figma axes/properties: Selected, State
- React prop mapping: selected, defaultSelected, onSelectedChange, visualState, loading, disabled
- Storybook prop options: label: string<br>selected: boolean<br>defaultSelected: boolean<br>onSelectedChange: (selected: boolean) => void<br>visualState: union, 'loader'

### Tooltip

- Figma axes/properties: Type, Placement, Arrow
- React prop mapping: placement, open, defaultOpen, onOpenChange, arrow, actionLabel, onAction
- Storybook prop options: children: ReactNode<br>content: ReactNode<br>open: boolean<br>defaultOpen: boolean<br>onOpenChange: (open: boolean) => void<br>type: 'plain', 'rich'<br>title: ReactNode<br>actionLabel: string<br>onAction: () => void<br>placement: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left-top', 'left-bottom', 'right-top', 'right-bottom'<br>className: string

## Warnings

- Banner: required interaction tests are declared but no story play function exists.
- Button: required interaction tests are declared but no story play function exists.
- Checkbox: required interaction tests are declared but no story play function exists.
- Chip: required interaction tests are declared but no story play function exists.
- FilterSortButton: required interaction tests are declared but no story play function exists.
- FilterWidget: required interaction tests are declared but no story play function exists.
- IconButton: required interaction tests are declared but no story play function exists.
- ProgressIndicator: required interaction tests are declared but no story play function exists.
- RadioButton: required interaction tests are declared but no story play function exists.
- Search: required interaction tests are declared but no story play function exists.
- SegmentedButton: required interaction tests are declared but no story play function exists.
- Slider: required interaction tests are declared but no story play function exists.
- SortWidget: required interaction tests are declared but no story play function exists.
- Tabs: required interaction tests are declared but no story play function exists.
- TextField: required interaction tests are declared but no story play function exists.
- ToggleButton: required interaction tests are declared but no story play function exists.
- ToggleSwitch: required interaction tests are declared but no story play function exists.

## Failures

- None
