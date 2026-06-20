import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-mcp', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  features: {
    experimentalComponentsManifest: true,
    experimentalCodeExamples: true
  },
  viteFinal: async (config) =>
    mergeConfig(config, {
      optimizeDeps: {
        include: ['react', 'react-dom', 'react/jsx-runtime']
      }
    }),
  docs: {}
};

export default config;
