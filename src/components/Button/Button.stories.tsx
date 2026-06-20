import type { Meta, StoryObj } from '@storybook/react';
import { Button, type ButtonSize, type ButtonState, type ButtonVariant } from './Button';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Button } },
    layout: 'fullscreen'
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'tonal', 'text', 'link'] },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    visualState: { control: 'select', options: ['idle', 'hover', 'pressed', 'focused', 'disabled'] },
    loading: { control: 'boolean' }
  },
  args: {
    children: 'Action',
    size: 'default',
    variant: 'primary',
    visualState: 'idle'
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const AllVariants: Story = {
  name: 'All Figma variants',
  render: () => {
    const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'tonal', 'text', 'link'];
    const sizes: ButtonSize[] = ['default', 'small', 'large'];
    const states: ButtonState[] = ['idle', 'hover', 'pressed', 'focused', 'disabled'];
    return (
      <VariantSection title="Button CTA">
        {variants.map((variant) => (
          <VariantGroup key={variant} label={variant}>
            {sizes.flatMap((size) =>
              states.map((visualState) => (
                <Button key={`${variant}-${size}-${visualState}`} size={size} variant={variant} visualState={visualState}>
                  {size} {visualState}
                </Button>
              ))
            )}
          </VariantGroup>
        ))}
        <VariantGroup label="Loader">
          <Button loading>Loading</Button>
        </VariantGroup>
      </VariantSection>
    );
  }
};
