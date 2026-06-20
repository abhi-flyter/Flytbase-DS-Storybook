import type { Meta, StoryObj } from '@storybook/react';
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
