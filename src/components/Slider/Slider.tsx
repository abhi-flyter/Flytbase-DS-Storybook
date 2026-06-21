import type { HTMLAttributes, KeyboardEvent } from 'react';
import '../styles.css';
import { cx, useControllableState } from '../shared';

export type SliderValue = number | [number, number];

/**
 * Slider from Figma `Slider`.
 *
 * Use for bounded numeric values. Use `range` when the user needs a minimum and maximum.
 */
export interface SliderProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'defaultValue' | 'onChange'> {
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
  /** Minimum slider value. */
  min?: number;
  /** Maximum slider value. */
  max?: number;
  /** Keyboard increment. */
  step?: number;
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
  step = 1,
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
  const minNumber = Number(min);
  const maxNumber = Number(max);
  const clamp = (nextValue: number) => Math.max(minNumber, Math.min(maxNumber, nextValue));
  const toPercent = (nextValue: number) => ((nextValue - minNumber) / (maxNumber - minNumber)) * 100;
  const progressStart = mode === 'range' ? toPercent(rangeValues[0]) : 0;
  const progressEnd = mode === 'range' ? toPercent(rangeValues[1]) : toPercent(values[0]);

  function setHandleValue(index: number, nextValue: number) {
    const boundedValue = clamp(nextValue);
    if (mode === 'range') {
      setValue(index === 0 ? [boundedValue, rangeValues[1]] : [rangeValues[0], boundedValue]);
      return;
    }
    setValue(boundedValue);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number, currentHandleValue: number) {
    const keys: Record<string, number> = {
      ArrowLeft: -step,
      ArrowDown: -step,
      ArrowRight: step,
      ArrowUp: step,
      PageDown: -step * 10,
      PageUp: step * 10
    };

    if (event.key === 'Home') {
      event.preventDefault();
      setHandleValue(index, minNumber);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      setHandleValue(index, maxNumber);
      return;
    }

    const delta = keys[event.key];
    if (delta !== undefined) {
      event.preventDefault();
      setHandleValue(index, currentHandleValue + delta);
    }
  }

  return (
    <span className={cx('fds-slider', className)} data-disabled={disabled ? 'yes' : 'no'} data-mode={mode} {...props}>
      <span className="fds-slider-header">
        <span>{label}</span>
        <span>
          <span>{output}</span>
          <span>{unit}</span>
        </span>
      </span>
      <span className="fds-slider-track">
        <span className="fds-slider-rail" aria-hidden="true">
          <span
            className="fds-slider-fill"
            style={{
              left: `${progressStart}%`,
              width: `${Math.max(0, progressEnd - progressStart)}%`
            }}
          />
          {values.map((currentValue, index) => (
            <span className="fds-slider-thumb" key={`thumb-${index}`} style={{ left: `${toPercent(currentValue)}%` }} />
          ))}
        </span>
        {values.map((currentValue, index) => (
          <button
            aria-label={mode === 'range' ? `${label} ${index === 0 ? 'minimum' : 'maximum'}` : label}
            aria-valuemax={maxNumber}
            aria-valuemin={minNumber}
            aria-valuenow={currentValue}
            className="fds-slider-handle"
            disabled={disabled}
            key={index}
            onKeyDown={(event) => handleKeyDown(event, index, currentValue)}
            role="slider"
            style={{ left: `${toPercent(currentValue)}%` }}
            type="button"
          />
        ))}
      </span>
      <span className="fds-slider-help">{helpText}</span>
    </span>
  );
}
