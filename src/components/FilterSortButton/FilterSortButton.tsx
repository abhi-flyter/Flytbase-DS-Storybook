import type { ButtonHTMLAttributes } from 'react';
import '../styles.css';
import { Icon, icons } from '../icons';
import { cx, type ControlState } from '../shared';

/**
 * Filter/sort trigger from Figma `Filter/Sort button`.
 *
 * Use to open filter or sort widgets. The active marker communicates applied filters or sort order.
 */
export interface FilterSortButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Trigger kind. */
  kind?: 'filter' | 'sort';
  /** Whether this trigger is selected/open. */
  selected?: boolean;
  /** Whether a filter or sort is active. */
  active?: boolean;
  /** Number of active filter categories shown in the Figma button badge. */
  activeCount?: number;
  /** Preview-only state for Figma states. */
  visualState?: ControlState;
}

/** Filter or sort trigger that shows selected and active-filter states. */
export function FilterSortButton({
  active = false,
  activeCount = 1,
  children,
  className,
  kind = 'filter',
  selected = false,
  visualState = 'default',
  ...props
}: FilterSortButtonProps) {
  return (
    <button
      className={cx('fds-filter-sort-button', className)}
      data-active={active ? 'yes' : 'no'}
      data-kind={kind}
      data-selected={selected ? 'yes' : 'no'}
      data-state={visualState}
      disabled={props.disabled || visualState === 'disabled'}
      type="button"
      {...props}
    >
      <span aria-hidden="true" className="fds-icon-slot">
        <Icon icon={kind === 'filter' ? icons.filter : icons.slidersHorizontal} />
      </span>
      <span>{kind === 'filter' ? 'Filters' : 'Sort'}</span>
      {children ? <span>{children}</span> : null}
      {active ? <span className="fds-active-count" aria-label={`${activeCount} active categories`}>{activeCount}</span> : null}
    </button>
  );
}
