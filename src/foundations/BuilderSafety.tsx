import { designSystemComponentContracts } from '../components/contracts';
import { icons } from '../components/icons';

const productionReady = designSystemComponentContracts.filter((contract) => contract.readiness === 'production-ready');
const partialOrPresentational = designSystemComponentContracts.filter((contract) =>
  ['partial', 'presentational-only'].includes(contract.readiness)
);
const usageStoryIds = designSystemComponentContracts.flatMap((contract) => contract.requiredUsageStoryIds);
const unsupportedFeatureRows = designSystemComponentContracts
  .filter((contract) => contract.unsupportedFigmaFeatures.length > 0 || contract.appOwnedBehaviors.length > 0)
  .map((contract) => ({
    component: contract.component,
    unsupported: contract.unsupportedFigmaFeatures,
    appOwned: contract.appOwnedBehaviors
  }));
const iconNames = Object.keys(icons).sort();

/**
 * Builder-safe MCP checklist for remote Chromatic and local Storybook agents.
 *
 * Remote Chromatic MCP Must Expose: Component docs, Usage stories, API contract status, Unsupported features,
 * Figma source page IDs, token rules, Icon export list, and do-not-use guidance.
 * Do not use presentational-only or partial components as drop-in product controls.
 * Token rules include --color-fds-background-bg and forbid invented aliases such as --fds-color-surface.
 *
 * Local MCP Must Additionally Expose: get-storybook-story-instructions, run-story-tests, preview-stories,
 * preview story screenshots, accessibility checks, and interaction checks.
 */
export function BuilderSafety() {
  return (
    <section className="story-surface foundation-builder-safety">
      <div className="foundation-doc-header">
        <p className="foundation-eyebrow">Remote and local MCP contract</p>
        <h1>Builder Safety</h1>
        <p>
          This page is the agent-facing checklist for using the F Design System through Storybook and Chromatic MCP.
          It tells builders what remote MCP must expose, what local MCP adds, and where product behavior must not be guessed.
        </p>
      </div>

      <div className="foundation-contract-summary">
        <article>
          <strong>{designSystemComponentContracts.length}</strong>
          <span>component contracts</span>
        </article>
        <article>
          <strong>{productionReady.length}</strong>
          <span>production ready</span>
        </article>
        <article>
          <strong>{usageStoryIds.length}</strong>
          <span>usage stories required</span>
        </article>
        <article>
          <strong>{iconNames.length}</strong>
          <span>documented icon keys</span>
        </article>
      </div>

      <section className="foundation-doc-group">
        <div>
          <h2>Remote Chromatic MCP Must Expose</h2>
          <p>Use remote MCP for shared documentation and source-of-truth API context when Storybook is not running locally.</p>
        </div>
        <ol className="foundation-rule-list">
          <li>Component docs from `get-documentation` and `list-all-documentation`.</li>
          <li>Usage stories with Storybook IDs for every controlled or composite component.</li>
          <li>API contract status: readiness, interaction status, preview-only props, and public React names.</li>
          <li>Unsupported features and app-owned lifecycle boundaries before using a component in product code.</li>
          <li>Figma source page IDs and component-set node IDs for every public component contract.</li>
          <li>Token rules from `foundations-tokens`, including the FDS token namespace and forbidden aliases.</li>
          <li>Icon export list from `foundations-icons`; do not invent icon keys.</li>
          <li>Do not use presentational-only or partial components as drop-in product controls.</li>
        </ol>
      </section>

      <section className="foundation-doc-group">
        <div>
          <h2>Local MCP Must Additionally Expose</h2>
          <p>Use local MCP when authoring stories, running checks, or validating a changed component before handoff.</p>
        </div>
        <ol className="foundation-rule-list">
          <li>`get-storybook-story-instructions` for story authoring rules before adding or editing stories.</li>
          <li>`run-story-tests` for browser-based story interaction checks.</li>
          <li>`preview-stories` for visual previews and screenshot-oriented review.</li>
          <li>Accessibility and interaction checks through Storybook Vitest and the local testing toolset.</li>
        </ol>
      </section>

      <section className="foundation-doc-group">
        <div>
          <h2>Do Not Use Guidance</h2>
          <p>Builders must stop or wrap carefully when a component is not production-ready for the needed behavior.</p>
        </div>
        <div className="foundation-parity-grid">
          {partialOrPresentational.length > 0 ? (
            partialOrPresentational.map((contract) => (
              <article className="foundation-parity-card" key={contract.component}>
                <strong>{contract.component}</strong>
                <p>
                  Readiness: <code>{contract.readiness}</code>. Do not assume missing callbacks, lifecycle, keyboard behavior,
                  validation, async behavior, or product state management.
                </p>
              </article>
            ))
          ) : (
            <article className="foundation-parity-card">
              <strong>No presentational-only components</strong>
              <p>Current contracts do not mark any component as presentational-only. Continue checking this page before use.</p>
            </article>
          )}
        </div>
      </section>

      <section className="foundation-doc-group">
        <div>
          <h2>Usage Story IDs</h2>
          <p>Controlled and composite components must have examples builders can copy without guessing prop names.</p>
        </div>
        <div className="foundation-pill-list">
          {usageStoryIds.map((storyId) => <code key={storyId}>{storyId}</code>)}
        </div>
      </section>

      <section className="foundation-doc-group">
        <div>
          <h2>Unsupported And App-Owned Boundaries</h2>
          <p>These are the behaviors an app must own or explicitly defer.</p>
        </div>
        <div className="foundation-parity-grid">
          {unsupportedFeatureRows.map((row) => (
            <article className="foundation-parity-card" key={row.component}>
              <strong>{row.component}</strong>
              {[...row.unsupported, ...row.appOwned].map((item) => <p key={item}>{item}</p>)}
            </article>
          ))}
        </div>
      </section>

      <section className="foundation-doc-group">
        <div>
          <h2>Figma Source IDs</h2>
          <p>Agents should cite these node IDs when reporting a component/source mismatch.</p>
        </div>
        <div className="foundation-table">
          <div className="foundation-table-row foundation-table-heading">
            <span>Component</span>
            <span>Page</span>
            <span>Source nodes</span>
          </div>
          {designSystemComponentContracts.map((contract) => (
            <div className="foundation-table-row" key={contract.component}>
              <strong>{contract.component}</strong>
              <span>{contract.figmaPage.name}: {contract.figmaPage.nodeId}</span>
              <span>
                {contract.figmaSourceNodes.length > 0
                  ? contract.figmaSourceNodes.map((node) => `${node.name}: ${node.nodeId}`).join(', ')
                  : 'pattern-derived'}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="foundation-doc-group">
        <div>
          <h2>Token And Icon Rules</h2>
          <p>These rules are available to remote MCP without local source access.</p>
        </div>
        <ol className="foundation-rule-list">
          <li>Import `@flytbase/design-system/style.css` once before rendering components.</li>
          <li>Use `--color-fds-*`, `--spacing-fds-*`, and `--typography-*` tokens exactly as documented.</li>
          <li>Use `--color-fds-background-bg`, `--color-fds-text-icon-01`, `--color-fds-text-icon-02`, and `--color-fds-outline-o-primary` for common product surfaces.</li>
          <li>Never use invented aliases such as `--fds-color-surface`, `--fds-color-text-primary`, `--fds-color-border`, or `--fds-color-primary`.</li>
          <li>Use only documented icon keys from `foundations-icons`; examples include {iconNames.slice(0, 12).map((name) => <code key={name}>{name}</code>)}.</li>
        </ol>
      </section>
    </section>
  );
}
