import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedButton } from './SegmentedButton';
import { VariantGroup, VariantSection } from '../story-helpers';
import type { ControlState } from '../shared';
import { componentDocs } from '../docs';

const sampleItems = [
  { value: 'map', label: 'Map' },
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' }
];

const meta: Meta<typeof SegmentedButton> = {
  title: 'Components/SegmentedButton',
  component: SegmentedButton,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.SegmentedButton } },
    layout: 'fullscreen'
  },
  argTypes: {
    visualState: { control: 'select', options: ['default', 'hover', 'pressed', 'focused', 'disabled'] }
  },
  args: {
    ariaLabel: 'View mode',
    items: sampleItems,
    value: 'map',
    visualState: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof SegmentedButton>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => {
    const states: ControlState[] = ['default', 'hover', 'pressed', 'focused', 'disabled'];
    const itemSets = [2, 3, 4, 5].map((count) =>
      Array.from({ length: count }, (_, index) => ({ value: String(index + 1), label: `S${index + 1}` }))
    );
    return (
      <VariantSection title="Segmented button">
        {itemSets.map((items) => (
          <VariantGroup key={items.length} label={`${items.length} segments`}>
            {states.map((visualState) => (
              <SegmentedButton
                key={`${items.length}-${visualState}`}
                items={items}
                value={items[0].value}
                visualState={visualState}
              />
            ))}
          </VariantGroup>
        ))}
      </VariantSection>
    );
  }
};
