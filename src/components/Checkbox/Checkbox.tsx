import type { InputHTMLAttributes } from 'react';
import { cx, type ControlState, useControllableState } from '../shared';

export type CheckboxSelection = 'unselected' | 'selected' | 'indeterminate';

/**
 * Checkbox control from Figma `Checkbox`.
 *
 * Use for independent binary choices and multi-select lists. Use `indeterminate` only for parent
 * selections with partially selected children.
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'defaultChecked' | 'onChange' | 'size' | 'type'> {
  /** Visible label associated with the checkbox input. */
  label: string;
  /** Figma selection type: unselected, selected, or indeterminate. */
  selection?: CheckboxSelection;
  /** Initial selection for uncontrolled product use. */
  defaultSelection?: CheckboxSelection;
  /** Called when the user toggles the checkbox. */
  onSelectionChange?: (selection: CheckboxSelection) => void;
  /** Bounding box size from the Figma axis. */
  boxSize?: '16px' | '20px';
  /** Preview-only state for documenting all Figma states. */
  visualState?: ControlState;
}

/** Checkbox for independent binary choices, selected states, and indeterminate parent selections. */
export function Checkbox({
  boxSize = '20px',
  className,
  defaultSelection = 'unselected',
  disabled,
  label,
  onSelectionChange,
  selection,
  visualState = 'default',
  ...props
}: CheckboxProps) {
  const [currentSelection, setSelection] = useControllableState({
    defaultValue: defaultSelection,
    onChange: onSelectionChange,
    value: selection
  });
  const isChecked = currentSelection === 'selected';
  const isDisabled = disabled || visualState === 'disabled';
  const nextSelection = currentSelection === 'selected' ? 'unselected' : 'selected';
  return (
    <label className={cx('fds-checkable', className)} data-state={visualState}>
      <input
        checked={isChecked}
        data-size={boxSize}
        disabled={isDisabled}
        onChange={() => setSelection(nextSelection)}
        ref={(node) => {
          if (node) node.indeterminate = currentSelection === 'indeterminate';
        }}
        type="checkbox"
        {...props}
      />
      <span
        aria-hidden="true"
        className="fds-checkable-control"
        data-selection={currentSelection}
        data-size={boxSize}
        data-type="checkbox"
      >
        <span />
      </span>
      <span className="fds-checkable-label">{label}</span>
    </label>
  );
}
