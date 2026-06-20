import type { Meta, StoryObj } from '@storybook/react';
import { Badge, type BadgeTone } from './Badge';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Badge } },
    layout: 'fullscreen'
  },
  argTypes: {
    tone: { control: 'select', options: ['success', 'error', 'caution', 'warning', 'info', 'secondary', 'disabled'] },
    hasPrefix: { control: 'boolean' }
  },
  args: {
    children: 'Status',
    hasPrefix: false,
    tone: 'info'
  }
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => {
    const tones: BadgeTone[] = ['success', 'error', 'caution', 'warning', 'info', 'secondary', 'disabled'];
    return (
      <VariantSection title="Badges">
        <VariantGroup label="Without and with prefix">
          {tones.flatMap((tone) =>
            [false, true].map((hasPrefix) => (
              <Badge key={`${tone}-${hasPrefix}`} hasPrefix={hasPrefix} tone={tone}>
                {tone}
              </Badge>
            ))
          )}
        </VariantGroup>
      </VariantSection>
    );
  }
};
