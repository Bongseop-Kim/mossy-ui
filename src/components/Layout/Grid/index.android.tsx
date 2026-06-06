import { Box as ComposeBox, Column as ComposeColumn, Row as ComposeRow } from '@expo/ui/jetpack-compose';
import { weight } from '@expo/ui/jetpack-compose/modifiers';

import { resolveMossyDimension } from '../../../foundation/component-tokens';
import { useMossyTheme } from '../../../theme';
import { createMossyLayoutSurfaceModifiers } from '../surface.android';
import { shouldRenderLayoutSurface } from '../surface.shared';
import { chunkCells } from './chunk';
import type { MossyGridProps } from './types';

/** 고정 열 개수 그리드. Compose `Column`/`Row`와 `weight`로 균등 셀을 만든다. */
export function Grid(props: MossyGridProps) {
  const { columns, horizontalSpacing, verticalSpacing, children, display } = props;
  const theme = useMossyTheme();
  const { rows, columnCount } = chunkCells(children, columns);
  const resolvedHorizontal = resolveMossyDimension(theme, horizontalSpacing);
  const resolvedVertical = resolveMossyDimension(theme, verticalSpacing);

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <ComposeColumn
      verticalArrangement={resolvedVertical != null ? { spacedBy: resolvedVertical } : undefined}
      modifiers={createMossyLayoutSurfaceModifiers(theme, props)}>
      {rows.map((cells, rowIndex) => (
        <ComposeRow
          key={rowIndex}
          horizontalArrangement={
            resolvedHorizontal != null ? { spacedBy: resolvedHorizontal } : undefined
          }>
          {Array.from({ length: columnCount }, (_, cellIndex) => (
            // 마지막 행이 모자라도 빈 셀로 채워 열 너비를 일정하게 유지한다.
            <ComposeBox key={cellIndex} modifiers={[weight(1)]}>
              {cells[cellIndex] ?? null}
            </ComposeBox>
          ))}
        </ComposeRow>
      ))}
    </ComposeColumn>
  );
}

export type { MossyGridProps } from './types';
