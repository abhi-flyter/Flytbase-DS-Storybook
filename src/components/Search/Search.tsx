import type { InputHTMLAttributes } from 'react';
import '../styles.css';
import { Icon, icons } from '../icons';
import { cx } from '../shared';

/**
 * Search field from Figma `Search`.
 *
 * Use for filtering or searching within the current product surface. Provide an accessible label.
 */
export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Accessible label for the search input. */
  ariaLabel: string;
  /** Figma size axis for the search bar. */
  size?: 'small' | 'medium';
  /** Preview-only state for documenting search states. */
  visualState?: 'default' | 'hover' | 'pressed' | 'focused' | 'active';
}

/** Token-aligned search field for filtering or finding content inside the current product surface. */
export function Search({
  ariaLabel,
  className,
  disabled,
  placeholder = 'Search',
  size = 'medium',
  visualState = 'default',
  ...props
}: SearchProps) {
  return (
    <label className={cx('fds-search', className)} data-size={size} data-state={visualState}>
      <span aria-hidden="true" className="fds-icon-slot"><Icon icon={icons.search} /></span>
      <input
        aria-label={ariaLabel}
        disabled={disabled}
        placeholder={placeholder}
        type="search"
        {...props}
        readOnly
      />
      <span aria-hidden="true" className="fds-icon-slot"><Icon icon={icons.x} /></span>
    </label>
  );
}
