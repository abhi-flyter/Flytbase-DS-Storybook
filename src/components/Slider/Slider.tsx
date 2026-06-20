import type { InputHTMLAttributes } from 'react';
import '../styles.css';
import { cx } from '../shared';

/**
 * Slider from Figma `Slider`.
 *
 * Use for bounded numeric values. Use `range` when the user needs a minimum and maximum.
 */
export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  /** Slider mode from the Figma axis. */
  mode?: 'single' | 'range';
  /** Visible field label. */
  label?: string;
  /** Single value or range tuple. */
  value?: number | [number, number];
  /** Unit suffix shown in the Figma output text. */
  unit?: string;
  /** Supporting help text. */
  helpText?: string;
  /** Whether the slider is disabled. */
  disabled?: boolean;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Single-value or range slider for bounded numeric inputs. */
export function Slider({
  className,
  disabled = false,
  helpText = 'Help text',
  label = 'Label',
  max = 100,
  min = 0,
  mode = 'single',
  unit = '°C',
  value = 50,
  ...props
}: SliderProps) {
  const values = Array.isArray(value) ? value : [value];
  const output = Array.isArray(value) ? `${value[0]} to ${value[1]}` : `${value}`;
  return (
    <span className={cx('fds-slider', className)} data-disabled={disabled ? 'yes' : 'no'} data-mode={mode}>
      <span className="fds-slider-header">
        <span>{label}</span>
        <span>
          <span>{output}</span>
          <span>{unit}</span>
        </span>
      </span>
      <span className="fds-slider-track">
        {values.map((currentValue, index) => (
          <input disabled={disabled} key={index} max={max} min={min} type="range" value={currentValue} {...props} readOnly />
        ))}
      </span>
      <span className="fds-slider-help">{helpText}</span>
    </span>
  );
}
