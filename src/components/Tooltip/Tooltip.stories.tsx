import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tooltip, type TooltipPlacement } from './Tooltip';
import { Button } from '../Button';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Tooltip } },
    layout: 'fullscreen'
  },
  argTypes: {
    type: { control: 'select', options: ['plain', 'rich'] },
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left-top', 'left-bottom', 'right-top', 'right-bottom']
    }
  },
  args: {
    actionLabel: 'Go to button',
    children: <Button variant="secondary">Hover target</Button>,
    content: 'This section right here contains the text that goes inside of the tooltip.',
    defaultOpen: true,
    placement: 'top',
    title: 'Heading text',
    type: 'plain'
  }
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

async function expectTooltip(root: Element, shouldExist: boolean) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const exists = Boolean(root.querySelector('[role="tooltip"]'));
    if (exists === shouldExist) return;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error(`Expected tooltip ${shouldExist ? 'to open' : 'to close'}`);
}

async function expectText(root: Element, text: string) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (root.textContent?.includes(text)) return;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error(`Expected rendered text: ${text}`);
}

export const Playground: Story = {};

export const Usage: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [actionCount, setActionCount] = useState(0);

    return (
      <VariantSection title="Tooltip Usage">
        <VariantGroup label="Controlled trigger lifecycle">
          <Tooltip
            actionLabel="Inspect"
            content="This tooltip opens on hover and focus, and closes with Escape."
            onAction={() => setActionCount((count) => count + 1)}
            onOpenChange={setOpen}
            open={open}
            title="Tooltip lifecycle"
            type="rich"
          >
            <Button variant="secondary">Focus or hover</Button>
          </Tooltip>
          <p>Tooltip state: {open ? 'open' : 'closed'}</p>
          <p>Action count: {actionCount}</p>
        </VariantGroup>
      </VariantSection>
    );
  },
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector<HTMLElement>('.fds-tooltip');
    if (!trigger) throw new Error('Expected tooltip trigger');

    trigger.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    await expectTooltip(canvasElement, true);
    await expectText(canvasElement, 'Tooltip state: open');

    const action = Array.from(canvasElement.querySelectorAll<HTMLButtonElement>('button')).find((button) => button.textContent === 'Inspect');
    if (!action) throw new Error('Expected tooltip action');
    action.click();
    await expectText(canvasElement, 'Action count: 1');

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await expectTooltip(canvasElement, false);
    await expectText(canvasElement, 'Tooltip state: closed');

    trigger.focus();
    await expectTooltip(canvasElement, true);
  }
};

export const AllVariants: Story = {
  render: () => {
    const placements: TooltipPlacement[] = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left-top',
      'left-bottom',
      'right-top',
      'right-bottom'
    ];
    return (
      <VariantSection title="Tooltip">
        <VariantGroup label="Plain tooltip">
          {placements.map((placement) => (
            <Tooltip content="Supporting text" defaultOpen key={`plain-${placement}`} placement={placement}>
              <Button variant="secondary">{placement}</Button>
            </Tooltip>
          ))}
        </VariantGroup>
        <VariantGroup label="Rich tooltip">
          {placements.map((placement) => (
            <Tooltip
              actionLabel="Go to button"
              content="This section right here contains the text that goes inside of the tooltip."
              defaultOpen
              key={`rich-${placement}`}
              placement={placement}
              title="Heading text"
              type="rich"
            >
              <Button variant="secondary">{placement}</Button>
            </Tooltip>
          ))}
        </VariantGroup>
      </VariantSection>
    );
  }
};
