import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TextField } from './TextField';
import { VariantGroup, VariantSection } from '../story-helpers';
import type { FieldState } from '../shared';
import { componentDocs } from '../docs';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.TextField } },
    layout: 'fullscreen'
  },
  argTypes: {
    visualState: {
      control: 'select',
      options: ['default', 'hover', 'pressed', 'focused', 'disabled', 'error', 'active', 'description']
    },
    requirement: { control: 'select', options: ['default', 'optional', 'mandatory'] },
    multiline: { control: 'boolean' },
    numberControls: { control: 'select', options: [undefined, 'icon', 'number'] }
  },
  args: {
    helperText: 'Helper text',
    label: 'Field label',
    placeholder: 'Placeholder',
    requirement: 'default',
    visualState: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Playground: Story = {};

export const Usage: Story = {
  render: () => {
    const [name, setName] = useState('Dock safety profile');
    return (
      <VariantSection title="Text Field Usage">
        <VariantGroup label="Controlled product field">
          <TextField
            helperText="Use value and onChange for editable product forms."
            label="Configuration name"
            onChange={(event) => setName(event.currentTarget.value)}
            value={name}
          />
          <TextField
            helperText="Use multiline for description-box input."
            label="Description"
            multiline
            onChange={(event) => setName(event.currentTarget.value)}
            value={name}
            visualState="description"
          />
        </VariantGroup>
      </VariantSection>
    );
  }
};

export const AllVariants: Story = {
  render: () => {
    const states: FieldState[] = [
      'default',
      'hover',
      'pressed',
      'focused',
      'disabled',
      'error',
      'active',
      'description'
    ];
    return (
      <VariantSection title="Text Field">
        <VariantGroup label="Text Field outline">
          {states.map((visualState) => (
            <TextField
              key={visualState}
              helperText={visualState === 'error' ? 'Error message' : 'Helper text'}
              label={`Field ${visualState}`}
              multiline={visualState === 'description'}
              prefix="ID"
              requirement={visualState === 'default' ? 'mandatory' : 'default'}
              suffix={visualState === 'active' ? '24/80' : 'Info'}
              value={visualState === 'active' ? 'Active value' : ''}
              visualState={visualState}
            />
          ))}
        </VariantGroup>
        <VariantGroup label="Number text field">
          <TextField label="Icon progression" numberControls="icon" value={4} />
          <TextField label="Number progression" numberControls="number" value={42} />
        </VariantGroup>
        <VariantGroup label="Header and phone-prefix helpers">
          <TextField label="Phone" prefix="+91" requirement="optional" value="98765 43210" />
          <TextField label="Mandatory asset" prefix="Asset" requirement="mandatory" suffix="Counter" value="Drone" />
        </VariantGroup>
      </VariantSection>
    );
  }
};
