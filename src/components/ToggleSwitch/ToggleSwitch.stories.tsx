import type { Meta, StoryObj } from '@storybook/react';
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
