import type { Meta, StoryObj } from '@storybook/react';
import { ContractSummary } from './ComponentContracts';

const meta: Meta<typeof ContractSummary> = {
  title: 'Foundations/Component Contracts',
  component: ContractSummary,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Source-of-truth API contract registry for Figma-to-React-to-Storybook parity. Builders should inspect this before using a component in product code, especially for interactive or app-owned lifecycle surfaces.'
      }
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof ContractSummary>;

export const Registry: Story = {};
