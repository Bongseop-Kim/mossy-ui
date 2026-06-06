import { Box as ComposeBox } from '@expo/ui/jetpack-compose';

import { useMossyTheme } from '../../../theme';
import { createMossyLayoutSurfaceModifiers } from '../surface.android';
import { shouldRenderLayoutSurface } from '../surface.shared';
import type { MossyBoxProps } from './types';

/** 자식을 겹쳐 쌓는 기초 레이아웃 컨테이너. Compose `Box`로 렌더된다. */
export function Box(props: MossyBoxProps) {
  const { alignment = 'topStart', children, display } = props;
  const theme = useMossyTheme();

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <ComposeBox
      contentAlignment={alignment}
      modifiers={createMossyLayoutSurfaceModifiers(theme, props)}>
      {children}
    </ComposeBox>
  );
}

export type { MossyBoxProps, MossyBoxRadiusToken } from './types';
