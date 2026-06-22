import { existsSync, readFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const svgRoot = path.join('src', 'icons', 'svg');
const generatedRoot = path.join('src', 'icons', 'generated');
const rootManifestPath = path.join(svgRoot, 'manifest.json');
const markerManifestPath = path.join(svgRoot, 'markers-and-flinks', 'manifest.json');

function readRequired(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Missing required file: ${filePath}`);
  }
  return readFileSync(filePath, 'utf8');
}

function readJson(filePath) {
  return JSON.parse(readRequired(filePath));
}

function assertIncludes(source, needle, label) {
  if (!source.includes(needle)) {
    throw new Error(`${label} is missing required text: ${needle}`);
  }
}

async function listFiles(dir, predicate) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath, predicate)));
    } else if (entry.isFile() && predicate(fullPath)) {
      files.push(fullPath);
    }
  }
  return files.sort((a, b) => a.localeCompare(b));
}

const packageJson = readJson('package.json');
const rootManifest = readJson(rootManifestPath);
const markerManifest = readJson(markerManifestPath);
const iconIndex = readRequired(path.join('src', 'icons', 'index.tsx'));
const rootIndex = readRequired(path.join('src', 'index.ts'));
const iconAdapter = readRequired(path.join('src', 'components', 'icons.tsx'));
const iconButton = readRequired(path.join('src', 'components', 'IconButton', 'IconButton.tsx'));
const iconButtonStory = readRequired(path.join('src', 'components', 'IconButton', 'IconButton.stories.tsx'));
const iconStory = readRequired(path.join('src', 'foundations', 'Icons.stories.tsx'));
const storybookMain = readRequired(path.join('.storybook', 'main.ts'));

const svgFiles = await listFiles(svgRoot, (filePath) => filePath.endsWith('.svg'));
const generatedComponents = await listFiles(
  generatedRoot,
  (filePath) => filePath.endsWith('.tsx') && !filePath.endsWith(`${path.sep}index.tsx`),
);

const exportedBaseIcons = rootManifest.counts?.exported ?? rootManifest.icons?.filter((entry) => entry.status === 'exported').length;
const exportedMarkerIcons =
  markerManifest.counts?.exported ?? markerManifest.components?.filter((entry) => entry.status === 'exported').length;
const manifestTotal = exportedBaseIcons + exportedMarkerIcons;

if (svgFiles.length !== manifestTotal) {
  throw new Error(`SVG count mismatch. Found ${svgFiles.length}; manifests export ${manifestTotal}.`);
}
if (generatedComponents.length !== svgFiles.length) {
  throw new Error(`Generated component count mismatch. Found ${generatedComponents.length}; SVG count is ${svgFiles.length}.`);
}

const requiredMarkerSets = ['Drone Marker', 'Dock marker', 'Airspace Detection', 'Safe Location Icon'];
const markerSets = new Set(markerManifest.components?.map((entry) => entry.parentComponentSetName).filter(Boolean));
const missingMarkerSets = requiredMarkerSets.filter((name) => !markerSets.has(name));
if (missingMarkerSets.length > 0) {
  throw new Error(`Marker manifest is missing component sets: ${missingMarkerSets.join(', ')}`);
}

if (packageJson.dependencies?.['lucide-react'] || packageJson.devDependencies?.['lucide-react']) {
  throw new Error('lucide-react should not be a package dependency after switching to generated Figma icons.');
}

for (const [scriptName, expectedCommand] of [
  ['icons:export', 'node scripts/export-icons-from-figma.mjs'],
  ['icons:export:markers', 'node scripts/export-figma-component-descendants.mjs'],
  ['icons:generate', 'node scripts/generate-icon-components.mjs'],
  ['verify:icons', 'node scripts/verify-icons.mjs'],
  ['chromatic:storybook', 'chromatic --storybook-build-dir=storybook-static']
]) {
  if (packageJson.scripts?.[scriptName] !== expectedCommand) {
    throw new Error(`package.json is missing script "${scriptName}": "${expectedCommand}".`);
  }
}

assertIncludes(rootIndex, "export * from './icons';", 'Package root export');
assertIncludes(iconIndex, 'export type IconProps', 'Generated icon index');
assertIncludes(iconIndex, 'export const iconComponents', 'Generated icon index');
assertIncludes(iconAdapter, "from '../icons'", 'Component icon adapter');
assertIncludes(iconAdapter, 'export type IconGlyph', 'Component icon adapter');
assertIncludes(iconButton, 'icon?: IconGlyph', 'IconButton props');
assertIncludes(iconButton, 'icon = icons.plus', 'IconButton default icon');
assertIncludes(iconButtonStory, 'icon: icons.plus', 'IconButton stories');
assertIncludes(iconStory, "title: 'Foundations/Icons'", 'Icons Storybook title');
assertIncludes(iconStory, 'export const IconGallery', 'Icons Storybook gallery');
assertIncludes(iconStory, 'export const IconPlayground', 'Icons Storybook playground');
assertIncludes(storybookMain, 'manualChunks: storybookManualChunks', 'Storybook icon chunk split');
assertIncludes(storybookMain, 'chunkSizeWarningLimit: 2000', 'Storybook chunk warning budget');

const scannedSourceFiles = await listFiles('src', (filePath) => /\.(ts|tsx)$/.test(filePath));
const lucideReferences = scannedSourceFiles.filter((filePath) => readFileSync(filePath, 'utf8').includes('lucide-react'));
if (lucideReferences.length > 0) {
  throw new Error(`Source still imports lucide-react: ${lucideReferences.join(', ')}`);
}

if (existsSync(path.join('scripts', 'export-figma-section-svgs.mjs'))) {
  throw new Error('Remove scripts/export-figma-section-svgs.mjs; use the exact component descendant exporter for marker frames.');
}

console.log(
  JSON.stringify(
    {
      status: 'passed',
      svgFiles: svgFiles.length,
      generatedComponents: generatedComponents.length,
      baseIcons: exportedBaseIcons,
      markerIcons: exportedMarkerIcons,
      markerSets: [...markerSets].sort(),
      storybookStories: ['foundations-icons--icon-gallery', 'foundations-icons--icon-playground'],
      dependencyRuntime: 'generated Figma SVG React components'
    },
    null,
    2,
  ),
);
