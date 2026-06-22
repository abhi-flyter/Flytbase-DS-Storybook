import type { ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { iconComponents, type IconComponentName, type IconProps } from '../icons';

type IconEntry = [IconComponentName, ComponentType<IconProps>];

type IconPlaygroundArgs = {
  iconName: IconComponentName;
  size: number;
  color: string;
};

const iconEntries = Object.entries(iconComponents) as IconEntry[];
const iconNames = iconEntries.map(([name]) => name);
const defaultIconName = iconNames.includes('IconHamburgerMenu311523') ? 'IconHamburgerMenu311523' : iconNames[0];

const meta: Meta<IconPlaygroundArgs> = {
  title: 'Foundations/Icons',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma-exported SVG icon and marker components generated from src/icons/svg. Each component accepts size, color, title, and standard SVG props.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    iconName: {
      control: 'select',
      options: iconNames
    },
    size: {
      control: { type: 'range', min: 8, max: 96, step: 1 }
    },
    color: {
      control: 'color'
    }
  }
};

export default meta;

type Story = StoryObj<IconPlaygroundArgs>;

export const IconGallery: Story = {
  render: () => (
    <section className="story-surface foundation-icon-doc">
      <div className="foundation-doc-header">
        <p className="foundation-eyebrow">Figma SVG exports</p>
        <h1>Icon Gallery</h1>
      </div>

      <div className="foundation-icon-grid">
        {iconEntries.map(([name, Icon]) => (
          <article className="foundation-icon-card" key={name}>
            <span className="foundation-icon-preview">
              <Icon size={28} color="currentColor" aria-hidden="true" />
            </span>
            <code title={name}>{name}</code>
          </article>
        ))}
      </div>
    </section>
  )
};

export const IconPlayground: Story = {
  args: {
    iconName: defaultIconName,
    size: 32,
    color: 'currentColor'
  },
  render: ({ iconName, size, color }) => {
    const Icon = iconComponents[iconName];

    return (
      <section className="story-surface foundation-icon-doc">
        <div className="foundation-doc-header">
          <p className="foundation-eyebrow">Interactive preview</p>
          <h1>Icon Playground</h1>
        </div>

        <div className="foundation-icon-playground">
          <div className="foundation-icon-playground-preview">
            <Icon size={size} color={color} title={iconName} />
          </div>
          <div className="foundation-icon-playground-meta">
            <strong>{iconName}</strong>
            <code>{`<${iconName} size={${size}} color="${color}" />`}</code>
          </div>
        </div>
      </section>
    );
  }
};
