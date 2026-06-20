import type { ReactNode } from 'react';
import '../styles.css';
import { cx, type ControlState } from '../shared';

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
  /** Called when the clickable row is activated for expand/collapse behavior. */
  onToggle?: () => void;
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
  description,
  expanded = false,
  label,
  onToggle,
  prefix,
  size = 'default',
  suffix,
  visualState = 'default'
}: ListProps) {
  const RowElement = onToggle ? 'button' : 'div';
  return (
    <article className={cx('fds-list', className)} data-expanded={expanded ? 'yes' : 'no'} data-size={size} data-state={visualState}>
      <RowElement
        aria-expanded={children ? expanded : undefined}
        className="fds-list-row"
        onClick={onToggle}
        type={onToggle ? 'button' : undefined}
      >
        {prefix ? <span className="fds-list-prefix">{prefix}</span> : null}
        <span className="fds-list-content">
          <span>{label}</span>
          {description ? <small>{description}</small> : null}
        </span>
        {suffix ? <span className="fds-list-suffix">{suffix}</span> : null}
      </RowElement>
      {expanded && children ? <div className="fds-list-expanded">{children}</div> : null}
    </article>
  );
}
