import type { ReactNode } from 'react';
import '../styles.css';
import { Icon, icons } from '../icons';
import { cx } from '../shared';

export type BadgeTone = 'success' | 'error' | 'caution' | 'warning' | 'info' | 'secondary' | 'disabled';

/**
 * Status badge from Figma `Badges`.
 *
 * Use for compact state labels such as success, error, warning, info, secondary, and disabled states.
 */
export interface BadgeProps {
  /** System or neutral badge tone from the Figma `Type` axis. */
  tone?: BadgeTone;
  /** Whether to include the Figma prefix slot. */
  hasPrefix?: boolean;
  /** Badge text. */
  children: ReactNode;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Compact semantic status label with optional Figma `Icon/Play` prefix. */
export function Badge({ children, className, hasPrefix = false, tone = 'info' }: BadgeProps) {
  return (
    <span className={cx('fds-badge', className)} data-tone={tone}>
      {hasPrefix ? <span aria-hidden="true" className="fds-badge-prefix"><Icon icon={icons.play} /></span> : null}
      {children}
    </span>
  );
}
