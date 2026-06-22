#!/usr/bin/env node

import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const tokenFiles = [
  'primitive.css',
  'semantic-light.css',
  'semantic-dark.css',
  'index.css',
  'tokens.manifest.json',
];

const tempDir = await mkdtemp(join(tmpdir(), 'fds-token-check-'));
const projectRoot = process.cwd();

try {
  const result = spawnSync(process.execPath, ['scripts/export-tokens-from-figma.mjs', tempDir], {
    cwd: projectRoot,
    env: process.env,
    encoding: 'utf8',
  });

  if (result.status !== 0) {
    process.stdout.write(result.stdout || '');
    process.stderr.write(result.stderr || '');
    process.exit(result.status || 1);
  }

  const changed = [];
  for (const file of tokenFiles) {
    const currentPath = resolve(projectRoot, 'tokens', file);
    const nextPath = resolve(tempDir, file);
    const current = normalize(file, await readFile(currentPath, 'utf8'));
    const next = normalize(file, await readFile(nextPath, 'utf8'));
    if (current !== next) changed.push(file);
  }

  if (changed.length > 0) {
    console.error('Figma token drift detected. Run `npm run tokens:sync` and commit the updated token files.');
    for (const file of changed) {
      console.error(`- tokens/${file}`);
    }
    process.exit(1);
  }

  console.log('Figma tokens are in sync.');
} finally {
  await rm(tempDir, { force: true, recursive: true });
}

function normalize(file, value) {
  if (file !== 'tokens.manifest.json') return value.trim();
  const manifest = JSON.parse(value);
  if (manifest.source) {
    delete manifest.source.exportedAt;
  }
  return `${JSON.stringify(manifest, null, 2)}\n`;
}
