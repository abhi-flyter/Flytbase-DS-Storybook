import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const modalFooter = (
  <>
    <Button variant="outline">Back</Button>
    <Button variant="secondary">Cancel</Button>
    <Button>Continue</Button>
  </>
);

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Modal } },
    layout: 'fullscreen'
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' }
  },
  args: {
    children: 'Review the mission configuration before continuing.',
    defaultOpen: true,
    footer: modalFooter,
    size: 'medium',
    tertiaryAction: <Button variant="text">Tertiary CTA</Button>,
    title: 'Confirm mission'
  }
};

export default meta;
type Story = StoryObj<typeof Modal>;

async function expectText(root: Element, text: string) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (root.textContent?.includes(text)) return;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error(`Expected rendered text: ${text}`);
}

async function expectNoDialog(root: Element) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (!root.querySelector('[role="dialog"]')) return;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error('Expected dialog to close');
}

export const Playground: Story = {};

export const Usage: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <VariantSection title="Modal Usage">
        <VariantGroup label="Controlled dialog">
          <Button onClick={() => setOpen(true)}>Open modal</Button>
          <Modal
            footer={modalFooter}
            onOpenChange={setOpen}
            open={open}
            tertiaryAction={<Button variant="text">Tertiary CTA</Button>}
            title="Confirm mission"
          >
            Review the mission configuration before continuing.
          </Modal>
          <p>Open state: {open ? 'open' : 'closed'}</p>
        </VariantGroup>
      </VariantSection>
    );
  },
  play: async ({ canvasElement }) => {
    await expectText(canvasElement, 'Open state: open');

    const closeButton = canvasElement.querySelector<HTMLButtonElement>('button[aria-label="Close"]');
    if (!closeButton) throw new Error('Expected close button');
    closeButton.click();
    await expectNoDialog(canvasElement);
    await expectText(canvasElement, 'Open state: closed');

    const openButton = Array.from(canvasElement.querySelectorAll<HTMLButtonElement>('button')).find((button) => button.textContent === 'Open modal');
    if (!openButton) throw new Error('Expected open button');
    openButton.click();
    await expectText(canvasElement, 'Confirm mission');

    const dialog = canvasElement.querySelector<HTMLElement>('[role="dialog"]');
    if (!dialog) throw new Error('Expected dialog after reopen');
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await expectNoDialog(canvasElement);
  }
};

export const AllVariants: Story = {
  render: () => (
    <VariantSection title="Modal">
      <VariantGroup label="Sizes">
        {(['small', 'medium', 'large'] as const).map((size) => (
          <Modal
            footer={modalFooter}
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
