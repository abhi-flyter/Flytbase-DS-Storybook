import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast, type ToastTone } from './Toast';
import { Button } from '../Button';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Toast } },
    layout: 'fullscreen'
  },
  argTypes: {
    tone: { control: 'select', options: ['success', 'error', 'warning', 'info'] },
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' }
  },
  args: {
    actionLabel: 'Dismiss',
    children: 'Error 77777: Unable to take-off, battery overheated',
    defaultOpen: true,
    source: 'M30T - DJI Dock',
    timestamp: '9:20 am (GMT + 5:30)',
    title: 'Launch failed',
    tone: 'error'
  }
};

export default meta;
type Story = StoryObj<typeof Toast>;

async function expectText(root: Element, text: string) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (root.textContent?.includes(text)) return;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error(`Expected rendered text: ${text}`);
}

async function expectNoToast(root: Element) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (!root.querySelector('.fds-toast')) return;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error('Expected toast to close');
}

export const Playground: Story = {};

export const Usage: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [actionCount, setActionCount] = useState(0);

    return (
      <VariantSection title="Toast Usage">
        <VariantGroup label="Controlled lifecycle">
          <Button onClick={() => setOpen(true)}>Show toast</Button>
          <Toast
            actionLabel="Acknowledge"
            onAction={() => setActionCount((count) => count + 1)}
            onOpenChange={setOpen}
            open={open}
            source="M30T - DJI Dock"
            title="Launch failed"
            tone="error"
          >
            Error 77777: Unable to take-off, battery overheated
          </Toast>
          <p>Toast state: {open ? 'open' : 'closed'}</p>
          <p>Action count: {actionCount}</p>
        </VariantGroup>
      </VariantSection>
    );
  },
  play: async ({ canvasElement }) => {
    const action = Array.from(canvasElement.querySelectorAll<HTMLButtonElement>('button')).find((button) => button.textContent === 'Acknowledge');
    if (!action) throw new Error('Expected toast action');
    action.click();
    await expectText(canvasElement, 'Action count: 1');

    const closeButton = canvasElement.querySelector<HTMLButtonElement>('button[aria-label="Dismiss notification"]');
    if (!closeButton) throw new Error('Expected toast dismiss button');
    closeButton.click();
    await expectNoToast(canvasElement);
    await expectText(canvasElement, 'Toast state: closed');

    const showButton = Array.from(canvasElement.querySelectorAll<HTMLButtonElement>('button')).find((button) => button.textContent === 'Show toast');
    if (!showButton) throw new Error('Expected show button');
    showButton.click();
    await expectText(canvasElement, 'Launch failed');
  }
};

export const AllVariants: Story = {
  render: () => {
    const tones: ToastTone[] = ['success', 'error', 'warning', 'info'];
    return (
      <VariantSection title="Toast">
        <VariantGroup label="Tones">
          {tones.map((tone) => (
            <Toast action={<Button variant="text">Dismiss</Button>} key={tone} title={tone === 'success' ? 'Mission_name initiated' : 'Launch failed'} tone={tone}>
              {tone === 'success'
                ? 'Mission started successfully'
                : tone === 'info'
                  ? 'You have consumed 2500 video viewer minutes'
                  : 'Error 77777: Unable to take-off, battery overheated'}
            </Toast>
          ))}
        </VariantGroup>
      </VariantSection>
    );
  }
};
