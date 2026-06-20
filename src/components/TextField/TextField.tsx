import type { InputHTMLAttributes, ReactNode } from 'react';
import '../styles.css';
import { cx, slug, type FieldState } from '../shared';

/**
 * Text field family from Figma `Text Field outline` and `Number text field`.
 *
 * Use for direct text entry, helper text, errors, description boxes, and compact numeric controls.
 */
export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size' | 'type'> {
  /** Visible field label. */
  label: string;
  /** Text field state from the Figma outline axis. */
  visualState?: FieldState;
  /** Label requirement indicator from the Figma header axis. */
  requirement?: 'default' | 'optional' | 'mandatory';
  /** Optional leading slot, used for prefix icon or asset. */
  prefix?: ReactNode;
  /** Optional trailing slot, used for suffix icon or counter. */
  suffix?: ReactNode;
  /** Helper text associated with the input. */
  helperText?: string;
  /** Whether to render the description-box variant as a textarea-like field. */
  multiline?: boolean;
  /** Number field progression controls from the Figma `Number text field` variants. */
  numberControls?: 'icon' | 'number';
}

/** Text entry field for labels, helper text, errors, description boxes, and numeric controls. */
export function TextField({
  className,
  disabled,
  helperText,
  label,
  multiline = false,
  numberControls,
  prefix,
  requirement = 'default',
  suffix,
  visualState = 'default',
  ...props
}: TextFieldProps) {
  const helperId = helperText ? `${slug(label)}-helper` : undefined;
  const isDisabled = disabled || visualState === 'disabled';
  const isError = visualState === 'error';
  return (
    <label className={cx('fds-field', className)} data-state={visualState}>
      <span className="fds-field-header">
        <span>{label}</span>
        {requirement !== 'default' ? <span>{requirement === 'mandatory' ? '*' : 'Optional'}</span> : null}
      </span>
      <span className="fds-field-control">
        {prefix ? <span className="fds-field-slot">{prefix}</span> : null}
        {multiline || visualState === 'description' ? (
          <textarea
            aria-describedby={helperId}
            aria-invalid={isError || undefined}
            disabled={isDisabled}
            placeholder={props.placeholder}
            readOnly
            value={String(props.value ?? '')}
          />
        ) : (
          <input
            aria-describedby={helperId}
            aria-invalid={isError || undefined}
            disabled={isDisabled}
            type={numberControls ? 'number' : 'text'}
            {...props}
            readOnly
          />
        )}
        {suffix ? <span className="fds-field-slot">{suffix}</span> : null}
        {numberControls ? (
          <span className="fds-number-controls" aria-hidden="true">
            <span>{numberControls === 'icon' ? '+' : '1'}</span>
            <span>{numberControls === 'icon' ? '-' : '0'}</span>
          </span>
        ) : null}
      </span>
      {helperText ? (
        <span className="fds-field-helper" id={helperId}>
          {helperText}
        </span>
      ) : null}
    </label>
  );
}
