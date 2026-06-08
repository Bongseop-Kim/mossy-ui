import { Column } from '@expo/ui';

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
import type { MossyBoxProps } from './types';

/** 일반 children을 세로 flow로 배치하는 기초 surface 컨테이너. */
export function Box(props: MossyBoxProps) {
  const { children, testID } = props;
  const theme = useMossyTheme();

  return (
    <Column
      alignment="start"
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
    </Column>
  );
}

export type { MossyBoxProps } from './types';
export type { MossyLayoutRadiusToken } from '../surfaceProps.shared';
