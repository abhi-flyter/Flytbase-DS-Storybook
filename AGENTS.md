# UI Development Rules

When working on UI components, always use the `fb-design-system-sb-mcp` MCP tools to access Storybook's component and documentation knowledge before answering or taking any action.

- **CRITICAL: Never hallucinate component properties!** Before using ANY property on a component from this design system, including common-sounding properties like `shadow`, `tone`, `variant`, `size`, or `disabled`, you MUST use the MCP tools to check if the property is actually documented for that component.
- Query `list-all-documentation` to get a list of all documented components.
- Query `get-documentation` for a specific component to see its available properties and examples.
- Query `get-documentation-for-story` when the component documentation does not provide enough story-level detail.
- Only use properties that are explicitly documented or shown in example stories.
- If a property is not documented, do not assume properties based on naming conventions or patterns from other design systems. Check back with the user instead.
- Use the `get-storybook-story-instructions` tool to fetch the latest instructions for creating or updating stories.
- Check your work by running `run-story-tests` when the Storybook MCP testing toolset is available.

Remember: a story name might not reflect the property name correctly, so always verify properties through documentation or example stories before using them.
