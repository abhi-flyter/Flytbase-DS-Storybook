import type { ReactNode } from 'react';
import { cx, type ControlState, useControllableState } from '../shared';

/**
 * List row from Figma `List`.
 *
 * Use for selectable rows in menus, panels, and compact content lists.
 */
export interface ListProps {
  /** Primary row text. */
  label: ReactNode;
  /** Optional supporting text. */
  description?: ReactNode;
  /** Optional leading slot. */
  prefix?: ReactNode;
  /** Optional trailing slot. */
  suffix?: ReactNode;
  /** Row density from the Figma `Size` axis. */
  size?: 'default' | 'small';
  /** Whether the row renders its expanded body. */
  expanded?: boolean;
  /** Initial expanded state for uncontrolled product use. */
  defaultExpanded?: boolean;
  /** Called when the row changes expanded state. */
  onExpandedChange?: (expanded: boolean) => void;
  /**
   * Deprecated compatibility callback. Prefer onExpandedChange for product use.
   */
  onToggle?: () => void;
  /** Prevents row activation. */
  disabled?: boolean;
  /** Expanded content slot. */
  children?: ReactNode;
  /** Preview-only state for Figma row states. */
  visualState?: ControlState;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Selectable list row for compact content, menus, panels, and expandable row content. */
export function List({
  children,
  className,
  defaultExpanded = false,
  description,
  disabled = false,
  expanded,
  label,
  onExpandedChange,
  onToggle,
  prefix,
  size = 'default',
  suffix,
  visualState = 'default'
}: ListProps) {
  const [currentExpanded, setCurrentExpanded] = useControllableState({
    defaultValue: defaultExpanded,
    onChange: onExpandedChange,
    value: expanded
  });
  const isDisabled = disabled || visualState === 'disabled';
  const isInteractive = Boolean(children || onToggle || onExpandedChange);

  function handleToggle() {
    if (isDisabled) return;
    if (children) {
      setCurrentExpanded(!currentExpanded);
    }
    onToggle?.();
  }

  const rowContent = (
    <>
      {prefix ? <span className="fds-list-prefix">{prefix}</span> : null}
      <span className="fds-list-content">
        <span>{label}</span>
        {description ? <small>{description}</small> : null}
      </span>
      {suffix ? <span className="fds-list-suffix">{suffix}</span> : null}
    </>
  );

  return (
    <article
      className={cx('fds-list', className)}
      data-expanded={currentExpanded ? 'yes' : 'no'}
      data-size={size}
      data-state={isDisabled ? 'disabled' : visualState}
    >
      {isInteractive ? (
        <button
          aria-expanded={children ? currentExpanded : undefined}
          className="fds-list-row"
          disabled={isDisabled}
          onClick={handleToggle}
          type="button"
        >
          {rowContent}
        </button>
      ) : (
        <div className="fds-list-row">{rowContent}</div>
      )}
      {currentExpanded && children ? <div className="fds-list-expanded">{children}</div> : null}
    </article>
  );
}
