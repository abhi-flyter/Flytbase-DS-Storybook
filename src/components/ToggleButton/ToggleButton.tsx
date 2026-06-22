import type { ReactNode } from 'react';
import { cx, type ControlState } from '../shared';

export interface ToggleButtonItem {
  /** Stable value for this toggle segment. */
  value: string;
  /** Visible segment label. */
  label: ReactNode;
  /** Optional disabled state for the segment. */
  disabled?: boolean;
}

/**
 * Toggle button group from Figma `Toggle button`.
 *
 * Use for compact independent mode toggles where one or more items may be selected.
 */
export interface ToggleButtonProps {
  /** Toggle item list. Figma supports two to five segments. */
  items: ToggleButtonItem[];
  /** Selected toggle values. */
  values?: string[];
  /** Preview-only state applied to all toggles in documentation. */
  visualState?: ControlState;
  /** Change handler for interactive use. */
  onChange?: (values: string[]) => void;
  /** Accessible label for the group. */
  ariaLabel?: string;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Multi-select toggle button group for compact independent mode toggles. */
export function ToggleButton({
  ariaLabel = 'Toggle button group',
  className,
  items,
  onChange,
  values = [],
  visualState = 'default'
}: ToggleButtonProps) {
  return (
    <div aria-label={ariaLabel} className={cx('fds-toggle-button', className)} role="group">
      {items.map((item) => {
        const isSelected = values.includes(item.value);
        const isDisabled = item.disabled || visualState === 'disabled';
        return (
          <button
            aria-pressed={isSelected}
            className="fds-toggle-segment"
            data-selected={isSelected ? 'yes' : 'no'}
            data-state={visualState}
            disabled={isDisabled}
            key={item.value}
            onClick={() =>
              onChange?.(isSelected ? values.filter((value) => value !== item.value) : [...values, item.value])
            }
            type="button"
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
