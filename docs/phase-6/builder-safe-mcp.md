# Phase 6 Builder-Safe MCP

Phase 6 makes the Storybook and Chromatic MCP integration safe for builders who do not have local source context.

## Implemented

- Added `Foundations/Builder Safety` as an MCP-visible Storybook docs entry.
- Story ID: `foundations-builder-safety--remote-and-local-mcp-contract`.
- Remote MCP guidance now exposes component docs, usage story IDs, API contract status, unsupported features, Figma source node/page IDs, token rules, icon export rules, and do-not-use guidance for partial or presentational-only components.
- Local MCP guidance now distinguishes the development-only tools: `get-storybook-story-instructions`, `run-story-tests`, `preview-stories`, accessibility checks, and interaction checks.
- Added `npm run verify:phase6`, which verifies the MCP payload using the Storybook MCP handler.
- `verify:phase6` checks `foundations-builder-safety`, `foundations-component-contracts`, `foundations-tokens`, `foundations-icons`, `components-datepicker`, and `components-table`.
- `verify:phase6` checks that DatePicker usage docs expose functional product APIs such as `onChange`, `onVisibleMonthChange`, and `disabledDates`.
- `verify:phase6` also checks the Phase 5 parity report is present and has zero hard failures.

## Remote MCP Contract

Remote Chromatic MCP is for shared documentation and API context. It must expose:

- `list-all-documentation`
- `get-documentation`
- `get-documentation-for-story`
- component docs
- usage stories
- API contract status
- unsupported features
- Figma source node/page IDs
- token rules
- icon export list
- do-not-use guidance for partial or presentational-only components

## Local MCP Contract

Local Storybook MCP additionally supports builder verification:

- `preview-stories`
- `get-storybook-story-instructions`
- `run-story-tests`
- preview story screenshots
- accessibility and interaction checks through the local Storybook test toolset

## Verification

```bash
npm run build-storybook
npm run verify:phase6
STORYBOOK_MCP_URL=http://127.0.0.1:6006/mcp npm run verify:phase6
```

The first command regenerates the static Storybook manifest. The second command proves the static MCP documentation payload is builder-safe. The third command is optional and verifies a running local Storybook MCP server exposes the development-only toolset.
