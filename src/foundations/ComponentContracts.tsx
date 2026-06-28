import { designSystemComponentContracts, type ComponentContract } from '../components/contracts';

const readinessLabels: Record<ComponentContract['readiness'], string> = {
  'pattern-derived': 'Pattern derived',
  partial: 'Partial',
  'presentational-only': 'Presentational only',
  'production-ready': 'Production ready'
};

function ContractCard({ contract }: { contract: ComponentContract }) {
  const missingTests = contract.requiredInteractionTests.length;
  const missingStories = contract.requiredUsageStoryIds.length;

  return (
    <article className="foundation-contract-card" data-readiness={contract.readiness}>
      <header>
        <div>
          <h2>{contract.component}</h2>
          <p>{contract.figmaPage.name} / {contract.figmaPage.nodeId}</p>
        </div>
        <span>{readinessLabels[contract.readiness]}</span>
      </header>

      <dl>
        <div>
          <dt>Storybook</dt>
          <dd><code>{contract.storybookId}</code></dd>
        </div>
        <div>
          <dt>Interaction</dt>
          <dd>{contract.interactionStatus}</dd>
        </div>
        <div>
          <dt>Public API</dt>
          <dd>{contract.publicComponentNames.join(', ')}</dd>
        </div>
      </dl>

      <section>
        <h3>Figma Source Nodes</h3>
        <div className="foundation-contract-pills">
          {contract.figmaSourceNodes.length > 0 ? (
            contract.figmaSourceNodes.map((node) => (
              <code key={node.nodeId}>{node.name}: {node.nodeId}</code>
            ))
          ) : (
            <span>Pattern page has no component-set source node.</span>
          )}
        </div>
      </section>

      <section>
        <h3>Prop Mapping</h3>
        <div className="foundation-contract-pills">
          {Object.entries(contract.reactPropMapping).map(([figma, react]) => (
            <code key={figma}>{figma} =&gt; {react}</code>
          ))}
        </div>
      </section>

      <section>
        <h3>Builder Boundary</h3>
        <p>
          {missingStories > 0 ? `${missingStories} required usage story marker. ` : 'No additional usage story required. '}
          {missingTests > 0 ? `${missingTests} required interaction test markers.` : 'No additional interaction test markers.'}
        </p>
        {contract.previewOnlyProps.length > 0 ? (
          <p>Preview-only props: <code>{contract.previewOnlyProps.join(', ')}</code></p>
        ) : null}
        {contract.unsupportedFigmaFeatures.length > 0 ? (
          <ul>
            {contract.unsupportedFigmaFeatures.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        ) : null}
      </section>
    </article>
  );
}

/**
 * Source-of-truth API contract registry for Figma-to-React-to-Storybook parity.
 *
 * This MCP-visible page exposes Figma Source Nodes, Prop Mapping, Builder Boundary, unsupported Figma features,
 * preview-only props, API contract status, usage stories, and Figma page/source node IDs for every public component.
 */
export function ContractSummary() {
  const counts = designSystemComponentContracts.reduce(
    (acc, contract) => {
      acc[contract.readiness] += 1;
      return acc;
    },
    {
      'pattern-derived': 0,
      partial: 0,
      'presentational-only': 0,
      'production-ready': 0
    } satisfies Record<ComponentContract['readiness'], number>
  );

  return (
    <section className="foundation-contracts">
      <header className="foundation-doc-header">
        <p className="foundation-eyebrow">Agent contract</p>
        <h1>Component API Contracts</h1>
        <p>
          This page maps Figma source nodes to public React components, supported variant axes, runtime behavior,
          preview-only props, required usage stories, and unsupported Figma features.
        </p>
      </header>

      <div className="foundation-contract-summary">
        {Object.entries(counts).map(([readiness, count]) => (
          <article key={readiness}>
            <strong>{count}</strong>
            <span>{readinessLabels[readiness as ComponentContract['readiness']]}</span>
          </article>
        ))}
      </div>

      <div className="foundation-contract-grid">
        {designSystemComponentContracts.map((contract) => (
          <ContractCard contract={contract} key={contract.component} />
        ))}
      </div>
    </section>
  );
}
