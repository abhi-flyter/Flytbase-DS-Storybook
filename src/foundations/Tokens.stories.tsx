import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { icons } from '../components/icons';

type ColorGroup = {
  name: string;
  description: string;
  tokens: string[];
};

type SpacingRow = {
  name: string;
  rem: string;
  px: string;
  token?: string;
};

type TypeRow = {
  name: string;
  size: string;
  sizeToken: string;
  lineHeightToken: string;
  weightToken: string;
  family?: string;
};

type ShapeRow = {
  name: string;
  value: string;
  token?: string;
};

const colorGroups: ColorGroup[] = [
  {
    name: 'Background',
    description: 'Application shell and nested dark surface levels from the Figma background scale.',
    tokens: [
      '--color-fds-background-bg',
      '--color-fds-background-level-1',
      '--color-fds-background-level-2',
      '--color-fds-background-level-3',
      '--color-fds-background-level-4',
      '--color-fds-background-level-5'
    ]
  },
  {
    name: 'Primary',
    description: 'Brand action scale and interactive primary states.',
    tokens: [
      '--color-fds-primary-50',
      '--color-fds-primary-100',
      '--color-fds-primary-200-p',
      '--color-fds-primary-states-hover',
      '--color-fds-primary-states-pressed',
      '--color-fds-primary-states-focused',
      '--color-fds-primary-states-disabled'
    ]
  },
  {
    name: 'Secondary',
    description: 'Secondary action scale and secondary state tokens.',
    tokens: [
      '--color-fds-secondary-100',
      '--color-fds-secondary-200-p',
      '--color-fds-secondary-states-hover',
      '--color-fds-secondary-states-pressed',
      '--color-fds-secondary-states-focused',
      '--color-fds-secondary-states-disabled'
    ]
  },
  {
    name: 'Surface States',
    description: 'Neutral interactive surfaces, selected states, and opaque surface equivalents.',
    tokens: [
      '--color-fds-surface-states-surface',
      '--color-fds-surface-states-hover',
      '--color-fds-surface-states-pressed',
      '--color-fds-surface-states-focused',
      '--color-fds-surface-states-selected',
      '--color-fds-surface-states-selected-n',
      '--color-fds-surface-states-disabled'
    ]
  },
  {
    name: 'Text And Icon',
    description: 'Primary, secondary, and disabled foreground colors.',
    tokens: ['--color-fds-text-icon-01', '--color-fds-text-icon-02', '--color-fds-text-icon-disabled']
  },
  {
    name: 'Outline And Scrim',
    description: 'Borders, focused outline, and supporting map/overlay colors.',
    tokens: [
      '--color-fds-outline-o-primary',
      '--color-fds-outline-o-secondary',
      '--color-fds-outline-o-disabled',
      '--color-fds-others-outline-focused',
      '--color-fds-others-outline-tertiary-bright',
      '--color-fds-map-map-neutral-mn-3'
    ]
  },
  {
    name: 'Critical System',
    description: 'Status colors and status container colors for success, error, caution, warning, and info.',
    tokens: [
      '--color-fds-critical-system-success-s-30p',
      '--color-fds-critical-system-error-e-30p',
      '--color-fds-critical-system-error-e-40',
      '--color-fds-critical-system-caution-c-30p',
      '--color-fds-critical-system-warning-w-30p',
      '--color-fds-critical-system-info-i-30p',
      '--color-fds-critical-system-info-i-40',
      '--color-fds-critical-system-info-i-50',
      '--color-fds-critical-system-container-success-container-sc',
      '--color-fds-critical-system-container-error-container-ec',
      '--color-fds-critical-system-container-caution-container-cc',
      '--color-fds-critical-system-container-warning-container-cc',
      '--color-fds-critical-system-container-info-container-ic'
    ]
  }
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

const spacingRows: SpacingRow[] = [
  { name: 'Size-0', rem: '0rem', px: '0px', token: '--spacing-fds-size-0' },
  { name: 'Size-50', rem: '0.125rem', px: '2px', token: '--spacing-fds-size-50' },
  { name: 'Size-100', rem: '0.25rem', px: '4px', token: '--spacing-fds-size-100' },
  { name: 'Size-150', rem: '0.375rem', px: '6px', token: '--spacing-fds-size-150' },
  { name: 'Size-200', rem: '0.5rem', px: '8px', token: '--spacing-fds-size-200' },
  { name: 'Size-300', rem: '0.75rem', px: '12px', token: '--spacing-fds-size-300' },
  { name: 'Size-400', rem: '1rem', px: '16px', token: '--spacing-fds-size-400' },
  { name: 'Size-500', rem: '1.25rem', px: '20px', token: '--spacing-fds-spacing-and-radius-size-500' },
  { name: 'Size-600', rem: '1.5rem', px: '24px', token: '--spacing-fds-size-600' },
  { name: 'Size-700', rem: '1.75rem', px: '28px' },
  { name: 'Size-800', rem: '2rem', px: '32px', token: '--spacing-fds-spacing-and-radius-size-800' },
  { name: 'Size-900', rem: '2.25rem', px: '36px' },
  { name: 'Size-1000', rem: '2.5rem', px: '40px' },
  { name: 'Size-1100', rem: '3rem', px: '48px' },
  { name: 'Size-1500', rem: '3.75rem', px: '60px', token: '--spacing-fds-spacing-and-radius-size-1500' },
  { name: 'Size-1600', rem: '4rem', px: '64px' },
  { name: 'Size-2000', rem: '5rem', px: '80px' },
  { name: 'Size-2400', rem: '6rem', px: '96px' },
  { name: 'Full', rem: '62.438rem', px: '999px', token: '--spacing-fds-full' }
];

const typographyRows: TypeRow[] = [
  {
    name: 'Mega Heading',
    size: '20 px',
    sizeToken: '--typography-font-size-20',
    lineHeightToken: '--typography-line-height-loose',
    weightToken: '--typography-font-weight-semibold'
  },
  {
    name: 'Title 1 (Semibold)',
    size: '18 px',
    sizeToken: '--typography-font-size-18',
    lineHeightToken: '--typography-line-height-relaxed',
    weightToken: '--typography-font-weight-semibold'
  },
  {
    name: 'Title 2 (Medium)',
    size: '16 px',
    sizeToken: '--typography-font-size-16',
    lineHeightToken: '--typography-line-height-relaxed',
    weightToken: '--typography-font-weight-medium'
  },
  {
    name: 'Title 1 (Medium)',
    size: '16 px',
    sizeToken: '--typography-font-size-16',
    lineHeightToken: '--typography-line-height-relaxed',
    weightToken: '--typography-font-weight-medium'
  },
  {
    name: 'Title 2 (Regular)',
    size: '14 px',
    sizeToken: '--typography-font-size-14',
    lineHeightToken: '--typography-line-height-normal',
    weightToken: '--typography-font-weight-normal'
  },
  {
    name: 'Body 1 (Medium)',
    size: '14 px',
    sizeToken: '--typography-font-size-14',
    lineHeightToken: '--typography-line-height-normal',
    weightToken: '--typography-font-weight-medium'
  },
  {
    name: 'Body 2 (Regular)',
    size: '14 px',
    sizeToken: '--typography-font-size-14',
    lineHeightToken: '--typography-line-height-normal',
    weightToken: '--typography-font-weight-normal'
  },
  {
    name: 'Body 3 (Regular Mono)',
    size: '14 px',
    sizeToken: '--typography-font-size-14',
    lineHeightToken: '--typography-line-height-normal',
    weightToken: '--typography-font-weight-normal',
    family: 'ui-monospace, SFMono-Regular, Menlo, monospace'
  },
  {
    name: 'Body 4 (Medium)',
    size: '12 px',
    sizeToken: '--typography-font-size-12',
    lineHeightToken: '--typography-line-height-tight',
    weightToken: '--typography-font-weight-medium'
  },
  {
    name: 'Body 5 (Regular)',
    size: '12 px',
    sizeToken: '--typography-font-size-12',
    lineHeightToken: '--typography-line-height-tight',
    weightToken: '--typography-font-weight-normal'
  },
  {
    name: 'Tiny 1 (Medium)',
    size: '11 px',
    sizeToken: '--typography-font-size-11',
    lineHeightToken: '--typography-line-height-snug',
    weightToken: '--typography-font-weight-medium'
  },
  {
    name: 'Tiny 2 (Medium)',
    size: '10 px',
    sizeToken: '--typography-font-size-10',
    lineHeightToken: '--typography-line-height-tight',
    weightToken: '--typography-font-weight-medium'
  }
];

const shapeRows: ShapeRow[] = [
  { name: 'Shape Radius 1', value: '0 px', token: '--spacing-fds-size-0' },
  { name: 'Shape Radius 2', value: '2 px', token: '--spacing-fds-size-50' },
  { name: 'Shape Radius 3', value: '4 px', token: '--spacing-fds-size-100' },
  { name: 'Shape Radius 4', value: '8 px', token: '--spacing-fds-size-200' },
  { name: 'Shape Radius 5', value: '12 px', token: '--spacing-fds-size-300' },
  { name: 'Shape Radius 6', value: '16 px', token: '--spacing-fds-size-400' },
  { name: 'Shape Radius 7', value: '20 px', token: '--spacing-fds-spacing-and-radius-size-500' },
  { name: 'Shape Radius 8', value: '24 px', token: '--spacing-fds-size-600' },
  { name: 'Shape Radius 9', value: '28 px' },
  { name: 'Shape Radius 10', value: '32 px', token: '--spacing-fds-spacing-and-radius-size-800' },
  { name: 'Shape Radius 11', value: 'Full', token: '--spacing-fds-full' }
];

const elevationRows = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6'].map((name) => ({
  name,
  css: '0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 4px 1px rgba(0, 0, 0, 0.15)'
}));

const markerRows = [
  { name: 'Markers', guidance: 'Use map and operational state markers from the Figma source until package exports are available.' },
  { name: 'Apps and Flinks', guidance: 'Keep app/Flink marks consistent with the Figma reference artwork and product naming.' }
];

const fontAwesomeRules = [
  'Bounding box: 16x20px, vector longest side should be 16px.',
  'Remove color styles and remove opacity before upload.',
  'Icon should be a single vector, not a group.',
  'Upload the final normalized vector on Font Awesome.'
];

const communicationRows = [
  {
    name: 'Formal-Casual Tone',
    guidance: 'Use conversational contractions where they improve readability, without reducing the seriousness of operational text.'
  },
  {
    name: 'Seriousness',
    guidance: 'Avoid humor in critical workflows because it can appear during high-stakes mission moments.'
  },
  {
    name: 'Respectful',
    guidance: 'Keep text respectful, relevant, concise, and inclusive.'
  },
  {
    name: 'Excitement',
    guidance: 'Stay matter-of-fact, with restrained excitement for onboarding and new feature moments.'
  },
  {
    name: 'Empathy and Reassurance',
    guidance: 'Acknowledge complex technical challenges while reinforcing safety, support, and clear next steps.'
  }
];

const packageIconNames = Object.keys(icons);

const figmaIconExamples = [
  'Icon/Hamburger Menu',
  'Icon/Profile',
  'Icon/Settings',
  'Icon/Notifications',
  'Icon/Missions',
  'Icon/Calender',
  'Icon/NFZ',
  'Icon/Corridor',
  "Icon/What's New",
  'Icon/Multi-Cam',
  'Icon/Feed Switch',
  'Icon/RTDS',
  'Icon/Land',
  'Icon/Flight Logs',
  'Icon/Operators Icon',
  'Icon/Docking Station',
  'Icon/Search',
  'Icon/Launch',
  'Icon/Altitude',
  'Icon/Gallery',
  'Icon/Refresh',
  'Icon/Download',
  'Icon/Failsafe',
  'Icon/Joystick Control',
  'Icon/Play',
  'Icon/Pause',
  'Icon/Weather',
  'Icon/Network',
  'Icon/Map',
  'Icon/Pin',
  'Icon/Export',
  'Icon/Flinks'
];

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

function FoundationShell({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="story-section foundation-doc">
      <header className="foundation-doc-header">
        <p className="foundation-eyebrow">Figma Styles parity</p>
        <h1>{title}</h1>
      </header>
      {children}
    </section>
  );
}

function TokenCode({ children }: { children: string }) {
  return <code className="foundation-code">{children}</code>;
}

export const UsageContract: Story = {
  name: 'Usage Contract',
  render: () => (
    <FoundationShell title="Use the documented FDS token names exactly">
      <div className="foundation-contract">
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
              <TokenCode>{token}</TokenCode>
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
    </FoundationShell>
  )
};

export const StylesParity: Story = {
  name: 'Styles Parity',
  render: () => (
    <FoundationShell title="Styles page documentation coverage">
      <div className="foundation-parity-grid">
        {[
          ['Colors - Opacity', 'Documented here in grouped color-token families.'],
          ['opaque colors', 'Documented inside Surface States with opaque notes.'],
          ['Typography', 'Documented with Figma style names, size tokens, weights, and mono sample.'],
          ['Icons', 'Documented with package exports and Figma-source catalog examples.'],
          ['Markers & Flinks', 'Documented as Figma-source visual assets pending package exports.'],
          ['For Fontawesome', 'Documented as implementation rules.'],
          ['Elevations', 'Documented with Figma level labels and current shadow recipe.'],
          ['Spacing', 'Documented with Figma rows and package token mappings.'],
          ['Communication', 'Documented with voice and tone guidance.'],
          ['Shapes', 'Documented with Figma radius scale and package token mappings.']
        ].map(([section, coverage]) => (
          <article className="foundation-parity-card" key={section}>
            <strong>{section}</strong>
            <p>{coverage}</p>
          </article>
        ))}
      </div>
    </FoundationShell>
  )
};

export const Colors: Story = {
  render: () => (
    <FoundationShell title="Color tokens">
      <div className="foundation-color-groups">
        {colorGroups.map((group) => (
          <section className="foundation-doc-group" key={group.name}>
            <div>
              <h2>{group.name}</h2>
              <p>{group.description}</p>
            </div>
            <div className="foundation-token-grid">
              {group.tokens.map((token) => (
                <article className="foundation-token-card" key={token}>
                  <span className="foundation-color-swatch" style={{ background: `var(${token})` }} />
                  <TokenCode>{token}</TokenCode>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </FoundationShell>
  )
};

export const Typography: Story = {
  render: () => (
    <FoundationShell title="Typography">
      <div className="foundation-type-list">
        {typographyRows.map((row) => (
          <article className="foundation-type-row" key={row.name}>
            <div>
              <strong>{row.name}</strong>
              <span>{row.size}</span>
            </div>
            <TokenCode>{row.sizeToken}</TokenCode>
            <span
              style={
                {
                  fontFamily: row.family,
                  fontSize: `var(${row.sizeToken})`,
                  fontWeight: `var(${row.weightToken})`,
                  lineHeight: `var(${row.lineHeightToken})`
                } as CSSProperties
              }
            >
              The quick brown fox jumped over the lazy dog.
            </span>
          </article>
        ))}
      </div>
    </FoundationShell>
  )
};

export const SpacingAndRadius: Story = {
  name: 'Spacing And Radius',
  render: () => (
    <FoundationShell title="Spacing and radius tokens">
      <div className="foundation-table">
        <div className="foundation-table-row foundation-table-heading">
          <span>Figma size</span>
          <span>REM</span>
          <span>Pixels</span>
          <span>Package token</span>
          <span>Preview</span>
        </div>
        {spacingRows.map((row) => (
          <div className="foundation-table-row" key={row.name}>
            <strong>{row.name}</strong>
            <span>{row.rem}</span>
            <span>{row.px}</span>
            <span>{row.token ? <TokenCode>{row.token}</TokenCode> : 'Pending token export'}</span>
            <span className="foundation-scale-track">
              <span className="foundation-scale-value" style={{ width: row.token ? `max(2px, var(${row.token}))` : row.px }} />
            </span>
          </div>
        ))}
      </div>
    </FoundationShell>
  )
};

export const Shapes: Story = {
  render: () => (
    <FoundationShell title="Shapes">
      <div className="foundation-shape-grid">
        {shapeRows.map((row) => (
          <article className="foundation-shape-card" key={row.name}>
            <span
              className="foundation-shape-preview"
              style={{ borderRadius: row.token ? `var(${row.token})` : row.value === 'Full' ? '999px' : row.value.replace(' ', '') }}
            />
            <strong>{row.name}</strong>
            <span>{row.value}</span>
            <span>{row.token ? <TokenCode>{row.token}</TokenCode> : 'Pending token export'}</span>
          </article>
        ))}
      </div>
    </FoundationShell>
  )
};

export const Elevations: Story = {
  render: () => (
    <FoundationShell title="Elevations">
      <div className="foundation-elevation-grid">
        {elevationRows.map((row) => (
          <article className="foundation-elevation-card" key={row.name} style={{ boxShadow: row.css }}>
            <strong>{row.name}</strong>
            <code>{row.css}</code>
          </article>
        ))}
      </div>
    </FoundationShell>
  )
};

export const Icons: Story = {
  render: () => (
    <FoundationShell title="Icons">
      <section className="foundation-doc-group">
        <div>
          <h2>Package exports</h2>
          <p>Only these icon keys are currently exported by the package API.</p>
        </div>
        <div className="foundation-pill-list">
          {packageIconNames.map((name) => (
            <code key={name}>{name}</code>
          ))}
        </div>
      </section>
      <section className="foundation-doc-group">
        <div>
          <h2>Figma source catalog examples</h2>
          <p>The Figma Styles page contains a larger icon catalog; use those names as source-of-truth requests before adding exports.</p>
        </div>
        <div className="foundation-pill-list">
          {figmaIconExamples.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </section>
    </FoundationShell>
  )
};

export const MarkersAndFlinks: Story = {
  name: 'Markers And Flinks',
  render: () => (
    <FoundationShell title="Markers and Flinks">
      <div className="foundation-parity-grid">
        {markerRows.map((row) => (
          <article className="foundation-parity-card" key={row.name}>
            <strong>{row.name}</strong>
            <p>{row.guidance}</p>
          </article>
        ))}
      </div>
    </FoundationShell>
  )
};

export const FontAwesomeGuidelines: Story = {
  name: 'Font Awesome Guidelines',
  render: () => (
    <FoundationShell title="Font Awesome implementation guidelines">
      <ol className="foundation-rule-list">
        {fontAwesomeRules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ol>
    </FoundationShell>
  )
};

export const Communication: Story = {
  render: () => (
    <FoundationShell title="Communication">
      <div className="foundation-parity-grid">
        {communicationRows.map((row) => (
          <article className="foundation-parity-card" key={row.name}>
            <strong>{row.name}</strong>
            <p>{row.guidance}</p>
          </article>
        ))}
      </div>
    </FoundationShell>
  )
};
