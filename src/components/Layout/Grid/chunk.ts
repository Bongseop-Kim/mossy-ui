import { Children } from 'react';
import type { ReactNode } from 'react';

/** children을 행 우선으로 columns개씩 잘라 2차원 배열로 만든다. */
export function chunkCells(children: ReactNode, columns: number) {
  const cells = Children.toArray(children);
  const columnCount = Math.max(1, Math.floor(columns));
  const rows: (typeof cells)[] = [];

  for (let index = 0; index < cells.length; index += columnCount) {
    rows.push(cells.slice(index, index + columnCount));
  }

  return { rows, columnCount };
}
