import type { ReactNode } from 'react';
import '../styles.css';
import { cx } from '../shared';

export interface TableColumn<Row> {
  /** Stable column key. */
  key: keyof Row & string;
  /** Header label. */
  header: ReactNode;
  /** Optional alignment. */
  align?: 'left' | 'right' | 'center';
}

/**
 * Data table pattern from Figma `Table`.
 *
 * Use for scan-heavy operational data where rows need comparison across columns.
 */
export interface TableProps<Row extends Record<string, ReactNode>> {
  /** Column definitions. */
  columns: ReadonlyArray<TableColumn<Row>>;
  /** Row data. */
  rows: ReadonlyArray<Row>;
  /** Optional caption for assistive technology and docs. */
  caption?: string;
  /** Optional table toolbar from the Figma table pattern. */
  toolbar?: ReactNode;
  /** Optional table footer/pagination from the Figma table pattern. */
  footer?: ReactNode;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Data table for scan-heavy operational rows with sortable or status-rich columns. */
export function Table<Row extends Record<string, ReactNode>>({ caption, className, columns, footer, rows, toolbar }: TableProps<Row>) {
  const table = (
    <table className="fds-table">
      {caption ? <caption>{caption}</caption> : null}
      <thead>
        <tr>
          {columns.map((column) => (
            <th data-align={column.align ?? 'left'} key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td data-align={column.align ?? 'left'} key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (!toolbar && !footer) {
    return <div className={className}>{table}</div>;
  }

  return (
    <section className={cx('fds-table-shell', className)}>
      {toolbar ? <div className="fds-table-toolbar">{toolbar}</div> : null}
      {table}
      {footer ? <footer className="fds-table-footer">{footer}</footer> : null}
    </section>
  );
}
