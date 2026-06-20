import type { ButtonHTMLAttributes } from 'react';
import '../styles.css';
import { cx, type ControlState } from '../shared';

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
  /** Preview-only state, including the Figma loader state. */
  visualState?: ControlState | 'loader';
}

/** Immediate toggle switch for on/off settings, including disabled and loading documentation states. */
export function ToggleSwitch({
  className,
  disabled,
  label,
  selected = false,
  visualState = 'default',
  ...props
}: ToggleSwitchProps) {
  const isDisabled = disabled || visualState === 'disabled' || visualState === 'loader';
  return (
    <button
      aria-checked={selected}
      className={cx('fds-switch', className)}
      data-selected={selected ? 'yes' : 'no'}
      data-state={visualState}
      disabled={isDisabled}
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
