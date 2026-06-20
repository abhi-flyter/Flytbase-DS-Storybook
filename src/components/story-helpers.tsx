import type { ReactNode } from 'react';

export function VariantSection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="story-section">
      <h1>{title}</h1>
      {children}
    </section>
  );
}

export function VariantGroup({ children, label }: { children: ReactNode; label: string }) {
  return (
    <section className="story-group">
      <h2>{label}</h2>
      <div className="story-grid">{children}</div>
    </section>
  );
}
