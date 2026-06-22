import { chromium } from 'playwright';

const storybookBase = process.env.STORYBOOK_URL ?? 'http://localhost:6006';
const appBase = process.env.APP_URL ?? 'http://localhost:5199';

async function loadStoryIndex() {
  const response = await fetch(`${storybookBase}/index.json`);
  if (!response.ok) {
    throw new Error(`Unable to load Storybook index: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

function summarizeStoryFailure(result) {
  return {
    id: result.id,
    name: `${result.title}/${result.name}`,
    fdsNodeCount: result.fdsNodeCount,
    nativeCount: result.nativeCount,
    nakedNativeControls: result.nakedNativeControls,
    errors: result.errors,
    responseError: result.responseError
  };
}

const index = await loadStoryIndex();
const stories = Object.values(index.entries).filter(
  (entry) => entry.type === 'story' && entry.title.startsWith('Components/')
);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const storyResults = [];

for (const story of stories) {
  const errors = [];
  page.removeAllListeners('console');
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });

  const response = await page
    .goto(`${storybookBase}/iframe.html?id=${story.id}&viewMode=story`, {
      waitUntil: 'networkidle',
      timeout: 20_000
    })
    .catch((error) => ({ error }));

  await page.waitForTimeout(150);

  const audit = await page.evaluate(() => {
    const isVisible = (element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
    };

    const nativeControls = [...document.querySelectorAll('button,input,select,textarea,table,dialog,ul,ol')].filter(
      isVisible
    );
    const nakedNativeControls = nativeControls
      .filter((element) => !element.closest('[class*="fds-"]') && !element.closest('[class*="story-"]'))
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        className: element.getAttribute('class') ?? '',
        text: (element.textContent || element.getAttribute('aria-label') || '').trim().slice(0, 72)
      }));

    const fdsNodes = [...document.querySelectorAll('[class*="fds-"]')].filter(isVisible);
    return {
      bodyTextLength: document.body.innerText.trim().length,
      fdsNodeCount: fdsNodes.length,
      nativeCount: nativeControls.length,
      nakedNativeControls
    };
  });

  const result = {
    id: story.id,
    title: story.title,
    name: story.name,
    ...audit,
    errors: errors.slice(0, 3),
    responseError: response?.error?.message
  };

  result.ok =
    !result.responseError &&
    result.fdsNodeCount > 0 &&
    result.nakedNativeControls.length === 0 &&
    result.errors.length === 0;

  storyResults.push(result);
}

const appAudit = await page
  .goto(appBase, { waitUntil: 'networkidle', timeout: 20_000 })
  .then(() =>
    page.evaluate(() => {
      const isVisible = (element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
      };

      const allVisible = [...document.querySelectorAll('*')].filter(isVisible);
      const fdsNodes = allVisible.filter((element) => [...element.classList].some((name) => name.startsWith('fds-')));
      const customInteractive = [...document.querySelectorAll('button,input,select,textarea,table')]
        .filter(isVisible)
        .filter((element) => !element.closest('[class*="fds-"]'))
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            tag: element.tagName.toLowerCase(),
            className: element.getAttribute('class') ?? '',
            text: (element.textContent || element.getAttribute('aria-label') || '').trim().slice(0, 72),
            rect: {
              x: Math.round(rect.x),
              y: Math.round(rect.y),
              width: Math.round(rect.width),
              height: Math.round(rect.height)
            }
          };
        });

      return {
        title: document.title,
        bodyTextLength: document.body.innerText.trim().length,
        fdsNodeCount: fdsNodes.length,
        customInteractive,
        bodyBackground: getComputedStyle(document.body).backgroundColor,
        appBackground: getComputedStyle(document.querySelector('.settings-shell') ?? document.body).backgroundColor
      };
    })
  )
  .catch((error) => ({ error: error.message }));

await browser.close();

const failedStories = storyResults.filter((result) => !result.ok);
const report = {
  storybookUrl: storybookBase,
  appUrl: appBase,
  storyCount: storyResults.length,
  passedStories: storyResults.length - failedStories.length,
  failedStories: failedStories.length,
  failures: failedStories.map(summarizeStoryFailure),
  appAudit
};

console.log(JSON.stringify(report, null, 2));

if (failedStories.length > 0) {
  process.exitCode = 1;
}
