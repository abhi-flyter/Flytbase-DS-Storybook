#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const DEFAULT_FILE_KEY = 'WRXdNp9M1SEjWPaUhU67pg';
const DEFAULT_GRID_NODE_ID = '25:3361';
const DEFAULT_OUT_DIR = 'src/icons/svg';

loadDotEnv('.env.local');

const fileKey = process.env.FIGMA_FILE_KEY || DEFAULT_FILE_KEY;
const gridNodeId = process.env.FIGMA_ICON_GRID_NODE_ID || DEFAULT_GRID_NODE_ID;
const token = process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_TOKEN;
const outDir = resolve(process.cwd(), process.argv[2] || DEFAULT_OUT_DIR);

if (!token) {
  throw new Error('Set FIGMA_ACCESS_TOKEN before running this exporter.');
}

function loadDotEnv(path) {
  if (!existsSync(path)) return;
  const contents = readFileSync(path, 'utf8');
  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.replace(/^['"]|['"]$/g, '');
  }
}

function slugify(value) {
  return value
    .replace(/^Icon\//i, 'Icon ')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function nodeSuffix(id) {
  return id.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

function isIconCandidate(node) {
  return (
    node.visible !== false &&
    node.absoluteBoundingBox &&
    node.absoluteBoundingBox.width >= 20 &&
    node.absoluteBoundingBox.width <= 30 &&
    node.absoluteBoundingBox.height >= 20 &&
    node.absoluteBoundingBox.height <= 30 &&
    ['COMPONENT', 'INSTANCE', 'FRAME'].includes(node.type)
  );
}

async function fetchFigma(path) {
  const response = await fetch(`https://api.figma.com/v1/${path}`, {
    headers: { 'X-Figma-Token': token },
  });
  if (!response.ok) {
    throw new Error(`Figma API failed for ${path}: ${response.status} ${await response.text()}`);
  }
  return response.json();
}

async function downloadText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`SVG download failed: ${response.status} ${await response.text()}`);
  }
  return response.text();
}

function chunks(values, size) {
  const result = [];
  for (let index = 0; index < values.length; index += size) {
    result.push(values.slice(index, index + size));
  }
  return result;
}

const fileNodePayload = await fetchFigma(`files/${fileKey}/nodes?ids=${encodeURIComponent(gridNodeId)}`);
const grid = fileNodePayload.nodes?.[gridNodeId]?.document;
if (!grid?.children?.length) {
  throw new Error(`Figma node ${gridNodeId} did not contain exportable children.`);
}

const candidates = grid.children.filter(isIconCandidate).map((node) => ({
  id: node.id,
  name: node.name,
  type: node.type,
  width: node.absoluteBoundingBox.width,
  height: node.absoluteBoundingBox.height,
  x: node.absoluteBoundingBox.x,
  y: node.absoluteBoundingBox.y,
}));

const imageUrls = {};
for (const idChunk of chunks(candidates.map((candidate) => candidate.id), 80)) {
  const imagePayload = await fetchFigma(
    `images/${fileKey}?format=svg&svg_outline_text=false&ids=${encodeURIComponent(idChunk.join(','))}`,
  );
  Object.assign(imageUrls, imagePayload.images || {});
}

await mkdir(outDir, { recursive: true });

const manifest = [];
for (const candidate of candidates) {
  const url = imageUrls[candidate.id];
  if (!url) {
    manifest.push({ ...candidate, status: 'missing-export-url' });
    continue;
  }
  const baseName = slugify(candidate.name) || 'icon';
  const fileName = `${baseName}__${nodeSuffix(candidate.id)}.svg`;
  const svg = await downloadText(url);
  await writeFile(resolve(outDir, fileName), svg.endsWith('\n') ? svg : `${svg}\n`);
  manifest.push({
    ...candidate,
    fileName,
    status: 'exported',
  });
}

await writeFile(
  resolve(outDir, 'manifest.json'),
  `${JSON.stringify(
    {
      source: {
        fileKey,
        gridNodeId,
        exportedAt: new Date().toISOString(),
        source: 'Figma REST Images API',
      },
      counts: {
        candidates: candidates.length,
        exported: manifest.filter((entry) => entry.status === 'exported').length,
        missing: manifest.filter((entry) => entry.status !== 'exported').length,
      },
      icons: manifest,
    },
    null,
    2,
  )}\n`,
);

const exported = manifest.filter((entry) => entry.status === 'exported').length;
const missing = manifest.length - exported;
console.log(`Exported ${exported}/${manifest.length} Figma icons to ${outDir}`);
if (missing > 0) {
  console.log(`Missing exports: ${missing}`);
  process.exitCode = 1;
}
