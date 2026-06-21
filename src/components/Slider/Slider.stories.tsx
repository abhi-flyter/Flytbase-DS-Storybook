import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider, type SliderValue } from './Slider';
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

export const Usage: Story = {
  render: () => {
    const [altitude, setAltitude] = useState<SliderValue>(60);
    const [temperatureRange, setTemperatureRange] = useState<SliderValue>([20, 70]);
    return (
      <VariantSection title="Slider Usage">
        <VariantGroup label="Controlled values">
          <Slider label="Return altitude" onChange={setAltitude} unit="m" value={altitude} />
          <Slider label="Safe temperature range" mode="range" onChange={setTemperatureRange} unit="°C" value={temperatureRange} />
        </VariantGroup>
      </VariantSection>
    );
  }
};

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
