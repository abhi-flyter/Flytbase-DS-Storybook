import type { Meta, StoryObj } from '@storybook/react';
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
    tone: { control: 'select', options: ['success', 'error', 'warning', 'info'] }
  },
  args: {
    action: <Button variant="text">Dismiss</Button>,
    children: 'Error 77777: Unable to take-off, battery overheated',
    source: 'M30T - DJI Dock',
    timestamp: '9:20 am (GMT + 5:30)',
    title: 'Launch failed',
    tone: 'error'
  }
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Playground: Story = {};

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
