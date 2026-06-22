import type { CSSProperties } from 'react';
import { cx } from '../shared';

/**
 * Progress indicator from Figma `Linear bar progress` and `Circular progress indicator`.
 *
 * Use linear progress for task completion across a horizontal surface and circular progress for compact status.
 */
export interface ProgressIndicatorProps {
  /** Figma progress shape. */
  variant?: 'linear' | 'circular';
  /** Progress value from 0 to 100. */
  value?: 5 | 50 | 75 | 100 | number;
  /** Whether to show the Figma percentage label. */
  showValue?: boolean;
  /** Accessible label for assistive technologies. */
  ariaLabel?: string;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Linear or circular progress indicator for compact completion feedback. */
export function ProgressIndicator({
  ariaLabel = 'Progress',
  className,
  showValue = true,
  value = 50,
  variant = 'linear'
}: ProgressIndicatorProps) {
  const boundedValue = Math.max(0, Math.min(100, value));
  const label = `${boundedValue}%`;
  if (variant === 'circular') {
    return (
      <span className={cx('fds-progress fds-progress-circular-wrap', className)}>
        <span
          aria-label={ariaLabel}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={boundedValue}
          className="fds-progress-circular"
          role="progressbar"
          style={{ '--progress-value': boundedValue } as CSSProperties}
        />
        {showValue ? <span className="fds-progress-value">{label}</span> : null}
      </span>
    );
  }

  return (
    <span
      aria-label={ariaLabel}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={boundedValue}
      className={cx('fds-progress fds-progress-linear', className)}
      role="progressbar"
    >
      <span className="fds-progress-linear-track">
        <span style={{ width: `${boundedValue}%` }} />
      </span>
      {showValue ? <span className="fds-progress-value">{label}</span> : null}
    </span>
  );
}
