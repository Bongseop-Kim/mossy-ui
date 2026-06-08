import { Grid as SwiftUIGrid, ZStack } from '@expo/ui/swift-ui';
import { frame, gridCellColumns } from '@expo/ui/swift-ui/modifiers';

import type { MossyModifier } from '../../../foundation/modifier';
import { resolveMossyDimension } from '../../../foundation/component-tokens';
import { useMossyTheme } from '../../../theme';
import {
  isFullBoxLength,
  normalizeBoxFlexGrow,
  resolveBoxZIndex,
  toMossyBoxSurfaceProps,
} from '../Box/types';
import { createMossyLayoutSurfaceModifiers } from '../surface.ios';
import { shouldRenderLayoutSurface } from '../surface.shared';
import {
  SWIFTUI_FILL,
  createMossyEffectModifiers,
  createMossyFillFrameModifiers,
} from '../surfaceModifiers.ios';
import { chunkCells } from './chunk';
import { GridItem } from './Item';
import type { MossyGridProps } from './types';

/** 고정 열·행 개수 그리드. SwiftUI `Grid`/`Grid.Row`로 렌더된다. */
export function Grid(props: MossyGridProps) {
  const { columns, rows: rowCount, autoFlow, gap, testID, children, display } = props;
  const theme = useMossyTheme();
  const { rows } = chunkCells(children, columns, rowCount, autoFlow);
  const resolvedGap = resolveMossyDimension(theme, gap) ?? 0;

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <SwiftUIGrid
      alignment="topLeading"
      horizontalSpacing={resolvedGap}
      verticalSpacing={resolvedGap}
      testID={testID}
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyBoxSurfaceProps(props), {
        beforeSurface: createMossyFillFrameModifiers({
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
        <SwiftUIGrid.Row key={rowIndex}>
          {cells.map((cell, cellIndex) => (
            // 부분 행도 빈 셀로 채워 열 개수·너비를 Android와 동일하게 고정한다.
            <ZStack
              key={cellIndex}
              modifiers={createGridCellModifiers(cell.colSpan)}>
              {cell.node}
            </ZStack>
          ))}
        </SwiftUIGrid.Row>
      ))}
    </SwiftUIGrid>
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

function createGridCellModifiers(colSpan: number): MossyModifier[] {
  const modifiers: MossyModifier[] = [frame({ maxWidth: SWIFTUI_FILL, alignment: 'topLeading' })];

  if (colSpan > 1) modifiers.push(gridCellColumns(colSpan));

  return modifiers;
}
