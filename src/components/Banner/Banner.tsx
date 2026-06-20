import type { ReactNode } from 'react';
import '../styles.css';
import { Icon, icons } from '../icons';
import { IconButton } from '../IconButton';
import { cx } from '../shared';

export type BannerTone = 'warning' | 'info' | 'caution' | 'error';

/**
 * Inline feedback banner from Figma `Banner`.
 *
 * Use for high-visibility contextual feedback. Include a title when the message needs quick scanning.
 */
export interface BannerProps {
  /** Critical/system tone from the Figma `Tone` axis. */
  tone?: BannerTone;
  /** Optional title slot from the Figma `Title` axis. */
  title?: string;
  /** Banner message body. */
  children: ReactNode;
  /** Optional action area, usually one or two buttons. */
  actions?: ReactNode;
  /** Whether to show the close icon button included in the Figma component. */
  dismissible?: boolean;
  /** Accessible label for the close icon button. */
  dismissLabel?: string;
  /** Close action handler. */
  onDismiss?: () => void;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Contextual feedback banner for warning, info, caution, and error messages. */
export function Banner({
  actions,
  children,
  className,
  dismissible = true,
  dismissLabel = 'Dismiss banner',
  onDismiss,
  title,
  tone = 'info'
}: BannerProps) {
  const toneIcon = tone === 'info' ? icons.info : icons.triangleAlert;
  return (
    <section className={cx('fds-banner', className)} data-tone={tone} role="status">
      <span className="fds-banner-icon" aria-hidden="true">
        <Icon icon={toneIcon} />
      </span>
      <span className="fds-banner-content">
        {title ? <strong>{title}</strong> : null}
        <span>{children}</span>
      </span>
      <span className="fds-banner-actions">
        {actions}
        {dismissible ? <IconButton ariaLabel={dismissLabel} icon={<Icon icon={icons.x} />} onClick={onDismiss} /> : null}
      </span>
    </section>
  );
}
