import { HorizontalDivider, VerticalDivider } from '@expo/ui/jetpack-compose';
import { padding, testID as testIDModifier } from '@expo/ui/jetpack-compose/modifiers';

import { resolveMossyColor, resolveMossyDimension } from '../../../foundation/component-tokens';
import type { MossyDividerProps } from './types';
import { useMossyTheme } from '../../../theme';

/** 콘텐츠를 시각적으로 구분하는 선. Compose `HorizontalDivider`/`VerticalDivider`로 렌더된다. */
export function Divider({
  orientation = 'horizontal',
  thickness = 1,
  color = 'stroke.neutralMuted',
  inset,
  testID,
  modifiers = [],
}: MossyDividerProps) {
  const theme = useMossyTheme();
  const resolvedColor = resolveMossyColor(theme, color) ?? color;
  const resolvedInset = resolveMossyDimension(theme, inset);
  const resolvedThickness = resolveMossyDimension(theme, thickness) ?? 1;

  const composedModifiers = [
    ...(resolvedInset == null
      ? []
      : [
          orientation === 'horizontal'
            ? padding(resolvedInset, 0, resolvedInset, 0)
            : padding(0, resolvedInset, 0, resolvedInset),
        ]),
    ...(testID == null ? [] : [testIDModifier(testID)]),
    ...modifiers,
  ];

  return orientation === 'horizontal' ? (
    <HorizontalDivider
      thickness={resolvedThickness}
      color={resolvedColor}
      modifiers={composedModifiers}
    />
  ) : (
    <VerticalDivider
      thickness={resolvedThickness}
      color={resolvedColor}
      modifiers={composedModifiers}
    />
  );
}

export * from './types';
