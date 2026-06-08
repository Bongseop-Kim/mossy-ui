import { Box as ComposeBox, Column as ComposeColumn, Row as ComposeRow } from '@expo/ui/jetpack-compose';
import { weight } from '@expo/ui/jetpack-compose/modifiers';

import { resolveMossyDimension } from '../../../foundation/component-tokens';
import { useMossyTheme } from '../../../theme';
import {
  isFullBoxLength,
  normalizeBoxFlexGrow,
  resolveBoxZIndex,
  toMossyBoxSurfaceProps,
} from '../Box/types';
import { createMossyLayoutSurfaceModifiers } from '../surface.android';
import { shouldRenderLayoutSurface } from '../surface.shared';
import {
  createMossyEffectModifiers,
  createMossyFillSizeModifiers,
} from '../surfaceModifiers.android';
import { chunkCells } from './chunk';
import { GridItem } from './Item';
import type { MossyGridProps } from './types';

/** 고정 열·행 개수 그리드. Compose `Column`/`Row`와 `weight`로 균등 셀을 만든다. */
export function Grid(props: MossyGridProps) {
  const { columns, rows: rowCount, autoFlow, gap, children, display } = props;
  const theme = useMossyTheme();
  const { rows } = chunkCells(children, columns, rowCount, autoFlow);
  const resolvedGap = resolveMossyDimension(theme, gap);

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <ComposeColumn
      verticalArrangement={resolvedGap != null ? { spacedBy: resolvedGap } : undefined}
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyBoxSurfaceProps(props), {
        beforeSurface: createMossyFillSizeModifiers({
          fillWidth: isFullBoxLength(props.width),
          fillHeight: isFullBoxLength(props.height),
        }),
        afterSurface: createMossyEffectModifiers({
          grow: normalizeBoxFlexGrow(props.flexGrow),
          shadowValue: props.boxShadow == null ? undefined : theme.shadow[props.boxShadow],
          zIndexValue: resolveBoxZIndex(props.zIndex),
        }),
      })}>
      {rows.map((cells, rowIndex) => (
        <ComposeRow
          key={rowIndex}
          horizontalArrangement={resolvedGap != null ? { spacedBy: resolvedGap } : undefined}>
          {cells.map((cell, cellIndex) => (
            // 마지막 행이 모자라도 빈 셀로 채워 열 너비를 일정하게 유지한다.
            <ComposeBox key={cellIndex} modifiers={[weight(cell.colSpan)]}>
              {cell.node}
            </ComposeBox>
          ))}
        </ComposeRow>
      ))}
    </ComposeColumn>
  );
}

Grid.Item = GridItem;
export { GridItem };
export type {
  MossyGridAutoFlow,
  MossyGridDisplay,
  MossyGridItemLine,
  MossyGridItemProps,
  MossyGridItemSpan,
  MossyGridProps,
  MossyGridSizeConstraint,
  MossyGridTrackCount,
} from './types';
