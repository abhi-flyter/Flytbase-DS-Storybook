import type { Meta, StoryObj } from '@storybook/react';
import { ToggleButton } from './ToggleButton';
import { VariantGroup, VariantSection } from '../story-helpers';
import type { ControlState } from '../shared';
import { componentDocs } from '../docs';

const meta: Meta<typeof ToggleButton> = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.ToggleButton } },
    layout: 'fullscreen'
  },
  argTypes: {
    visualState: { control: 'select', options: ['default', 'hover', 'pressed', 'focused', 'disabled'] }
  },
  args: {
    ariaLabel: 'Layer toggles',
    items: [
      { value: 'drone', label: 'Drone' },
      { value: 'dock', label: 'Dock' },
      { value: 'route', label: 'Route' }
    ],
    values: ['drone'],
    visualState: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => {
    const states: ControlState[] = ['default', 'hover', 'pressed', 'focused', 'disabled'];
    const itemSets = [2, 3, 4, 5].map((count) =>
      Array.from({ length: count }, (_, index) => ({ value: String(index + 1), label: `T${index + 1}` }))
    );
    return (
      <VariantSection title="Toggle button">
        {itemSets.map((items) => (
          <VariantGroup key={items.length} label={`${items.length} segments`}>
            {states.map((visualState) => (
              <ToggleButton
                key={`${items.length}-${visualState}`}
                items={items}
                values={[items[0].value]}
                visualState={visualState}
              />
            ))}
          </VariantGroup>
        ))}
      </VariantSection>
    );
  }
};
