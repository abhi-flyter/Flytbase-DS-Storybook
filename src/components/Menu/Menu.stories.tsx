import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';
import { Button } from '../Button';
import { Icon, icons } from '../icons';
import { VariantGroup, VariantSection } from '../story-helpers';
import type { ControlState } from '../shared';
import { componentDocs } from '../docs';

const items = [
  { value: 'section', label: 'Actions', content: 'sub-title' as const },
  { value: 'open', label: 'Open mission', prefix: <Icon icon={icons.play} /> },
  { value: 'duplicate', label: 'Duplicate', selected: true, suffix: '⌘D' },
  { value: 'divider', label: 'Divider', content: 'divider' as const },
  { value: 'delete', label: 'Delete', destructive: true, prefix: <Icon icon={icons.x} /> }
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

export const Playground: Story = {};

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
