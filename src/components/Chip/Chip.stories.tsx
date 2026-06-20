import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import { VariantGroup, VariantSection } from '../story-helpers';
import type { ControlState } from '../shared';
import { componentDocs } from '../docs';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Chip } },
    layout: 'fullscreen'
  },
  argTypes: {
    kind: { control: 'select', options: ['input', 'choice', 'filter'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    selected: { control: 'boolean' },
    selectionType: { control: 'select', options: ['single', 'multi'] },
    visualState: { control: 'select', options: ['default', 'hover', 'pressed', 'focused', 'disabled'] }
  },
  args: {
    children: 'Chip',
    kind: 'choice',
    selected: false,
    selectionType: 'single',
    size: 'medium',
    visualState: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
    const states: ControlState[] = ['default', 'hover', 'pressed', 'focused', 'disabled'];
    return (
      <VariantSection title="Chips">
        <VariantGroup label="Input chip">
          {sizes.flatMap((size) =>
            states
              .filter((state) => state !== 'disabled')
              .flatMap((visualState) =>
                [false, true].map((selected) => (
                  <Chip
                    key={`input-${size}-${visualState}-${selected}`}
                    kind="input"
                    prefix="A"
                    selected={selected}
                    size={size}
                    visualState={visualState}
                  >
                    {size}
                  </Chip>
                ))
              )
          )}
        </VariantGroup>
        <VariantGroup label="Choice chips">
          {states.flatMap((visualState) =>
            [false, true].map((selected) => (
              <Chip key={`choice-${visualState}-${selected}`} kind="choice" selected={selected} visualState={visualState}>
                {visualState}
              </Chip>
            ))
          )}
        </VariantGroup>
        <VariantGroup label="Filter chip">
          {(['single', 'multi'] as const).flatMap((selectionType) =>
            [false, true].flatMap((selected) =>
              states.map((visualState) => (
                <Chip
                  key={`filter-${selectionType}-${selected}-${visualState}`}
                  kind="filter"
                  selected={selected}
                  selectionType={selectionType}
                  visualState={visualState}
                >
                  {selectionType}
                </Chip>
              ))
            )
          )}
        </VariantGroup>
      </VariantSection>
    );
  }
};
