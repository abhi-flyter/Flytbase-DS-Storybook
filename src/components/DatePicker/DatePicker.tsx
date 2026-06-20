import '../styles.css';
import { Icon, icons } from '../icons';
import { cx } from '../shared';

/**
 * Calendar picker from Figma `Date picker`.
 *
 * Use `single` for one date and `range` for a start/end date selection.
 */
export interface DatePickerProps {
  /** Picker mode from the Figma axis. */
  mode?: 'single' | 'range';
  /** Month label. */
  month?: string;
  /** Selected day or selected day range. */
  selected?: number | [number, number];
  /** Whether to show the time selection row. */
  showTime?: boolean;
  /** Optional class name for layout wrappers. */
  className?: string;
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const days = Array.from({ length: 35 }, (_, index) => index + 1);

/** Single-date or range-date calendar picker with optional time row. */
export function DatePicker({ className, mode = 'single', month = 'June 2026', selected = 18, showTime = false }: DatePickerProps) {
  const range = Array.isArray(selected) ? selected : [selected, selected];
  return (
    <section className={cx('fds-date-picker', className)} data-mode={mode}>
      <header>
        <button type="button" aria-label="Previous month"><Icon icon={icons.chevronLeft} /></button>
        <strong>{month}</strong>
        <button type="button" aria-label="Next month"><Icon icon={icons.chevronRight} /></button>
      </header>
      <div className="fds-date-grid" aria-hidden="true">
        {weekdays.map((day) => (
          <span className="fds-date-weekday" key={day}>{day}</span>
        ))}
        {days.map((day) => {
          const inRange = mode === 'range' && day >= range[0] && day <= range[1];
          const isSelected = mode === 'single' ? day === range[0] : day === range[0] || day === range[1];
          return (
            <span
              className="fds-date-day"
              data-in-range={inRange ? 'yes' : 'no'}
              data-selected={isSelected ? 'yes' : 'no'}
              key={day}
            >
              {day <= 30 ? day : ''}
            </span>
          );
        })}
      </div>
      {showTime ? <footer>Start Aug 18, 2025 · End Aug 24, 2025 · Time 09:30</footer> : null}
    </section>
  );
}
