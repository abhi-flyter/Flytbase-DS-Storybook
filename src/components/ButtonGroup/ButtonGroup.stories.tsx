import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.ButtonGroup } },
    layout: 'fullscreen'
  },
  argTypes: {
    padding: { control: 'select', options: ['default', 'tight', 'loose'] }
  },
  args: {
    children: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button>Save</Button>
      </>
    ),
    padding: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <VariantSection title="Button group">
      <VariantGroup label="Padding axis">
        {(['tight', 'default', 'loose'] as const).map((padding) => (
          <ButtonGroup key={padding} padding={padding}>
            <Button variant="secondary">Cancel</Button>
            <Button>Confirm</Button>
          </ButtonGroup>
        ))}
      </VariantGroup>
    </VariantSection>
  )
};
