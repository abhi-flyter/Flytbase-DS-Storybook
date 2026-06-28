import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { Checkbox, type CheckboxSelection } from '../Checkbox';
import { cx, useControllableState } from '../shared';

export type TableSortDirection = 'ascending' | 'descending';

export interface TableSortState<Row> {
  /** Column key being sorted. */
  key: keyof Row & string;
  /** Sort direction for the active column. */
  direction: TableSortDirection;
}

export interface TablePaginationState {
  /** One-based current page. */
  page: number;
  /** Rows rendered per page. */
  pageSize: number;
  /** Optional total row count when server-side pagination owns the full dataset. */
  totalRows?: number;
}

export interface TableColumn<Row> {
  /** Stable column key. */
  key: keyof Row & string;
  /** Header label. */
  header: ReactNode;
  /** Optional alignment. */
  align?: 'left' | 'right' | 'center';
  /** Enables the built-in sortable header control for this column. */
  sortable?: boolean;
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
  /** Sort state for controlled product use. */
  sort?: TableSortState<Row> | null;
  /** Initial sort state for uncontrolled product use. */
  defaultSort?: TableSortState<Row> | null;
  /** Called when the active sort changes. */
  onSortChange?: (sort: TableSortState<Row> | null) => void;
  /** Pagination state for controlled product use. */
  pagination?: TablePaginationState;
  /** Initial pagination state for uncontrolled product use. */
  defaultPagination?: TablePaginationState;
  /** Called when pagination changes. */
  onPaginationChange?: (pagination: TablePaginationState) => void;
  /** Rendered when there are no rows after sorting/pagination. */
  emptyState?: ReactNode;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Data table for scan-heavy operational rows with sortable or status-rich columns. */
export function Table<Row extends Record<string, ReactNode>>({
  caption,
  className,
  columns,
  defaultPagination,
  defaultSelectedRowIds = [],
  defaultSort = null,
  emptyState = 'No rows available.',
  footer,
  getRowId = (_row, index) => String(index),
  onPaginationChange,
  onRowSelectionChange,
  onSortChange,
  pagination,
  rows,
  selectedRowIds,
  sort,
  toolbar
}: TableProps<Row>) {
  const [currentSelectedRowIds, setSelectedRowIds] = useControllableState({
    defaultValue: defaultSelectedRowIds,
    onChange: onRowSelectionChange,
    value: selectedRowIds
  });
  const [currentSort, setSort] = useControllableState<TableSortState<Row> | null>({
    defaultValue: defaultSort,
    onChange: onSortChange,
    value: sort
  });
  const [currentPagination, setPagination] = useControllableState<TablePaginationState>({
    defaultValue: defaultPagination ?? { page: 1, pageSize: rows.length || 1 },
    onChange: onPaginationChange,
    value: pagination
  });
  const hasPaginationApi = pagination !== undefined || defaultPagination !== undefined || onPaginationChange !== undefined;
  const sortedRows = useMemo(() => {
    if (!currentSort) return [...rows];

    return [...rows].sort((firstRow, secondRow) => {
      const firstValue = getComparableValue(firstRow[currentSort.key]);
      const secondValue = getComparableValue(secondRow[currentSort.key]);
      const comparison = firstValue.localeCompare(secondValue, undefined, { numeric: true, sensitivity: 'base' });
      return currentSort.direction === 'ascending' ? comparison : -comparison;
    });
  }, [currentSort, rows]);
  const visibleRows = hasPaginationApi
    ? sortedRows.slice((currentPagination.page - 1) * currentPagination.pageSize, currentPagination.page * currentPagination.pageSize)
    : sortedRows;
  const visibleRowIds = visibleRows.map((row, rowIndex) => getRowId(row, getOriginalRowIndex(rows, row)));
  const rowIds = visibleRowIds;
  const totalRows = currentPagination.totalRows ?? sortedRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / currentPagination.pageSize));
  const firstVisibleRow = visibleRows.length > 0 ? (currentPagination.page - 1) * currentPagination.pageSize + 1 : 0;
  const lastVisibleRow = Math.min(currentPagination.page * currentPagination.pageSize, totalRows);
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

  function toggleSort(column: TableColumn<Row>) {
    if (!column.sortable) return;

    if (!currentSort || currentSort.key !== column.key) {
      setSort({ key: column.key, direction: 'ascending' });
      return;
    }

    if (currentSort.direction === 'ascending') {
      setSort({ key: column.key, direction: 'descending' });
      return;
    }

    setSort(null);
  }

  function setPage(nextPage: number) {
    setPagination({ ...currentPagination, page: Math.min(Math.max(nextPage, 1), totalPages) });
  }

  const generatedPaginationFooter = hasPaginationApi ? (
    <footer className="fds-table-footer">
      <span>
        {firstVisibleRow}-{lastVisibleRow} of {totalRows}
      </span>
      <span>Lines per page {currentPagination.pageSize}</span>
      <span className="fds-table-pagination">
        <button disabled={currentPagination.page <= 1} onClick={() => setPage(currentPagination.page - 1)} type="button">
          Previous
        </button>
        <span>Page {currentPagination.page} of {totalPages}</span>
        <button disabled={currentPagination.page >= totalPages} onClick={() => setPage(currentPagination.page + 1)} type="button">
          Next
        </button>
      </span>
    </footer>
  ) : null;

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
          {columns.map((column) => {
            const isActiveSort = currentSort?.key === column.key;
            return (
              <th
                aria-sort={isActiveSort ? currentSort.direction : column.sortable ? 'none' : undefined}
                data-align={column.align ?? 'left'}
                key={column.key}
              >
                {column.sortable ? (
                  <button className="fds-table-sort" onClick={() => toggleSort(column)} type="button">
                    <span>{column.header}</span>
                    <span aria-hidden="true">{isActiveSort ? (currentSort.direction === 'ascending' ? 'Asc' : 'Desc') : 'Sort'}</span>
                  </button>
                ) : (
                  column.header
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {visibleRows.length === 0 ? (
          <tr>
            <td colSpan={columns.length + (hasSelectionApi ? 1 : 0)}>{emptyState}</td>
          </tr>
        ) : visibleRows.map((row) => {
          const originalRowIndex = getOriginalRowIndex(rows, row);
          const rowId = getRowId(row, originalRowIndex);
          return (
          <tr key={rowId}>
            {hasSelectionApi ? (
              <td data-align="center">
                <Checkbox
                  aria-label={`Select row ${originalRowIndex + 1}`}
                  label=""
                  onSelectionChange={() => toggleRow(rowId)}
                  selection={currentSelectedRowIds.includes(rowId) ? 'selected' : 'unselected'}
                />
              </td>
            ) : null}
            {columns.map((column) => (
              <td data-align={column.align ?? 'left'} key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        );
        })}
      </tbody>
    </table>
  );

  if (!toolbar && !footer && !generatedPaginationFooter) {
    return <div className={className}>{table}</div>;
  }

  return (
    <section className={cx('fds-table-shell', className)}>
      {toolbar ? <div className="fds-table-toolbar">{toolbar}</div> : null}
      {table}
      {footer ? <footer className="fds-table-footer">{footer}</footer> : generatedPaginationFooter}
    </section>
  );
}

function getComparableValue(value: ReactNode) {
  if (value === null || value === undefined || typeof value === 'boolean') return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  return '';
}

function getOriginalRowIndex<Row>(rows: ReadonlyArray<Row>, row: Row) {
  const rowIndex = rows.indexOf(row);
  return rowIndex >= 0 ? rowIndex : 0;
}
