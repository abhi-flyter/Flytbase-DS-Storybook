# Flytbase Design System

React components, Figma-derived tokens, Storybook documentation, and MCP setup for the Flytbase / F Design System.

## Links

- Storybook: https://main--6a370c8694b639efab312a0d.chromatic.com
- Remote MCP: https://main--6a370c8694b639efab312a0d.chromatic.com/mcp

## Setup

```bash
npm install
npm run build
npm run storybook
```

Local Storybook runs at:

```text
http://localhost:6006
```

Local MCP endpoint:

```text
http://localhost:6006/mcp
```

## Figma Token Sync

This repo treats `F Design System 2.0 Copy` as the v1 Figma source:

```text
WRXdNp9M1SEjWPaUhU67pg
```

Create a local `.env.local` file:

```env
FIGMA_FILE_KEY=WRXdNp9M1SEjWPaUhU67pg
FIGMA_FILE_NAME="F Design System 2.0 Copy"
FIGMA_ACCESS_TOKEN=your_figma_token_here
```

Then run:

```bash
npm run tokens:check
npm run tokens:sync
```

`tokens:check` verifies committed token files match Figma. `tokens:sync` updates `tokens/*.css` and `tokens/tokens.manifest.json` from Figma.

For GitHub Actions, add one repository secret:

```text
FIGMA_ACCESS_TOKEN
```

GitHub path: repo `Settings` -> `Secrets and variables` -> `Actions` -> `New repository secret`.

## Agent MCP Setup

Use this MCP server name:

```text
fb-design-system-sb-mcp
```

For shared docs access without running Storybook locally:

```bash
npx mcp-add --type http --url "https://main--6a370c8694b639efab312a0d.chromatic.com/mcp" --client-id "cdf3737dff9d485485968e50b63fd8b4" --scope project
```

If `mcp-add` asks where to install the server, choose your actual coding agent, for example Claude Code, Cursor, or VS Code. Use `fb-design-system-sb-mcp` as the server name.

For local development/testing tools:

```bash
npx mcp-add --type http --url "http://localhost:6006/mcp" --scope project
```

Claude Code example:

```bash
claude mcp add fb-design-system-sb-mcp --transport http https://main--6a370c8694b639efab312a0d.chromatic.com/mcp --scope project
```

The remote MCP exposes documentation tools. The local MCP also exposes development/testing tools such as story preview and story tests.

## Use In A Flink Project

Install the design system package from GitHub:

```bash
npm install github:abhi-flyter/Flytbase-DS-Storybook
```

Import the stylesheet once in your app root:

```tsx
import '@flytbase/design-system/style.css';
```

Use documented components in product code:

```tsx
import { Button, InputField, Slider, Table, Tabs, TextField } from '@flytbase/design-system';

export function SettingsPanel() {
  return (
    <section>
      <TextField label="Profile name" value="Return-to-dock policy" readOnly />
      <InputField label="Primary drone" active value="Mavic 3 Enterprise" />
      <Slider label="Return altitude" unit="m" value={60} />
      <Button>Save changes</Button>
    </section>
  );
}
```

Pair this package with the MCP server in the same Flink repo:

```bash
claude mcp add fb-design-system-sb-mcp --transport http https://main--6a370c8694b639efab312a0d.chromatic.com/mcp --scope project
```

The package gives the project real React components. The MCP gives agents the Storybook documentation they must read before using those components.

## Agent Rules

Agents should follow `AGENTS.md` or `CLAUDE.md`:

- Query Storybook MCP before choosing components or props.
- Never invent component props.
- Use `list-all-documentation`, then `get-documentation`.
- Use only documented props or examples from stories.
- Ask before using undocumented APIs.

## Verify

```bash
npm run build
npm run typecheck
npm run build-storybook
npm run verify:phase4
npm run verify:phase5
npm run verify:phase5:live
npm run test-storybook
```

To verify a running local MCP server:

```bash
STORYBOOK_MCP_URL=http://127.0.0.1:6006/mcp npm run verify:phase5:live
```

## Publish

```bash
npx chromatic --project-token=<CHROMATIC_PROJECT_TOKEN>
```

Do not commit Chromatic tokens. Use local env vars, CI secrets, or one-off CLI usage.

## More Detail

- Component/Figma audit: `docs/phase-4/audit.md`
- MCP readiness notes: `docs/phase-5/storybook-mcp-readiness.md`
- Storybook config: `.storybook/main.ts`
- MCP config: `.mcp.json`
