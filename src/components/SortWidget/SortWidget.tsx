import '../styles.css';
import { cx } from '../shared';
import { RadioButton } from '../RadioButton';
import { Button } from '../Button';

/**
 * Sort panel from Figma `Sort widget`.
 *
 * Use for selecting a sort field and order. Use `custom` when custom rules are available.
 */
export interface SortWidgetProps {
  /** Widget mode from the Figma `Type` axis. */
  type?: 'default' | 'custom';
  /** Current sort order. */
  order?: 'newest' | 'oldest';
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Sort panel for newest, oldest, and custom sort workflows. */
export function SortWidget({ className, order = 'newest', type = 'default' }: SortWidgetProps) {
  return (
    <section className={cx('fds-sort-widget', className)} data-type={type}>
      <header>
        <strong>Sort</strong>
        {type === 'custom' ? <Button variant="text">Custom</Button> : null}
      </header>
      <div className="fds-filter-options">
        <RadioButton label="Newest first" name="sort-order" selected={order === 'newest'} />
        <RadioButton label="Oldest first" name="sort-order" selected={order === 'oldest'} />
      </div>
      <footer>
        <Button variant="secondary">Cancel</Button>
        <Button>Apply</Button>
      </footer>
    </section>
  );
}
