import type { ReactNode } from 'react';
import { cx, type ControlState } from '../shared';

export interface TabItem {
  /** Stable tab value. */
  value: string;
  /** Visible tab label. */
  label: ReactNode;
  /** Optional leading icon from the Figma tab building block. */
  icon?: ReactNode;
  /** Optional disabled state. */
  disabled?: boolean;
}

/**
 * Tabs from Figma `Tabs`.
 *
 * Use for switching between peer views in the same surface.
 */
export interface TabsProps {
  /** Tab list. */
  items: TabItem[];
  /** Active tab value. */
  value?: string;
  /** Preview-only state applied in documentation. */
  visualState?: ControlState;
  /** Optional change handler. */
  onChange?: (value: string) => void;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Tab navigation for switching between peer views in the same surface. */
export function Tabs({ className, items, onChange, value, visualState = 'default' }: TabsProps) {
  const activeValue = value ?? items[0]?.value;
  return (
    <div className={cx('fds-tabs', className)} role="tablist">
      {items.map((item) => {
        const selected = item.value === activeValue;
        return (
          <button
            aria-selected={selected}
            className="fds-tab"
            data-selected={selected ? 'yes' : 'no'}
            data-state={visualState}
            disabled={item.disabled || visualState === 'disabled'}
            key={item.value}
            onClick={() => onChange?.(item.value)}
            role="tab"
            type="button"
          >
            {item.icon ? <span className="fds-tab-icon">{item.icon}</span> : null}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
