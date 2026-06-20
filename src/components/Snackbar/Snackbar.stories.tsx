import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from './Snackbar';
import { Button } from '../Button';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Snackbar } },
    layout: 'fullscreen'
  },
  args: {
    action: <Button variant="text">View files</Button>,
    children: 'Snackbar message',
    tone: 'success'
  }
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <VariantSection title="Snackbar">
      <VariantGroup label="Message forms">
        <Snackbar tone="success">Mission saved</Snackbar>
        <Snackbar action={<Button variant="text">View files</Button>} tone="error">Zone sync failed</Snackbar>
        <Snackbar action={<Button variant="text">View files</Button>} tone="caution">Mission archived</Snackbar>
        <Snackbar action={<Button variant="text">View files</Button>} tone="info">Tag created</Snackbar>
      </VariantGroup>
    </VariantSection>
  )
};
