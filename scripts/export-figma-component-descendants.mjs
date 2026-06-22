#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const DEFAULT_FILE_KEY = 'WRXdNp9M1SEjWPaUhU67pg';
const DEFAULT_ROOT_NODE_ID = '25:4146';
const DEFAULT_OUT_DIR = 'src/icons/svg/markers-and-flinks';

loadDotEnv('.env.local');

const fileKey = process.env.FIGMA_FILE_KEY || DEFAULT_FILE_KEY;
const rootNodeId = process.argv[2] || process.env.FIGMA_EXPORT_ROOT_NODE_ID || DEFAULT_ROOT_NODE_ID;
const outDir = resolve(process.cwd(), process.argv[3] || process.env.FIGMA_EXPORT_OUT_DIR || DEFAULT_OUT_DIR);
const token = process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_TOKEN;

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
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function nodeSuffix(id) {
  return id.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
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

function collectComponents(node, parentComponentSetName = null, results = []) {
  const nextParent = node.type === 'COMPONENT_SET' ? node.name : parentComponentSetName;
  if (node.type === 'COMPONENT') {
    results.push({
      id: node.id,
      name: node.name,
      parentComponentSetName,
      type: node.type,
      width: node.absoluteBoundingBox?.width ?? node.size?.x ?? node.width,
      height: node.absoluteBoundingBox?.height ?? node.size?.y ?? node.height,
      x: node.absoluteBoundingBox?.x,
      y: node.absoluteBoundingBox?.y,
    });
  }
  for (const child of node.children || []) {
    collectComponents(child, nextParent, results);
  }
  return results;
}

function chunks(values, size) {
  const result = [];
  for (let index = 0; index < values.length; index += size) {
    result.push(values.slice(index, index + size));
  }
  return result;
}

const payload = await fetchFigma(`files/${fileKey}/nodes?ids=${encodeURIComponent(rootNodeId)}`);
const root = payload.nodes?.[rootNodeId]?.document;
if (!root) {
  throw new Error(`Figma node ${rootNodeId} was not found.`);
}

const components = collectComponents(root).filter((component) => component.width > 0 && component.height > 0);
if (components.length === 0) {
  throw new Error(`No component descendants found in Figma node ${rootNodeId}.`);
}

const imageUrls = {};
for (const idChunk of chunks(components.map((component) => component.id), 80)) {
  const imagePayload = await fetchFigma(
    `images/${fileKey}?format=svg&svg_outline_text=false&ids=${encodeURIComponent(idChunk.join(','))}`,
  );
  Object.assign(imageUrls, imagePayload.images || {});
}

await mkdir(outDir, { recursive: true });

const manifest = [];
for (const component of components) {
  const url = imageUrls[component.id];
  if (!url) {
    manifest.push({ ...component, status: 'missing-export-url' });
    continue;
  }

  const setSlug = component.parentComponentSetName ? `${slugify(component.parentComponentSetName)}__` : '';
  const fileName = `${setSlug}${slugify(component.name)}__${nodeSuffix(component.id)}.svg`;
  const svg = await downloadText(url);
  await writeFile(resolve(outDir, fileName), svg.endsWith('\n') ? svg : `${svg}\n`);
  manifest.push({ ...component, fileName, status: 'exported' });
}

await writeFile(
  resolve(outDir, 'manifest.json'),
  `${JSON.stringify(
    {
      source: {
        fileKey,
        rootNodeId,
        rootNodeName: root.name,
        exportedAt: new Date().toISOString(),
        source: 'Figma REST Images API',
      },
      counts: {
        componentSets: new Set(components.map((component) => component.parentComponentSetName).filter(Boolean)).size,
        candidates: components.length,
        exported: manifest.filter((entry) => entry.status === 'exported').length,
        missing: manifest.filter((entry) => entry.status !== 'exported').length,
      },
      components: manifest,
    },
    null,
    2,
  )}\n`,
);

const exported = manifest.filter((entry) => entry.status === 'exported').length;
const missing = manifest.length - exported;
console.log(`Exported ${exported}/${manifest.length} Figma component descendants to ${outDir}`);
if (missing > 0) {
  console.log(`Missing exports: ${missing}`);
  process.exitCode = 1;
}
