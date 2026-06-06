import { ZStack } from '@expo/ui/swift-ui';

import { useMossyTheme } from '../../../theme';
import { createMossyLayoutSurfaceModifiers } from '../surface.ios';
import { shouldRenderLayoutSurface } from '../surface.shared';
import { swiftUIAlignment } from '../types';
import type { MossyBoxProps } from './types';

/** 자식을 겹쳐 쌓는 기초 레이아웃 컨테이너. SwiftUI `ZStack`으로 렌더된다. */
export function Box(props: MossyBoxProps) {
  const { alignment = 'topStart', children, display, testID } = props;
  const theme = useMossyTheme();

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <ZStack
      alignment={swiftUIAlignment[alignment]}
      modifiers={createMossyLayoutSurfaceModifiers(theme, props)}
      testID={testID}>
      {children}
    </ZStack>
  );
}

export type { MossyBoxProps, MossyBoxRadiusToken } from './types';
