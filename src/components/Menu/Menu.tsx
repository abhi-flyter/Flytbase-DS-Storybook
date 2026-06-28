import type { KeyboardEvent, ReactNode } from 'react';
import { Checkbox } from '../Checkbox';
import { Icon, icons } from '../icons';
import { cx, type ControlState, useControllableState } from '../shared';

export interface MenuItem {
  /** Stable item value. */
  value: string;
  /** Visible item label. */
  label: ReactNode;
  /** Optional leading slot. */
  prefix?: ReactNode;
  /** Optional trailing slot. */
  suffix?: ReactNode;
  /** Whether this item is selected. Deprecated: use selectedValues/defaultSelectedValues for product code. */
  selected?: boolean;
  /** Whether this item is destructive. */
  destructive?: boolean;
  /** Whether this item is disabled. */
  disabled?: boolean;
  /** Figma content row type. */
  content?: 'action' | 'divider' | 'sub-title';
}

export type MenuSelectionType = 'single' | 'multi' | 'action';

/**
 * Dropdown/menu surface from Figma `Dropdown Menu` and menu building blocks.
 *
 * Use for compact action or selection lists. Choose `selectionType` for single or multi-select menus.
 */
export interface MenuProps {
  /** Menu item list. */
  items: MenuItem[];
  /** Selection model from the Figma axis. */
  selectionType?: MenuSelectionType;
  /** Selected menu item values for controlled product use. */
  selectedValues?: string[];
  /** Initial selected menu item values for uncontrolled product use. */
  defaultSelectedValues?: string[];
  /** Called when single-select or multi-select values change. */
  onSelectionChange?: (values: string[]) => void;
  /** Called when an action item is activated. */
  onAction?: (value: string, item: MenuItem) => void;
  /** Figma surface type axis. */
  type?: 'menu' | 'dropdown';
  /** Optional sub-title/header. */
  title?: string;
  /** Optional footer slot. */
  footer?: ReactNode;
  /** Preview-only state applied to items in documentation. */
  visualState?: ControlState;
  /** Accessible label for the item list. */
  ariaLabel?: string;
  /** Optional class name for layout wrappers. */
  className?: string;
}

function getInitialSelection(items: MenuItem[]) {
  return items.filter((item) => item.selected).map((item) => item.value);
}

function getActionableItems(items: MenuItem[]) {
  return items.filter((item) => item.content !== 'divider' && item.content !== 'sub-title' && !item.disabled);
}

/** Dropdown or menu surface for action, single-select, and multi-select item lists. */
export function Menu({
  ariaLabel = 'Menu items',
  className,
  defaultSelectedValues,
  footer,
  items,
  onAction,
  onSelectionChange,
  selectedValues,
  selectionType = 'action',
  title,
  type = 'menu',
  visualState = 'default'
}: MenuProps) {
  const [currentSelection, setCurrentSelection] = useControllableState<string[]>({
    defaultValue: defaultSelectedValues ?? getInitialSelection(items),
    onChange: onSelectionChange,
    value: selectedValues
  });

  function activateItem(item: MenuItem) {
    if (item.disabled || visualState === 'disabled') return;

    if (selectionType === 'action') {
      onAction?.(item.value, item);
      return;
    }

    if (selectionType === 'single') {
      setCurrentSelection([item.value]);
      return;
    }

    setCurrentSelection(
      currentSelection.includes(item.value)
        ? currentSelection.filter((value) => value !== item.value)
        : [...currentSelection, item.value]
    );
  }

  function focusItem(indexOffset: number, currentValue: string) {
    const actionableItems = getActionableItems(items);
    const currentIndex = actionableItems.findIndex((item) => item.value === currentValue);
    const nextItem = actionableItems[(currentIndex + indexOffset + actionableItems.length) % actionableItems.length];
    const nextButton = document.querySelector<HTMLButtonElement>(`[data-menu-value="${nextItem?.value}"]`);
    nextButton?.focus();
  }

  function handleItemKeyDown(event: KeyboardEvent<HTMLButtonElement>, item: MenuItem) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusItem(1, item.value);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusItem(-1, item.value);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      const first = getActionableItems(items)[0];
      document.querySelector<HTMLButtonElement>(`[data-menu-value="${first?.value}"]`)?.focus();
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      const actionableItems = getActionableItems(items);
      const last = actionableItems[actionableItems.length - 1];
      document.querySelector<HTMLButtonElement>(`[data-menu-value="${last?.value}"]`)?.focus();
    }
  }

  return (
    <section className={cx('fds-menu', className)} data-selection={selectionType} data-type={type}>
      {title ? <header>{title}</header> : null}
      <div aria-label={ariaLabel} className="fds-menu-items" role={selectionType === 'action' ? 'menu' : 'listbox'} aria-multiselectable={selectionType === 'multi' ? true : undefined}>
        {items.map((item) => {
          if (item.content === 'divider') {
            return <hr className="fds-menu-divider" key={item.value} role="separator" />;
          }

          if (item.content === 'sub-title') {
            return <div className="fds-menu-subtitle" key={item.value}>{item.label}</div>;
          }

          const isSelected = currentSelection.includes(item.value);
          const isDisabled = item.disabled || visualState === 'disabled';
          const selectionPrefix =
            selectionType === 'multi' ? (
              <Checkbox
                aria-label={`${String(item.label)} selected`}
                boxSize="20px"
                label=""
                selection={isSelected ? 'selected' : 'unselected'}
                visualState={visualState}
              />
            ) : selectionType === 'single' && isSelected ? (
              <Icon icon={icons.check} />
            ) : null;

          return (
            <button
              aria-checked={selectionType === 'multi' ? isSelected : undefined}
              aria-selected={selectionType === 'single' ? isSelected : undefined}
              className="fds-menu-item"
              data-destructive={item.destructive ? 'yes' : 'no'}
              data-menu-value={item.value}
              data-selected={isSelected ? 'yes' : 'no'}
              data-state={visualState}
              disabled={isDisabled}
              key={item.value}
              onClick={() => activateItem(item)}
              onKeyDown={(event) => handleItemKeyDown(event, item)}
              role={selectionType === 'action' ? 'menuitem' : 'option'}
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
