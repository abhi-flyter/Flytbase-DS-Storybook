# UI Development Rules

When working on UI components, always use the `fb-design-system-sb-mcp` MCP tools to access Storybook's component and documentation knowledge before answering or taking any action.

- **CRITICAL: Never hallucinate component properties!** Before using ANY property on a component from this design system, including common-sounding properties like `shadow`, `tone`, `variant`, `size`, or `disabled`, you MUST use the MCP tools to check if the property is actually documented for that component.
- Query `list-all-documentation` to get a list of all documented components.
- Query `get-documentation` for a specific component to see its available properties and examples.
- Query `get-documentation-for-story` when the component documentation does not provide enough story-level detail.
- Only use properties that are explicitly documented or shown in example stories.
- For design tokens, query `get-documentation` for `foundations-tokens` before writing page-level CSS, layout backgrounds, text colors, borders, spacing, radius, or typography.
- Always import `@flytbase/design-system/style.css` once in the app root before using components or token variables. If only tokens are needed, import `@flytbase/design-system/tokens.css`.
- This design system is dark-only for now. Do not create light-mode surfaces, white app backgrounds, or alternate light token values unless the user explicitly asks for a separate product experiment.
- Use token names exactly as documented. Prefer the FDS namespace for product UI: `--color-fds-*` for colors, `--spacing-fds-*` for spacing/radius, and `--typography-*` for type.
- **CRITICAL: Never invent token aliases.** Do not use guessed names like `--fds-color-surface`, `--fds-color-text-primary`, `--fds-color-border`, or `--fds-color-primary`; those variables are not exported by this package.
- For app/page backgrounds use `--color-fds-background-bg`; for primary text/icons use `--color-fds-text-icon-01`; for secondary text/icons use `--color-fds-text-icon-02`; for primary borders use `--color-fds-outline-o-primary`; for neutral interactive surfaces use `--color-fds-surface-states-surface`; for primary actions use `--color-fds-primary-200-p`.
- For icons, use only icons exported by the package documentation/source. Do not invent icon keys such as `icons.menu` or `icons.bell` unless they are explicitly exported.
- For interactive product screens, prefer the documented interaction APIs shown in Storybook usage stories, such as `value`/`onChange`, `selection`/`onSelectionChange`, `selected`/`onSelectedChange`, `values`/`onChange`, `order`/`onOrderChange`, and `selectedRowIds`/`onRowSelectionChange`.
- If a property is not documented, do not assume properties based on naming conventions or patterns from other design systems. Check back with the user instead.
- Use the `get-storybook-story-instructions` tool to fetch the latest instructions for creating or updating stories.
- Check your work by running `run-story-tests` when the Storybook MCP testing toolset is available.

Remember: a story name might not reflect the property name correctly, so always verify properties through documentation or example stories before using them.
