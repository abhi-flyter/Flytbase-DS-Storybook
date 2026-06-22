# Icon Source Of Truth

Icons are built into the package from Figma-exported SVG files. Storybook documents the generated React components under `Foundations/Icons`.

## Figma Sources

- Base icons: Figma file `WRXdNp9M1SEjWPaUhU67pg`, grid node `25:3361`, exported to `src/icons/svg/`.
- Marker and flinks components: Figma file `WRXdNp9M1SEjWPaUhU67pg`, exact frame node `25:4146`, exported to `src/icons/svg/markers-and-flinks/`.
- Export manifests are committed at `src/icons/svg/manifest.json` and `src/icons/svg/markers-and-flinks/manifest.json`.

## Refresh Commands

Set `FIGMA_ACCESS_TOKEN` in `.env.local` before pulling from Figma. The token needs `file_content:read` for reading file nodes and rendering SVG image exports.

```bash
npm run icons:export
npm run icons:export:markers
npm run icons:generate
```

Or run the full pipeline:

```bash
npm run icons:refresh
```

## Generated Code

- SVG files stay in `src/icons/svg/`.
- React icon components are generated into `src/icons/generated/`.
- The public icon barrel is `src/icons/index.tsx`.
- The package root exports icons through `src/index.ts`.
- Each generated icon accepts `size`, `color`, `title`, and standard SVG props.

Component-level icon usage should go through `src/components/icons.tsx` when a stable semantic alias is needed, such as `icons.search` or `icons.x`. New aliases must point at generated Figma icon components.

## Verification

```bash
npm run verify:icons
npm run verify:foundations
npm run build-storybook
npm run verify:storybook-static
```

`npm run verify:icons` checks the SVG manifests, generated component count, marker component-set coverage, root exports, `IconButton` contract, Storybook icon stories, and removal of `lucide-react`.
