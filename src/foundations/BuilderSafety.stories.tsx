import type { Meta, StoryObj } from '@storybook/react';
import { BuilderSafety } from './BuilderSafety';

const meta: Meta<typeof BuilderSafety> = {
  title: 'Foundations/Builder Safety',
  component: BuilderSafety,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Builder-safe MCP checklist for remote Chromatic and local Storybook agents. Use this before applying F Design System components in product code.'
      }
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof BuilderSafety>;

export const RemoteAndLocalMcpContract: Story = {};
