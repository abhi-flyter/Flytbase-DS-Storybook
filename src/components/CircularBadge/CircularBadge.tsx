import '../styles.css';
import { cx } from '../shared';

/**
 * Compact circular badge from Figma `Circular badge`.
 *
 * Use the dot form for unread/status indicators and the value form for short counts.
 */
export interface CircularBadgeProps {
  /** Whether the badge renders as a dot or carries a short value. */
  variant?: 'dot' | 'value';
  /** Value shown when `variant` is `value`. */
  value?: string | number;
  /** Accessible label for status-only circular badges. */
  ariaLabel?: string;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Dot or numeric circular badge for notification and compact status indicators. */
export function CircularBadge({
  ariaLabel = 'Notification count',
  className,
  value = 3,
  variant = 'dot'
}: CircularBadgeProps) {
  return (
    <span
      aria-label={variant === 'dot' ? ariaLabel : undefined}
      className={cx('fds-circular-badge', className)}
      data-variant={variant}
      role={variant === 'dot' ? 'img' : undefined}
    >
      {variant === 'value' ? value : null}
    </span>
  );
}
