import type { ButtonHTMLAttributes, ReactNode } from 'react';
import '../styles.css';
import { cx } from '../shared';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'tonal' | 'text' | 'link';
export type ButtonSize = 'small' | 'default' | 'large';
export type ButtonState = 'idle' | 'hover' | 'pressed' | 'focused' | 'disabled';

/**
 * CTA button from Figma `Button CTA`.
 *
 * Use for product actions that need a clear hierarchy. Choose `primary` for the main action,
 * `secondary` or `outline` for supporting actions, and `text` or `link` for low-emphasis actions.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual CTA treatment from the Figma `Type` axis. */
  variant?: ButtonVariant;
  /** Button density from the Figma `Size` axis. */
  size?: ButtonSize;
  /** Preview-only state matching the Figma `States` axis. */
  visualState?: ButtonState;
  /** Optional leading slot, usually an icon. */
  leading?: ReactNode;
  /** Optional trailing slot, usually an icon. */
  trailing?: ReactNode;
  /** Whether to render the Figma loader state. */
  loading?: boolean;
}

/** Product action button for CTA, secondary, outline, tonal, text, link, and loader states. */
export function Button({
  children,
  className,
  disabled,
  leading,
  loading,
  size = 'default',
  trailing,
  variant = 'primary',
  visualState = 'idle',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || visualState === 'disabled' || loading;
  return (
    <button
      className={cx('fds-button', className)}
      data-size={size}
      data-state={loading ? 'loader' : visualState}
      data-variant={variant}
      disabled={isDisabled}
      type="button"
      {...props}
    >
      {loading ? <span className="fds-spinner" aria-hidden="true" /> : leading}
      <span>{children}</span>
      {trailing}
    </button>
  );
}
