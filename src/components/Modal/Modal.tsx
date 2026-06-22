import type { ReactNode } from 'react';
import { icons } from '../icons';
import { IconButton } from '../IconButton';
import { cx } from '../shared';

/**
 * Dialog surface from Figma `Modal`.
 *
 * Use for focused workflows that need confirmation, interruption, or detailed editing.
 */
export interface ModalProps {
  /** Modal size from the Figma axis. */
  size?: 'small' | 'medium' | 'large';
  /** Modal title. */
  title: ReactNode;
  /** Body content. */
  children: ReactNode;
  /** Low-emphasis footer action shown on the leading side in the Figma footer. */
  tertiaryAction?: ReactNode;
  /** Footer actions. */
  footer?: ReactNode;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Dialog surface for focused confirmation, editing, or interruptive workflows. */
export function Modal({ children, className, footer, size = 'medium', tertiaryAction, title }: ModalProps) {
  return (
    <section aria-modal="true" className={cx('fds-modal', className)} data-size={size} role="dialog">
      <header>
        <strong>{title}</strong>
        <IconButton ariaLabel="Close" icon={icons.x} size="small" />
      </header>
      <div className="fds-modal-body">{children}</div>
      {footer || tertiaryAction ? (
        <footer>
          <div className="fds-modal-footer-leading">{tertiaryAction}</div>
          <div className="fds-modal-footer-actions">{footer}</div>
        </footer>
      ) : null}
    </section>
  );
}
