import type { ReactNode } from 'react';
import '../styles.css';
import { Icon, icons } from '../icons';
import { cx } from '../shared';

export type ToastTone = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast from Figma `Toasts`.
 *
 * Use for transient feedback that includes a clear status tone.
 */
export interface ToastProps {
  /** Status tone. */
  tone?: ToastTone;
  /** Timestamp shown in Figma toast anatomy. */
  timestamp?: ReactNode;
  /** Source/context label shown before the title. */
  source?: ReactNode;
  /** Toast title. */
  title?: ReactNode;
  /** Toast body. */
  children: ReactNode;
  /** Optional action. */
  action?: ReactNode;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Transient status feedback with success, error, warning, and info tones. */
export function Toast({
  action,
  children,
  className,
  source = 'M30T - DJI Dock',
  timestamp = '9:20 am (GMT + 5:30)',
  title,
  tone = 'info'
}: ToastProps) {
  const toneIcon = tone === 'success' ? icons.check : tone === 'info' ? icons.info : icons.triangleAlert;
  return (
    <section className={cx('fds-toast', className)} data-tone={tone} role="status">
      <span className="fds-toast-indicator" aria-hidden="true"><Icon icon={toneIcon} /></span>
      <span className="fds-toast-content">
        <small>{timestamp}</small>
        <span className="fds-toast-title-row">
          <strong>{source}</strong>
          {title ? <strong>{title}</strong> : null}
        </span>
        <span>{children}</span>
      </span>
      {action ? <span>{action}</span> : null}
    </section>
  );
}
