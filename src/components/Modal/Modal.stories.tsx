import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Modal } },
    layout: 'fullscreen'
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] }
  },
  args: {
    children: 'Review the mission configuration before continuing.',
    footer: (
      <>
        <Button variant="outline">Back</Button>
        <Button variant="secondary">Cancel</Button>
        <Button>Continue</Button>
      </>
    ),
    size: 'medium',
    tertiaryAction: <Button variant="text">Tertiary CTA</Button>,
    title: 'Confirm mission'
  }
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <VariantSection title="Modal">
      <VariantGroup label="Sizes">
        {(['small', 'medium', 'large'] as const).map((size) => (
          <Modal
            footer={
              <>
                <Button variant="outline">Back</Button>
                <Button variant="secondary">Cancel</Button>
                <Button>Continue</Button>
              </>
            }
            key={size}
            size={size}
            tertiaryAction={<Button variant="text">Tertiary CTA</Button>}
            title={`${size} modal`}
          >
            Modal body slot for focused workflow content.
          </Modal>
        ))}
      </VariantGroup>
    </VariantSection>
  )
};
