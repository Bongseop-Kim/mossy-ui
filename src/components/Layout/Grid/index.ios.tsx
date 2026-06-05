import { Grid as SwiftUIGrid, ZStack } from '@expo/ui/swift-ui';
import { frame } from '@expo/ui/swift-ui/modifiers';

import { resolveMossyDimension } from '../../../foundation/component-tokens';
import { chunkCells } from './chunk';
import type { MossyGridProps } from './types';
import { useMossyTheme } from '../../../theme';

// SwiftUI Grid는 콘텐츠 너비로 열을 산정하므로, 셀을 유연하게 만들어 열 너비를 균등화한다.
const FILL = 1_000_000;

/** 고정 열 개수 그리드. SwiftUI `Grid`/`Grid.Row`로 렌더된다. */
export function Grid({
  columns,
  horizontalSpacing,
  verticalSpacing,
  children,
  modifiers,
  testID,
}: MossyGridProps) {
  const theme = useMossyTheme();
  const { rows, columnCount } = chunkCells(children, columns);

  return (
    <SwiftUIGrid
      alignment="topLeading"
      horizontalSpacing={resolveMossyDimension(theme, horizontalSpacing) ?? 0}
      verticalSpacing={resolveMossyDimension(theme, verticalSpacing) ?? 0}
      modifiers={modifiers}
      testID={testID}>
      {rows.map((cells, rowIndex) => (
        <SwiftUIGrid.Row key={rowIndex}>
          {Array.from({ length: columnCount }, (_, cellIndex) => (
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

export * from './types';
