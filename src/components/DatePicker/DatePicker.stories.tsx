import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.DatePicker } },
    layout: 'fullscreen'
  },
  argTypes: {
    mode: { control: 'select', options: ['single', 'range'] },
    showTime: { control: 'boolean' }
  },
  args: {
    mode: 'single',
    month: 'June 2026',
    selected: 18,
    showTime: false
  }
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <VariantSection title="Date picker">
      <VariantGroup label="Modes">
        <DatePicker mode="single" selected={18} />
        <DatePicker mode="range" selected={[12, 18]} />
        <DatePicker mode="range" selected={[12, 18]} showTime />
      </VariantGroup>
    </VariantSection>
  )
};
