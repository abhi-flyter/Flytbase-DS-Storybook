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

const tokenUsageRows = [
  ['App/page background', '--color-fds-background-bg', 'Use for app shells and full-page surfaces.'],
  ['Raised background', '--color-fds-background-level-1', 'Use for first-level sidebars, panels, and sections.'],
  ['Card/panel background', '--color-fds-background-level-2', 'Use for cards, popovers, tables, and nested panels.'],
  ['Default text and icons', '--color-fds-text-icon-01', 'Use for primary labels, headings, icons, and control text.'],
  ['Secondary text and icons', '--color-fds-text-icon-02', 'Use for supporting labels, metadata, helper text, and muted icons.'],
  ['Disabled text and icons', '--color-fds-text-icon-disabled', 'Use for unavailable controls and disabled labels.'],
  ['Primary border', '--color-fds-outline-o-primary', 'Use for panel, field, and component borders.'],
  ['Subtle border', '--color-fds-outline-o-secondary', 'Use for dividers and quieter separators.'],
  ['Interactive surface', '--color-fds-surface-states-surface', 'Use for neutral buttons, chips, row backgrounds, and compact controls.'],
  ['Selected surface', '--color-fds-surface-states-selected', 'Use for selected tabs, menu rows, and active navigation items.'],
  ['Primary action', '--color-fds-primary-200-p', 'Use for primary CTAs, active states, and progress fills.'],
  ['Focus ring', '--color-fds-primary-50', 'Use for visible focus outlines and active emphasis.']
] as const;

const forbiddenTokenExamples = ['--fds-color-surface', '--fds-color-text-primary', '--fds-color-border', '--fds-color-primary'];

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
          'Figma-exported foundations for FlytBase UI. Product code should prefer the documented FDS namespace: color tokens use `--color-fds-*`, spacing uses `--spacing-fds-*`, and typography uses `--typography-*`. Do not invent aliases such as `--fds-color-surface`.'
      }
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj;

export const UsageContract: Story = {
  name: 'Usage Contract',
  render: () => (
    <section className="story-section">
      <div className="foundation-contract">
        <p className="foundation-eyebrow">Agent token contract</p>
        <h1>Use the documented FDS token names exactly</h1>
        <p>
          For Flytbase product UI, use the newer FDS namespace from this Storybook page. Color tokens are named{' '}
          <code>--color-fds-*</code>, spacing tokens are named <code>--spacing-fds-*</code>, and typography tokens
          are named <code>--typography-*</code>.
        </p>
        <p>
          Do not create or use guessed aliases such as <code>--fds-color-surface</code>. That namespace is not exported
          by the package, so browser styles that rely on it will fall back to defaults.
        </p>
      </div>

      <div className="foundation-token-usage">
        {tokenUsageRows.map(([role, token, guidance]) => (
          <article className="foundation-token-row" key={token}>
            <span className="foundation-token-swatch" style={{ background: `var(${token})` }} />
            <div>
              <strong>{role}</strong>
              <code>{token}</code>
              <p>{guidance}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="foundation-token-warning">
        <strong>Do not use these invented aliases:</strong>
        <div>
          {forbiddenTokenExamples.map((token) => (
            <code key={token}>{token}</code>
          ))}
        </div>
      </div>
    </section>
  )
};

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
