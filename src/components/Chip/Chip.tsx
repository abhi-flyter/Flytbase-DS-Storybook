import type { ButtonHTMLAttributes, ReactNode } from 'react';
import '../styles.css';
import { Icon, icons } from '../icons';
import { cx, type ControlState } from '../shared';

/**
 * Chip family from Figma `Input chip`, `Choice chips`, and `Filter chip`.
 *
 * Use choice/filter chips for compact selections and input chips for removable entered values.
 */
export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'> {
  /** Figma chip family to render. */
  kind?: 'input' | 'choice' | 'filter';
  /** Chip size from the input-chip axis. */
  size?: 'small' | 'medium' | 'large';
  /** Whether the chip is selected. */
  selected?: boolean;
  /** Selection model used by filter chips. */
  selectionType?: 'single' | 'multi';
  /** Preview-only state for documenting all Figma chip states. */
  visualState?: ControlState;
  /** Optional prefix slot for avatar, monogram, or icon content. */
  prefix?: ReactNode;
  /** Chip text. */
  children: ReactNode;
}

/** Choice, filter, or removable input chip for compact selections and entered values. */
export function Chip({
  children,
  className,
  disabled,
  kind = 'choice',
  prefix,
  selected = false,
  selectionType = 'single',
  size = 'medium',
  visualState = 'default',
  ...props
}: ChipProps) {
  return (
    <button
      aria-pressed={kind === 'input' ? undefined : selected}
      className={cx('fds-chip', className)}
      data-kind={kind}
      data-selected={selected ? 'yes' : 'no'}
      data-selection-type={selectionType}
      data-size={size}
      data-state={visualState}
      disabled={disabled || visualState === 'disabled'}
      type="button"
      {...props}
    >
      {prefix ? <span className="fds-chip-prefix">{prefix}</span> : null}
      <span>{children}</span>
      {kind === 'input' ? <span aria-hidden="true" className="fds-icon-slot"><Icon icon={icons.x} /></span> : null}
    </button>
  );
}
