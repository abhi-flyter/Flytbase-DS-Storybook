import { cx } from '../shared';

export type LoaderVariant = 'search' | 'table' | 'panel' | 'button';

/**
 * Loader patterns from Figma `Loaders`.
 *
 * Use for in-progress states inside different components, including search, table, support panel,
 * and compact button-loading contexts.
 */
export interface LoaderProps {
  /** Loading pattern shown in the Figma page examples. */
  variant?: LoaderVariant;
  /** Accessible loading label. */
  label?: string;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** In-progress state patterns for search, tables, support panels, and compact controls. */
export function Loader({ className, label = 'Loading', variant = 'table' }: LoaderProps) {
  if (variant === 'button') {
    return <span aria-label={label} className={cx('fds-loader fds-loader-button', className)} role="status" />;
  }

  return (
    <section aria-label={label} className={cx('fds-loader', className)} data-variant={variant} role="status">
      {variant === 'search' ? <span className="fds-loader-search" /> : null}
      {variant === 'panel' ? (
        <>
          <span className="fds-loader-line fds-loader-line-title" />
          <span className="fds-loader-line" />
          <span className="fds-loader-line fds-loader-line-short" />
          <span className="fds-loader-cta" />
        </>
      ) : null}
      {variant === 'table'
        ? Array.from({ length: 5 }, (_, row) => (
            <span className="fds-loader-row" key={row}>
              {Array.from({ length: 5 }, (_, cell) => (
                <span className="fds-loader-line" key={cell} />
              ))}
            </span>
          ))
        : null}
    </section>
  );
}
