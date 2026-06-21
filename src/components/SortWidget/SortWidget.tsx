import '../styles.css';
import { RadioButton } from '../RadioButton';
import { Button } from '../Button';
import { cx, useControllableState } from '../shared';

export type SortOrder = 'newest' | 'oldest';

/**
 * Sort panel from Figma `Sort widget`.
 *
 * Use for selecting a sort field and order. Use `custom` when custom rules are available.
 */
export interface SortWidgetProps {
  /** Widget mode from the Figma `Type` axis. */
  type?: 'default' | 'custom';
  /** Current sort order. */
  order?: SortOrder;
  /** Initial sort order for uncontrolled product use. */
  defaultOrder?: SortOrder;
  /** Called when the selected sort order changes. */
  onOrderChange?: (order: SortOrder) => void;
  /** Called when the Apply action is clicked. */
  onApply?: (order: SortOrder) => void;
  /** Called when the Cancel action is clicked. */
  onCancel?: () => void;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Sort panel for newest, oldest, and custom sort workflows. */
export function SortWidget({
  className,
  defaultOrder = 'newest',
  onApply,
  onCancel,
  onOrderChange,
  order,
  type = 'default'
}: SortWidgetProps) {
  const [currentOrder, setOrder] = useControllableState<SortOrder>({
    defaultValue: defaultOrder,
    onChange: onOrderChange,
    value: order
  });
  return (
    <section className={cx('fds-sort-widget', className)} data-type={type}>
      <header>
        <strong>Sort</strong>
        {type === 'custom' ? <Button variant="text">Custom</Button> : null}
      </header>
      <div className="fds-filter-options">
        <RadioButton label="Newest first" name="sort-order" onSelectedChange={() => setOrder('newest')} selected={currentOrder === 'newest'} />
        <RadioButton label="Oldest first" name="sort-order" onSelectedChange={() => setOrder('oldest')} selected={currentOrder === 'oldest'} />
      </div>
      <footer>
        <Button onClick={onCancel} variant="secondary">Cancel</Button>
        <Button onClick={() => onApply?.(currentOrder)}>Apply</Button>
      </footer>
    </section>
  );
}
