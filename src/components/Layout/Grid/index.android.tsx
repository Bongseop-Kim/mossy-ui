import { Box as ComposeBox, Column as ComposeColumn, Row as ComposeRow } from '@expo/ui/jetpack-compose';
import { testID as testIDModifier, weight } from '@expo/ui/jetpack-compose/modifiers';

import { resolveMossyDimension } from '../../../foundation/component-tokens';
import { chunkCells } from './chunk';
import type { MossyGridProps } from './types';
import { useMossyTheme } from '../../../theme';

/** 고정 열 개수 그리드. Compose `Column`/`Row`와 `weight`로 균등 셀을 만든다. */
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
  const resolvedHorizontal = resolveMossyDimension(theme, horizontalSpacing);
  const resolvedVertical = resolveMossyDimension(theme, verticalSpacing);
  const composedModifiers =
    testID == null ? modifiers : [...(modifiers ?? []), testIDModifier(testID)];

  return (
    <ComposeColumn
      verticalArrangement={resolvedVertical != null ? { spacedBy: resolvedVertical } : undefined}
      modifiers={composedModifiers}>
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

export * from './types';
