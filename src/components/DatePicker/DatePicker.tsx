import { useMemo, type KeyboardEvent } from 'react';
import { Icon, icons } from '../icons';
import { cx, useControllableState } from '../shared';

export type DatePickerRange = {
  from: Date | null;
  to: Date | null;
};

export type DatePickerValue = Date | DatePickerRange | null;

export type DatePickerDisabledMatcher = Date | ((date: Date) => boolean);

/**
 * Calendar picker from Figma `Date picker`.
 *
 * Use `single` for one date and `range` for a start/end date selection.
 */
export interface DatePickerProps {
  /** Picker mode from the Figma axis. */
  mode?: 'single' | 'range';
  /** Controlled selected date or date range. */
  value?: DatePickerValue;
  /** Initial selected date or date range for uncontrolled product use. */
  defaultValue?: DatePickerValue;
  /** Called when the selected date or range changes. */
  onChange?: (value: DatePickerValue) => void;
  /** Controlled visible month. */
  visibleMonth?: Date;
  /** Initial visible month for uncontrolled product use. */
  defaultVisibleMonth?: Date;
  /** Called when month navigation changes the visible month. */
  onVisibleMonthChange?: (month: Date) => void;
  /** Minimum selectable date. */
  minDate?: Date;
  /** Maximum selectable date. */
  maxDate?: Date;
  /** Dates or matcher functions that cannot be selected. */
  disabledDates?: DatePickerDisabledMatcher[];
  /** Whether to show the time selection row. */
  showTime?: boolean;
  /** Controlled time value in HH:mm format. */
  timeValue?: string;
  /** Initial time value in HH:mm format. */
  defaultTimeValue?: string;
  /** Called when the time value changes. */
  onTimeChange?: (time: string) => void;
  /** Called when the clear action is pressed. */
  onClear?: () => void;
  /** Called when the range clear-all action is pressed. */
  onClearAll?: () => void;
  /** Month label. Deprecated: use visibleMonth/defaultVisibleMonth for product code. */
  month?: string;
  /** Selected day or selected day range. Deprecated: use value/defaultValue for product code. */
  selected?: number | [number, number];
  /** Optional accessible label for the calendar grid. */
  ariaLabel?: string;
  /** Optional class name for layout wrappers. */
  className?: string;
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const defaultMonth = new Date(2026, 5, 1);

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function isSameDay(first: Date | null | undefined, second: Date | null | undefined) {
  return Boolean(first && second && startOfDay(first).getTime() === startOfDay(second).getTime());
}

function isBefore(first: Date, second: Date) {
  return startOfDay(first).getTime() < startOfDay(second).getTime();
}

function isAfter(first: Date, second: Date) {
  return startOfDay(first).getTime() > startOfDay(second).getTime();
}

function formatMonth(date: Date) {
  return new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(date);
}

function formatDate(date: Date | null | undefined) {
  return date ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date) : 'None';
}

function normalizeRange(value: DatePickerValue | undefined): DatePickerRange {
  if (!value) return { from: null, to: null };
  if (value instanceof Date) return { from: value, to: null };
  return value;
}

function valueFromSelected(selected: DatePickerProps['selected'], visibleMonth: Date, mode: DatePickerProps['mode']): DatePickerValue {
  if (selected === undefined) return null;
  if (Array.isArray(selected)) {
    return {
      from: new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), selected[0]),
      to: new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), selected[1])
    };
  }
  const date = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), selected);
  return mode === 'range' ? { from: date, to: null } : date;
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date, disabledDates: DatePickerDisabledMatcher[] = []) {
  if (minDate && isBefore(date, minDate)) return true;
  if (maxDate && isAfter(date, maxDate)) return true;
  return disabledDates.some((matcher) => (matcher instanceof Date ? isSameDay(matcher, date) : matcher(date)));
}

function buildCalendarDays(visibleMonth: Date) {
  const monthStart = startOfMonth(visibleMonth);
  const gridStart = addDays(monthStart, -monthStart.getDay());
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}

/** Single-date or range-date calendar picker with optional time row. */
export function DatePicker({
  ariaLabel,
  className,
  defaultTimeValue = '09:30',
  defaultValue,
  defaultVisibleMonth = defaultMonth,
  disabledDates = [],
  maxDate,
  minDate,
  mode = 'single',
  month,
  onChange,
  onClear,
  onClearAll,
  onTimeChange,
  onVisibleMonthChange,
  selected,
  showTime = false,
  timeValue,
  value,
  visibleMonth
}: DatePickerProps) {
  const fallbackMonth = visibleMonth ?? defaultVisibleMonth;
  const legacySelectedValue = valueFromSelected(selected, fallbackMonth, mode);
  const [currentVisibleMonth, setCurrentVisibleMonth] = useControllableState<Date>({
    defaultValue: defaultVisibleMonth,
    onChange: onVisibleMonthChange,
    value: visibleMonth
  });
  const [currentValue, setValue] = useControllableState<DatePickerValue>({
    defaultValue: defaultValue ?? legacySelectedValue,
    onChange,
    value
  });
  const [currentTime, setCurrentTime] = useControllableState<string>({
    defaultValue: defaultTimeValue,
    onChange: onTimeChange,
    value: timeValue
  });
  const days = useMemo(() => buildCalendarDays(currentVisibleMonth), [currentVisibleMonth]);
  const range = normalizeRange(currentValue);
  const monthLabel = month ?? formatMonth(currentVisibleMonth);
  const gridLabel = ariaLabel ?? `${mode === 'range' ? 'Date range' : 'Date'} picker for ${monthLabel}`;

  function moveMonth(monthOffset: number) {
    setCurrentVisibleMonth(addMonths(currentVisibleMonth, monthOffset));
  }

  function selectDate(date: Date) {
    if (isDateDisabled(date, minDate, maxDate, disabledDates)) return;
    const nextDate = startOfDay(date);

    if (mode === 'single') {
      setValue(nextDate);
      return;
    }

    if (!range.from || (range.from && range.to)) {
      setValue({ from: nextDate, to: null });
      return;
    }

    if (isBefore(nextDate, range.from)) {
      setValue({ from: nextDate, to: range.from });
      return;
    }

    setValue({ from: range.from, to: nextDate });
  }

  function clearSelection(all = false) {
    setValue(mode === 'range' ? { from: null, to: null } : null);
    if (all) {
      onClearAll?.();
      return;
    }
    onClear?.();
  }

  function focusDay(date: Date) {
    const dateKey = startOfDay(date).toISOString();
    const nextButton = document.querySelector<HTMLButtonElement>(`[data-date-key="${dateKey}"]`);
    nextButton?.focus();
  }

  function handleDayKeyDown(event: KeyboardEvent<HTMLButtonElement>, date: Date) {
    const moves: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7
    };
    const dayMove = moves[event.key];

    if (dayMove !== undefined) {
      event.preventDefault();
      const nextDate = addDays(date, dayMove);
      if (nextDate.getMonth() !== currentVisibleMonth.getMonth()) {
        setCurrentVisibleMonth(startOfMonth(nextDate));
      }
      requestAnimationFrame(() => focusDay(nextDate));
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      focusDay(addDays(date, -date.getDay()));
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      focusDay(addDays(date, 6 - date.getDay()));
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectDate(date);
    }
  }

  return (
    <section className={cx('fds-date-picker', className)} data-mode={mode}>
      <header>
        <button type="button" aria-label="Previous month" onClick={() => moveMonth(-1)}>
          <Icon icon={icons.chevronLeft} />
        </button>
        <strong aria-live="polite">{monthLabel}</strong>
        <button type="button" aria-label="Next month" onClick={() => moveMonth(1)}>
          <Icon icon={icons.chevronRight} />
        </button>
      </header>
      <div className="fds-date-grid" role="grid" aria-label={gridLabel}>
        {weekdays.map((day) => (
          <span className="fds-date-weekday" key={day} role="columnheader">{day}</span>
        ))}
        {days.map((day) => {
          const disabled = isDateDisabled(day, minDate, maxDate, disabledDates);
          const inCurrentMonth = day.getMonth() === currentVisibleMonth.getMonth();
          const inRange = mode === 'range' && range.from && range.to && !isBefore(day, range.from) && !isAfter(day, range.to);
          const selectedStart = mode === 'single' ? currentValue instanceof Date && isSameDay(currentValue, day) : isSameDay(range.from, day);
          const selectedEnd = mode === 'range' && isSameDay(range.to, day);
          const isSelected = Boolean(selectedStart || selectedEnd);
          const dayLabel = formatDate(day);

          return (
            <button
              aria-label={dayLabel}
              aria-selected={isSelected}
              className="fds-date-day"
              data-date-key={startOfDay(day).toISOString()}
              data-disabled={disabled ? 'yes' : 'no'}
              data-in-current-month={inCurrentMonth ? 'yes' : 'no'}
              data-in-range={inRange ? 'yes' : 'no'}
              data-selected={isSelected ? 'yes' : 'no'}
              disabled={disabled}
              key={startOfDay(day).toISOString()}
              onClick={() => selectDate(day)}
              onKeyDown={(event) => handleDayKeyDown(event, day)}
              role="gridcell"
              tabIndex={inCurrentMonth ? 0 : -1}
              type="button"
            >
              {inCurrentMonth ? day.getDate() : ''}
            </button>
          );
        })}
      </div>
      <footer>
        <span>{mode === 'range' ? `Start ${formatDate(range.from)} / End ${formatDate(range.to)}` : `Selected ${formatDate(currentValue instanceof Date ? currentValue : null)}`}</span>
        {showTime ? (
          <label className="fds-date-time">
            <span>Time</span>
            <input value={currentTime} onChange={(event) => setCurrentTime(event.target.value)} type="time" />
          </label>
        ) : null}
        <button type="button" onClick={() => clearSelection(mode === 'range')}>
          {mode === 'range' ? 'Clear all' : 'Clear'}
        </button>
      </footer>
    </section>
  );
}
