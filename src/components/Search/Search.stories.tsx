import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Search } from './Search';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Search } },
    layout: 'fullscreen'
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
    visualState: { control: 'select', options: ['default', 'hover', 'pressed', 'focused', 'active'] }
  },
  args: {
    ariaLabel: 'Search drones',
    placeholder: 'Search',
    size: 'medium',
    visualState: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Playground: Story = {};

export const Usage: Story = {
  render: () => {
    const [query, setQuery] = useState('Drone');
    return (
      <VariantSection title="Search Usage">
        <VariantGroup label="Controlled query">
          <Search
            ariaLabel="Search missions"
            onChange={(event) => setQuery(event.currentTarget.value)}
            onClear={() => setQuery('')}
            placeholder="Search missions"
            value={query}
            visualState={query ? 'active' : 'default'}
          />
        </VariantGroup>
      </VariantSection>
    );
  }
};

export const AllVariants: Story = {
  render: () => {
    const sizes: Array<'medium' | 'small'> = ['medium', 'small'];
    const states: Array<'default' | 'hover' | 'pressed' | 'focused' | 'active'> = [
      'default',
      'hover',
      'pressed',
      'focused',
      'active'
    ];
    return (
      <VariantSection title="Search">
        {sizes.map((size) => (
          <VariantGroup key={size} label={size}>
            {states.map((visualState) => (
              <Search
                key={`${size}-${visualState}`}
                ariaLabel={`${size} ${visualState} search`}
                placeholder={visualState === 'active' ? 'Search drones' : 'Search'}
                size={size}
                value={visualState === 'active' ? 'Drone' : ''}
                visualState={visualState}
              />
            ))}
          </VariantGroup>
        ))}
      </VariantSection>
    );
  }
};
