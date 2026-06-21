import type { SelectHTMLAttributes } from 'react';
import '../styles.css';
import { Icon, icons } from '../icons';
import { cx, useControllableState } from '../shared';

export type InputFieldValue = string | string[];

/**
 * Selection input from Figma `Input field/Auto complete` and `Input field/Dropdown`.
 *
 * Use dropdown mode for constrained choices and autocomplete mode when searching within a large option set.
 */
export interface InputFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'defaultValue' | 'multiple' | 'onChange' | 'value'> {
  /** Visible label for the input field. */
  label: string;
  /** Figma component mode: autocomplete or dropdown. */
  mode?: 'autocomplete' | 'dropdown';
  /** State from the Figma input-field axis. */
  visualState?: 'default' | 'hover' | 'pressed' | 'focused' | 'disabled' | 'open';
  /** Selection/input model from the Figma axis. */
  selection?: 'single' | 'multiple';
  /** Whether the field is active. */
  active?: boolean;
  /** Selected value or values for controlled product use. */
  value?: InputFieldValue;
  /** Initial selected value or values for uncontrolled product use. */
  defaultValue?: InputFieldValue;
  /** Called when the user changes the selection. */
  onChange?: (value: InputFieldValue) => void;
  /** Placeholder shown before selection. */
  placeholder?: string;
  /** Options rendered in the open menu preview. */
  options?: string[];
}

/** Dropdown or autocomplete selection input for single and multiple value selection. */
export function InputField({
  active = false,
  className,
  disabled,
  defaultValue,
  label,
  mode = 'dropdown',
  onChange,
  options = ['Drone A', 'Drone B', 'Drone C'],
  placeholder = 'Select',
  selection = 'single',
  value,
  visualState = 'default',
  ...props
}: InputFieldProps) {
  const [currentValue, setValue] = useControllableState<InputFieldValue>({
    defaultValue: defaultValue ?? (selection === 'multiple' ? [] : ''),
    onChange,
    value
  });
  const isOpen = visualState === 'open';
  const selectedValues = Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : [];
  const isActive = active || selectedValues.length > 0;
  const visibleValues = selectedValues.length > 0 ? selectedValues : isActive ? options.slice(0, selection === 'multiple' ? 2 : 1) : [placeholder];
  return (
    <label
      className={cx('fds-input-field', className)}
      data-active={isActive ? 'yes' : 'no'}
      data-mode={mode}
      data-selection={selection}
      data-state={visualState}
    >
      <span>{label}</span>
      <span className="fds-input-field-control">
        {mode === 'autocomplete' ? <span aria-hidden="true" className="fds-icon-slot"><Icon icon={icons.search} /></span> : null}
        <span className="fds-input-field-value" aria-hidden="true">
          {visibleValues.map((value) => (
            <span key={value} data-placeholder={active ? 'no' : 'yes'}>
              {value}
            </span>
          ))}
        </span>
        <select
          aria-label={label}
          className="fds-input-field-native"
          disabled={disabled || visualState === 'disabled'}
          multiple={selection === 'multiple'}
          onChange={(event) => {
            const nextValue =
              selection === 'multiple'
                ? Array.from(event.currentTarget.selectedOptions, (option) => option.value)
                : event.currentTarget.value;
            setValue(nextValue);
          }}
          size={selection === 'multiple' ? 2 : undefined}
          value={currentValue}
          {...props}
        >
          {selection === 'single' ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <span aria-hidden="true" className="fds-icon-slot"><Icon icon={icons.chevronDown} /></span>
      </span>
      {isOpen ? (
        <span className="fds-input-menu" aria-hidden="true">
          {options.map((option) => (
            <span key={option}>{option}</span>
          ))}
        </span>
      ) : null}
    </label>
  );
}
