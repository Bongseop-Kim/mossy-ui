import { Box as ComposeBox } from '@expo/ui/jetpack-compose';
import { matchParentSize, offset } from '@expo/ui/jetpack-compose/modifiers';

import { resolveMossyDimension } from '../../../foundation/component-tokens';
import { useMossyTheme } from '../../../theme';
import { createMossyLayoutSurfaceModifiers } from '../surface.android';
import { shouldRenderLayoutSurface } from '../surface.shared';
import type { MossyFloatProps } from './types';

/** 부모 `Box` 크기에 맞춘 뒤 placement 위치에 자식을 고정 배치한다. `Box` 안에서 사용한다. */
export function Float(props: MossyFloatProps) {
  const { placement, offsetX = 0, offsetY = 0, children, display } = props;
  const theme = useMossyTheme();
  const resolvedX = resolveMossyDimension(theme, offsetX) ?? 0;
  const resolvedY = resolveMossyDimension(theme, offsetY) ?? 0;
  const x = placement.endsWith('End') ? -resolvedX : resolvedX;
  const y = placement.startsWith('bottom') ? -resolvedY : resolvedY;

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <ComposeBox
      contentAlignment={placement}
      modifiers={createMossyLayoutSurfaceModifiers(theme, props, {
        beforeSurface: [matchParentSize(), offset(x, y)],
      })}>
      {children}
    </ComposeBox>
  );
}

export type { MossyFloatProps } from './types';
