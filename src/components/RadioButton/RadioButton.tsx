import type { InputHTMLAttributes } from 'react';
import '../styles.css';
import { cx, type ControlState, useControllableState } from '../shared';

/**
 * Radio control from Figma `Radio button`.
 *
 * Use for mutually exclusive choices inside a named group.
 */
export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'defaultChecked' | 'onChange' | 'size' | 'type'> {
  /** Visible label associated with the radio input. */
  label: string;
  /** Whether the radio control is selected. */
  selected?: boolean;
  /** Initial selected state for uncontrolled product use. */
  defaultSelected?: boolean;
  /** Called when the user selects the radio button. */
  onSelectedChange?: (selected: boolean) => void;
  /** Bounding box size from the Figma axis. */
  boxSize?: '16px' | '20px';
  /** Preview-only state for documenting all Figma states. */
  visualState?: ControlState;
}

/** Radio button for mutually exclusive choices inside a named group. */
export function RadioButton({
  boxSize = '20px',
  className,
  defaultSelected = false,
  disabled,
  label,
  onSelectedChange,
  selected,
  visualState = 'default',
  ...props
}: RadioButtonProps) {
  const [isSelected, setSelected] = useControllableState({
    defaultValue: defaultSelected,
    onChange: onSelectedChange,
    value: selected
  });
  return (
    <label className={cx('fds-checkable', className)} data-state={visualState}>
      <input
        checked={isSelected}
        data-size={boxSize}
        disabled={disabled || visualState === 'disabled'}
        onChange={() => setSelected(true)}
        type="radio"
        {...props}
      />
      <span
        aria-hidden="true"
        className="fds-checkable-control"
        data-selected={isSelected ? 'yes' : 'no'}
        data-size={boxSize}
        data-type="radio"
      >
        <span />
      </span>
      <span className="fds-checkable-label">{label}</span>
    </label>
  );
}
