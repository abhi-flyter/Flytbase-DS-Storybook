import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Divider } },
    layout: 'fullscreen'
  },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    inset: { control: 'select', options: ['full', 'middle'] }
  },
  args: {
    inset: 'full',
    orientation: 'horizontal'
  }
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <VariantSection title="Dividers">
      <VariantGroup label="Horizontal">
        <div style={{ width: 360 }}>
          <Divider />
        </div>
        <div style={{ width: 360 }}>
          <Divider inset="middle" />
        </div>
      </VariantGroup>
      <VariantGroup label="Vertical">
        <div style={{ display: 'flex', height: 72, gap: 24 }}>
          <Divider orientation="vertical" />
          <Divider inset="middle" orientation="vertical" />
        </div>
      </VariantGroup>
    </VariantSection>
  )
};
