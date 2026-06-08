import { ZStack } from '@expo/ui/swift-ui';

import { useMossyTheme } from '../../../theme';
import { createMossyLayoutSurfaceModifiers } from '../surface.ios';
import {
  createMossyEffectModifiers,
  createMossyFillFrameModifiers,
} from '../surfaceModifiers.ios';
import {
  isFullBoxLength,
  normalizeBoxFlexGrow,
  resolveBoxZIndex,
  toMossyBoxSurfaceProps,
  type MossyBoxProps,
} from './types';

/** 자식을 겹쳐 쌓는 기초 레이아웃 컨테이너. SwiftUI `ZStack`으로 렌더된다. */
export function Box(props: MossyBoxProps) {
  const { children, testID } = props;
  const theme = useMossyTheme();

  return (
    <ZStack
      alignment="topLeading"
      testID={testID}
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyBoxSurfaceProps(props), {
        beforeSurface: createMossyFillFrameModifiers({
          fillWidth: isFullBoxLength(props.width),
          fillHeight: isFullBoxLength(props.height),
        }),
        afterSurface: createMossyEffectModifiers({
          grow: normalizeBoxFlexGrow(props.flexGrow),
          shadowValue: props.boxShadow == null ? undefined : theme.shadow[props.boxShadow],
          zIndexValue: resolveBoxZIndex(props.zIndex),
        }),
      })}>
      {children}
    </ZStack>
  );
}

export type { MossyBoxProps, MossyBoxRadiusToken } from './types';
