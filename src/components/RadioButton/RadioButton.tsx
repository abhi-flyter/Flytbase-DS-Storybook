import type { InputHTMLAttributes } from 'react';
import '../styles.css';
import { cx, type ControlState } from '../shared';

/**
 * Radio control from Figma `Radio button`.
 *
 * Use for mutually exclusive choices inside a named group.
 */
export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Visible label associated with the radio input. */
  label: string;
  /** Whether the radio control is selected. */
  selected?: boolean;
  /** Bounding box size from the Figma axis. */
  boxSize?: '16px' | '20px';
  /** Preview-only state for documenting all Figma states. */
  visualState?: ControlState;
}

/** Radio button for mutually exclusive choices inside a named group. */
export function RadioButton({
  boxSize = '20px',
  className,
  disabled,
  label,
  selected = false,
  visualState = 'default',
  ...props
}: RadioButtonProps) {
  return (
    <label className={cx('fds-checkable', className)} data-state={visualState}>
      <input
        checked={selected}
        data-size={boxSize}
        disabled={disabled || visualState === 'disabled'}
        type="radio"
        {...props}
        readOnly
      />
      <span
        aria-hidden="true"
        className="fds-checkable-control"
        data-selected={selected ? 'yes' : 'no'}
        data-size={boxSize}
        data-type="radio"
      >
        <span />
      </span>
      <span className="fds-checkable-label">{label}</span>
    </label>
  );
}
