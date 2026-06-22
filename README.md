# Flytbase Design System

React components, Figma-derived tokens/icons, Storybook documentation, MCP access, and Chromatic publishing for the F Design System.

## Links

- Storybook: https://main--6a370c8694b639efab312a0d.chromatic.com
- Remote MCP: https://main--6a370c8694b639efab312a0d.chromatic.com/mcp

## Local Setup

```bash
npm install
npm run storybook
```

- Storybook: `http://localhost:6006`
- Local MCP: `http://localhost:6006/mcp`

## Use The Package

```bash
npm install github:abhi-flyter/Flytbase-DS-Storybook
```

Import the stylesheet once in the app root:

```tsx
import '@flytbase/design-system/style.css';
```

For tokens only:

```tsx
import '@flytbase/design-system/tokens.css';
```

Use only documented component props, token names, and icon exports from Storybook. This design system is dark-only for now.

## Token Usage Rules

Use documented FDS token names exactly. Prefer:

- Colors: `--color-fds-*`, for example `--color-fds-background-bg`.
- Spacing/radius: `--spacing-fds-*`.
- Type: `--typography-*`.

Do not invent aliases such as `--fds-color-surface`.

## Agent MCP

Use this MCP server name:

```text
fb-design-system-sb-mcp
```

Remote docs-only MCP:

```bash
npx mcp-add --type http --url "https://main--6a370c8694b639efab312a0d.chromatic.com/mcp" --client-id "cdf3737dff9d485485968e50b63fd8b4" --scope project
```

Local development/testing MCP:

```bash
npx mcp-add --type http --url "http://localhost:6006/mcp" --scope project
```

Agents must read Storybook MCP documentation before using components or tokens. Start with `list-all-documentation`, then use `get-documentation`; query `foundations-tokens` before writing token-based CSS.

## Verify

Run the full local gate before pushing:

```bash
npm run typecheck
npm run build:lib
npm run build-storybook
npm run verify:tokens
npm run verify:icons
npm run verify:foundations
npm run verify:storybook-static
npm run verify:phase4
npm run verify:phase5
npm run test-storybook
```

With local Storybook running, verify MCP and live story smoke:

```bash
STORYBOOK_MCP_URL=http://127.0.0.1:6006/mcp npm run verify:phase5:live
STORYBOOK_URL=http://127.0.0.1:6006 APP_URL=http://127.0.0.1:6006 node scripts/smoke-component-parity.mjs
```


- Agent rules: `AGENTS.md` and `CLAUDE.md`
- Icon source of truth: `docs/icons-source-of-truth.md`
- Storybook MCP readiness: `docs/phase-5/storybook-mcp-readiness.md`
- Figma parity audit: `docs/phase-4/audit.md`
