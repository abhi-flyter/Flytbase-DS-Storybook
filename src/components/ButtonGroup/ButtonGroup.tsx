import type { ReactNode } from 'react';
import '../styles.css';
import { cx } from '../shared';

/**
 * Button group container from Figma `Button group`.
 *
 * Use to cluster related actions while preserving the spacing density from the Figma padding axis.
 */
export interface ButtonGroupProps {
  /** Padding density from the Figma `Padding` axis. */
  padding?: 'default' | 'tight' | 'loose';
  /** Action controls to group. */
  children: ReactNode;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Spacing container for clustering related action buttons. */
export function ButtonGroup({ children, className, padding = 'default' }: ButtonGroupProps) {
  return (
    <div className={cx('fds-button-group', className)} data-padding={padding}>
      {children}
    </div>
  );
}
