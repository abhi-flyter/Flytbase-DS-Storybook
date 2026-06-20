import type { Meta, StoryObj } from '@storybook/react';
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

export const Playground: Story = {};

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
