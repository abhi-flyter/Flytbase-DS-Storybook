import { existsSync, readFileSync } from 'node:fs';

const requiredStories = [
  'UsageContract',
  'StylesParity',
  'Colors',
  'Typography',
  'SpacingAndRadius',
  'Shapes',
  'Elevations',
  'Icons',
  'MarkersAndFlinks',
  'FontAwesomeGuidelines',
  'Communication'
];

const figmaSections = [
  'Colors - Opacity',
  'opaque colors',
  'Typography',
  'Icons',
  'Markers & Flinks',
  'For Fontawesome',
  'Elevations',
  'Spacing',
  'Communication',
  'Shapes'
];

const requiredTokens = [
  '--color-fds-background-bg',
  '--color-fds-background-level-5',
  '--color-fds-primary-states-hover',
  '--color-fds-secondary-states-focused',
  '--color-fds-surface-states-selected-n',
  '--color-fds-text-icon-disabled',
  '--color-fds-outline-o-disabled',
  '--color-fds-critical-system-container-info-container-ic',
  '--spacing-fds-size-0',
  '--spacing-fds-size-50',
  '--spacing-fds-size-600',
  '--spacing-fds-spacing-and-radius-size-1500',
  '--typography-font-size-11',
  '--typography-font-weight-semibold',
  '--typography-line-height-snug'
];

const requiredCopy = [
  'Mega Heading',
  'Tiny 2 (Medium)',
  'Shape Radius 11',
  'Level 6',
  'Bounding box: 16x20px',
  'Formal-Casual Tone',
  'Empathy and Reassurance',
  'Package exports',
  'Figma source catalog examples'
];

const requiredIconStoryCopy = [
  "title: 'Foundations/Icons'",
  'IconGallery',
  'IconPlayground',
  'iconComponents',
  'Figma-exported SVG icon and marker components generated from src/icons/svg'
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

const storySource = readRequired('src/foundations/Tokens.stories.tsx');
const iconStorySource = readRequired('src/foundations/Icons.stories.tsx');
const storybookCss = readRequired('src/styles/storybook.css');
const tokenCss = readRequired('tokens/semantic-light.css');

for (const story of requiredStories) {
  assertIncludes(storySource, `export const ${story}`, 'Foundations story exports');
}

for (const section of figmaSections) {
  assertIncludes(storySource, section, 'Figma Styles section parity');
}

for (const token of requiredTokens) {
  assertIncludes(tokenCss, token, 'Token CSS');
  assertIncludes(storySource + storybookCss, token, 'Foundations documentation');
}

for (const copy of requiredCopy) {
  assertIncludes(storySource, copy, 'Foundations documentation copy');
}

for (const copy of requiredIconStoryCopy) {
  assertIncludes(iconStorySource, copy, 'Foundations icon documentation copy');
}

for (const cssClass of [
  '.foundation-parity-grid',
  '.foundation-table',
  '.foundation-shape-grid',
  '.foundation-elevation-grid',
  '.foundation-icon-grid',
  '.foundation-icon-playground',
  '.foundation-pill-list',
  '.foundation-rule-list'
]) {
  assertIncludes(storybookCss, cssClass, 'Storybook foundations CSS');
}

console.log(
  JSON.stringify(
    {
      status: 'passed',
      requiredStoryCount: requiredStories.length,
      figmaSectionCount: figmaSections.length,
      requiredTokenCount: requiredTokens.length,
      requiredIconStoryCopy: requiredIconStoryCopy.length
    },
    null,
    2
  )
);
