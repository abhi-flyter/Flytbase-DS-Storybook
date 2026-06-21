import type { InputHTMLAttributes } from 'react';
import '../styles.css';
import { cx, useControllableState } from '../shared';

export type SliderValue = number | [number, number];

/**
 * Slider from Figma `Slider`.
 *
 * Use for bounded numeric values. Use `range` when the user needs a minimum and maximum.
 */
export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'onChange' | 'type' | 'value'> {
  /** Slider mode from the Figma axis. */
  mode?: 'single' | 'range';
  /** Visible field label. */
  label?: string;
  /** Single value or range tuple. */
  value?: SliderValue;
  /** Initial value for uncontrolled product use. */
  defaultValue?: SliderValue;
  /** Called when the slider value changes. */
  onChange?: (value: SliderValue) => void;
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
  onChange,
  unit = '°C',
  value,
  defaultValue = mode === 'range' ? [30, 70] : 50,
  ...props
}: SliderProps) {
  const [currentValue, setValue] = useControllableState<SliderValue>({
    defaultValue,
    onChange,
    value
  });
  const values = Array.isArray(currentValue) ? currentValue : [currentValue];
  const output = Array.isArray(currentValue) ? `${currentValue[0]} to ${currentValue[1]}` : `${currentValue}`;
  const rangeValues: [number, number] = Array.isArray(currentValue) ? currentValue : [Number(min), currentValue];
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
          <input
            disabled={disabled}
            key={index}
            max={max}
            min={min}
            onChange={(event) => {
              const nextNumber = Number(event.currentTarget.value);
              setValue(mode === 'range' ? (index === 0 ? [nextNumber, rangeValues[1]] : [rangeValues[0], nextNumber]) : nextNumber);
            }}
            type="range"
            value={currentValue}
            {...props}
          />
        ))}
      </span>
      <span className="fds-slider-help">{helpText}</span>
    </span>
  );
}
