import { useEffect, useState, type ReactNode } from 'react';
import { Icon, icons } from '../icons';
import { IconButton } from '../IconButton';
import { cx, useControllableState } from '../shared';

export type ToastTone = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast from Figma `Toasts`.
 *
 * Use for transient feedback that includes a clear status tone.
 */
export interface ToastProps {
  /** Status tone. */
  tone?: ToastTone;
  /** Whether the toast is visible for controlled product use. */
  open?: boolean;
  /** Initial visible state for uncontrolled product use. */
  defaultOpen?: boolean;
  /** Called when dismiss or timeout requests a visibility change. */
  onOpenChange?: (open: boolean) => void;
  /** Auto-dismiss duration in milliseconds. Use null to disable. */
  duration?: number | null;
  /** Timestamp shown in Figma toast anatomy. */
  timestamp?: ReactNode;
  /** Source/context label shown before the title. */
  source?: ReactNode;
  /** Toast title. */
  title?: ReactNode;
  /** Toast body. */
  children: ReactNode;
  /** Optional action label. */
  actionLabel?: string;
  /** Optional action handler. */
  onAction?: () => void;
  /** Optional action slot. Deprecated: use actionLabel/onAction for product code. */
  action?: ReactNode;
  /** Accessible close label. */
  dismissLabel?: string;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Transient status feedback with success, error, warning, and info tones. */
export function Toast({
  action,
  actionLabel,
  children,
  className,
  defaultOpen = true,
  dismissLabel = 'Dismiss notification',
  duration = null,
  onAction,
  onOpenChange,
  open,
  source = 'M30T - DJI Dock',
  timestamp = '9:20 am (GMT + 5:30)',
  title,
  tone = 'info'
}: ToastProps) {
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
      className={cx('fds-toast', className)}
      data-tone={tone}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="status"
    >
      <span className="fds-toast-indicator" aria-hidden="true"><Icon icon={toneIcon} /></span>
      <span className="fds-toast-content">
        <small>{timestamp}</small>
        <span className="fds-toast-title-row">
          <strong>{source}</strong>
          {title ? <strong>{title}</strong> : null}
        </span>
        <span>{children}</span>
      </span>
      {actionLabel ? (
        <button className="fds-toast-action" onClick={onAction} type="button">
          {actionLabel}
        </button>
      ) : action ? (
        <span>{action}</span>
      ) : null}
      <IconButton ariaLabel={dismissLabel} icon={icons.x} onClick={() => setIsOpen(false)} size="small" />
    </section>
  );
}
