import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Snackbar } from './Snackbar';
import { Button } from '../Button';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Snackbar } },
    layout: 'fullscreen'
  },
  args: {
    actionLabel: 'View files',
    children: 'Snackbar message',
    defaultOpen: true,
    tone: 'success'
  }
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

async function expectText(root: Element, text: string) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (root.textContent?.includes(text)) return;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error(`Expected rendered text: ${text}`);
}

async function expectNoSnackbar(root: Element) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (!root.querySelector('.fds-snackbar')) return;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error('Expected snackbar to close');
}

export const Playground: Story = {};

export const Usage: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [actionCount, setActionCount] = useState(0);

    return (
      <VariantSection title="Snackbar Usage">
        <VariantGroup label="Controlled lifecycle">
          <Button onClick={() => setOpen(true)}>Show snackbar</Button>
          <Snackbar
            actionLabel="View files"
            onAction={() => setActionCount((count) => count + 1)}
            onOpenChange={setOpen}
            open={open}
            tone="success"
          >
            Mission saved
          </Snackbar>
          <p>Snackbar state: {open ? 'open' : 'closed'}</p>
          <p>Action count: {actionCount}</p>
        </VariantGroup>
      </VariantSection>
    );
  },
  play: async ({ canvasElement }) => {
    const action = Array.from(canvasElement.querySelectorAll<HTMLButtonElement>('button')).find((button) => button.textContent === 'View files');
    if (!action) throw new Error('Expected snackbar action');
    action.click();
    await expectText(canvasElement, 'Action count: 1');

    const closeButton = canvasElement.querySelector<HTMLButtonElement>('button[aria-label="Dismiss"]');
    if (!closeButton) throw new Error('Expected dismiss button');
    closeButton.click();
    await expectNoSnackbar(canvasElement);
    await expectText(canvasElement, 'Snackbar state: closed');

    const showButton = Array.from(canvasElement.querySelectorAll<HTMLButtonElement>('button')).find((button) => button.textContent === 'Show snackbar');
    if (!showButton) throw new Error('Expected show button');
    showButton.click();
    await expectText(canvasElement, 'Mission saved');
  }
};

export const AllVariants: Story = {
  render: () => (
    <VariantSection title="Snackbar">
      <VariantGroup label="Message forms">
        <Snackbar tone="success">Mission saved</Snackbar>
        <Snackbar action={<Button variant="text">View files</Button>} tone="error">Zone sync failed</Snackbar>
        <Snackbar actionLabel="View files" tone="caution">Mission archived</Snackbar>
        <Snackbar actionLabel="View files" tone="info">Tag created</Snackbar>
      </VariantGroup>
    </VariantSection>
  )
};
