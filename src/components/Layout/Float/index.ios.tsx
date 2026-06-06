import { ZStack } from '@expo/ui/swift-ui';
import { frame, offset } from '@expo/ui/swift-ui/modifiers';

import { resolveMossyDimension } from '../../../foundation/component-tokens';
import { useMossyTheme } from '../../../theme';
import { createMossyLayoutSurfaceModifiers } from '../surface.ios';
import { shouldRenderLayoutSurface } from '../surface.shared';
import { swiftUIAlignment } from '../types';
import type { MossyFloatProps } from './types';

// SwiftUI `.infinity` 대응 — 모디파이어 직렬화가 Infinity를 보장하지 않아 유한 대값을 쓴다.
const FILL = 1_000_000;

/** 부모 영역을 채운 뒤 placement 위치에 자식을 고정 배치한다. 크기가 정해진 `Box` 안에서 사용한다. */
export function Float(props: MossyFloatProps) {
  const { placement, offsetX = 0, offsetY = 0, children, display, testID } = props;
  const theme = useMossyTheme();
  const resolvedX = resolveMossyDimension(theme, offsetX) ?? 0;
  const resolvedY = resolveMossyDimension(theme, offsetY) ?? 0;
  const x = placement.endsWith('End') ? -resolvedX : resolvedX;
  const y = placement.startsWith('bottom') ? -resolvedY : resolvedY;

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <ZStack
      alignment={swiftUIAlignment[placement]}
      testID={testID}
      modifiers={createMossyLayoutSurfaceModifiers(theme, props, {
        beforeSurface: [
          frame({ maxWidth: FILL, maxHeight: FILL, alignment: swiftUIAlignment[placement] }),
          offset({ x, y }),
        ],
      })}>
      {children}
    </ZStack>
  );
}

export type { MossyFloatProps } from './types';
