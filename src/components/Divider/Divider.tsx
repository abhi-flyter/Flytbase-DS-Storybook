import '../styles.css';
import { cx } from '../shared';

/**
 * Divider from Figma `Dividers`.
 *
 * Use to separate related surfaces or groups. `inset="middle"` leaves breathing room at both ends.
 */
export interface DividerProps {
  /** Divider direction from the Figma page. */
  orientation?: 'horizontal' | 'vertical';
  /** Full-width/full-height or middle-inset treatment. */
  inset?: 'full' | 'middle';
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Horizontal or vertical divider for separating related groups and surfaces. */
export function Divider({ className, inset = 'full', orientation = 'horizontal' }: DividerProps) {
  return <span aria-hidden="true" className={cx('fds-divider', className)} data-inset={inset} data-orientation={orientation} />;
}
