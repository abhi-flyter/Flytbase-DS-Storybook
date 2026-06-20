import type { Meta, StoryObj } from '@storybook/react';
import { Loader, type LoaderVariant } from './Loader';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Loader } },
    layout: 'fullscreen'
  },
  argTypes: {
    variant: { control: 'select', options: ['search', 'table', 'panel', 'button'] }
  },
  args: {
    label: 'Loading missions',
    variant: 'table'
  }
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => {
    const variants: LoaderVariant[] = ['search', 'table', 'panel', 'button'];
    return (
      <VariantSection title="Loader">
        <VariantGroup label="In-progress patterns">
          {variants.map((variant) => (
            <Loader key={variant} label={`${variant} loading`} variant={variant} />
          ))}
        </VariantGroup>
      </VariantSection>
    );
  }
};
