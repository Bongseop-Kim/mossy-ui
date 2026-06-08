import { Box as ComposeBox } from '@expo/ui/jetpack-compose';

import { useMossyTheme } from '../../../theme';
import { createMossyLayoutSurfaceModifiers } from '../surface.android';
import {
  createMossyEffectModifiers,
  createMossyFillSizeModifiers,
} from '../surfaceModifiers.android';
import {
  isFullLayoutLength,
  normalizeLayoutFlexGrow,
  resolveLayoutZIndex,
  toMossyLayoutSurfaceProps,
} from '../surfaceProps.shared';
import type { MossyBoxProps } from './types';

/** 자식을 겹쳐 쌓는 기초 레이아웃 컨테이너. Compose `Box`로 렌더된다. */
export function Box(props: MossyBoxProps) {
  const { children } = props;
  const theme = useMossyTheme();

  return (
    <ComposeBox
      contentAlignment="topStart"
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyLayoutSurfaceProps(props), {
        beforeSurface: createMossyFillSizeModifiers({
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
    </ComposeBox>
  );
}

export type { MossyBoxProps } from './types';
export type { MossyLayoutRadiusToken } from '../surfaceProps.shared';
