import { ZStack } from '@expo/ui/swift-ui';
import { frame, offset } from '@expo/ui/swift-ui/modifiers';

import { resolveMossyDimension } from '../../../foundation/component-tokens';
import { swiftUIAlignment } from '../types';
import type { MossyFloatProps } from './types';
import { useMossyTheme } from '../../../theme';

// SwiftUI `.infinity` 대응 — 모디파이어 직렬화가 Infinity를 보장하지 않아 유한 대값을 쓴다.
const FILL = 1_000_000;

/** 부모 영역을 채운 뒤 placement 위치에 자식을 고정 배치한다. 크기가 정해진 `Box` 안에서 사용한다. */
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
    <ZStack
      alignment={swiftUIAlignment[placement]}
      testID={testID}
      modifiers={[
        frame({ maxWidth: FILL, maxHeight: FILL, alignment: swiftUIAlignment[placement] }),
        offset({ x, y }),
        ...modifiers,
      ]}>
      {children}
    </ZStack>
  );
}

export * from './types';
