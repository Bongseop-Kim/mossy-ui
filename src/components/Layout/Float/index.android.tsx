import { Box as ComposeBox } from '@expo/ui/jetpack-compose';
import { matchParentSize, offset, testID as testIDModifier } from '@expo/ui/jetpack-compose/modifiers';

import { resolveMossyDimension } from '../../../foundation/component-tokens';
import type { MossyFloatProps } from './types';
import { useMossyTheme } from '../../../theme';

/** 부모 `Box` 크기에 맞춘 뒤 placement 위치에 자식을 고정 배치한다. `Box` 안에서 사용한다. */
export function Float({
  placement,
  offsetX = 0,
  offsetY = 0,
  children,
  modifiers = [],
  testID,
}: MossyFloatProps) {
  const theme = useMossyTheme();
  const resolvedX = resolveMossyDimension(theme, offsetX) ?? 0;
  const resolvedY = resolveMossyDimension(theme, offsetY) ?? 0;
  const x = placement.endsWith('End') ? -resolvedX : resolvedX;
  const y = placement.startsWith('bottom') ? -resolvedY : resolvedY;

  return (
    <ComposeBox
      contentAlignment={placement}
      modifiers={[
        matchParentSize(),
        offset(x, y),
        ...(testID == null ? [] : [testIDModifier(testID)]),
        ...modifiers,
      ]}>
      {children}
    </ComposeBox>
  );
}

export * from './types';
