import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Slider } },
    layout: 'fullscreen'
  },
  argTypes: {
    mode: { control: 'select', options: ['single', 'range'] },
    disabled: { control: 'boolean' }
  },
  args: {
    mode: 'single',
    value: 50
  }
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <VariantSection title="Slider">
      <VariantGroup label="Figma modes">
        <Slider value={50} />
        <Slider mode="range" value={[30, 70]} />
        <Slider disabled value={50} />
        <Slider disabled mode="range" value={[30, 70]} />
      </VariantGroup>
    </VariantSection>
  )
};
