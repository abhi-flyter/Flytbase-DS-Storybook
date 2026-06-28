export const componentDocs = {
  Badge:
    'Badges convey dynamic information, such as a count or status. Figma coverage includes success, error, caution, warning, info, secondary, disabled, and optional 16px Icon/Play prefix variants.',
  Banner:
    'Use banners for contextual system feedback that must stay visible in the surrounding workflow. Figma guidance says banners always push the content below and are not overlays. Coverage includes title/no-title variants, info/caution/warning/error tones, 24px tone icons, two CTA slots, and a close icon button.',
  Button:
    'Use Button for product actions with clear hierarchy. Figma coverage includes primary, secondary, tertiary outline, tonal, text/link, small/default/large sizes, idle, hover, pressed, focused, disabled, and loader states. Disabled buttons use the no-action cursor.',
  ButtonGroup:
    'Use ButtonGroup to cluster related actions while preserving the Figma padding axis: tight, default, and loose. Figma also groups SegmentedButton and ToggleButton on this page with 2, 3, 4, and 5 segment layouts.',
  Checkbox:
    'Use Checkbox for independent choices and parent-child indeterminate selection. Figma visual state is represented by selection and visualState. Product screens use selection/defaultSelection plus onSelectionChange; do not invent checked/onChange unless those props are explicitly documented. If some, but not all, child checkboxes are checked, the parent checkbox goes to the indeterminate state. Figma coverage includes unselected, selected, indeterminate, 16px/20px bounds, and default, hover, pressed, focused, and disabled states.',
  Chip:
    'Chips help people enter information, make selections, filter content, or trigger actions. Figma coverage includes input chips, choice chips, and filter chips with size, selected, selection-type, prefix/avatar/icon, close, dropdown, and state axes.',
  CircularBadge:
    'Use CircularBadge for compact notification and unread indicators. Figma coverage includes a 6px dot and a short value badge.',
  DatePicker:
    'Date pickers allow users to select dates and time for inputs or filters. Product screens use value/defaultValue plus onChange for selected dates or ranges, visibleMonth/defaultVisibleMonth plus onVisibleMonthChange for navigation, minDate/maxDate/disabledDates for constraints, and onClear/onClearAll for footer actions. Figma coverage includes single date picker, range date picker, Sunday-start day-of-week grid, day buttons, month/year selection, Clear and Clear all actions, Start and End fields, help text, and optional time selection rows.',
  Divider:
    'A divider is a thin line used to group content in lists and layouts. Figma coverage includes horizontal and vertical full-width and middle-inset variants, with 320px by 1px horizontal examples and 1px by 120px vertical examples.',
  FilterSortButton:
    'Use FilterSortButton to open filtering or sorting widgets and communicate selected or active filter/sort state. Figma guidance says the number of active filter categories must be visible in the button, such as `2` when site and device filters are applied. Coverage includes idle, hover, pressed, focused, selected yes/no, activeFilter/Sort yes/no, 32px height, 16px icon, and active count badge.',
  FilterWidget:
    'Filter widgets allow users to filter, search specifics, and select all or clear all line items. Figma visual state is represented by state plus child checkbox/search states. Product screens use selectedValues/defaultSelectedValues with onSelectionChange, searchValue/defaultSearchValue with onSearchChange, and onApply/onCancel/onClear for footer actions. Figma coverage includes Filter widget states Default, 1/few selected, and all selected, a 248px panel, search header, checkbox menu rows, Select all footer, and Clear all behavior.',
  IconButton:
    'Use IconButton for compact tool actions where the icon carries the meaning. Figma specifies that icon buttons always have tooltips; when focused, pressing Enter executes the action. Coverage includes default, filled, outline, small/default sizes, idle, hover, pressed, focused, and disabled states.',
  InputField:
    'Use InputField for dropdown and autocomplete selection. Figma visual state is represented by mode, selection, active, and visualState. Product screens use value/defaultValue plus onChange for selected value or values, and open/defaultOpen/onOpenChange for menu lifecycle. The component owns basic open/close, keyboard option movement, selection, and disabled behavior; async filtering remains product-owned. Figma coverage includes autocomplete and dropdown modes, single/multiple input, active yes/no, default, hover, pressed, focused, open, and disabled states, 342px field width, header actions, help text, and open dropdown menus.',
  List:
    'Lists are continuous, vertical indexes of text or images. Product screens use expanded/defaultExpanded/onExpandedChange for expandable rows; onToggle remains a deprecated compatibility callback. Figma coverage includes default and small sizes, collapsed and expanded rows, drag and expand affordances, default, hover, pressed, focused, and disabled states, and the guidance that rows with expand/collapse controls should make the whole row clickable.',
  Loader:
    'Loaders represent in-progress states for different components. Figma coverage includes search loading, table/list loading, support-panel loading, uploading table examples, and compact control loader states.',
  Menu:
    'Menus display a list of choices on a temporary surface after users interact with a button, action, or other control. Product screens use onAction for action menus, selectedValues/defaultSelectedValues with onSelectionChange for single and multi-select menus, and keep trigger/positioning/open-close lifecycle app-owned. Figma coverage includes dropdown and menu types, action/divider/sub-title content rows, single and multiple selection, default, hover, pressed, focused, disabled, selected, destructive, prefix icon/slot, suffix selection/shortcut-key, CTA footer, and select-all footer variants.',
  Modal:
    'Modals and dialogs provide important prompts in a user flow. Product screens use open/defaultOpen plus onOpenChange for lifecycle, close button and Escape for dismissal, and title/body content for accessible dialog labelling. Portal placement, route blocking, and backdrop ownership remain app-owned. Figma coverage includes small 380px, medium 480px, and large 620px sizes, 48px title bar, 36px body, 56px footer, close IconButton, tertiary CTA plus footer actions, scroll after max height, and the rule that the modal does not close when users click outside.',
  ProgressIndicator:
    'Use ProgressIndicator to indicate progress of a task. Figma coverage includes linear bar progress at 5%, 50%, and 100%, circular progress at 5%, 50%, 75%, and 100%, percentage labels that keep updating with progress, 401px by 20px linear examples, and 32px circular examples.',
  RadioButton:
    'Use RadioButton for mutually exclusive choices. Figma visual state is represented by selected and visualState. Product screens use selected/defaultSelected plus onSelectedChange, usually controlled by the parent radio group. Figma guidance says the first option in a radio-button list is always selected by default. Coverage includes selected/unselected, 16px/20px bounds, and default, hover, pressed, focused, and disabled states.',
  Search:
    'Use Search for finding or filtering content in the current surface. Figma visual state is represented by size and visualState. Product screens use value/defaultValue plus onChange for the query and onClear for the close icon. Figma guidance says search results update in real time as soon as the user types, result counts should always be shown, suggestions/autofill should improve the experience, Enter or Esc returns the field to rest state, and the input should auto-scroll to keep the cursor in view. Coverage includes small 28px and medium 32px sizes, search and close icons, and default, hover, pressed, focused, and active states.',
  SegmentedButton:
    'Use SegmentedButton for mutually exclusive view or mode switching. Product screens use value plus onChange for the active segment. Figma coverage includes 2, 3, 4, and 5 segment layouts with selected and stateful segment parts.',
  Slider:
    'Use Slider to set a bounded value or range. Figma defines range mode as supplying an array of values to the value prop. Product screens use value/defaultValue plus onChange; range mode emits a two-number array. Figma coverage includes one-slider and two-slider modes, active and disabled types, label, live top-right output, suffix unit, help text, 240px track width, and guidance that slider values reflect in real time.',
  Snackbar:
    'Use Snackbar for non-critical CRUD or info messages such as Mission saved, Zones updated, or Tag created. Product screens use open/defaultOpen plus onOpenChange for lifecycle, actionLabel/onAction for built-in actions, duration for optional auto-dismiss, and the close icon for dismissal. Figma guidance says snackbars stay visible for 10 seconds unless the close icon is clicked, persist while hovered, get replaced by simultaneous snackbars, and include shadow/elevation, type icons, optional action button, and close icon.',
  SortWidget:
    'Use SortWidget for selecting sort order. Product screens use order/defaultOrder plus onOrderChange, with onApply/onCancel for footer actions. Figma coverage includes default and custom sort widget types, Reset to default actions, Created on, Updated on, Device, Newest, and Oldest rows, plus table sort states Default, Newest, and Oldest.',
  Table:
    'Use Table for scan-heavy operational data with comparable rows and status-rich columns. Product screens can use getRowId, selectedRowIds/defaultSelectedRowIds/onRowSelectionChange for the Figma checkbox selection column, sortable columns with sort/defaultSort/onSortChange for header sorting, and pagination/defaultPagination/onPaginationChange for page controls. Figma coverage includes a toolbar with Search, Sort, Filters, secondary and primary actions, checkbox selection column, Name, Date, Time, Validity, Drone, Quantity, Files, Extra, and Actions columns, uploading file cells, table sort affordances, and footer pagination such as Devices: 6/20, 1-5 of 100, and Lines per page.',
  Tabs:
    'Tabs organize and support navigation between groups of related content at the same level of hierarchy. Product screens use value plus onChange for the active tab. Figma coverage includes 2, 3, 4, and 5 tab layouts, selected tab positions, 20px icon building blocks, divider, and the guidance that disabled tabs are not clickable.',
  TextField:
    'Text fields allow users to enter text into a UI and typically appear in forms and dialogs. Figma visual state is represented by visualState, requirement, prefix/suffix, multiline, and numberControls. Product screens use native value/defaultValue plus onChange, readOnly, and disabled. Figma coverage includes outline text fields, number text fields, header default/mandatory/optional variants, prefix asset/icon, suffix counter/icon, phone prefix, helper text, error/caution text, description box, and default, hover, pressed, focused, active, disabled, error, and description states.',
  Toast:
    'Use Toast for important or critical information that is not related to flight safety and should be logged into the notification system. Product screens use open/defaultOpen plus onOpenChange for lifecycle, actionLabel/onAction for built-in actions, duration for optional auto-dismiss, and the close icon for dismissal. Figma guidance says toasts include success, error, caution, and info notification types, timestamp, source, title, description, dismiss action, and stay persistent while hovered.',
  ToggleButton:
    'Use ToggleButton for compact independent mode toggles. Product screens use values plus onChange for the selected toggle values. Figma coverage includes 2, 3, 4, and 5 segment layouts with selected and interaction states.',
  ToggleSwitch:
    'Use ToggleSwitch for immediate on/off settings. Figma visual state is represented by selected and visualState. Product screens use selected/defaultSelected plus onSelectedChange. Figma coverage includes selected yes/no plus default, hover, pressed, focused, disabled, and loader states at a 36px by 20px switch size.',
  Tooltip:
    'Tooltips display brief labels or messages on hover and focus, including keyboard navigation. Product screens use open/defaultOpen plus onOpenChange when controlled trigger lifecycle is needed; the component opens on hover/focus, closes on blur/mouse leave/Escape, and wires aria-describedby while open. Portal placement and collision handling are not exported yet. Figma coverage includes plain and rich tooltips, heading/body/action content, 12px by 7px arrows, and top/top-start/top-end/bottom/bottom-start/bottom-end/left-top/left-bottom/right-top/right-bottom placements.'
} as const;

export type DocumentedComponentName = keyof typeof componentDocs;
