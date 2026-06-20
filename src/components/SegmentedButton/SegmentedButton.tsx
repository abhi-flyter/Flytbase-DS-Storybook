import type { ReactNode } from 'react';
import '../styles.css';
import { cx, type ControlState } from '../shared';

export interface SegmentedButtonItem {
  /** Stable value for this segment. */
  value: string;
  /** Visible segment label. */
  label: ReactNode;
  /** Optional disabled state for the segment. */
  disabled?: boolean;
}

/**
 * Segmented button from Figma `Segmented button`.
 *
 * Use for mutually exclusive view or mode switching with two to five segments.
 */
export interface SegmentedButtonProps {
  /** Segment list. Figma supports two, three, four, and five segment layouts. */
  items: SegmentedButtonItem[];
  /** Currently selected segment value. */
  value?: string;
  /** Preview-only state applied to all segments in documentation. */
  visualState?: ControlState;
  /** Change handler for interactive use. */
  onChange?: (value: string) => void;
  /** Accessible label for the group. */
  ariaLabel?: string;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Mutually exclusive segmented control for switching between two to five modes or views. */
export function SegmentedButton({
  ariaLabel = 'Segmented control',
  className,
  items,
  onChange,
  value,
  visualState = 'default'
}: SegmentedButtonProps) {
  const selectedValue = value ?? items[0]?.value;
  return (
    <div aria-label={ariaLabel} className={cx('fds-segmented', className)} role="group">
      {items.map((item) => {
        const isSelected = item.value === selectedValue;
        const isDisabled = item.disabled || visualState === 'disabled';
        return (
          <button
            aria-pressed={isSelected}
            className="fds-segment"
            data-selected={isSelected ? 'yes' : 'no'}
            data-state={visualState}
            disabled={isDisabled}
            key={item.value}
            onClick={() => onChange?.(item.value)}
            type="button"
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
