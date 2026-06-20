import type { Meta, StoryObj } from '@storybook/react';
import { IconButton, type IconButtonState, type IconButtonVariant } from './IconButton';
import { Icon, icons } from '../icons';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.IconButton } },
    layout: 'fullscreen'
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'filled', 'outline'] },
    size: { control: 'select', options: ['default', 'small'] },
    visualState: { control: 'select', options: ['idle', 'hover', 'pressed', 'focused', 'disabled'] }
  },
  args: {
    ariaLabel: 'Create item',
    icon: <Icon icon={icons.plus} />,
    size: 'default',
    variant: 'default',
    visualState: 'idle'
  }
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => {
    const variants: IconButtonVariant[] = ['default', 'filled', 'outline'];
    const sizes: Array<'default' | 'small'> = ['default', 'small'];
    const states: IconButtonState[] = ['idle', 'hover', 'pressed', 'focused', 'disabled'];
    return (
      <VariantSection title="Icon button">
        {variants.map((variant) => (
          <VariantGroup key={variant} label={variant}>
            {sizes.flatMap((size) =>
              states.map((visualState) => (
                <IconButton
                  key={`${variant}-${size}-${visualState}`}
                  ariaLabel={`${variant} ${size} ${visualState} icon button`}
                  size={size}
                  variant={variant}
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
