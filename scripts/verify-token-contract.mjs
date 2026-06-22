import { existsSync, readFileSync } from 'node:fs';

const requiredFiles = [
  'tokens/semantic-light.css',
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

const forbiddenTokens = ['--fds-color-surface', '--fds-color-text-primary', '--fds-color-border', '--fds-color-primary'];

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
  if (source.includes(needle)) {
    throw new Error(`${label} must not contain forbidden token alias: ${needle}`);
  }
}

const sources = Object.fromEntries(requiredFiles.map((file) => [file, readRequired(file)]));
const tokenCss = sources['tokens/semantic-light.css'];
const tokenStories = sources['src/foundations/Tokens.stories.tsx'];
const storybookCss = sources['src/styles/storybook.css'];
const packageJson = JSON.parse(sources['package.json']);

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
assertIncludes(sources['AGENTS.md'], 'foundations-tokens', 'AGENTS.md');
assertIncludes(sources['CLAUDE.md'], 'foundations-tokens', 'CLAUDE.md');

if (packageJson.exports?.['./tokens.css'] !== './tokens/index.css') {
  throw new Error('package.json must export "./tokens.css": "./tokens/index.css".');
}

const report = {
  requiredTokenCount: requiredTokens.length,
  forbiddenAliasCount: forbiddenTokens.length,
  preferredColorNamespace: '--color-fds-*',
  forbiddenColorNamespace: '--fds-color-*',
  packageTokenExport: './tokens.css',
  status: 'passed'
};

console.log(JSON.stringify(report, null, 2));
