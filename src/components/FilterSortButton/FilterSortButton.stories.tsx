import type { Meta, StoryObj } from '@storybook/react';
import { FilterSortButton } from './FilterSortButton';
import { VariantGroup, VariantSection } from '../story-helpers';
import type { ControlState } from '../shared';
import { componentDocs } from '../docs';

const meta: Meta<typeof FilterSortButton> = {
  title: 'Components/FilterSortButton',
  component: FilterSortButton,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.FilterSortButton } },
    layout: 'fullscreen'
  },
  argTypes: {
    kind: { control: 'select', options: ['filter', 'sort'] },
    selected: { control: 'boolean' },
    active: { control: 'boolean' },
    visualState: { control: 'select', options: ['default', 'hover', 'pressed', 'focused', 'disabled'] }
  },
  args: {
    active: false,
    activeCount: 2,
    kind: 'filter',
    selected: false,
    visualState: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof FilterSortButton>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => {
    const states: ControlState[] = ['default', 'hover', 'pressed', 'focused', 'disabled'];
    return (
      <VariantSection title="Filter/Sort button">
        {(['filter', 'sort'] as const).map((kind) => (
          <VariantGroup key={kind} label={kind}>
            {states.flatMap((visualState) =>
              [false, true].flatMap((selected) =>
                [false, true].map((active) => (
                  <FilterSortButton
                    active={active}
                    activeCount={2}
                    key={`${kind}-${visualState}-${selected}-${active}`}
                    kind={kind}
                    selected={selected}
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
