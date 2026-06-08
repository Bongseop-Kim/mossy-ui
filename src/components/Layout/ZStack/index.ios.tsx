import { ZStack as SwiftUIZStack } from '@expo/ui/swift-ui';

import { useMossyTheme } from '../../../theme';
import { createMossyLayoutSurfaceModifiers } from '../surface.ios';
import {
  createMossyEffectModifiers,
  createMossyFillFrameModifiers,
} from '../surfaceModifiers.ios';
import {
  isFullLayoutLength,
  normalizeLayoutFlexGrow,
  resolveLayoutZIndex,
  toMossyLayoutSurfaceProps,
} from '../surfaceProps.shared';
import type { MossyZStackProps } from './types';

/** 자식을 겹쳐 쌓는 레이아웃 컨테이너. SwiftUI `ZStack`으로 렌더된다. */
export function ZStack(props: MossyZStackProps) {
  const { children, testID } = props;
  const theme = useMossyTheme();

  return (
    <SwiftUIZStack
      alignment="topLeading"
      testID={testID}
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyLayoutSurfaceProps(props), {
        beforeSurface: createMossyFillFrameModifiers({
          fillWidth: isFullLayoutLength(props.width),
          fillHeight: isFullLayoutLength(props.height),
        }),
        afterSurface: createMossyEffectModifiers({
          grow: normalizeLayoutFlexGrow(props.flexGrow),
          shadowValue: props.boxShadow == null ? undefined : theme.shadow[props.boxShadow],
          zIndexValue: resolveLayoutZIndex(props.zIndex),
        }),
      })}>
      {children}
    </SwiftUIZStack>
  );
}

export type { MossyZStackProps } from './types';
export type { MossyLayoutRadiusToken } from '../surfaceProps.shared';
