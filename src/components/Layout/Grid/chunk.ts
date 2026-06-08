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
  const index = isColumnFlow
    ? columnIndex * rowCount + rowIndex
    : rowIndex * columnCount + columnIndex;
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

function normalizeGridLine(value: number | undefined, lineCount: number) {
  if (value == null || !Number.isFinite(value)) return undefined;

  const line = Math.floor(value);
  const resolvedLine = line < 0 ? lineCount + line + 1 : line;

  return Math.max(1, Math.min(lineCount, resolvedLine));
}

function normalizeExplicitColumnSpan(value: MossyGridItemProps['colSpan'], columnCount: number) {
  if (value === 'full') return columnCount;
  if (typeof value !== 'number' || !Number.isFinite(value)) return 1;

  return Math.max(1, Math.min(columnCount, Math.floor(value)));
}

function normalizeColumnPlacement(props: MossyGridItemProps | undefined, columnCount: number) {
  if (props?.colSpan === 'full') {
    return { start: 1, colSpan: columnCount };
  }

  const lineCount = columnCount + 1;
  const colSpan = normalizeExplicitColumnSpan(props?.colSpan, columnCount);
  const startLine = normalizeGridLine(props?.colStart, lineCount);
  const endLine = normalizeGridLine(props?.colEnd, lineCount);

  if (startLine != null && endLine != null && endLine > startLine) {
    return {
      start: Math.min(startLine, columnCount),
      colSpan: Math.max(1, Math.min(columnCount, endLine - startLine)),
    };
  }

  if (startLine != null) {
    return {
      start: Math.min(startLine, columnCount),
      colSpan,
    };
  }

  if (endLine != null) {
    return {
      start: Math.max(1, Math.min(columnCount, endLine - colSpan)),
      colSpan,
    };
  }

  return { start: undefined, colSpan };
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
    const placement = normalizeColumnPlacement(props, columnCount);
    const { start } = placement;

    if (
      (start != null && start <= usedColumns) ||
      (placement.colSpan === columnCount && usedColumns > 0)
    ) {
      finishRow();
    }

    if (start != null && start > usedColumns + 1) {
      appendEmptyCells(row, usedColumns, start - 1);
      usedColumns = start - 1;
    }

    let { colSpan } = placement;

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
