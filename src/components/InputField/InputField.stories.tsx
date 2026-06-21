import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InputField } from './InputField';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.InputField } },
    layout: 'fullscreen'
  },
  argTypes: {
    mode: { control: 'select', options: ['autocomplete', 'dropdown'] },
    visualState: { control: 'select', options: ['default', 'hover', 'pressed', 'focused', 'disabled', 'open'] },
    selection: { control: 'select', options: ['single', 'multiple'] },
    active: { control: 'boolean' }
  },
  args: {
    active: false,
    label: 'Drone',
    mode: 'dropdown',
    placeholder: 'Select drone',
    selection: 'single',
    visualState: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Playground: Story = {};

export const Usage: Story = {
  render: () => {
    const [drone, setDrone] = useState('Drone A');
    const [sites, setSites] = useState<string[]>(['Drone A', 'Drone B']);
    return (
      <VariantSection title="Input Field Usage">
        <VariantGroup label="Controlled selection">
          <InputField
            active
            label="Drone"
            onChange={(value) => setDrone(String(value))}
            options={['Drone A', 'Drone B', 'Drone C']}
            value={drone}
          />
          <InputField
            active
            label="Allowed drones"
            onChange={(value) => setSites(Array.isArray(value) ? value : [value])}
            options={['Drone A', 'Drone B', 'Drone C']}
            selection="multiple"
            value={sites}
          />
        </VariantGroup>
      </VariantSection>
    );
  }
};

export const AllVariants: Story = {
  render: () => {
    const states: Array<'default' | 'hover' | 'pressed' | 'focused' | 'disabled' | 'open'> = [
      'default',
      'hover',
      'pressed',
      'focused',
      'disabled',
      'open'
    ];
    return (
      <VariantSection title="Input Field">
        {(['autocomplete', 'dropdown'] as const).map((mode) => (
          <VariantGroup key={mode} label={mode}>
            {states.flatMap((visualState) =>
              (['single', 'multiple'] as const).flatMap((selection) =>
                [false, true].map((active) => (
                  <InputField
                    key={`${mode}-${visualState}-${selection}-${active}`}
                    active={active}
                    label={`${visualState} ${selection}`}
                    mode={mode}
                    selection={selection}
                    visualState={visualState}
                  />
                ))
              )
            )}
          </VariantGroup>
        ))}
      </VariantSection>
    );
  }
};
