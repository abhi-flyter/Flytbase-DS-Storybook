import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Menu, type MenuItem } from './Menu';
import { Button } from '../Button';
import { Icon, icons } from '../icons';
import { VariantGroup, VariantSection } from '../story-helpers';
import type { ControlState } from '../shared';
import { componentDocs } from '../docs';

const items: MenuItem[] = [
  { value: 'section', label: 'Actions', content: 'sub-title' },
  { value: 'open', label: 'Open mission', prefix: <Icon icon={icons.play} /> },
  { value: 'duplicate', label: 'Duplicate', selected: true, suffix: 'Cmd+D' },
  { value: 'divider', label: 'Divider', content: 'divider' },
  { value: 'delete', label: 'Delete', destructive: true, prefix: <Icon icon={icons.x} /> }
];

const selectionItems: MenuItem[] = [
  { value: 'online', label: 'Online docks' },
  { value: 'warning', label: 'Warning docks' },
  { value: 'offline', label: 'Offline docks', disabled: true }
];

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Menu } },
    layout: 'fullscreen'
  },
  argTypes: {
    selectionType: { control: 'select', options: ['single', 'multi', 'action'] },
    type: { control: 'select', options: ['menu', 'dropdown'] },
    visualState: { control: 'select', options: ['default', 'hover', 'pressed', 'focused', 'disabled'] }
  },
  args: {
    footer: <Button variant="text">Select all</Button>,
    items,
    selectionType: 'action',
    title: 'Actions',
    type: 'menu',
    visualState: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof Menu>;

async function expectText(root: Element, text: string) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (root.textContent?.includes(text)) return;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error(`Expected rendered text: ${text}`);
}

function getButton(root: Element, label: string) {
  const button = Array.from(root.querySelectorAll<HTMLButtonElement>('button')).find((candidate) => candidate.textContent?.includes(label));
  if (!button) throw new Error(`Expected button ${label}`);
  return button;
}

export const Playground: Story = {};

export const Usage: Story = {
  render: () => {
    const [lastAction, setLastAction] = useState('none');
    const [singleSelection, setSingleSelection] = useState(['online']);
    const [multiSelection, setMultiSelection] = useState(['online']);

    return (
      <VariantSection title="Menu Usage">
        <VariantGroup label="Controlled actions and selection">
          <div>
            <Menu
              ariaLabel="Mission actions"
              items={items}
              onAction={setLastAction}
              selectionType="action"
              title="Actions"
            />
            <p>Last action: {lastAction}</p>
          </div>
          <div>
            <Menu
              ariaLabel="Dock status single"
              items={selectionItems}
              onSelectionChange={setSingleSelection}
              selectedValues={singleSelection}
              selectionType="single"
              title="Single select"
              type="dropdown"
            />
            <p>Single: {singleSelection.join(', ')}</p>
          </div>
          <div>
            <Menu
              ariaLabel="Dock status multi"
              items={selectionItems}
              onSelectionChange={setMultiSelection}
              selectedValues={multiSelection}
              selectionType="multi"
              title="Multi select"
              type="dropdown"
            />
            <p>Multi: {multiSelection.join(', ')}</p>
          </div>
        </VariantGroup>
      </VariantSection>
    );
  },
  play: async ({ canvasElement }) => {
    getButton(canvasElement, 'Open mission').click();
    await expectText(canvasElement, 'Last action: open');

    getButton(canvasElement, 'Warning docks').click();
    await expectText(canvasElement, 'Single: warning');

    const multiWarning = Array.from(canvasElement.querySelectorAll<HTMLButtonElement>('[aria-label="Dock status multi"] button')).find((button) =>
      button.textContent?.includes('Warning docks')
    );
    if (!multiWarning) throw new Error('Expected multi-select warning option');
    multiWarning.click();
    await expectText(canvasElement, 'Multi: online, warning');

    multiWarning.focus();
    multiWarning.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    const focusedValue = document.activeElement?.getAttribute('data-menu-value');
    if (focusedValue !== 'online') {
      throw new Error(`Expected ArrowUp to focus online, received ${focusedValue ?? 'none'}`);
    }
  }
};

export const AllVariants: Story = {
  render: () => {
    const states: ControlState[] = ['default', 'hover', 'pressed', 'focused', 'disabled'];
    return (
      <VariantSection title="Menu">
        {(['action', 'single', 'multi'] as const).map((selectionType) => (
          <VariantGroup key={selectionType} label={selectionType}>
            {states.map((visualState) => (
              <Menu
                footer={<Button variant="text">{selectionType === 'multi' ? 'Select all' : 'Footer CTA'}</Button>}
                items={items}
                key={`${selectionType}-${visualState}`}
                selectionType={selectionType}
                title={`${visualState} menu`}
                type={selectionType === 'action' ? 'menu' : 'dropdown'}
                visualState={visualState}
              />
            ))}
          </VariantGroup>
        ))}
      </VariantSection>
    );
  }
};
