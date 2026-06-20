# Flytbase Design System Storybook

Storybook documentation and MCP setup for the Flytbase / F Design System component library.

This repo lets teammates and AI agents discover the real design-system components, inspect documented props and stories, and build product UI without inventing component APIs.

## Quick Links

- GitHub: https://github.com/abhi-flyter/Flytbase-DS-Storybook
- Remote Storybook: https://main--6a370c8694b639efab312a0d.chromatic.com
- Remote MCP docs endpoint: https://main--6a370c8694b639efab312a0d.chromatic.com/mcp
- Local Storybook: http://localhost:6006
- Local MCP endpoint: http://localhost:6006/mcp

## What Is Included

- 31 public design-system components with Storybook stories and autodocs.
- Foundations / token documentation.
- Storybook MCP docs support for remote agent usage.
- Local Storybook MCP development and testing support.
- Agent instruction files:
  - `AGENTS.md`
  - `CLAUDE.md`
- Project MCP config:
  - `.mcp.json`
- Verification scripts for Phase 4 and Phase 5 readiness.

## Component Tiers

| Tier | Built components |
| --- | --- |
| Foundations | `Foundations/Tokens` |
| Tier 0 - Foundations | `Divider`, `ProgressIndicator` |
| Tier 1 - Core primitives | `Badge`, `CircularBadge`, `Button`, `IconButton`, `Checkbox`, `RadioButton`, `ToggleSwitch`, `Chip`, `Search`, `TextField`, `InputField` |
| Tier 2 - Composites | `Banner`, `ButtonGroup`, `SegmentedButton`, `ToggleButton`, `List`, `Menu`, `Modal`, `Tooltip`, `Tabs`, `Slider`, `Snackbar`, `Toast` |
| Tier 3 - Patterns | `DatePicker`, `FilterSortButton`, `FilterWidget`, `SortWidget`, `Table` |

We only build components that exist in the Figma design system scope. Generic guidebook examples such as `Avatar`, `Card`, or `Sidebar` are not added unless they exist as publishable Figma components.

## Install

```bash
npm install
```

## Run Storybook Locally

```bash
npm run storybook
```

Open:

```text
http://localhost:6006
```

Local MCP endpoint:

```text
http://localhost:6006/mcp
```

## Remote MCP For Teammates

Use the Chromatic permalink MCP endpoint when teammates only need shared documentation/context and do not want to run Storybook locally:

```text
https://main--6a370c8694b639efab312a0d.chromatic.com/mcp
```

Remote MCP exposes the docs toolset:

- `list-all-documentation`
- `get-documentation`
- `get-documentation-for-story`

This is enough for agents to discover components, inspect documented props, read examples, and avoid hallucinated APIs.

Remote MCP does not expose local development/testing tools such as:

- `preview-stories`
- `get-storybook-story-instructions`
- `run-story-tests`

Those are available through local Storybook MCP because they depend on the local dev/test runtime.

## Connect An Agent To Remote MCP

Use the server name:

```text
fb-design-system-sb-mcp
```

For agents that support CLI registration:

```bash
npx mcp-add --type http --url "https://main--6a370c8694b639efab312a0d.chromatic.com/mcp" --scope project
```

When prompted for a name, use:

```text
fb-design-system-sb-mcp
```

Claude Code example:

```bash
claude mcp add fb-design-system-sb-mcp --transport http https://main--6a370c8694b639efab312a0d.chromatic.com/mcp --scope project
```

## Connect An Agent To Local MCP

Use local MCP when you want the full development/testing loop:

```bash
npm run storybook
```

Then connect:

```bash
npx mcp-add --type http --url "http://localhost:6006/mcp" --scope project
```

Claude Code local example:

```bash
claude mcp add fb-design-system-sb-mcp --transport http http://localhost:6006/mcp --scope project
```

Agents that support project-level `.mcp.json` can use the checked-in local entry directly:

```json
{
  "mcpServers": {
    "fb-design-system-sb-mcp": {
      "type": "http",
      "url": "http://localhost:6006/mcp"
    }
  }
}
```

## Required Agent Behavior

The root `AGENTS.md` and `CLAUDE.md` files define the rules agents must follow:

- Always use `fb-design-system-sb-mcp` before selecting components or props.
- Never hallucinate component properties.
- Query `list-all-documentation` to discover available components.
- Query `get-documentation` before using a component prop.
- Query `get-documentation-for-story` when story-level evidence is needed.
- Use only props that are documented or shown in stories.
- Ask the user before using undocumented props.
- Run `run-story-tests` through local MCP when available, or run `npm run test-storybook`.

## Test The MCP Loop

After connecting your agent, ask:

```text
List all documented components from fb-design-system-sb-mcp.
```

Expected result:

- The agent calls `list-all-documentation`.
- It returns components like `Button`, `TextField`, `Table`, `Modal`, `Tabs`, and `Tooltip`.
- It does not guess from source files or invent component names.

Then ask:

```text
Before writing code, check the MCP docs for Button and tell me its documented props and examples.
```

Expected result:

- The agent calls `get-documentation`.
- It reports documented props and examples only.

## Build / Verification Commands

```bash
npm run typecheck
npm run build-storybook
npm run audit:phase4
npm run verify:storybook-static
npm run verify:phase4
npm run verify:phase5
npm run verify:phase5:live
npm run test-storybook
```

To verify a running local Storybook MCP endpoint:

```bash
npm run storybook
```

In a second terminal:

```bash
STORYBOOK_MCP_URL=http://127.0.0.1:6006/mcp npm run verify:phase5:live
```

## Publish To Chromatic

Chromatic hosts the shared Storybook and remote MCP docs endpoint.

Publish manually:

```bash
npx chromatic --project-token=<CHROMATIC_PROJECT_TOKEN>
```

The current public permalink is:

```text
https://main--6a370c8694b639efab312a0d.chromatic.com
```

Remote MCP permalink:

```text
https://main--6a370c8694b639efab312a0d.chromatic.com/mcp
```

Do not commit Chromatic project tokens. Pass them through local environment variables, CI secrets, or one-off CLI usage.

## Important Files

| File | Purpose |
| --- | --- |
| `.storybook/main.ts` | Storybook, docs, MCP, manifest, and Vitest addon setup. |
| `.storybook/preview.ts` | Token imports and Storybook preview parameters. |
| `.mcp.json` | Local MCP server config for compatible agents. |
| `AGENTS.md` | Agent-agnostic MCP rules. |
| `CLAUDE.md` | Claude-specific MCP rules. |
| `docs/phase-4/audit.md` | Phase 4 component coverage and Figma parity audit. |
| `docs/phase-5/storybook-mcp-readiness.md` | Phase 5 MCP readiness guide and verification notes. |
| `scripts/verify-phase-5-live.mjs` | MCP protocol verification for static and running-server modes. |
| `vitest.config.ts` | Storybook browser test project config. |

## Current Verification Snapshot

Latest verified state:

- Phase 4 verification passed.
- Phase 5 static verification passed.
- Remote MCP docs endpoint works at the Chromatic permalink.
- Local MCP exposes the full docs/development/testing toolset.
- `npm run test-storybook` passed with 32 test files and 65 tests.
