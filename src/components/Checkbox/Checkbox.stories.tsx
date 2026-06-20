import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { VariantGroup, VariantSection } from '../story-helpers';
import type { ControlState } from '../shared';
import { componentDocs } from '../docs';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Checkbox } },
    layout: 'fullscreen'
  },
  argTypes: {
    selection: { control: 'select', options: ['unselected', 'selected', 'indeterminate'] },
    boxSize: { control: 'select', options: ['16px', '20px'] },
    visualState: { control: 'select', options: ['default', 'hover', 'pressed', 'focused', 'disabled'] }
  },
  args: {
    boxSize: '20px',
    label: 'Option',
    selection: 'unselected',
    visualState: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => {
    const selections: Array<'unselected' | 'indeterminate' | 'selected'> = ['unselected', 'indeterminate', 'selected'];
    const sizes: Array<'16px' | '20px'> = ['16px', '20px'];
    const states: ControlState[] = ['default', 'hover', 'pressed', 'focused', 'disabled'];
    return (
      <VariantSection title="Checkbox">
        {selections.map((selection) => (
          <VariantGroup key={selection} label={selection}>
            {sizes.flatMap((boxSize) =>
              states.map((visualState) => (
                <Checkbox
                  key={`${selection}-${boxSize}-${visualState}`}
                  boxSize={boxSize}
                  label={`${boxSize} ${visualState}`}
                  selection={selection}
                  visualState={visualState}
                />
              ))
            )}
          </VariantGroup>
        ))}
      </VariantSection>
    );
  }
};
