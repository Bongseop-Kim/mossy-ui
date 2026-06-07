import { Children } from 'react';
import type { ReactNode } from 'react';

import type { MossyGridProps } from './types';

function normalizeTrackCount(value: number | undefined) {
  if (value == null || !Number.isFinite(value)) return undefined;
  return Math.max(1, Math.floor(value));
}

function cellAt<T>(
  cells: T[],
  rowIndex: number,
  columnIndex: number,
  rowCount: number,
  columnCount: number,
  isColumnFlow: boolean,
) {
  const index = isColumnFlow ? columnIndex * rowCount + rowIndex : rowIndex * columnCount + columnIndex;
  return cells[index];
}

/** children을 Seed `columns`/`rows`/`autoFlow` 의미에 맞춰 행렬로 정규화한다. */
export function chunkCells(
  children: ReactNode,
  columns: MossyGridProps['columns'],
  rows: MossyGridProps['rows'],
  autoFlow: MossyGridProps['autoFlow'],
) {
  const cells = Children.toArray(children);
  const requestedColumns = normalizeTrackCount(columns);
  const requestedRows = normalizeTrackCount(rows);

  if (cells.length === 0) {
    return { rows: [], columnCount: requestedColumns ?? 1 };
  }

  const isColumnFlow = autoFlow === 'column';
  const rowCount = isColumnFlow
    ? requestedRows ?? 1
    : Math.max(requestedRows ?? 0, Math.ceil(cells.length / (requestedColumns ?? 1)));
  const columnCount = isColumnFlow
    ? Math.max(requestedColumns ?? 0, Math.ceil(cells.length / rowCount))
    : requestedColumns ?? 1;

  return {
    columnCount,
    rows: Array.from({ length: rowCount }, (_, rowIndex) =>
      Array.from({ length: columnCount }, (_unused, columnIndex) =>
        cellAt(cells, rowIndex, columnIndex, rowCount, columnCount, isColumnFlow),
      ),
    ),
  };
}
