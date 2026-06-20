import type { Meta, StoryObj } from '@storybook/react';
import { SortWidget } from './SortWidget';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof SortWidget> = {
  title: 'Components/SortWidget',
  component: SortWidget,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.SortWidget } },
    layout: 'fullscreen'
  },
  argTypes: {
    type: { control: 'select', options: ['default', 'custom'] },
    order: { control: 'select', options: ['newest', 'oldest'] }
  },
  args: {
    order: 'newest',
    type: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof SortWidget>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <VariantSection title="Sort widget">
      <VariantGroup label="Types">
        <SortWidget order="newest" />
        <SortWidget order="oldest" type="custom" />
      </VariantGroup>
    </VariantSection>
  )
};
