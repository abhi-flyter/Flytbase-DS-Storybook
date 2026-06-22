#!/usr/bin/env node

import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { basename, relative, resolve, sep } from 'node:path';
import { transform } from '@svgr/core';

const svgRoot = resolve(process.cwd(), 'src/icons/svg');
const generatedDir = resolve(process.cwd(), 'src/icons/generated');
const indexFile = resolve(process.cwd(), 'src/icons/index.tsx');

function pascalCase(value) {
  const name = value
    .replace(/\.svg$/i, '')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('');
  return /^[0-9]/.test(name) ? `Svg${name}` : name;
}

async function listSvgFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listSvgFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.svg')) {
      files.push(fullPath);
    }
  }
  return files.sort((a, b) => a.localeCompare(b));
}

function normalizeMonochromeSvg(svg) {
  return svg
    .replace(/\sfill="(?:white|#fff|#ffffff)"/gi, ' fill="currentColor"')
    .replace(/\sstroke="(?:white|#fff|#ffffff)"/gi, ' stroke="currentColor"');
}

function stripDefaultExport(code, componentName) {
  let source = code
    .replace(/import\s+type\s+\{\s*SVGProps\s*\}\s+from\s+['"]react['"];?\n?/, '')
    .replace(/import\s+\*\s+as\s+React\s+from\s+['"]react['"];?\n?/, '')
    .replace(new RegExp(`const ${componentName} = \\(props: SVGProps<SVGSVGElement>\\) =>`, 'm'), `export function ${componentName}({ size = 24, color = 'currentColor', title, ...props }: IconProps) {\n  return`)
    .replace(/;\s*export default [A-Za-z0-9_]+;\s*$/m, '\n}')
    .replace(/\{...props\}/, "color={color} role={title ? 'img' : props.role} aria-hidden={title ? undefined : (props['aria-hidden'] ?? true)} {...props}")
  if (/<svg\b[^>]*\/>/.test(source)) {
    source = source.replace(/<svg\b([^>]*)\/>/, "<svg$1>{title ? <title>{title}</title> : null}</svg>");
  } else {
    source = source.replace(/(<svg\b[^>]*>)/, "$1{title ? <title>{title}</title> : null}");
  }
  return source;
}

const files = await listSvgFiles(svgRoot);
const seenNames = new Map();
const components = [];

await rm(generatedDir, { recursive: true, force: true });
await mkdir(generatedDir, { recursive: true });

for (const file of files) {
  const fileName = basename(file);
  const initialName = pascalCase(fileName);
  const count = seenNames.get(initialName) || 0;
  seenNames.set(initialName, count + 1);
  const componentName = count === 0 ? initialName : `${initialName}${count + 1}`;
  const svg = normalizeMonochromeSvg(await readFile(file, 'utf8'));
  const transformed = await transform(
    svg,
    {
      plugins: ['@svgr/plugin-jsx'],
      typescript: true,
      jsxRuntime: 'automatic',
      dimensions: false,
      expandProps: 'end',
      svgProps: {
        width: '{size}',
        height: '{size}',
      },
    },
    { componentName },
  );

  const componentSource = [
    '/* Generated from Figma SVG by scripts/generate-icon-components.mjs. */',
    "import type { IconProps } from '../index';",
    '',
    stripDefaultExport(transformed, componentName),
    '',
  ].join('\n');

  await writeFile(resolve(generatedDir, `${componentName}.tsx`), componentSource);
  components.push({
    componentName,
    fileName,
    relativeSvgPath: relative(svgRoot, file).split(sep).join('/'),
  });
}

const indexLines = [
  '/* Generated from src/icons/svg by scripts/generate-icon-components.mjs. */',
  "import type { SVGProps } from 'react';",
  '',
  'export type IconSize = number | string;',
  '',
  'export type IconProps = Omit<SVGProps<SVGSVGElement>, "color"> & {',
  '  size?: IconSize;',
  '  color?: string;',
  '  title?: string;',
  '};',
  '',
];

for (const component of components) {
  indexLines.push(`export { ${component.componentName} } from './generated/${component.componentName}';`);
}

indexLines.push('');
indexLines.push('import {');
for (const component of components) {
  indexLines.push(`  ${component.componentName},`);
}
indexLines.push("} from './generated';");
indexLines.push('');
indexLines.push('export const iconComponents = {');
for (const component of components) {
  indexLines.push(`  ${component.componentName},`);
}
indexLines.push('} as const;');
indexLines.push('');
indexLines.push('export type IconComponentName = keyof typeof iconComponents;');

const generatedIndexLines = ['/* Generated from src/icons/svg by scripts/generate-icon-components.mjs. */'];
for (const component of components) {
  generatedIndexLines.push(`export { ${component.componentName} } from './${component.componentName}';`);
}

await writeFile(resolve(generatedDir, 'index.ts'), `${generatedIndexLines.join('\n')}\n`);
await writeFile(indexFile, `${indexLines.join('\n')}\n`);

console.log(`Generated ${components.length} React icon components in ${generatedDir}`);
