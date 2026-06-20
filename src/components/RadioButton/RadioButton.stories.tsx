import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';
import { VariantGroup, VariantSection } from '../story-helpers';
import type { ControlState } from '../shared';
import { componentDocs } from '../docs';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.RadioButton } },
    layout: 'fullscreen'
  },
  argTypes: {
    selected: { control: 'boolean' },
    boxSize: { control: 'select', options: ['16px', '20px'] },
    visualState: { control: 'select', options: ['default', 'hover', 'pressed', 'focused', 'disabled'] }
  },
  args: {
    boxSize: '20px',
    label: 'Choice',
    name: 'storybook-radio',
    selected: false,
    visualState: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => {
    const sizes: Array<'16px' | '20px'> = ['16px', '20px'];
    const states: ControlState[] = ['default', 'hover', 'pressed', 'focused', 'disabled'];
    return (
      <VariantSection title="Radio button">
        {[false, true].map((selected) => (
          <VariantGroup key={String(selected)} label={selected ? 'selected' : 'unselected'}>
            {sizes.flatMap((boxSize) =>
              states.map((visualState) => (
                <RadioButton
                  key={`${selected}-${boxSize}-${visualState}`}
                  boxSize={boxSize}
                  label={`${boxSize} ${visualState}`}
                  name={`radio-${selected}-${boxSize}-${visualState}`}
                  selected={selected}
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
