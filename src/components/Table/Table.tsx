import type { ReactNode } from 'react';
import { Checkbox, type CheckboxSelection } from '../Checkbox';
import { cx, useControllableState } from '../shared';

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
  /** Returns a stable row ID for row-selection APIs. Defaults to the row index. */
  getRowId?: (row: Row, index: number) => string;
  /** Selected row IDs for controlled product use. */
  selectedRowIds?: string[];
  /** Initial selected row IDs for uncontrolled product use. */
  defaultSelectedRowIds?: string[];
  /** Called when selected row IDs change. */
  onRowSelectionChange?: (rowIds: string[]) => void;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Data table for scan-heavy operational rows with sortable or status-rich columns. */
export function Table<Row extends Record<string, ReactNode>>({
  caption,
  className,
  columns,
  defaultSelectedRowIds = [],
  footer,
  getRowId = (_row, index) => String(index),
  onRowSelectionChange,
  rows,
  selectedRowIds,
  toolbar
}: TableProps<Row>) {
  const [currentSelectedRowIds, setSelectedRowIds] = useControllableState({
    defaultValue: defaultSelectedRowIds,
    onChange: onRowSelectionChange,
    value: selectedRowIds
  });
  const rowIds = rows.map((row, rowIndex) => getRowId(row, rowIndex));
  const hasSelectionApi = selectedRowIds !== undefined || defaultSelectedRowIds.length > 0 || onRowSelectionChange !== undefined;
  const allRowsSelected = rowIds.length > 0 && rowIds.every((rowId) => currentSelectedRowIds.includes(rowId));
  const someRowsSelected = rowIds.some((rowId) => currentSelectedRowIds.includes(rowId));
  const headerSelection: CheckboxSelection = allRowsSelected ? 'selected' : someRowsSelected ? 'indeterminate' : 'unselected';

  function toggleAllRows() {
    setSelectedRowIds(allRowsSelected ? [] : rowIds);
  }

  function toggleRow(rowId: string) {
    setSelectedRowIds(
      currentSelectedRowIds.includes(rowId)
        ? currentSelectedRowIds.filter((selectedRowId) => selectedRowId !== rowId)
        : [...currentSelectedRowIds, rowId]
    );
  }

  const table = (
    <table className="fds-table">
      {caption ? <caption>{caption}</caption> : null}
      <thead>
        <tr>
          {hasSelectionApi ? (
            <th data-align="center">
              <Checkbox aria-label="Select all rows" label="" onSelectionChange={toggleAllRows} selection={headerSelection} />
            </th>
          ) : null}
          {columns.map((column) => (
            <th data-align={column.align ?? 'left'} key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={getRowId(row, rowIndex)}>
            {hasSelectionApi ? (
              <td data-align="center">
                <Checkbox
                  aria-label={`Select row ${rowIndex + 1}`}
                  label=""
                  onSelectionChange={() => toggleRow(getRowId(row, rowIndex))}
                  selection={currentSelectedRowIds.includes(getRowId(row, rowIndex)) ? 'selected' : 'unselected'}
                />
              </td>
            ) : null}
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
