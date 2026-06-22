#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

loadLocalEnv();

const DEFAULT_FILE_KEY = 'WRXdNp9M1SEjWPaUhU67pg';
const DEFAULT_FILE_NAME = 'F Design System 2.0 Copy';
const fileKey = process.env.FIGMA_FILE_KEY || DEFAULT_FILE_KEY;
const fileName = process.env.FIGMA_FILE_NAME || DEFAULT_FILE_NAME;
const token = process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_TOKEN;
const outDir = resolve(process.cwd(), process.argv[2] || 'tokens');

if (!token) {
  throw new Error('Set FIGMA_ACCESS_TOKEN before running this exporter.');
}

const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, {
  headers: { 'X-Figma-Token': token },
});

if (!response.ok) {
  throw new Error(`Figma variables export failed: ${response.status} ${await response.text()}`);
}

const payload = await response.json();
const meta = payload.meta || payload;
const collections = normalizeMap(meta.variableCollections || meta.variable_collections || {});
const variables = normalizeMap(meta.variables || {});
const collectionById = new Map(collections.map((collection) => [collection.id, collection]));
const variableById = new Map(variables.map((variable) => [variable.id, variable]));

function normalizeMap(value) {
  if (Array.isArray(value)) return value;
  return Object.entries(value).map(([id, item]) => ({ id, ...item }));
}

function varsFor(collectionName) {
  const collection = collections.find((item) => item.name === collectionName);
  if (!collection) return [];
  return variables
    .filter((variable) => variable.variableCollectionId === collection.id || variable.variable_collection_id === collection.id)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function modeFor(variable) {
  const collectionId = variable.variableCollectionId || variable.variable_collection_id;
  const collection = collectionById.get(collectionId);
  if (!collection?.modes?.length) {
    throw new Error(`Missing collection mode for ${variable.name}`);
  }
  return collection.modes[0].modeId || collection.modes[0].mode_id;
}

function rawValue(variable, seen = new Set()) {
  const value = variable.valuesByMode?.[modeFor(variable)] || variable.values_by_mode?.[modeFor(variable)];
  if (value?.type === 'VARIABLE_ALIAS') {
    const targetId = value.id;
    if (seen.has(targetId)) throw new Error(`Variable alias cycle at ${variable.name}`);
    const target = variableById.get(targetId);
    if (!target) throw new Error(`Missing alias target ${targetId} for ${variable.name}`);
    seen.add(targetId);
    return rawValue(target, seen);
  }
  return value;
}

function aliasTarget(variable) {
  const value = variable.valuesByMode?.[modeFor(variable)] || variable.values_by_mode?.[modeFor(variable)];
  if (value?.type !== 'VARIABLE_ALIAS') return null;
  const target = variableById.get(value.id);
  if (!target) return null;
  const collectionId = target.variableCollectionId || target.variable_collection_id;
  return { collection: collectionById.get(collectionId)?.name, name: target.name };
}

function cssName(prefix, name) {
  return `--${prefix}-${name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')}`;
}

function colorToCss(value) {
  const r = Math.round(value.r * 255);
  const g = Math.round(value.g * 255);
  const b = Math.round(value.b * 255);
  const a = value.a ?? value.alpha ?? 1;
  if (a >= 0.999) {
    return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
  }
  return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(4))})`;
}

function floatToCss(name, value, kind) {
  if (name.includes('full')) return `${Math.round(value)}px`;
  if (kind === 'font-size' || kind === 'line-height') return `${value}px`;
  if (kind === 'font-weight') return `${value}`;
  return value === 0 ? '0' : `${Number((value / 16).toFixed(4))}rem`;
}

const header = `/* Generated from Figma file ${fileKey}. */\n`;

let primitiveCss = `${header}:root {\n`;
for (const variable of varsFor('Primitives')) {
  const value = rawValue(variable);
  if (value && typeof value === 'object' && 'r' in value) {
    primitiveCss += `  ${cssName('primitive', variable.name)}: ${colorToCss(value)};\n`;
  }
}
primitiveCss += '}\n';

let semanticLightCss = `${header}:root, [data-theme="light"] {\n`;
for (const variable of varsFor('Color')) {
  const target = aliasTarget(variable);
  const value = rawValue(variable);
  const cssValue =
    target?.collection === 'Primitives'
      ? `var(${cssName('primitive', target.name)})`
      : value && typeof value === 'object' && 'r' in value
        ? colorToCss(value)
        : String(value);
  semanticLightCss += `  ${cssName('color', variable.name)}: ${cssValue};\n`;
}
for (const variable of varsFor('Spacing')) {
  semanticLightCss += `  ${cssName('spacing', variable.name)}: ${floatToCss(variable.name, rawValue(variable), 'spacing')};\n`;
}
for (const variable of varsFor('Typography')) {
  const kind = variable.name.split('/')[0];
  semanticLightCss += `  ${cssName('typography', variable.name)}: ${floatToCss(variable.name, rawValue(variable), kind)};\n`;
}
semanticLightCss += '}\n';

const semanticDarkCss = `${header}/* No dark-mode variable mode exists in the source file yet. Kept as a placeholder import target for Storybook. */\n[data-theme="dark"] {\n}\n`;

const indexCss = '@import "./primitive.css";\n@import "./semantic-light.css";\n@import "./semantic-dark.css";\n';

const manifest = {
  source: {
    fileKey,
    fileName,
    exportedAt: new Date().toISOString(),
    source: 'Figma REST Variables API',
  },
  collections: {
    Primitives: { count: varsFor('Primitives').length, output: 'tokens/primitive.css' },
    Color: { count: varsFor('Color').length, output: 'tokens/semantic-light.css' },
    Spacing: { count: varsFor('Spacing').length, output: 'tokens/semantic-light.css' },
    Typography: { count: varsFor('Typography').length, output: 'tokens/semantic-light.css' },
  },
  cssVariableCounts: {
    primitive: (primitiveCss.match(/^\s+--/gm) || []).length,
    semanticLight: (semanticLightCss.match(/^\s+--/gm) || []).length,
  },
  storybookImports: ['tokens/primitive.css', 'tokens/semantic-light.css', 'tokens/semantic-dark.css'],
  notes: [
    'Color semantic variables preserve Figma alias relationships with CSS var() references to primitive variables.',
    'Spacing values are emitted as rem units for ordinary size tokens and px for full-radius tokens.',
    'No dark-mode variable mode exists in the source file yet; semantic-dark.css is intentionally a placeholder.',
  ],
};

await mkdir(outDir, { recursive: true });
await writeFile(resolve(outDir, 'primitive.css'), primitiveCss);
await writeFile(resolve(outDir, 'semantic-light.css'), semanticLightCss);
await writeFile(resolve(outDir, 'semantic-dark.css'), semanticDarkCss);
await writeFile(resolve(outDir, 'index.css'), indexCss);
await writeFile(resolve(outDir, 'tokens.manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Exported Figma tokens to ${outDir}`);

function loadLocalEnv() {
  for (const file of ['.env.local', '.env']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    const lines = readFileSync(path, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key]) continue;
      process.env[key] = rawValue.replace(/^['"]|['"]$/g, '');
    }
  }
}
