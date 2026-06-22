import type { Preview } from '@storybook/react';
import { createElement } from 'react';
import '../src/style.css';
import '../src/styles/storybook.css';

const preview: Preview = {
  decorators: [
    (Story) => createElement('div', { className: 'story-surface' }, createElement(Story))
  ],
  parameters: {
    backgrounds: {
      default: 'FDS background',
      values: [{ name: 'FDS background', value: '#111113' }]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
