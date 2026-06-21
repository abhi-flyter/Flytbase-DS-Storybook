import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ToggleSwitch } from './ToggleSwitch';
import { VariantGroup, VariantSection } from '../story-helpers';
import type { ControlState } from '../shared';
import { componentDocs } from '../docs';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.ToggleSwitch } },
    layout: 'fullscreen'
  },
  argTypes: {
    selected: { control: 'boolean' },
    visualState: { control: 'select', options: ['default', 'hover', 'pressed', 'focused', 'disabled', 'loader'] }
  },
  args: {
    label: 'Enable setting',
    selected: false,
    visualState: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof ToggleSwitch>;

export const Playground: Story = {};

export const Usage: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(true);
    return (
      <VariantSection title="Toggle Switch Usage">
        <VariantGroup label="Controlled immediate setting">
          <ToggleSwitch
            label="Enable automated return-to-dock"
            onSelectedChange={setEnabled}
            selected={enabled}
          />
        </VariantGroup>
      </VariantSection>
    );
  }
};

export const AllVariants: Story = {
  render: () => {
    const states: Array<ControlState | 'loader'> = ['default', 'hover', 'pressed', 'focused', 'disabled', 'loader'];
    return (
      <VariantSection title="Toggle switch">
        {[false, true].map((selected) => (
          <VariantGroup key={String(selected)} label={selected ? 'selected' : 'unselected'}>
            {states.map((visualState) => (
              <ToggleSwitch
                key={`${selected}-${visualState}`}
                label={visualState}
                selected={selected}
                visualState={visualState}
              />
            ))}
          </VariantGroup>
        ))}
      </VariantSection>
    );
  }
};
