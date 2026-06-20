import type { InputHTMLAttributes } from 'react';
import '../styles.css';
import { cx, type ControlState } from '../shared';

/**
 * Checkbox control from Figma `Checkbox`.
 *
 * Use for independent binary choices and multi-select lists. Use `indeterminate` only for parent
 * selections with partially selected children.
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Visible label associated with the checkbox input. */
  label: string;
  /** Figma selection type: unselected, selected, or indeterminate. */
  selection?: 'unselected' | 'selected' | 'indeterminate';
  /** Bounding box size from the Figma axis. */
  boxSize?: '16px' | '20px';
  /** Preview-only state for documenting all Figma states. */
  visualState?: ControlState;
}

/** Checkbox for independent binary choices, selected states, and indeterminate parent selections. */
export function Checkbox({
  boxSize = '20px',
  className,
  disabled,
  label,
  selection = 'unselected',
  visualState = 'default',
  ...props
}: CheckboxProps) {
  const isChecked = selection === 'selected';
  const isDisabled = disabled || visualState === 'disabled';
  return (
    <label className={cx('fds-checkable', className)} data-state={visualState}>
      <input
        checked={isChecked}
        data-size={boxSize}
        disabled={isDisabled}
        ref={(node) => {
          if (node) node.indeterminate = selection === 'indeterminate';
        }}
        type="checkbox"
        {...props}
        readOnly
      />
      <span
        aria-hidden="true"
        className="fds-checkable-control"
        data-selection={selection}
        data-size={boxSize}
        data-type="checkbox"
      >
        <span />
      </span>
      <span className="fds-checkable-label">{label}</span>
    </label>
  );
}
