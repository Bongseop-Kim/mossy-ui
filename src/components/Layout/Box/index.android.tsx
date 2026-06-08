import { Box as ComposeBox } from '@expo/ui/jetpack-compose';

import { useMossyTheme } from '../../../theme';
import { createMossyLayoutSurfaceModifiers } from '../surface.android';
import {
  createMossyEffectModifiers,
  createMossyFillSizeModifiers,
} from '../surfaceModifiers.android';
import {
  isFullBoxLength,
  normalizeBoxFlexGrow,
  resolveBoxZIndex,
  toMossyBoxSurfaceProps,
  type MossyBoxProps,
} from './types';

/** 자식을 겹쳐 쌓는 기초 레이아웃 컨테이너. Compose `Box`로 렌더된다. */
export function Box(props: MossyBoxProps) {
  const { children } = props;
  const theme = useMossyTheme();

  return (
    <ComposeBox
      contentAlignment="topStart"
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyBoxSurfaceProps(props), {
        beforeSurface: createMossyFillSizeModifiers({
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
    </ComposeBox>
  );
}

export type { MossyBoxProps, MossyBoxRadiusToken } from './types';
