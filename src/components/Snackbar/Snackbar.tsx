import { useEffect, useState, type ReactNode } from 'react';
import { Icon, icons } from '../icons';
import { IconButton } from '../IconButton';
import { cx, useControllableState } from '../shared';

export type SnackbarTone = 'success' | 'error' | 'caution' | 'info';

/**
 * Snackbar from Figma `Snackbar`.
 *
 * Use for transient low-interruption feedback near the edge of the viewport.
 */
export interface SnackbarProps {
  /** Message text. */
  children: ReactNode;
  /** Status icon tone from the Figma type axis. */
  tone?: SnackbarTone;
  /** Whether the snackbar is visible for controlled product use. */
  open?: boolean;
  /** Initial visible state for uncontrolled product use. */
  defaultOpen?: boolean;
  /** Called when dismiss or timeout requests a visibility change. */
  onOpenChange?: (open: boolean) => void;
  /** Optional action label. */
  actionLabel?: string;
  /** Optional action handler. */
  onAction?: () => void;
  /** Optional action slot. Deprecated: use actionLabel/onAction for product code. */
  action?: ReactNode;
  /** Auto-dismiss duration in milliseconds. Use null to disable. */
  duration?: number | null;
  /** Accessible close label. */
  dismissLabel?: string;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Low-interruption transient feedback with optional action. */
export function Snackbar({
  action,
  actionLabel,
  children,
  className,
  defaultOpen = true,
  dismissLabel = 'Dismiss',
  duration = null,
  onAction,
  onOpenChange,
  open,
  tone = 'info'
}: SnackbarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useControllableState<boolean>({
    defaultValue: defaultOpen,
    onChange: onOpenChange,
    value: open
  });
  const toneIcon = tone === 'success' ? icons.check : tone === 'info' ? icons.info : icons.triangleAlert;

  useEffect(() => {
    if (!isOpen || duration === null || isHovered) return;
    const timeout = window.setTimeout(() => setIsOpen(false), duration);
    return () => window.clearTimeout(timeout);
  }, [duration, isHovered, isOpen, setIsOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <section
      className={cx('fds-snackbar', className)}
      data-tone={tone}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="status"
    >
      <Icon icon={toneIcon} />
      <span>{children}</span>
      {actionLabel ? (
        <button className="fds-snackbar-action" onClick={onAction} type="button">
          {actionLabel}
        </button>
      ) : action ? (
        <span>{action}</span>
      ) : null}
      <IconButton ariaLabel={dismissLabel} icon={icons.x} onClick={() => setIsOpen(false)} size="small" />
    </section>
  );
}
