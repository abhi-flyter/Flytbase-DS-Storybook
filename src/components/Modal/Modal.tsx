import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { icons } from '../icons';
import { IconButton } from '../IconButton';
import { cx, useControllableState } from '../shared';

/**
 * Dialog surface from Figma `Modal`.
 *
 * Use for focused workflows that need confirmation, interruption, or detailed editing.
 */
export interface ModalProps {
  /** Modal size from the Figma axis. */
  size?: 'small' | 'medium' | 'large';
  /** Whether the dialog is open for controlled product use. */
  open?: boolean;
  /** Initial open state for uncontrolled product use. */
  defaultOpen?: boolean;
  /** Called when the close button or Escape requests an open-state change. */
  onOpenChange?: (open: boolean) => void;
  /** Modal title. */
  title: ReactNode;
  /** Body content. */
  children: ReactNode;
  /** Low-emphasis footer action shown on the leading side in the Figma footer. */
  tertiaryAction?: ReactNode;
  /** Footer actions. */
  footer?: ReactNode;
  /** Accessible label for the close button. */
  closeLabel?: string;
  /** Optional class name for layout wrappers. */
  className?: string;
}

const focusableSelector = [
  'button:not(:disabled)',
  '[href]',
  'input:not(:disabled)',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

/** Dialog surface for focused confirmation, editing, or interruptive workflows. */
export function Modal({
  children,
  className,
  closeLabel = 'Close',
  defaultOpen = true,
  footer,
  onOpenChange,
  open,
  size = 'medium',
  tertiaryAction,
  title
}: ModalProps) {
  const titleId = useId();
  const bodyId = useId();
  const dialogRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useControllableState<boolean>({
    defaultValue: defaultOpen,
    onChange: onOpenChange,
    value: open
  });

  useEffect(() => {
    if (!isOpen) return;
    const focusable = dialogRef.current?.querySelector<HTMLElement>(focusableSelector);
    focusable?.focus();
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function requestClose() {
    setIsOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      requestClose();
      return;
    }

    if (event.key !== 'Tab') return;
    const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <section
      aria-describedby={bodyId}
      aria-labelledby={titleId}
      aria-modal="true"
      className={cx('fds-modal', className)}
      data-size={size}
      onKeyDown={handleKeyDown}
      ref={dialogRef}
      role="dialog"
    >
      <header>
        <strong id={titleId}>{title}</strong>
        <IconButton ariaLabel={closeLabel} icon={icons.x} onClick={requestClose} size="small" />
      </header>
      <div className="fds-modal-body" id={bodyId}>{children}</div>
      {footer || tertiaryAction ? (
        <footer>
          <div className="fds-modal-footer-leading">{tertiaryAction}</div>
          <div className="fds-modal-footer-actions">{footer}</div>
        </footer>
      ) : null}
    </section>
  );
}
