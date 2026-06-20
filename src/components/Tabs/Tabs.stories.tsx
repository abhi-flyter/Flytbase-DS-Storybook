import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { Icon, icons } from '../icons';
import { VariantGroup, VariantSection } from '../story-helpers';
import type { ControlState } from '../shared';
import { componentDocs } from '../docs';

const items = [
  { value: 'all', label: 'All', icon: <Icon icon={icons.grid} /> },
  { value: 'configuration', label: 'Configuration', icon: <Icon icon={icons.grid} /> },
  { value: 'links', label: 'Links', icon: <Icon icon={icons.grid} /> }
];

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Tabs } },
    layout: 'fullscreen'
  },
  argTypes: {
    visualState: { control: 'select', options: ['default', 'hover', 'pressed', 'focused', 'disabled'] }
  },
  args: {
    items,
    value: 'overview',
    visualState: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => {
    const states: ControlState[] = ['default', 'hover', 'pressed', 'focused', 'disabled'];
    return (
      <VariantSection title="Tabs">
        <VariantGroup label="States">
          {states.map((visualState) => (
            <Tabs items={items} key={visualState} value="all" visualState={visualState} />
          ))}
        </VariantGroup>
        <VariantGroup label="Tab counts">
          {[2, 3, 4, 5].map((count) => (
            <Tabs
              items={Array.from({ length: count }, (_, index) => ({
                value: `tab-${index + 1}`,
                label: index === 0 ? 'All' : `Tab ${index + 1}`,
                icon: <Icon icon={icons.grid} />
              }))}
              key={count}
              value="tab-1"
            />
          ))}
          <Tabs items={[...items, { value: 'disabled', label: 'Disabled', disabled: true, icon: <Icon icon={icons.grid} /> }]} value="all" />
        </VariantGroup>
      </VariantSection>
    );
  }
};
