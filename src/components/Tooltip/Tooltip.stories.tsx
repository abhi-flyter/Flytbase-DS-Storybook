import type { Meta, StoryObj } from '@storybook/react';
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
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left-top', 'left-bottom', 'right-top', 'right-bottom']
    }
  },
  args: {
    actionLabel: 'Go to button',
    children: <Button variant="secondary">Hover target</Button>,
    content: 'This section right here contains the text that goes inside of the tooltip.',
    placement: 'top',
    title: 'Heading text',
    type: 'plain'
  }
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {};

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
            <Tooltip content="Supporting text" key={`plain-${placement}`} placement={placement}>
              <Button variant="secondary">{placement}</Button>
            </Tooltip>
          ))}
        </VariantGroup>
        <VariantGroup label="Rich tooltip">
          {placements.map((placement) => (
            <Tooltip
              actionLabel="Go to button"
              content="This section right here contains the text that goes inside of the tooltip."
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
