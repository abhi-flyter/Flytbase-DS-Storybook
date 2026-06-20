import type { Meta, StoryObj } from '@storybook/react';
import { ProgressIndicator } from './ProgressIndicator';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof ProgressIndicator> = {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.ProgressIndicator } },
    layout: 'fullscreen'
  },
  argTypes: {
    variant: { control: 'select', options: ['linear', 'circular'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 5 } }
  },
  args: {
    ariaLabel: 'Upload progress',
    value: 50,
    variant: 'linear'
  }
};

export default meta;
type Story = StoryObj<typeof ProgressIndicator>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <VariantSection title="Progress Indicator">
      <VariantGroup label="Linear bar progress">
        {[5, 50, 100].map((value) => (
          <ProgressIndicator key={value} value={value} />
        ))}
      </VariantGroup>
      <VariantGroup label="Circular progress indicator">
        {[5, 50, 75, 100].map((value) => (
          <ProgressIndicator key={value} value={value} variant="circular" />
        ))}
      </VariantGroup>
    </VariantSection>
  )
};
