import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

function storybookManualChunks(id: string) {
  if (id.includes('/src/icons/generated/')) {
    const fileName = id.split('/').pop() || 'icons';
    const bucket = [...fileName].reduce((hash, char) => hash + char.charCodeAt(0), 0) % 16;
    return `fds-icons-${bucket}`;
  }

  return undefined;
}

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
      },
      build: {
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
          output: {
            manualChunks: storybookManualChunks
          }
        }
      }
    }),
  docs: {}
};

export default config;
