# F Design System 2.0 Copy Inventory

Source: Figma file `WRXdNp9M1SEjWPaUhU67pg` (`F Design System 2.0 Copy`)
Extraction date: 2026-06-20

This document inventories the local component library in the copied Figma file for Storybook and agentic product-development use. It is evidence-based: component names, variant axes, component counts, and token dependencies were extracted from the Figma file via Plugin API reads.

## Coverage Summary

- Local component/component-set entries found: **90**
- Component pages with local components: **24**
- Component pages with no local components found: **Illustrations**, **Loaders**
- Variable collections present in the copy:
  - `Color Styles`: 103 legacy color variables retained for source compatibility
  - `Spacing and Radius`: 19 legacy float variables retained for source compatibility
  - `Primitives`: 91 ported FB React raw color variables
  - `Color`: 72 ported FB React semantic color variables, all aliased to `Primitives`
  - `Spacing`: 18 ported FB React spacing/radius/size variables
  - `Typography`: 16 ported FB React typography variables

## Token Dependency Notes

Component bindings have been normalized away from the legacy local collections and unresolved remote `VariableID:*` bindings. The publishable local components now resolve through the local `fds` token layer:

- Raw color primitives: `Primitives/*`
- Semantic colors: `Color/fds/*`
- Space/radius/sizing: `Spacing/fds/*`
- Type values: `Typography/*`

Post-cleanup audit result: **24 component pages**, **90 component roots**, **0 legacy `Color Styles` / `Spacing and Radius` bindings**, and **0 unresolved remote variable bindings**.

## Phase 2 Token Export

Phase 2 token export checkpoint is complete. The normalized variables were exported from Figma into Storybook-ready CSS files:

| File | Purpose | Source collections |
| --- | --- | --- |
| `tokens/primitive.css` | Raw color values as CSS custom properties. | `Primitives` |
| `tokens/semantic-light.css` | Semantic color aliases, spacing values, radii, sizes, and typography values. | `Color`, `Spacing`, `Typography` |
| `tokens/semantic-dark.css` | Placeholder dark theme target. The source file has no dark-mode variable mode yet. | none |
| `tokens/index.css` | Single import surface for Storybook and React apps. | generated CSS files |
| `tokens/tokens.manifest.json` | Export counts, source metadata, and Storybook import hints. | export metadata |
| `scripts/export-tokens-from-figma.mjs` | Repeatable export script for the Figma Variables REST API. | Figma Variables API |

Storybook preview should import the token layer in this order:

```ts
// .storybook/preview.ts
import '../tokens/primitive.css';
import '../tokens/semantic-light.css';
import '../tokens/semantic-dark.css';
```

Export verification:

- `Primitives`: **139** CSS variables in `tokens/primitive.css`
- `Color`: **120** semantic variables in `tokens/semantic-light.css`
- `Spacing`: **39** variables in `tokens/semantic-light.css`
- `Typography`: **16** variables in `tokens/semantic-light.css`

Repeatable export command:

```bash
FIGMA_ACCESS_TOKEN=... node scripts/export-tokens-from-figma.mjs tokens
```

## Phase 4 Storybook Component Checkpoint

Phase 4 implementation is now represented in Storybook with one manifest-friendly story entry per public component. Each component follows the guidebook structure of:

- `src/components/<Component>/<Component>.tsx`
- `src/components/<Component>/<Component>.stories.tsx`
- `src/components/<Component>/index.ts`

Implemented Storybook manifest entries after the latest build:

| Tier | Storybook entries |
| --- | --- |
| Foundations | `Foundations/Tokens` |
| Tier 0 - Foundations | `Divider`, `ProgressIndicator` |
| Tier 1 - Core primitives | `Badge`, `CircularBadge`, `Button`, `IconButton`, `Checkbox`, `RadioButton`, `ToggleSwitch`, `Chip`, `Search`, `TextField`, `InputField` |
| Tier 2 - Composites | `Banner`, `ButtonGroup`, `SegmentedButton`, `ToggleButton`, `List`, `Menu`, `Modal`, `Tooltip`, `Tabs`, `Slider`, `Snackbar`, `Toast` |
| Tier 3 - Patterns | `DatePicker`, `FilterSortButton`, `FilterWidget`, `SortWidget`, `Table` |

Verification:

- `npm run typecheck` passes.
- `npm run build-storybook` passes on Storybook 10.4.6.
- `npm run audit:phase4` passes with 0 incomplete component gates.
- Generated `storybook-static/manifests/components.json` contains 31 entries.
- `@storybook/addon-docs` is installed so autodocs pages render component descriptions and prop tables.
- `src/components/docs.ts` provides Figma-inventory-based usage guidance for all 30 public component docs pages.
- `lucide-react` is installed and shared via `src/components/icons.tsx`; text placeholder glyphs in component internals have been replaced with React icons.
- `Checkbox` and `RadioButton` now render token-styled custom controls instead of relying on native browser visuals, while preserving real accessible inputs.
- `InputField` now renders a custom token-styled dropdown/autocomplete visual layer while preserving a hidden native select for accessibility and form semantics.
- Browser smoke checks passed for representative Button, Menu, Modal, FilterWidget, Table, DatePicker, and Button docs pages.

Remaining Phase 4 quality work before claiming exact Figma parity:

- Run side-by-side visual QA against the Figma component pages for every component once node-specific URLs or MCP page access are available.
- Confirm the coded Lucide icon source against the approved Figma icon set once component pages or icon assets are accessible.
- Pull component-page usage descriptions from Figma where the MCP/API exposes them and mirror them into Storybook docs. Current MCP metadata exposes the Welcome canvas only, and `figma.loadAllPagesAsync()` is not supported in this runtime.
- Tighten pixel-level spacing/state differences discovered during visual QA.

## Phase 1.3 Naming Contract

Phase 1.3 is complete for the migration plan. Use this naming contract when converting the Figma inventory into React components and Storybook stories.

| Item | Convention | Example |
| --- | --- | --- |
| React component names | PascalCase, consumer-facing name, no slashes. | `Button`, `IconButton`, `TextField`, `FilterSortButton` |
| Component folders | PascalCase matching the exported component. | `src/components/Button/Button.tsx` |
| Story titles | `Components/<ComponentName>` for public components; `Foundations/<Area>` for tokens. | `Components/Button` |
| Variant props | camelCase, stable semantic names. | `variant`, `size`, `state`, `selected`, `disabled` |
| Boolean props | `is*`, `has*`, or direct HTML-compatible prop when standard. | `isSelected`, `hasPrefix`, `disabled` |
| Token CSS variables | kebab-case with collection prefix. | `--color-fds-text-icon-01`, `--spacing-fds-size-200` |
| Internal Figma building blocks | Keep out of the public API unless coded as explicit subcomponents. | `ButtonSegment`, `TableCell`, `MenuItem` |

Resolved naming notes:

- Figma names with slashes become PascalCase exports: `Input field/Dropdown` -> `InputFieldDropdown`.
- Duplicate Figma names are disambiguated by page or role: the three `Slider` sets become `Slider`, `RangeSlider`, and `SliderTrack` during coding.
- Variant spelling should be normalized in code: Figma `Focussed` becomes code `focused`.
- The canonical implementation token namespace is `Color/fds/*`, `Spacing/fds/*`, and `Typography/*`; legacy `Color Styles/*` and `Spacing and Radius/*` are not used in new code.

## Phase 1.4 Component Tiers

Phase 1.4 is complete for initial Storybook migration planning. Code in tier order so lower-level components exist before composites and patterns consume them.

| Tier | Storybook goal | Components/pages |
| --- | --- | --- |
| Tier 0 - Foundations | Token docs and visual primitives. | Color, spacing, radius, typography from `tokens/*`; Dividers; Progress Indicator |
| Tier 1 - Core primitives | High-reuse controls and atoms that other components depend on. | Buttons, Badges, Checkbox, Radio Button, Toggle Switch, Chips, Searchbar, Text Field, Input Field |
| Tier 2 - Composites | Components composed from Tier 1 primitives. | Button Groups, Banners, List, Menu, Modals, Tooltips, Tabs, Slider, Snackbar and Toasts |
| Tier 3 - Patterns | Heavier product patterns and multi-part workflows. | Date Picker, Filter/Sort Button, Filter/Sort Widget, Table |
| Hold / non-code | No local publishable component target for this migration pass. | Illustrations, Loaders |

Recommended first coding sequence:

1. Foundations stories: token swatches, spacing scale, radius scale, typography specimens.
2. `Button` and `IconButton`.
3. Form primitives: `TextField`, `InputFieldDropdown`, `InputFieldAutocomplete`, `Checkbox`, `RadioButton`, `ToggleSwitch`.
4. Feedback/display atoms: `Badge`, `Chip`, `ProgressIndicator`, `Divider`, `Search`.
5. Composites: `Modal`, `Menu`, `Tooltip`, `Tabs`, `Snackbar`, `Toast`, `List`.
6. Patterns: `DatePicker`, `FilterSortWidget`, `Table`.

## Component Inventory

Legend:

- **Composite**: consumer-facing component or composed control.
- **Primitive**: low-level building block, slot, segment, divider, icon-like helper, internal control part, or documentation helper.
- **Tokens**: summarized canonical `fds` dependency families observed on the component after normalization.

### Buttons

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Button CTA` | 90 | `Type`: Primary, Secondary, Tertiary / Outline, Tonal, Text / Link button; `Size`: Default, Small, Large; `States`: Idle, Hover, Disabled, Pressed, Focused, Loader | Color/fds background, outline, primary, secondary, surface, text/icon; Spacing/fds size-50/100 |
| Composite | `Icon button` | 30 | `Type`: Default, Filled, Outline; `Size`: Default, Small; `State`: Idle, Hover, Pressed, Focused, Disabled | Color/fds background, outline, surface, text/icon; Spacing/fds size-0/50/100/200 |

### Badges

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Badges` | 14 | `Type`: Success, Error, Caution, Warning, Info, Secondary, Disabled; `Prefix`: No, Yes | Color/fds background, critical system, primary disabled, secondary, text/icon; Spacing/fds full/50/100/200 |
| Primitive | `Circular badge` | 2 | `Property 1`: dot, with value | Color/fds background, primary, text/icon; Spacing/fds size-50/150 |

### Banners

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Banner` | 8 | `Title`: Yes, No; `Tone`: Warning, Info, Caution, Error | Color/fds critical system, outline, primary, text/icon; Spacing/fds size-0/100/200/400 |

### Button Groups

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Segmented button` | 4 | `Segments`: 2, 3, 4, 5 | Color/fds background, outline, surface selected/surface, text/icon; Spacing/fds size-0/100/200 |
| Composite | `Toggle button` | 4 | `Segments`: 4, 3, 2, 5 | Color/fds background, outline, surface selected, text/icon; Spacing/fds full/50/300 |
| Primitive | `Start Segmented Button` | 7 | `Selected`: Yes, No; `State`: Default, Hover, Pressed, Disabled, Focused | Color/fds background, outline, surface states, text/icon; Spacing/fds size-0/100/200 |
| Primitive | `Center Segmented Button` | 7 | `Selected`: No, Yes; `State`: Default, Hover, Pressed, Disabled, Focused | Color/fds background, outline, surface states, text/icon; Spacing/fds size-0/100 |
| Primitive | `End Segmented Button` | 7 | `Selected`: No, Yes; `State`: Default, Hover, Pressed, Disabled, Focused | Color/fds background, outline, surface states, text/icon; Spacing/fds size-0/100/200 |
| Primitive | `Building block for toggle button` | 7 | `State`: Default, Hover, Pressed, Disabled, Focused; `Selected`: Yes, No | Color/fds background, surface states, text/icon; Spacing/fds full/50/300 |
| Composite | `Button group` | 3 | `Padding`: Default, Tight, Loose | Color/fds outline, primary, surface, text/icon; Spacing/fds size-100/200/300 |

### Checkbox

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Checkbox` | 30 | `Type`: Unselected, Indeterminate, Selected; `Bounding box`: 16px, 20px; `State`: Default, Hover, Pressed, Focussed, Disabled | Color/fds background, primary states/default, text/icon; Spacing/fds size-100 |

### Chips

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Input chip` | 24 | `Size`: Small, Medium, Large; `State`: Default, Hover, Pressed, Focused; `Selected`: No, Yes | Color/fds outline, secondary states, surface states, text/icon; Spacing/fds size-50/200/300 |
| Composite | `Choice chips` | 10 | `State`: Default, Hover, Pressed, Focused, Disabled; `Selected`: Yes, No | Color/fds background, outline, secondary/surface states, text/icon; Spacing/fds size-50/200/300 |
| Primitive | `Prefix` | 2 | `Type`: Avatars, Monogram | Color/fds background, text/icon |
| Primitive | `Prefix settings` | 2 | `Type`: Icon, Avatar | Color/fds background, text/icon |
| Primitive | `Prefix settings` | 2 | `Prefix`: Icon, Label | Color/fds text/icon |
| Composite | `Filter chip` | 20 | `Selection type`: Single select, Multi select; `Selected`: Yes, No; `State`: Default, Hover, Pressed, Focused, Disabled | Color/fds outline, secondary/surface states, text/icon; Spacing/fds size-0/50/200/300 |

### Date Picker

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Date picker` | 2 | `Property 1`: Single date picker, Range date picker | Color/fds background, outline, primary, secondary, text/icon; Spacing/fds size-0/50/100/150/200 |
| Primitive | `Day` | 6 | `state`: rest, active, hover, disabled, blank, Today | Color/fds primary, secondary, text/icon |
| Primitive | `Day` | 11 | `state`: rest, active, hover, disabled, blank, Today; `day of range`: first, middle, last, First and last | Color/fds primary, secondary, text/icon |
| Primitive | `Day of week` | 1 | `Property 1`: Default | Color/fds text/icon |
| Primitive | `Month` | 2 | `Property 1`: Month, Month range | Color/fds primary, secondary, text/icon |
| Primitive | `Year selection` | 3 | `Property 1`: Default, Hover, pressed | Color/fds background, critical info, outline, primary, surface, text/icon; Spacing/fds full/0/50/150/200/300/400 |
| Primitive | `Time selection` | 1 | `Property 1`: pressed | Color/fds background, critical info, outline, primary, text/icon; Spacing/fds full/0/50/150/200/300/400 |
| Primitive | `Time` | 2 | `Time`: No, Yes | Color/fds outline, primary, surface, text/icon; Spacing/fds size-0/50/100/150/200 |

### Dividers

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Primitive | `Horizontal/Full-width` | 1 | none | Color/fds outline |
| Primitive | `Horizontal/Middle-inset` | 1 | none | Color/fds outline |
| Primitive | `Vertical/Middle-inset` | 1 | none | Color/fds outline |
| Primitive | `Vertical/Full-width` | 1 | none | Color/fds outline |

### Filter And Sort

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Filter/Sort button` | 16 | `State`: Idle, Hover, Pressed, Focussed; `Selected`: No, Yes; `activeFilter/Sort`: No, Yes | Color/fds outline, secondary, surface, text/icon; Spacing/fds size-0/200/300 |
| Composite | `Filter/Sort button` | 8 | `State`: Idle, Hover, Pressed, Focussed; `Selected`: No, Yes | Color/fds background, outline, secondary, surface, text/icon; Spacing/fds size-0/200/300 |
| Primitive | `Active` | 2 | `For`: activeFilter, activeSort | Color/fds secondary, text/icon |
| Primitive | `sort for table` | 3 | `State`: Default, Newest, Oldest | Color/fds text/icon disabled |
| Composite | `Filter widget` | 3 | `Type`: Default, 1/few selected, All selected | Color/fds background, critical info, outline, primary, text/icon; Spacing/fds full/0/50/100/150/200/400 |
| Composite | `Sort widget` | 2 | `Type`: Default, Custom | Color/fds background, critical info, outline, primary, text/icon; Spacing/fds full/0/50/100/150/200/300/400 |
| Primitive | `Header with Search` | 1 | `Property 1`: Title | Color/fds outline, text/icon; Spacing/fds size-400 |

### Input Field

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Input field/Auto complete` | 24 | `State`: Default, Hover, Pressed, Focussed, Disabled, Open; `Input`: Single, Multiple; `Active`: No, Yes | Color/fds background, critical info, outline, primary, surface, text/icon; Spacing/fds full/0/50/100/150/200/300/400 |
| Composite | `Input field/Dropdown` | 24 | `State`: Default, Hover, Pressed, Focussed, Disabled, Open; `Selection`: Single, Multiple; `Active`: No, Yes | Color/fds background, critical info, outline, primary, surface, text/icon; Spacing/fds full/0/50/100/150/200/300/400 |

### List

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `List` | 15 | `States`: Default, Hover, Pressed, Focused, Disabled; `Size`: Default, Small; `Expand`: False, True | Color/fds background, critical info, primary disabled, surface states, text/icon; Spacing/fds full/50/100/200/400 |

### Menu

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Primitive | `Suffix icon` | 2 | `Suffix`: Selection, Shortcut key | Color/fds text/icon |
| Primitive | `Prefix` | 2 | `Prefix`: Icon, Slot | Color/fds outline, text/icon; Spacing/fds size-200 |
| Primitive | `Footer` | 2 | `Type`: CTAs, Select all | Color/fds critical info, outline, primary, text/icon; Spacing/fds full/50/100/150/200/300/400 |
| Primitive | `Final Building block- Menu` | 28 | `Content`: Action, Divider, Sub-title; `Type`: Dropdown, Menu; `Selection`: Single, Multiple; `State`: Default, Hover, Pressed, Disabled, Focussed; `Selected`: No, Yes; `Destructive`: No, Yes | Color/fds critical error/info, outline, primary, surface, text/icon; Spacing/fds full/50/100/150/200 |
| Composite | `Dropdown Menu` | 3 | `Selection type`: Single select, Multi select, Action | Color/fds background, critical info, outline, primary, text/icon; Spacing/fds full/0/50/100/150/200/300/400 |
| Primitive | `Slot 20x20` | 1 | none | Color/fds outline, text/icon; Spacing/fds size-200 |
| Primitive | `Supporting badge/icon` | 1 | none | Color/fds critical info, text/icon; Spacing/fds full/50/200 |

### Modals

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Modal` | 3 | `Size`: Small, Medium, Large | Color/fds background, outline, primary, surface, text/icon; Spacing/fds size-0/50/100/200/300 |
| Primitive | `Slot` | 1 | none | Color/fds background, text/icon; Spacing/fds size-200 |
| Primitive | `Title bar` | 1 | none | Color/fds text/icon; Spacing/fds size-0/50/200 |
| Primitive | `Footer` | 1 | none | Color/fds outline, primary, surface, text/icon; Spacing/fds size-100 |
| Primitive | `Body` | 1 | none | Color/fds background, text/icon; Spacing/fds size-0/200/300 |

### Progress Indicator

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Linear bar progress` | 3 | `Property 1`: Default, 50%, 100% | Color/fds background, primary, surface, text/icon; Spacing/fds full/50/100/600 |
| Composite | `Circular progress indicator` | 4 | `Property 1`: 100%, 75%, 50%, 5% | Color/fds background, primary, surface, text/icon; Spacing/fds size-50 |

### Radio Button

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Radio button` | 20 | `Selected`: No, Yes; `Bounding box`: 16px, 20px; `State`: Default, Hover, Pressed, Focussed, Disabled | Color/fds background, primary, text/icon; Spacing/fds full |

### Searchbar

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Primitive | `Text blinker` | 2 | `State`: 2, 1 | Color/fds text/icon |
| Primitive | `text` | 2 | `Text`: Placeholder, Value | Color/fds text/icon |
| Composite | `Search` | 10 | `Size`: Medium-32px, Small-28px; `State`: Default, Hover, Pressed, Focussed, Active | Color/fds background, outline, primary, surface, text/icon; Spacing/fds size-0/100/150/200 |

### Slider

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Slider` | 4 | `Sliders`: 1, 2; `Type`: Active, Disabled | Color/fds background, map neutral, primary, text/icon; Spacing/fds size-0/50 |
| Composite | `Slider` | 4 | `Sliders`: 1, 2; `Type`: Active, Disabled | Color/fds background, primary disabled, text/icon; Spacing/fds size-0/50 |
| Primitive | `Slider` | 2 | `Property 1`: Default, Variant2 | Color/fds background, text/icon; Spacing/fds size-0/50 |

### Snackbar And Toasts

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Snackbar- Notifications` | 4 | `Type`: Success, Error, Caution, Info | Color/fds background, critical system, outline, primary, text/icon; Spacing/fds size-50/200 |
| Composite | `Toasts- Notifications` | 3 | `Type`: Success, Error, Info | Color/fds background, critical system, outline, text/icon; Spacing/fds size-200/300 |
| Primitive | `new notifs` | 3 | `Property 1`: Frame 427320427, Frame 427320429, Variant4 | Color/fds primary, text/icon |
| Primitive | `Component header for explanation` | 1 | none | No legacy or remote bindings |
| Primitive | `Variant detail` | 1 | none | No bound variables found |

### Table

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Primitive | `Block type` | 7 | `Type`: Text, Amount, Date, Tags, Actions, Button, Toggle | Color/fds outline, primary, secondary, text/icon; Spacing/fds full/0/50/100/200 |
| Primitive | `Hover with Divider` | 2 | `Property 1`: Default, Hover | Color/fds outline, surface |
| Composite | `Table` | 1 | `Property 1`: Variant2 | Color/fds background, outline, primary, surface, text/icon; Spacing/fds size-0/100/150/200/300 |
| Primitive | `Table header` | 2 | `Selection`: No, Yes | Color/fds outline, primary, surface, text/icon; Spacing/fds size-0/100/150/200/300 |
| Primitive | `Column Title` | 1 | none | Color/fds text/icon |
| Primitive | `Table body` | 1 | none | Color/fds text/icon; Spacing/fds size-0/100/200 |
| Primitive | `Column` | 1 | none | Color/fds text/icon |
| Primitive | `Selection` | 1 | none | Color/fds text/icon; Spacing/fds size-100 |
| Primitive | `List divider` | 1 | none | Color/fds outline |
| Primitive | `Pagination` | 1 | none | Color/fds text/icon; Spacing/fds size-0/100/200 |

### Tabs

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Tabs` | 14 | `No. of tabs`: 2, 3, 4, 5; `Selected tab`: 1, 2, 3, 4, 5 | Color/fds outline, primary, text/icon; Spacing/fds size-100/200/300/400 |
| Primitive | `Building blocks` | 7 | `States`: Default, Hover, Pressed, Focused, Disabled; `Selected`: Yes, No | Color/fds outline, primary, surface, text/icon; Spacing/fds size-100/200/400 |

### Toggle Switch

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Toggle switch` | 12 | `State`: Default, Hover, Pressed, Focussed, Disabled, Loader; `Selected`: No, Yes | Color/fds background, outline, primary, surface, text/icon; Spacing/fds full/0/50 |

### Text Field

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Primitive | `Suffix field` | 2 | `Type`: Icon, Counter | Color/fds text/icon |
| Primitive | `Prefix field` | 2 | `Type`: Icon, Asset | Color/fds text/icon; Spacing/fds size-50 |
| Primitive | `Header style` | 2 | `Style`: Mandatory, Optional | Color/fds text/icon |
| Composite | `Text Field outline` | 8 | `State`: Default, Hover, Pressed, Focussed, Disabled, Error, Active, Description box | Color/fds critical error, outline, primary, surface, text/icon; Spacing/fds size-0/50/100/150/200 |
| Primitive | `Header` | 3 | `Type`: Default, Optional, Mandatory | Color/fds primary, text/icon; Spacing/fds size-0/50 |
| Composite | `Number text field` | 2 | `Type`: Icon progression, Number progression | Color/fds outline, primary, surface, text/icon; Spacing/fds size-0/50/100/150/200 |
| Primitive | `Clickables - Number` | 5 | `State`: Default, Hover, Pressed, Focused, Disabled | Color/fds outline, surface, text/icon; Spacing/fds size-0 |
| Primitive | `Phone prefix` | 1 | none | Color/fds text/icon |

### Tooltips

| Type | Component | Variants | Variant properties | Token dependencies |
| --- | --- | ---: | --- | --- |
| Composite | `Tooltip` | 16 | `Type`: Plain tooltip, Rich tooltip; `Placement`: Top, Top start, Top end, Right bottom, Right top, Left bottom, Left top, Bottom, Bottom start, Bottom end | Color/fds background, primary, text/icon; Spacing/fds size-50/100/200/300 |
| Primitive | `Arrow` | 1 | `Property 1`: Default | Color/fds background |

## Pages With No Local Components

- `Illustrations`: no local component/component-set nodes found.
- `Loaders`: no local component/component-set nodes found.

These pages may contain instances, documentation, or artwork, but they did not expose publishable local components in the file scan.

## Dependency Resolution

The cleanup pass resolved the legacy and remote binding patterns that were present in the initial inventory:

- Legacy `Color Styles/*` and `Spacing and Radius/*` bindings were rebound to local `Color/fds/*` and `Spacing/fds/*` variables.
- Previously unresolved `VariableID:*` bindings were mapped to local `fds` variables using the existing component values.
- Documentation/helper components, including `Component header for explanation`, now audit cleanly.
- `Variant detail` still has no bound variables, which is expected for that helper component.

Recommended follow-up for Storybook:

1. Use `Color/fds/*`, `Spacing/fds/*`, and `Typography/*` as the canonical token namespaces in generated docs.
2. Treat `Color Styles` and `Spacing and Radius` as retained legacy collections, not the preferred implementation surface.
3. When adding new components, bind directly to `Color/fds/*` and `Spacing/fds/*`.

## Verification

The component inventory above covers every local component/component-set found in the Figma page scan:

- Expected entries from Figma extraction: **90**
- Entries inventoried in this document: **90**
- Missing component pages from scan: **0**
- Pages explicitly logged with zero local components: **Illustrations**, **Loaders**
