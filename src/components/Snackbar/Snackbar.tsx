import type { ReactNode } from 'react';
import { Icon, icons } from '../icons';
import { IconButton } from '../IconButton';
import { cx } from '../shared';

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
  /** Optional action. */
  action?: ReactNode;
  /** Accessible close label. */
  dismissLabel?: string;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Low-interruption transient feedback with optional action. */
export function Snackbar({ action, children, className, dismissLabel = 'Dismiss', tone = 'info' }: SnackbarProps) {
  const toneIcon = tone === 'success' ? icons.check : tone === 'info' ? icons.info : icons.triangleAlert;
  return (
    <section className={cx('fds-snackbar', className)} data-tone={tone} role="status">
      <Icon icon={toneIcon} />
      <span>{children}</span>
      {action ? <span>{action}</span> : null}
      <IconButton ariaLabel={dismissLabel} icon={<Icon icon={icons.x} />} size="small" />
    </section>
  );
}
