import type { ButtonHTMLAttributes, KeyboardEvent, MouseEvent } from 'react';
import { useId, useState } from 'react';
import { Icon, icons } from '../icons';
import { cx, useControllableState } from '../shared';

export type InputFieldValue = string | string[];

/**
 * Selection input from Figma `Input field/Auto complete` and `Input field/Dropdown`.
 *
 * Use dropdown mode for constrained choices and autocomplete mode when searching within a large option set.
 */
export interface InputFieldProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'defaultValue' | 'onChange' | 'value'> {
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
  /** Whether the option menu is open for controlled product use. */
  open?: boolean;
  /** Initial open state for uncontrolled product use. */
  defaultOpen?: boolean;
  /** Called when the option menu opens or closes. */
  onOpenChange?: (open: boolean) => void;
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
  defaultOpen,
  defaultValue,
  label,
  mode = 'dropdown',
  onChange,
  onClick,
  onKeyDown,
  onOpenChange,
  open,
  options = ['Drone A', 'Drone B', 'Drone C'],
  placeholder = 'Select',
  selection = 'single',
  value,
  visualState = 'default',
  ...props
}: InputFieldProps) {
  const generatedId = useId();
  const [currentValue, setValue] = useControllableState<InputFieldValue>({
    defaultValue: defaultValue ?? (selection === 'multiple' ? [] : ''),
    onChange,
    value
  });
  const [currentOpen, setOpen] = useControllableState({
    defaultValue: defaultOpen ?? visualState === 'open',
    onChange: onOpenChange,
    value: open
  });
  const [activeOptionIndex, setActiveOptionIndex] = useState(0);
  const isDisabled = disabled || visualState === 'disabled';
  const isOpen = currentOpen || visualState === 'open';
  const selectedValues = Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : [];
  const isActive = active || selectedValues.length > 0;
  const visibleValues = selectedValues.length > 0 ? selectedValues : isActive ? options.slice(0, selection === 'multiple' ? 2 : 1) : [placeholder];
  const listboxId = `${generatedId}-options`;

  function changeOpen(nextOpen: boolean) {
    if (isDisabled) return;
    setOpen(nextOpen);
    if (nextOpen) {
      const selectedIndex = options.findIndex((option) => selectedValues.includes(option));
      setActiveOptionIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }

  function selectOption(option: string) {
    if (isDisabled) return;

    if (selection === 'multiple') {
      setValue(
        selectedValues.includes(option)
          ? selectedValues.filter((selectedValue) => selectedValue !== option)
          : [...selectedValues, option]
      );
      return;
    }

    setValue(option);
    changeOpen(false);
  }

  function moveActiveOption(direction: 1 | -1) {
    if (options.length === 0) return;
    setActiveOptionIndex((currentIndex) => (currentIndex + direction + options.length) % options.length);
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    changeOpen(!isOpen);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) {
        changeOpen(true);
      } else {
        moveActiveOption(1);
      }
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        changeOpen(true);
      } else {
        moveActiveOption(-1);
      }
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!isOpen) {
        changeOpen(true);
      } else if (options[activeOptionIndex]) {
        selectOption(options[activeOptionIndex]);
      }
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      changeOpen(false);
    }
  }

  return (
    <label
      className={cx('fds-input-field', className)}
      data-active={isActive ? 'yes' : 'no'}
      data-mode={mode}
      data-open={isOpen ? 'yes' : 'no'}
      data-selection={selection}
      data-state={isOpen ? 'open' : visualState}
    >
      <span>{label}</span>
      <span className="fds-input-field-control">
        {mode === 'autocomplete' ? <span aria-hidden="true" className="fds-icon-slot"><Icon icon={icons.search} /></span> : null}
        <span className="fds-input-field-value" aria-hidden="true">
          {visibleValues.map((value) => (
            <span key={value} data-placeholder={isActive ? 'no' : 'yes'}>
              {value}
            </span>
          ))}
        </span>
        <button
          aria-activedescendant={isOpen && options[activeOptionIndex] ? `${listboxId}-${activeOptionIndex}` : undefined}
          aria-controls={isOpen ? listboxId : undefined}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={label}
          className="fds-input-field-trigger"
          disabled={isDisabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          type="button"
          {...props}
        />
        <span aria-hidden="true" className="fds-icon-slot"><Icon icon={icons.chevronDown} /></span>
      </span>
      {isOpen ? (
        <span className="fds-input-menu" id={listboxId} role="listbox" aria-multiselectable={selection === 'multiple' || undefined}>
          {options.map((option, optionIndex) => (
            <button
              aria-selected={selectedValues.includes(option)}
              className="fds-input-option"
              data-active={activeOptionIndex === optionIndex ? 'yes' : 'no'}
              id={`${listboxId}-${optionIndex}`}
              key={option}
              onClick={() => selectOption(option)}
              onMouseEnter={() => setActiveOptionIndex(optionIndex)}
              role="option"
              type="button"
            >
              <span>{option}</span>
              {selectedValues.includes(option) ? <Icon icon={icons.check} /> : null}
            </button>
          ))}
        </span>
      ) : null}
    </label>
  );
}
