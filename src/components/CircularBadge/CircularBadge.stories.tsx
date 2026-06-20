import type { Meta, StoryObj } from '@storybook/react';
import { CircularBadge } from './CircularBadge';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof CircularBadge> = {
  title: 'Components/CircularBadge',
  component: CircularBadge,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.CircularBadge } },
    layout: 'fullscreen'
  },
  argTypes: {
    variant: { control: 'select', options: ['dot', 'value'] },
    value: { control: 'text' }
  },
  args: {
    ariaLabel: 'Unread',
    value: 8,
    variant: 'dot'
  }
};

export default meta;
type Story = StoryObj<typeof CircularBadge>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <VariantSection title="Circular badge">
      <VariantGroup label="Variants">
        <CircularBadge variant="dot" />
        <CircularBadge variant="value" value={8} />
      </VariantGroup>
    </VariantSection>
  )
};
