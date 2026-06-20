import type { Meta, StoryObj } from '@storybook/react';
import { Banner, type BannerTone } from './Banner';
import { Button } from '../Button';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Banner } },
    layout: 'fullscreen'
  },
  argTypes: {
    tone: { control: 'select', options: ['warning', 'info', 'caution', 'error'] },
    title: { control: 'text' }
  },
  args: {
    children: 'System message with contextual guidance.',
    dismissible: true,
    title: 'Banner title',
    tone: 'info'
  }
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => {
    const tones: BannerTone[] = ['warning', 'info', 'caution', 'error'];
    return (
      <VariantSection title="Banner">
        <VariantGroup label="With title">
          {tones.map((tone) => (
            <Banner
              actions={
                <>
                  <Button variant="text">Action 2</Button>
                  <Button variant="text">Action 1</Button>
                </>
              }
              key={`title-${tone}`}
              title={`${tone} title`}
              tone={tone}
            >
              Keep operators aware of important state changes.
            </Banner>
          ))}
        </VariantGroup>
        <VariantGroup label="Without title">
          {tones.map((tone) => (
            <Banner
              actions={
                <>
                  <Button variant="text">Action 2</Button>
                  <Button variant="text">Action 1</Button>
                </>
              }
              key={`body-${tone}`}
              tone={tone}
            >
              Compact message for {tone} feedback.
            </Banner>
          ))}
        </VariantGroup>
      </VariantSection>
    );
  }
};
