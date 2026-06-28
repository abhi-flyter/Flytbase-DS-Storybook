import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { List } from './List';
import { Icon, icons } from '../icons';
import { VariantGroup, VariantSection } from '../story-helpers';
import type { ControlState } from '../shared';
import { componentDocs } from '../docs';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.List } },
    layout: 'fullscreen'
  },
  argTypes: {
    size: { control: 'select', options: ['default', 'small'] },
    expanded: { control: 'boolean' },
    visualState: { control: 'select', options: ['default', 'hover', 'pressed', 'focused', 'disabled'] }
  },
  args: {
    description: 'Supporting metadata',
    label: 'Mission row',
    prefix: <Icon icon={icons.gripVertical} />,
    size: 'default',
    suffix: <Icon icon={icons.chevronDown} />,
    visualState: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof List>;

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
  const button = Array.from(root.querySelectorAll<HTMLButtonElement>('button')).find((candidate) => candidate.textContent?.includes(label));
  if (!button) throw new Error(`Expected button ${label}`);
  return button;
}

export const Playground: Story = {};

export const Usage: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <VariantSection title="List Usage">
        <VariantGroup label="Controlled expansion">
          <List
            description="Dock 12, Mavic 3, scheduled"
            expanded={expanded}
            label="Mission Alpha"
            onExpandedChange={setExpanded}
            prefix={<Icon icon={icons.gripVertical} />}
            suffix={<Icon icon={expanded ? icons.chevronDown : icons.chevronRight} />}
          >
            Expanded state: {expanded ? 'expanded' : 'collapsed'}
          </List>
          <List
            description="Disabled rows do not emit expansion changes"
            disabled
            label="Mission Bravo"
            onExpandedChange={setExpanded}
            prefix={<Icon icon={icons.gripVertical} />}
            suffix={<Icon icon={icons.chevronRight} />}
          />
        </VariantGroup>
      </VariantSection>
    );
  },
  play: async ({ canvasElement }) => {
    const missionAlpha = getButton(canvasElement, 'Mission Alpha');
    const missionBravo = getButton(canvasElement, 'Mission Bravo');

    await expectAttribute(missionAlpha, 'aria-expanded', 'false');
    missionAlpha.click();
    await expectAttribute(missionAlpha, 'aria-expanded', 'true');
    await expectText(canvasElement, 'Expanded state: expanded');

    missionBravo.click();
    await expectAttribute(missionAlpha, 'aria-expanded', 'true');

    missionAlpha.click();
    await expectAttribute(missionAlpha, 'aria-expanded', 'false');
  }
};

export const AllVariants: Story = {
  render: () => {
    const states: ControlState[] = ['default', 'hover', 'pressed', 'focused', 'disabled'];
    return (
      <VariantSection title="List">
        {(['default', 'small'] as const).map((size) => (
          <VariantGroup key={size} label={size}>
            {states.map((visualState) => (
              <List
                description="Drone, dock, and schedule details"
                key={`${size}-${visualState}`}
                label={`${visualState} row`}
                prefix={<Icon icon={icons.gripVertical} />}
                size={size}
                suffix={<Icon icon={icons.chevronRight} />}
                visualState={visualState}
              />
            ))}
            <List
              expanded
              label="Expanded row"
              onToggle={() => undefined}
              prefix={<Icon icon={icons.gripVertical} />}
              size={size}
              suffix={<Icon icon={icons.chevronDown} />}
            >
              Expanded supporting content.
            </List>
          </VariantGroup>
        ))}
      </VariantSection>
    );
  }
};
