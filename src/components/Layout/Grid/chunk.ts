import { Children, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';

import { GridItem } from './Item';
import type { MossyGridItemProps, MossyGridProps } from './types';

export interface MossyGridCell {
  node: ReactNode;
  colSpan: number;
}

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

function emptyCell(): MossyGridCell {
  return { node: null, colSpan: 1 };
}

function isGridItemElement(node: ReactNode): node is ReactElement<MossyGridItemProps> {
  return isValidElement<MossyGridItemProps>(node) && node.type === GridItem;
}

function gridItemProps(node: ReactNode): MossyGridItemProps | undefined {
  return isGridItemElement(node) ? node.props : undefined;
}

function normalizeLine(value: number | undefined, maxLine: number) {
  if (value == null || !Number.isFinite(value)) return undefined;
  return Math.max(1, Math.min(maxLine, Math.floor(value)));
}

function normalizeColumnSpan(
  props: MossyGridItemProps | undefined,
  columnCount: number,
) {
  if (props?.colStart != null && props.colEnd != null) {
    const start = normalizeLine(props.colStart, columnCount);
    const end = normalizeLine(props.colEnd, columnCount + 1);

    if (start != null && end != null && end > start) {
      return Math.max(1, Math.min(columnCount, end - start));
    }
  }

  if (props?.colSpan === 'full') return columnCount;
  if (typeof props?.colSpan !== 'number' || !Number.isFinite(props.colSpan)) return 1;

  return Math.max(1, Math.min(columnCount, Math.floor(props.colSpan)));
}

function appendEmptyCells(row: MossyGridCell[], usedColumns: number, columnCount: number) {
  for (let index = usedColumns; index < columnCount; index += 1) {
    row.push(emptyCell());
  }
}

function chunkRowFlowCells(
  children: ReactNode,
  columnCount: number,
  requestedRows: number | undefined,
) {
  const rows: MossyGridCell[][] = [];
  let row: MossyGridCell[] = [];
  let usedColumns = 0;

  const finishRow = () => {
    appendEmptyCells(row, usedColumns, columnCount);
    rows.push(row);
    row = [];
    usedColumns = 0;
  };

  for (const node of Children.toArray(children)) {
    const props = gridItemProps(node);
    const start = normalizeLine(props?.colStart, columnCount);

    if ((start != null && start <= usedColumns) || (props?.colSpan === 'full' && usedColumns > 0)) {
      finishRow();
    }

    if (start != null && start > usedColumns + 1) {
      appendEmptyCells(row, usedColumns, start - 1);
      usedColumns = start - 1;
    }

    let colSpan = normalizeColumnSpan(props, columnCount);

    if (usedColumns > 0 && usedColumns + colSpan > columnCount) {
      finishRow();

      if (start != null && start > 1) {
        appendEmptyCells(row, usedColumns, start - 1);
        usedColumns = start - 1;
      }
    }

    colSpan = Math.min(colSpan, columnCount - usedColumns);
    row.push({ node, colSpan });
    usedColumns += colSpan;

    if (usedColumns >= columnCount) {
      finishRow();
    }
  }

  if (row.length > 0 || rows.length === 0) {
    finishRow();
  }

  const targetRows = requestedRows ?? rows.length;
  for (let index = rows.length; index < targetRows; index += 1) {
    rows.push(Array.from({ length: columnCount }, emptyCell));
  }

  return rows;
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
  const columnCount = isColumnFlow
    ? Math.max(requestedColumns ?? 0, Math.ceil(cells.length / (requestedRows ?? 1)))
    : requestedColumns ?? 1;

  if (!isColumnFlow) {
    return {
      columnCount,
      rows: chunkRowFlowCells(children, columnCount, requestedRows),
    };
  }

  const rowCount = requestedRows ?? 1;

  return {
    columnCount,
    rows: Array.from({ length: rowCount }, (_, rowIndex) =>
      Array.from({ length: columnCount }, (_unused, columnIndex) => ({
        node: cellAt(cells, rowIndex, columnIndex, rowCount, columnCount, isColumnFlow),
        colSpan: 1,
      })),
    ),
  };
}
