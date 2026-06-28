# Storybook and Figma Integration RCA

Generated: 2026-06-28

Source Figma file: `WRXdNp9M1SEjWPaUhU67pg` (`F Design System 2.0 Copy`)

## Executive Summary

The Storybook and Chromatic MCP integration is technically connected, but it is not yet a production-grade source of truth for builders. The current system lets agents discover component names, examples, prop tables, token docs, and some Storybook tests. That solves the "do not hallucinate props" problem, but it does not solve the more important builder problem: "can I use this component in a real product workflow without falling back to non-design-system code?"

The DatePicker failure is the clearest example. Figma contains a real date-picker system with single/range variants, day states, range-day states, month/year pieces, clear actions, start/end fields, help text, and time rows. The shipped React component exposes only `mode`, `month`, `selected`, `showTime`, and `className`, and renders the calendar grid as non-interactive spans. The Storybook MCP accurately reports that limited API. A rule-following agent therefore cannot wire it into a product date-range workflow without either wrapping it, extending it, or using a non-design-system fallback.

This is broader than DatePicker. The current checks validate documentation presence, visual/Figma coverage, token naming, icon export, and MCP availability. They do not validate product interaction contracts, accessibility completeness, Figma-to-code variant parity, or whether every Figma capability is intentionally exposed, abstracted, or documented as unsupported.

## What Was Verified

### Live Figma File

The Figma Plugin API can see the full file, not only the Welcome page:

- Total pages: 35
- Component/design-system pages: 24 product component pages plus the Styles foundation page
- Variable collections: 6
- Current notable page: `Developer API & Interaction Contracts`, empty at inspection time

Top-level pages seen live:

| Page | ID | Notes |
| --- | --- | --- |
| Welcome | `3:2` | Landing page only |
| Changelog | `3:151` | Non-component docs |
| Styles | `0:1` | Icons, markers, typography, spacing, shapes, communication |
| Buttons | `7:2313` | Component page |
| Badges | `184:3759` | Component page |
| Banners | `729:23222` | Component page |
| Button groups | `60:12809` | Component page |
| Checkbox | `75:1805` | Component page |
| Chips | `179:22372` | Component page |
| Date picker | `699:7807` | Component page |
| Dividers | `69:10353` | Component page |
| Filter/Sort button | `769:18211` | Component page |
| Filter/Sort widget | `179:22371` | Component page |
| Illustrations | `424:15734` | Empty |
| Input field | `735:10411` | Component page |
| List | `493:11607` | Component page |
| Loaders | `424:13603` | Pattern examples, no local component set |
| Menu | `124:3051` | Component page |
| Modals | `499:14100` | Component page |
| Progress indicator | `444:12098` | Component page |
| Radio button | `101:1858` | Component page |
| Searchbar | `184:4969` | Component page |
| Slider | `1240:7928` | Component page |
| Snackbar and Toasts | `34:325` | Component page |
| Table | `113:2361` | Component page |
| Tabs | `450:11995` | Component page |
| Toggle switch | `104:2807` | Component page |
| Text field | `69:7170` | Component page |
| Tooltips | `424:15525` | Component page |
| Explorations | `282:17914` | Non-source exploration content |
| Machine vs DB states | `1009:19512` | Product-state exploration |
| Developer API & Interaction Contracts | `4177:2` | Empty, should become the API bridge page |

### Variables

Live variable collections:

| Collection | Count | Current role |
| --- | ---: | --- |
| `Color Styles` | 103 | Legacy compatibility collection |
| `Spacing and Radius` | 19 | Legacy compatibility collection |
| `Primitives` | 139 | Raw color and primitive values |
| `Color` | 120 | Semantic FDS color variables, dark mode only |
| `Spacing` | 39 | FDS spacing/radius/size variables |
| `Typography` | 16 | FDS typography variables |

The package token manifest exports:

- `Primitives`: 139 CSS variables
- `Color`: 120 semantic variables
- `Spacing`: 39 variables
- `Typography`: 16 variables

Important issue: the file contains legacy collections with broad `ALL_SCOPES`. The package has normalized the FDS layer, but the Figma source still contains old compatibility collections. Builders and agents need explicit guidance that product implementation should use `Color/fds/*`, `Spacing/fds/*`, and `Typography/*`, not legacy local names.

## Component Coverage From Figma

This table summarizes the live Figma component inventory and the high-risk Storybook/package gap.

| Figma page | Figma coverage | Storybook/package risk |
| --- | --- | --- |
| Buttons | `Button CTA` has 90 variants across Type, Size, States; `Icon button` has 30 variants. | Mostly represented, but Storybook props normalize Figma naming. Need explicit mapping table for `Tertiary / Outline` to `outline`, `Text / Link button` to `text/link`, `States` to `visualState/loading/disabled`. |
| Badges | Status badge has 14 variants; Circular badge has dot/value variants. | Good visual coverage. Need clear semantic mapping for tone names and prefix/icon support. |
| Banners | 8 variants plus booleans for dismissible, primary action, secondary action, actions. | React API does not fully mirror all Figma booleans. Need docs to state action-slot support and dismiss behavior. |
| Button groups | Segmented, toggle, button-group, and internal segment blocks. | Public API splits into `ButtonGroup`, `SegmentedButton`, `ToggleButton`. Need Figma-to-public-component mapping in docs. |
| Checkbox | 30 variants: Type, Bounding box, State. | Functional API exists with `selection` and `onSelectionChange`; good pattern to replicate elsewhere. |
| Chips | Input, Choice, Filter chip plus prefix settings. | Public API flattens several Figma families into one `Chip`. Need usage stories with removable/input behavior and selection callbacks if chips are expected to change state. |
| Date picker | Single/range picker, Day states, range-day states, Month, Year selection, Time selection, Time rows. | Major blocker. React component is presentational and inaccessible as a date input. |
| Dividers | Four loose components for horizontal/vertical full-width/middle-inset. | Acceptable, but docs should say these are primitives. |
| Filter/Sort button | Two button sets plus active indicator. | API exposes selected/activeCount/kind-like surface, but needs direct mapping and click/open behavior docs. |
| Filter/Sort widget | Filter widget, Sort widget, table sort, search header. | Functional APIs exist for selected values/order, but select-all/search/apply/reset behavior needs stricter usage stories. |
| Illustrations | Empty page. | Should remain excluded until source assets exist. |
| Input field | Autocomplete and dropdown each have 24 variants. | Functional API exists, but current implementation is closer to preview listbox than full combobox/autocomplete. Needs keyboard/accessibility and open-state behavior tests. |
| List | 15 variants with slots, expand, size, state. | API supports `onToggle`, but no controlled expanded state or row role contract. |
| Loaders | In-progress examples for search, support panel, table/list, upload rows. | No Figma component set. Storybook `Loader` is an abstraction; docs must mark it as pattern-derived, not direct component-set parity. |
| Menu | Suffix, prefix, footer, menu row, dropdown menu. | Figma has many internal primitives and large icon swap surfaces. Public `Menu` lacks item click/change callbacks and selection state management. |
| Modals | Modal size variants plus Title bar, Body, Footer, Slot. | API is visual shell-oriented. Needs modal state/control docs, focus trap, escape handling, aria labels, and action wiring. |
| Progress indicator | Linear and circular progress variants. | Good, but value range and accessibility should be verified in tests. |
| Radio button | 20 variants: selected, bounding box, state. | Functional API exists with `selected` and `onSelectedChange`; good pattern. |
| Searchbar | Search, text, text blinker. | Functional API exists through native input props and `onClear`; good pattern, but suggestions/autofill docs are not implemented. |
| Slider | Active/disabled single/range variants, header/help/icon booleans. | Functional API exists with `value/defaultValue/onChange`; one of the stronger product controls. |
| Snackbar and Toasts | Snackbar 4 types, Toast 3 types, notification examples. | Visual coverage exists. Needs lifecycle/queue/timing API or docs saying lifecycle is app-owned. |
| Table | Table, table header, block types, hover row, pagination, columns. | Current public Table is an abstraction, not full Figma table system. Needs sorting, pagination, toolbar, actions, upload-cell, and row action contracts. |
| Tabs | 14 full tabs variants plus building block states. | Functional API exists with `value/onChange`; good pattern. Need keyboard navigation tests. |
| Toggle switch | 12 variants: state and selected, including loader. | Functional API exists. Need loading semantics and disabled behavior tests. |
| Text field | Many field families: outline, number, header, prefix, suffix, phone. | Functional native input API exists, but Storybook combines multiple Figma families into one component; mapping and constraints need to be explicit. |
| Tooltips | 16 variants plus arrow. | Visual API exists. Needs trigger semantics, hover/focus behavior, portal/positioning contract, and a11y tests. |

## Root Causes

### 1. The Current Definition Of Done Is Documentation-Ready, Not Builder-Ready

`verify:phase5` checks package dependencies, MCP config, component manifest entries, docs presence, token rules, and icon rules. It does not check whether a component that claims to support selection, input, filtering, sorting, tooltips, modals, or dates exposes product-grade interaction APIs.

Result: a component can pass Storybook/MCP readiness while still being impossible to use in a real product feature.

### 2. Figma Concepts Are Being Collapsed Without A Mapping Contract

Figma has visual/variant concepts such as:

- Component sets and nested component sets
- Variant axes
- Boolean properties
- Text properties
- Instance-swap properties
- Internal building blocks
- Usage notes and behavior guidance

The React package intentionally normalizes many of these into smaller APIs. That is reasonable, but the mapping is not documented as a first-class contract. Agents therefore see the final public props only, not the rationale for what was preserved, renamed, combined, or omitted.

### 3. Interactive Components Are Uneven

Strong examples:

- `Checkbox`: `selection/defaultSelection/onSelectionChange`
- `RadioButton`: `selected/defaultSelected/onSelectedChange`
- `Search`: native `value/onChange` plus `onClear`
- `InputField`: `value/defaultValue/onChange`
- `Slider`: `value/defaultValue/onChange`
- `Tabs`: `value/onChange`
- `Table`: `selectedRowIds/defaultSelectedRowIds/onRowSelectionChange`

Weak or incomplete examples:

- `DatePicker`: no product interaction API
- `Menu`: no item action/selection callback contract
- `Modal`: visual shell without focus and open/close contract
- `Tooltip`: visual surface without trigger/positioning lifecycle contract
- `Snackbar`/`Toast`: visual surface without lifecycle/queue contract
- `Table`: partial abstraction missing sort, pagination, toolbar, row-action, and upload-cell behavior contracts

### 4. Visual State Props Are Not Runtime State

Several components expose `visualState` to preview hover, pressed, focused, disabled, or loader states. That is useful for documentation, but product code generally should not manually set hover or pressed states. Storybook needs to separate:

- Product props: values, callbacks, disabled, open, selected, loading
- Documentation preview props: `visualState`, Figma-only state inspection

Without this separation, agents may treat preview props as implementation controls.

### 5. Token Export Is Better Than Component Export, But Still Needs Source-Of-Truth Discipline

The token layer is comparatively strong: FDS variables are exported, forbidden aliases are documented, and verification checks prevent missing CSS token references. The remaining problem is source clarity:

- Figma still has legacy variable collections.
- `semantic-dark.css` is a placeholder while the source has a single dark mode.
- Agents need explicit instruction to avoid legacy collections and use only exported token names.

### 6. Chromatic MCP Is A Read Context, Not A Complete Development Loop

Remote Chromatic MCP is useful for shared documentation and component API lookup. It is not enough for production-grade verification by itself. The local Storybook MCP/dev loop is needed for:

- Story tests
- Accessibility checks
- Interaction tests
- Visual regression confirmation
- Story authoring instructions

## DatePicker RCA

The product agent's explanation was correct.

The shipped DatePicker API is:

```ts
interface DatePickerProps {
  mode?: 'single' | 'range';
  month?: string;
  selected?: number | [number, number];
  showTime?: boolean;
  className?: string;
}
```

It does not expose:

```ts
value
defaultValue
onChange
onSelect
selectedDate
selectedRange
onMonthChange
from
to
disabledDates
minDate
maxDate
```

The implementation renders days as spans and hides the grid from assistive technology. Therefore it can render the Figma-looking calendar, but it cannot act as an operator date-range input.

The agent chose a vendored `DateRangeCalendar` because it had functional selection callbacks. That made the product feature work, but it violated the instruction to use only design-system components. The correct agent behavior would have been to stop and report: "The DS DatePicker is presentational; we need to extend it or build a DS-compliant wrapper."

## Production-Grade Target State

The design system should expose four aligned contracts:

1. Figma contract: component sets, variants, variables, usage notes, screenshots.
2. React contract: exported components, typed props, controlled/uncontrolled behavior, accessibility.
3. Storybook contract: usage stories, prop docs, interaction tests, visual states, design notes.
4. Agent contract: MCP-readable docs that tell builders exactly what to use, what not to use, and where the product boundary is.

For every public component, Storybook should answer:

- What Figma component/page is this mapped from?
- Which Figma variants are supported?
- Which Figma properties were renamed in React?
- Which properties are visual-preview-only?
- Which product behaviors are supported?
- Which product behaviors are intentionally app-owned?
- Which Figma capabilities are not yet implemented?
- What is the controlled API?
- What accessibility pattern does this component implement?
- What tests prove it?

## Remediation Plan

### Phase 1: Add An API Contract Layer

Create a source-of-truth contract file, for example `src/components/contracts.ts`, with one entry per public component:

- Figma page ID
- Figma component-set IDs
- Public React component name
- Supported variant axes
- React prop mapping
- Product interaction status: `static`, `display`, `interactive`, `composite`, `app-owned-lifecycle`
- Required usage story IDs
- Required interaction tests
- Unsupported Figma features

Expose this in Storybook docs and MCP output.

### Phase 2: Block Presentational Components From Being Mistaken For Product Controls

Add a readiness script that fails when an interactive Figma component lacks product APIs.

Minimum checks:

- Date/time/select/filter/sort/input/menu/modal/tooltip/table components must declare interaction status.
- Interactive status requires at least one usage story.
- Controlled controls must expose `value` or equivalent state plus a callback.
- Preview-only state props must be documented as preview-only.
- Components that are app-owned lifecycle surfaces must explicitly say so.

### Phase 3: Fix DatePicker First

DatePicker should become a real product control:

- `value?: Date | DateRange | null`
- `defaultValue?: Date | DateRange | null`
- `onChange?: (value) => void`
- `visibleMonth?: Date`
- `defaultVisibleMonth?: Date`
- `onVisibleMonthChange?: (month: Date) => void`
- `minDate`, `maxDate`, `disabledDates`
- `showTime`, time value and callback if time is in scope
- `onClear`, `onClearAll`
- Accessible grid/day buttons
- Keyboard navigation
- Range hover/preview state
- Controlled usage story
- Interaction tests for single date, range date, disabled dates, month navigation, clear, keyboard selection

### Phase 4: Upgrade Other High-Risk Components

Priority order:

1. `DatePicker`
2. `Menu`
3. `Modal`
4. `Tooltip`
5. `Table`
6. `Snackbar` and `Toast`
7. `InputField`
8. `List`

For each, decide whether behavior lives inside the DS component or is explicitly app-owned. Either answer is acceptable if documented and tested.

### Phase 5: Add Figma-To-Storybook Parity Reports

Automate a report that compares:

- Figma component-set names
- Figma variant axes/options
- Figma boolean/text/instance-swap properties
- Storybook component props
- Storybook usage stories
- Exported token use
- Accessibility and interaction tests

This report should fail CI on new unmapped Figma source changes.

### Phase 6: Make Chromatic MCP Builder-Safe

Remote MCP should expose:

- Component docs
- Usage stories
- API contract status
- Unsupported features
- Figma source node/page IDs
- Token rules
- Icon export list
- "Do not use" guidance for presentational-only components

Local MCP should additionally expose:

- Story tests
- Story authoring instructions
- Preview story screenshots
- Accessibility/interaction checks

### Phase 7: Fill The Empty Developer API Page In Figma

The live Figma file already has `Developer API & Interaction Contracts` as a page, but it is empty. Populate it with:

- Public React API mapping per component
- Controlled/uncontrolled patterns
- App-owned lifecycle decisions
- Accessibility notes
- Unsupported/deferred behavior
- Links to Storybook stories

This will make the Figma file useful not only as visual source, but as builder source.

## Acceptance Criteria

The integration is production-grade only when:

- Every Figma component page maps to a Storybook component, documented exclusion, or pattern abstraction.
- Every public Storybook component has a Figma source mapping.
- Every interactive Figma component has a product interaction contract or an explicit app-owned boundary.
- Every controlled component has a usage story.
- Every usage story is discoverable through MCP.
- Every component's unsupported Figma capabilities are documented.
- Token variables are exported and verified against Figma collections.
- Icon exports are verified against the Figma icon source.
- Storybook tests cover interaction and accessibility, not just render presence.
- Chromatic MCP exposes enough context for agents to avoid both hallucinated props and unsafe fallbacks.

## Immediate Next Steps

1. Add the component contract registry and publish it through Storybook docs.
2. Add a `verify:component-contracts` script.
3. Mark DatePicker as `presentational` until fixed.
4. Implement DatePicker as a real controlled date/range input.
5. Add usage stories and MCP docs for DatePicker.
6. Repeat the contract upgrade for Menu, Modal, Tooltip, Table, Snackbar, Toast, InputField, and List.
7. Populate the Figma `Developer API & Interaction Contracts` page.
