import type { ButtonHTMLAttributes } from 'react';
import '../styles.css';
import { cx, type ControlState, useControllableState } from '../shared';

/**
 * Switch control from Figma `Toggle switch`.
 *
 * Use for settings that take effect immediately. Prefer checkbox when the choice is part of a form submission.
 */
export interface ToggleSwitchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visible label for the switch. */
  label: string;
  /** Whether the switch is on. */
  selected?: boolean;
  /** Initial selected state for uncontrolled product use. */
  defaultSelected?: boolean;
  /** Called when the switch toggles on or off. */
  onSelectedChange?: (selected: boolean) => void;
  /** Preview-only state, including the Figma loader state. */
  visualState?: ControlState | 'loader';
}

/** Immediate toggle switch for on/off settings, including disabled and loading documentation states. */
export function ToggleSwitch({
  className,
  defaultSelected = false,
  disabled,
  label,
  onClick,
  onSelectedChange,
  selected,
  visualState = 'default',
  ...props
}: ToggleSwitchProps) {
  const [isSelected, setSelected] = useControllableState({
    defaultValue: defaultSelected,
    onChange: onSelectedChange,
    value: selected
  });
  const isDisabled = disabled || visualState === 'disabled' || visualState === 'loader';
  return (
    <button
      aria-checked={isSelected}
      className={cx('fds-switch', className)}
      data-selected={isSelected ? 'yes' : 'no'}
      data-state={visualState}
      disabled={isDisabled}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setSelected(!isSelected);
        }
      }}
      role="switch"
      type="button"
      {...props}
    >
      <span className="fds-switch-track" aria-hidden="true">
        <span className="fds-switch-thumb">{visualState === 'loader' ? <span className="fds-spinner" /> : null}</span>
      </span>
      <span>{label}</span>
    </button>
  );
}
