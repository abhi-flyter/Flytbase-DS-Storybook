import { existsSync, readFileSync } from 'node:fs';

const requiredFiles = [
  'tokens/primitive.css',
  'tokens/semantic-light.css',
  'tokens/semantic-dark.css',
  'tokens/index.css',
  'src/components/styles.css',
  'src/foundations/Tokens.stories.tsx',
  'src/styles/storybook.css',
  'AGENTS.md',
  'CLAUDE.md',
  'README.md',
  'package.json'
];

const requiredTokens = [
  '--color-fds-background-bg',
  '--color-fds-background-level-1',
  '--color-fds-background-level-2',
  '--color-fds-background-level-3',
  '--color-fds-text-icon-01',
  '--color-fds-text-icon-02',
  '--color-fds-text-icon-disabled',
  '--color-fds-outline-o-primary',
  '--color-fds-outline-o-secondary',
  '--color-fds-surface-states-surface',
  '--color-fds-surface-states-selected',
  '--color-fds-primary-200-p',
  '--color-fds-primary-50',
  '--spacing-fds-size-100',
  '--spacing-fds-size-200',
  '--spacing-fds-size-300',
  '--spacing-fds-size-400',
  '--typography-font-size-14',
  '--typography-line-height-normal'
];

const forbiddenTokens = [
  '--color-fds-background',
  '--color-fds-surface',
  '--color-fds-text-primary',
  '--color-fds-border',
  '--color-fds-primary',
  '--fds-color-surface',
  '--fds-color-text-primary',
  '--fds-color-border',
  '--fds-color-primary'
];

const sourceFilesWithTokenReferences = [
  'tokens/index.css',
  'tokens/semantic-light.css',
  'tokens/semantic-dark.css',
  'src/components/styles.css',
  'src/styles/storybook.css'
];

function readRequired(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Missing required file: ${filePath}`);
  }
  return readFileSync(filePath, 'utf8');
}

function assertIncludes(source, needle, label) {
  if (!source.includes(needle)) {
    throw new Error(`${label} is missing required text: ${needle}`);
  }
}

function assertNotIncludes(source, needle, label) {
  const escapedNeedle = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const exactTokenPattern = new RegExp(`(?<![a-z0-9-])${escapedNeedle}(?![a-z0-9-])`, 'i');

  if (exactTokenPattern.test(source)) {
    throw new Error(`${label} must not contain forbidden token alias: ${needle}`);
  }
}

const sources = Object.fromEntries(requiredFiles.map((file) => [file, readRequired(file)]));
const primitiveCss = sources['tokens/primitive.css'];
const tokenCss = sources['tokens/semantic-light.css'];
const darkTokenCss = sources['tokens/semantic-dark.css'];
const tokenStories = sources['src/foundations/Tokens.stories.tsx'];
const storybookCss = sources['src/styles/storybook.css'];
const packageJson = JSON.parse(sources['package.json']);

function collectDeclarations(source) {
  const declarations = new Map();
  const declarationPattern = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match;

  while ((match = declarationPattern.exec(source))) {
    declarations.set(match[1], match[2].trim());
  }

  return declarations;
}

function collectVarReferences(source) {
  const references = new Set();
  const referencePattern = /var\((--[a-z0-9-]+)/gi;
  let match;

  while ((match = referencePattern.exec(source))) {
    references.add(match[1]);
  }

  return [...references].sort();
}

function collectDocumentedTokenNames(source) {
  return [
    ...new Set(
      source.match(/--(?:color|spacing|typography)-[a-z0-9]+(?:-[a-z0-9]+)*/g)?.filter((token) => {
        return token !== '--color-fds' && token !== '--spacing-fds' && token !== '--typography';
      }) ?? []
    )
  ].sort();
}

function isTokenReference(token) {
  return (
    token.startsWith('--color-') ||
    token.startsWith('--spacing-') ||
    token.startsWith('--typography-') ||
    token.startsWith('--primitive-')
  );
}

for (const token of requiredTokens) {
  assertIncludes(tokenCss, token, 'Token CSS');
  assertIncludes(tokenStories + storybookCss + sources['AGENTS.md'] + sources['CLAUDE.md'], token, 'Token contract docs');
}

for (const [file, source] of Object.entries(sources)) {
  for (const token of forbiddenTokens) {
    if (file === 'src/foundations/Tokens.stories.tsx' || file === 'AGENTS.md' || file === 'CLAUDE.md' || file === 'README.md') {
      continue;
    }
    assertNotIncludes(source, token, file);
  }
}

for (const token of forbiddenTokens) {
  assertIncludes(tokenStories, token, 'Token story forbidden examples');
  assertIncludes(sources['AGENTS.md'], token, 'Agent rules forbidden examples');
  assertIncludes(sources['CLAUDE.md'], token, 'Claude rules forbidden examples');
}

assertIncludes(tokenStories, 'Use the documented FDS token names exactly', 'Token usage story');
assertIncludes(tokenStories, '--color-fds-*', 'Token usage story');
assertIncludes(tokenStories, '--spacing-fds-*', 'Token usage story');
assertIncludes(tokenStories, '--typography-*', 'Token usage story');
assertIncludes(sources['README.md'], 'Token Usage Rules', 'README');
assertIncludes(sources['README.md'], '--color-fds-background-bg', 'README');
assertIncludes(sources['README.md'], '--fds-color-surface', 'README');
assertIncludes(sources['README.md'], '--color-fds-background', 'README');
assertIncludes(sources['AGENTS.md'], 'foundations-tokens', 'AGENTS.md');
assertIncludes(sources['CLAUDE.md'], 'foundations-tokens', 'CLAUDE.md');

if (packageJson.exports?.['./tokens.css'] !== './tokens/index.css') {
  throw new Error('package.json must export "./tokens.css": "./tokens/index.css".');
}

const primitiveDeclarations = collectDeclarations(primitiveCss);
const semanticDeclarations = collectDeclarations(tokenCss);
const darkDeclarations = collectDeclarations(darkTokenCss);
const declaredTokens = new Set([
  ...primitiveDeclarations.keys(),
  ...semanticDeclarations.keys(),
  ...darkDeclarations.keys()
]);

const documentedTokens = collectDocumentedTokenNames(tokenStories).filter((token) => !forbiddenTokens.includes(token));
const missingDocumentedTokens = documentedTokens.filter((token) => !declaredTokens.has(token));

if (missingDocumentedTokens.length > 0) {
  throw new Error(`Tokens story documents CSS variables that are not exported:\n${missingDocumentedTokens.join('\n')}`);
}

const missingReferences = [];

for (const file of sourceFilesWithTokenReferences) {
  for (const reference of collectVarReferences(sources[file])) {
    if (isTokenReference(reference) && !declaredTokens.has(reference)) {
      missingReferences.push(`${file}: ${reference}`);
    }
  }
}

if (missingReferences.length > 0) {
  throw new Error(`CSS references token variables that are not exported:\n${missingReferences.join('\n')}`);
}

const fdsColorTokens = [...semanticDeclarations.keys()].filter((token) => token.startsWith('--color-fds-')).sort();
const missingPrimitiveReferences = [];

for (const token of fdsColorTokens) {
  for (const reference of collectVarReferences(semanticDeclarations.get(token) ?? '')) {
    if (!declaredTokens.has(reference)) {
      missingPrimitiveReferences.push(`${token} -> ${reference}`);
    }
  }
}

if (missingPrimitiveReferences.length > 0) {
  throw new Error(`FDS color tokens reference missing primitives:\n${missingPrimitiveReferences.join('\n')}`);
}

const documentedFdsColorTokens = documentedTokens.filter((token) => token.startsWith('--color-fds-'));
const undocumentedFdsColorTokens = fdsColorTokens.filter((token) => !documentedFdsColorTokens.includes(token));

if (undocumentedFdsColorTokens.length > 0) {
  throw new Error(`FDS color tokens exist in CSS but are missing from Tokens stories:\n${undocumentedFdsColorTokens.join('\n')}`);
}

const report = {
  requiredTokenCount: requiredTokens.length,
  forbiddenAliasCount: forbiddenTokens.length,
  documentedTokenCount: documentedTokens.length,
  documentedFdsColorTokenCount: documentedFdsColorTokens.length,
  exportedFdsColorTokenCount: fdsColorTokens.length,
  preferredColorNamespace: '--color-fds-*',
  forbiddenColorNamespace: '--fds-color-*',
  packageTokenExport: './tokens.css',
  status: 'passed'
};

console.log(JSON.stringify(report, null, 2));
