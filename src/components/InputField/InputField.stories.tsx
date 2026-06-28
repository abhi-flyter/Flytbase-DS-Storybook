import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InputField } from './InputField';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.InputField } },
    layout: 'fullscreen'
  },
  argTypes: {
    mode: { control: 'select', options: ['autocomplete', 'dropdown'] },
    visualState: { control: 'select', options: ['default', 'hover', 'pressed', 'focused', 'disabled', 'open'] },
    selection: { control: 'select', options: ['single', 'multiple'] },
    active: { control: 'boolean' }
  },
  args: {
    active: false,
    label: 'Drone',
    mode: 'dropdown',
    placeholder: 'Select drone',
    selection: 'single',
    visualState: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof InputField>;

async function expectText(root: Element, text: string) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (root.textContent?.includes(text)) return;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error(`Expected rendered text: ${text}`);
}

async function expectAttribute(element: Element, name: string, value: string) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (element.getAttribute(name) === value) return;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error(`Expected ${name}="${value}", received "${element.getAttribute(name) ?? 'null'}"`);
}

function getButton(root: Element, label: string) {
  const button = Array.from(root.querySelectorAll<HTMLButtonElement>('button')).find((candidate) => candidate.getAttribute('aria-label') === label);
  if (!button) throw new Error(`Expected button ${label}`);
  return button;
}

async function pressKey(target: HTMLElement, key: string) {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  await new Promise((resolve) => setTimeout(resolve, 20));
}

export const Playground: Story = {};

export const Usage: Story = {
  render: () => {
    const [drone, setDrone] = useState('Drone A');
    const [open, setOpen] = useState(false);
    const [sites, setSites] = useState<string[]>(['Drone A', 'Drone B']);
    return (
      <VariantSection title="Input Field Usage">
        <VariantGroup label="Controlled selection">
          <InputField
            active
            label="Drone"
            onChange={(value) => setDrone(String(value))}
            onOpenChange={setOpen}
            open={open}
            options={['Drone A', 'Drone B', 'Drone C']}
            value={drone}
          />
          <span>Selected drone: {drone}</span>
          <span>Menu state: {open ? 'open' : 'closed'}</span>
          <InputField
            active
            label="Allowed drones"
            onChange={(value) => setSites(Array.isArray(value) ? value : [value])}
            options={['Drone A', 'Drone B', 'Drone C']}
            selection="multiple"
            value={sites}
          />
        </VariantGroup>
      </VariantSection>
    );
  },
  play: async ({ canvasElement }) => {
    const droneButton = getButton(canvasElement, 'Drone');

    await expectAttribute(droneButton, 'aria-expanded', 'false');
    droneButton.click();
    await expectAttribute(droneButton, 'aria-expanded', 'true');
    await expectText(canvasElement, 'Menu state: open');

    await pressKey(droneButton, 'ArrowDown');
    await pressKey(droneButton, 'ArrowDown');
    await pressKey(droneButton, 'Enter');
    await expectText(canvasElement, 'Selected drone: Drone C');
    await expectAttribute(droneButton, 'aria-expanded', 'false');

    droneButton.click();
    await pressKey(droneButton, 'Escape');
    await expectText(canvasElement, 'Menu state: closed');
  }
};

export const AllVariants: Story = {
  render: () => {
    const states: Array<'default' | 'hover' | 'pressed' | 'focused' | 'disabled' | 'open'> = [
      'default',
      'hover',
      'pressed',
      'focused',
      'disabled',
      'open'
    ];
    return (
      <VariantSection title="Input Field">
        {(['autocomplete', 'dropdown'] as const).map((mode) => (
          <VariantGroup key={mode} label={mode}>
            {states.flatMap((visualState) =>
              (['single', 'multiple'] as const).flatMap((selection) =>
                [false, true].map((active) => (
                  <InputField
                    key={`${mode}-${visualState}-${selection}-${active}`}
                    active={active}
                    label={`${visualState} ${selection}`}
                    mode={mode}
                    selection={selection}
                    visualState={visualState}
                  />
                ))
              )
            )}
          </VariantGroup>
        ))}
      </VariantSection>
    );
  }
};
