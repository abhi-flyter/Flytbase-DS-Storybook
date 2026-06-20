import type { Meta, StoryObj } from '@storybook/react';

const colorTokens = [
  '--color-fds-background-bg',
  '--color-fds-background-level-1',
  '--color-fds-background-level-2',
  '--color-fds-background-level-3',
  '--color-fds-primary-50',
  '--color-fds-primary-100',
  '--color-fds-primary-200-p',
  '--color-fds-secondary-100',
  '--color-fds-secondary-200-p',
  '--color-fds-text-icon-01',
  '--color-fds-text-icon-02',
  '--color-fds-outline-o-primary',
  '--color-fds-critical-system-success-s-30p',
  '--color-fds-critical-system-error-e-40',
  '--color-fds-critical-system-warning-w-30p',
  '--color-fds-critical-system-info-i-50'
];

const spacingTokens = [
  '--spacing-fds-size-0',
  '--spacing-fds-size-50',
  '--spacing-fds-size-100',
  '--spacing-fds-size-150',
  '--spacing-fds-size-200',
  '--spacing-fds-size-300',
  '--spacing-fds-size-400',
  '--spacing-fds-size-600',
  '--spacing-fds-full'
];

const typographySamples = [
  ['10', '--typography-font-size-10', '--typography-line-height-tight'],
  ['12', '--typography-font-size-12', '--typography-line-height-tight'],
  ['14', '--typography-font-size-14', '--typography-line-height-normal'],
  ['16', '--typography-font-size-16', '--typography-line-height-relaxed'],
  ['18', '--typography-font-size-18', '--typography-line-height-relaxed'],
  ['20', '--typography-font-size-20', '--typography-line-height-loose']
] as const;

const meta: Meta = {
  title: 'Foundations/Tokens',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma-exported foundations for FlytBase UI: raw primitives, semantic colors, spacing, radius, and typography custom properties.'
      }
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj;

export const Colors: Story = {
  render: () => (
    <section className="story-section">
      <h1>Color tokens</h1>
      <div className="foundation-token-grid">
        {colorTokens.map((token) => (
          <article className="foundation-token-card" key={token}>
            <span className="foundation-color-swatch" style={{ background: `var(${token})` }} />
            <code>{token}</code>
          </article>
        ))}
      </div>
    </section>
  )
};

export const SpacingAndRadius: Story = {
  render: () => (
    <section className="story-section">
      <h1>Spacing and radius tokens</h1>
      <div className="foundation-scale-list">
        {spacingTokens.map((token) => (
          <article className="foundation-scale-row" key={token}>
            <code>{token}</code>
            <span className="foundation-scale-track">
              <span className="foundation-scale-value" style={{ width: `max(2px, var(${token}))` }} />
            </span>
          </article>
        ))}
      </div>
    </section>
  )
};

export const Typography: Story = {
  render: () => (
    <section className="story-section">
      <h1>Typography tokens</h1>
      <div className="foundation-type-list">
        {typographySamples.map(([label, sizeToken, lineHeightToken]) => (
          <article className="foundation-type-row" key={sizeToken}>
            <code>{sizeToken}</code>
            <span style={{ fontSize: `var(${sizeToken})`, lineHeight: `var(${lineHeightToken})` }}>
              FlytBase interface text {label}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
};
