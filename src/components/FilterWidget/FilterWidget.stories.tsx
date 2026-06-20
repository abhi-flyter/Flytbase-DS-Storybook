import type { Meta, StoryObj } from '@storybook/react';
import { FilterWidget } from './FilterWidget';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const options = [
  { value: 'scheduled', label: 'Scheduled', selected: true },
  { value: 'in-flight', label: 'In flight' },
  { value: 'completed', label: 'Completed' }
];

const meta: Meta<typeof FilterWidget> = {
  title: 'Components/FilterWidget',
  component: FilterWidget,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.FilterWidget } },
    layout: 'fullscreen'
  },
  argTypes: {
    state: { control: 'select', options: ['default', 'fewSelected', 'allSelected'] }
  },
  args: {
    options,
    state: 'fewSelected'
  }
};

export default meta;
type Story = StoryObj<typeof FilterWidget>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <VariantSection title="Filter widget">
      <VariantGroup label="Types">
        <FilterWidget options={options.map((option) => ({ ...option, selected: false }))} state="default" />
        <FilterWidget options={options} state="fewSelected" />
        <FilterWidget options={options.map((option) => ({ ...option, selected: true }))} state="allSelected" />
      </VariantGroup>
    </VariantSection>
  )
};
