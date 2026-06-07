import { Box as ComposeBox } from '@expo/ui/jetpack-compose';
import {
  fillMaxHeight,
  fillMaxWidth,
  shadow,
  weight,
  zIndex,
} from '@expo/ui/jetpack-compose/modifiers';

import type { MossyModifier } from '../../../foundation/modifier';
import { useMossyTheme } from '../../../theme';
import { createMossyLayoutSurfaceModifiers } from '../surface.android';
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
        beforeSurface: createBoxSizeModifiers(props),
        afterSurface: createBoxEffectModifiers(theme, props),
      })}>
      {children}
    </ComposeBox>
  );
}

export type { MossyBoxProps, MossyBoxRadiusToken } from './types';

function createBoxSizeModifiers(props: MossyBoxProps): MossyModifier[] {
  const modifiers: MossyModifier[] = [];

  if (isFullBoxLength(props.width)) modifiers.push(fillMaxWidth());
  if (isFullBoxLength(props.height)) modifiers.push(fillMaxHeight());

  return modifiers;
}

function createBoxEffectModifiers(theme: ReturnType<typeof useMossyTheme>, props: MossyBoxProps): MossyModifier[] {
  const modifiers: MossyModifier[] = [];
  const flexGrow = normalizeBoxFlexGrow(props.flexGrow);
  const shadowValue = props.boxShadow == null ? undefined : theme.shadow[props.boxShadow];
  const zIndexValue = resolveBoxZIndex(props.zIndex);

  if (flexGrow != null) modifiers.push(weight(flexGrow));
  if (shadowValue?.elevation != null) modifiers.push(shadow(shadowValue.elevation));
  if (zIndexValue != null) modifiers.push(zIndex(zIndexValue));

  return modifiers;
}
