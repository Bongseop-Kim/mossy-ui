import { Box as ComposeBox, Column as ComposeColumn, Row as ComposeRow } from '@expo/ui/jetpack-compose';
import {
  fillMaxHeight,
  fillMaxWidth,
  shadow,
  weight,
  zIndex,
} from '@expo/ui/jetpack-compose/modifiers';

import { resolveMossyDimension } from '../../../foundation/component-tokens';
import type { MossyModifier } from '../../../foundation/modifier';
import { useMossyTheme } from '../../../theme';
import {
  isFullBoxLength,
  normalizeBoxFlexGrow,
  resolveBoxZIndex,
} from '../Box/types';
import { createMossyLayoutSurfaceModifiers } from '../surface.android';
import { chunkCells } from './chunk';
import { GridItem } from './Item';
import { toMossyGridSurfaceProps } from './shared';
import type { MossyGridProps } from './types';

/** 고정 열·행 개수 그리드. Compose `Column`/`Row`와 `weight`로 균등 셀을 만든다. */
export function Grid(props: MossyGridProps) {
  const { columns, rows: rowCount, autoFlow, gap, children, display } = props;
  const theme = useMossyTheme();
  const { rows } = chunkCells(children, columns, rowCount, autoFlow);
  const resolvedGap = resolveMossyDimension(theme, gap);

  if (display === 'none') return null;

  return (
    <ComposeColumn
      verticalArrangement={resolvedGap != null ? { spacedBy: resolvedGap } : undefined}
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyGridSurfaceProps(props), {
        beforeSurface: createGridSizeModifiers(props),
        afterSurface: createGridEffectModifiers(theme, props),
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

function createGridSizeModifiers(props: MossyGridProps): MossyModifier[] {
  const modifiers: MossyModifier[] = [];

  if (isFullBoxLength(props.width)) modifiers.push(fillMaxWidth());
  if (isFullBoxLength(props.height)) modifiers.push(fillMaxHeight());

  return modifiers;
}

function createGridEffectModifiers(
  theme: ReturnType<typeof useMossyTheme>,
  props: MossyGridProps,
): MossyModifier[] {
  const modifiers: MossyModifier[] = [];
  const flexGrow = normalizeBoxFlexGrow(props.flexGrow);
  const shadowValue = props.boxShadow == null ? undefined : theme.shadow[props.boxShadow];
  const zIndexValue = resolveBoxZIndex(props.zIndex);

  if (flexGrow != null) modifiers.push(weight(flexGrow));
  if (shadowValue?.elevation != null) modifiers.push(shadow(shadowValue.elevation));
  if (zIndexValue != null) modifiers.push(zIndex(zIndexValue));

  return modifiers;
}
