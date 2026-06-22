import type { ButtonHTMLAttributes } from 'react';
import { Icon, icons } from '../icons';
import type { IconGlyph } from '../icons';
import { cx } from '../shared';
import type { ButtonSize } from '../Button';

export type IconButtonVariant = 'default' | 'filled' | 'outline';
export type IconButtonState = 'idle' | 'hover' | 'pressed' | 'focused' | 'disabled';

/**
 * Square icon-only button from Figma `Icon button`.
 *
 * Use for compact tool actions where the icon carries the meaning. Always provide `ariaLabel`.
 */
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name required for icon-only controls. */
  ariaLabel: string;
  /** Visual type from the Figma `Type` axis. */
  variant?: IconButtonVariant;
  /** Icon button density from the Figma `Size` axis. */
  size?: Exclude<ButtonSize, 'large'>;
  /** Preview-only state matching the Figma `State` axis. */
  visualState?: IconButtonState;
  /** Icon component rendered inside the control. */
  icon?: IconGlyph;
}

/** Compact icon-only action button for toolbar and dense control surfaces. */
export function IconButton({
  ariaLabel,
  className,
  disabled,
  icon = icons.plus,
  size = 'default',
  variant = 'default',
  visualState = 'idle',
  ...props
}: IconButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={cx('fds-icon-button', className)}
      data-size={size}
      data-state={visualState}
      data-variant={variant}
      disabled={disabled || visualState === 'disabled'}
      type="button"
      {...props}
    >
      <span aria-hidden="true" className="fds-icon-slot">
        <Icon icon={icon} />
      </span>
    </button>
  );
}
