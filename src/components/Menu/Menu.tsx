import type { ReactNode } from 'react';
import { Checkbox } from '../Checkbox';
import { Icon, icons } from '../icons';
import { cx, type ControlState } from '../shared';

export interface MenuItem {
  /** Stable item value. */
  value: string;
  /** Visible item label. */
  label: ReactNode;
  /** Optional leading slot. */
  prefix?: ReactNode;
  /** Optional trailing slot. */
  suffix?: ReactNode;
  /** Whether this item is selected. */
  selected?: boolean;
  /** Whether this item is destructive. */
  destructive?: boolean;
  /** Whether this item is disabled. */
  disabled?: boolean;
  /** Figma content row type. */
  content?: 'action' | 'divider' | 'sub-title';
}

/**
 * Dropdown/menu surface from Figma `Dropdown Menu` and menu building blocks.
 *
 * Use for compact action or selection lists. Choose `selectionType` for single or multi-select menus.
 */
export interface MenuProps {
  /** Menu item list. */
  items: MenuItem[];
  /** Selection model from the Figma axis. */
  selectionType?: 'single' | 'multi' | 'action';
  /** Figma surface type axis. */
  type?: 'menu' | 'dropdown';
  /** Optional sub-title/header. */
  title?: string;
  /** Optional footer slot. */
  footer?: ReactNode;
  /** Preview-only state applied to items in documentation. */
  visualState?: ControlState;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Dropdown or menu surface for action, single-select, and multi-select item lists. */
export function Menu({
  className,
  footer,
  items,
  selectionType = 'action',
  title,
  type = 'menu',
  visualState = 'default'
}: MenuProps) {
  return (
    <section className={cx('fds-menu', className)} data-selection={selectionType} data-type={type}>
      {title ? <header>{title}</header> : null}
      <div className="fds-menu-items">
        {items.map((item) => {
          if (item.content === 'divider') {
            return <hr className="fds-menu-divider" key={item.value} />;
          }

          if (item.content === 'sub-title') {
            return <div className="fds-menu-subtitle" key={item.value}>{item.label}</div>;
          }

          const selectionPrefix =
            selectionType === 'multi' ? (
              <Checkbox
                aria-label={`${String(item.label)} selected`}
                boxSize="20px"
                label=""
                selection={item.selected ? 'selected' : 'unselected'}
                visualState={visualState}
              />
            ) : selectionType === 'single' && item.selected ? (
              <Icon icon={icons.check} />
            ) : null;

          return (
            <button
              className="fds-menu-item"
              data-destructive={item.destructive ? 'yes' : 'no'}
              data-selected={item.selected ? 'yes' : 'no'}
              data-state={visualState}
              disabled={item.disabled || visualState === 'disabled'}
              key={item.value}
              type="button"
            >
              <span className="fds-menu-prefix">{selectionPrefix ?? item.prefix ?? null}</span>
              <span>{item.label}</span>
              {item.suffix ? <span className="fds-menu-suffix">{item.suffix}</span> : null}
            </button>
          );
        })}
      </div>
      {footer ? <footer>{footer}</footer> : null}
    </section>
  );
}
