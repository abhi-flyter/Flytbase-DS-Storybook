import type { ReactNode } from 'react';
import '../styles.css';
import { cx } from '../shared';
import { Checkbox } from '../Checkbox';
import { Search } from '../Search';
import { Button } from '../Button';
import { useControllableState } from '../shared';

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
  /** Selected option values for controlled product use. */
  selectedValues?: string[];
  /** Initial selected option values for uncontrolled product use. */
  defaultSelectedValues?: string[];
  /** Called when selected filter values change. */
  onSelectionChange?: (values: string[]) => void;
  /** Search query for controlled product use. */
  searchValue?: string;
  /** Initial search query for uncontrolled product use. */
  defaultSearchValue?: string;
  /** Called when the filter search query changes. */
  onSearchChange?: (value: string) => void;
  /** Called when the Clear action is clicked. */
  onClear?: () => void;
  /** Called when the Apply action is clicked. */
  onApply?: (values: string[]) => void;
  /** Called when the Cancel action is clicked. */
  onCancel?: () => void;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Searchable filter panel for default, few-selected, and all-selected filtering states. */
export function FilterWidget({
  className,
  defaultSearchValue = '',
  defaultSelectedValues,
  onApply,
  onCancel,
  onClear,
  onSearchChange,
  onSelectionChange,
  options,
  searchValue,
  selectedValues,
  state = 'default'
}: FilterWidgetProps) {
  const [currentSelectedValues, setSelectedValues] = useControllableState({
    defaultValue: defaultSelectedValues ?? options.filter((option) => option.selected).map((option) => option.value),
    onChange: onSelectionChange,
    value: selectedValues
  });
  const [currentSearchValue, setSearchValue] = useControllableState({
    defaultValue: defaultSearchValue,
    onChange: onSearchChange,
    value: searchValue
  });

  function toggleOption(value: string) {
    setSelectedValues(
      currentSelectedValues.includes(value)
        ? currentSelectedValues.filter((selectedValue) => selectedValue !== value)
        : [...currentSelectedValues, value]
    );
  }

  function clearSelection() {
    setSelectedValues([]);
    setSearchValue('');
    onClear?.();
  }

  return (
    <section className={cx('fds-filter-widget', className)} data-state={state}>
      <header>
        <strong>Filter</strong>
        <Button onClick={clearSelection} variant="text">Clear</Button>
      </header>
      <Search
        ariaLabel="Search filters"
        onChange={(event) => setSearchValue(event.currentTarget.value)}
        onClear={() => setSearchValue('')}
        placeholder="Search"
        value={currentSearchValue}
      />
      <div className="fds-filter-options">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={String(option.label)}
            onSelectionChange={() => toggleOption(option.value)}
            selection={currentSelectedValues.includes(option.value) ? 'selected' : 'unselected'}
          />
        ))}
      </div>
      <footer>
        <Button onClick={onCancel} variant="secondary">Cancel</Button>
        <Button onClick={() => onApply?.(currentSelectedValues)}>Apply</Button>
      </footer>
    </section>
  );
}
