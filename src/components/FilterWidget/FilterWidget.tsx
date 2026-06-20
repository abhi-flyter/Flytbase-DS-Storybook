import type { ReactNode } from 'react';
import '../styles.css';
import { cx } from '../shared';
import { Checkbox } from '../Checkbox';
import { Search } from '../Search';
import { Button } from '../Button';

export interface FilterOption {
  /** Stable value. */
  value: string;
  /** Visible option label. */
  label: ReactNode;
  /** Whether this option is selected. */
  selected?: boolean;
}

/**
 * Filter panel from Figma `Filter widget`.
 *
 * Use for searchable multi-select filtering with clear/apply actions.
 */
export interface FilterWidgetProps {
  /** Widget state from the Figma `Type` axis. */
  state?: 'default' | 'fewSelected' | 'allSelected';
  /** Filter options. */
  options: FilterOption[];
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Searchable filter panel for default, few-selected, and all-selected filtering states. */
export function FilterWidget({ className, options, state = 'default' }: FilterWidgetProps) {
  return (
    <section className={cx('fds-filter-widget', className)} data-state={state}>
      <header>
        <strong>Filter</strong>
        <Button variant="text">Clear</Button>
      </header>
      <Search ariaLabel="Search filters" placeholder="Search" />
      <div className="fds-filter-options">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={String(option.label)}
            selection={option.selected ? 'selected' : 'unselected'}
          />
        ))}
      </div>
      <footer>
        <Button variant="secondary">Cancel</Button>
        <Button>Apply</Button>
      </footer>
    </section>
  );
}
