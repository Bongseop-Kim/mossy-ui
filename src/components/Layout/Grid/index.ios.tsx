import { Grid as SwiftUIGrid, ZStack } from '@expo/ui/swift-ui';
import { frame, layoutPriority, shadow, zIndex } from '@expo/ui/swift-ui/modifiers';

import type { MossyModifier } from '../../../foundation/modifier';
import { resolveMossyDimension } from '../../../foundation/component-tokens';
import { useMossyTheme } from '../../../theme';
import {
  isFullBoxLength,
  normalizeBoxFlexGrow,
  resolveBoxZIndex,
} from '../Box/types';
import { createMossyLayoutSurfaceModifiers } from '../surface.ios';
import { chunkCells } from './chunk';
import { toMossyGridSurfaceProps } from './shared';
import type { MossyGridProps } from './types';

// SwiftUI Grid는 콘텐츠 너비로 열을 산정하므로, 셀을 유연하게 만들어 열 너비를 균등화한다.
const FILL = 1_000_000;

/** 고정 열·행 개수 그리드. SwiftUI `Grid`/`Grid.Row`로 렌더된다. */
export function Grid(props: MossyGridProps) {
  const { columns, rows: rowCount, autoFlow, gap, children, display } = props;
  const theme = useMossyTheme();
  const { rows, columnCount } = chunkCells(children, columns, rowCount, autoFlow);
  const resolvedGap = resolveMossyDimension(theme, gap) ?? 0;

  if (display === 'none') return null;

  return (
    <SwiftUIGrid
      alignment="topLeading"
      horizontalSpacing={resolvedGap}
      verticalSpacing={resolvedGap}
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyGridSurfaceProps(props), {
        beforeSurface: createGridFrameModifiers(props),
        afterSurface: createGridEffectModifiers(theme, props),
      })}>
      {rows.map((cells, rowIndex) => (
        <SwiftUIGrid.Row key={rowIndex}>
          {Array.from({ length: columnCount }, (_unused, cellIndex) => (
            // 부분 행도 빈 셀로 채워 열 개수·너비를 Android와 동일하게 고정한다.
            <ZStack
              key={cellIndex}
              modifiers={[frame({ maxWidth: FILL, alignment: 'topLeading' })]}>
              {cells[cellIndex] ?? null}
            </ZStack>
          ))}
        </SwiftUIGrid.Row>
      ))}
    </SwiftUIGrid>
  );
}

export type { MossyGridAutoFlow, MossyGridDisplay, MossyGridProps, MossyGridSizeConstraint, MossyGridTrackCount } from './types';

function createGridFrameModifiers(props: MossyGridProps): MossyModifier[] {
  const width = isFullBoxLength(props.width) ? FILL : undefined;
  const height = isFullBoxLength(props.height) ? FILL : undefined;

  return width == null && height == null ? [] : [frame({ maxWidth: width, maxHeight: height })];
}

function createGridEffectModifiers(
  theme: ReturnType<typeof useMossyTheme>,
  props: MossyGridProps,
): MossyModifier[] {
  const modifiers: MossyModifier[] = [];
  const flexGrow = normalizeBoxFlexGrow(props.flexGrow);
  const shadowValue = props.boxShadow == null ? undefined : theme.shadow[props.boxShadow];
  const zIndexValue = resolveBoxZIndex(props.zIndex);

  if (flexGrow != null) modifiers.push(layoutPriority(flexGrow));

  if (shadowValue != null) {
    modifiers.push(
      shadow({
        radius: shadowValue.shadowRadius ?? 0,
        x: shadowValue.shadowOffset?.width,
        y: shadowValue.shadowOffset?.height,
        color: shadowValue.shadowColor,
      }),
    );
  }

  if (zIndexValue != null) modifiers.push(zIndex(zIndexValue));

  return modifiers;
}
