import { ZStack } from '@expo/ui/swift-ui';
import { frame, layoutPriority, shadow, zIndex } from '@expo/ui/swift-ui/modifiers';

import { useMossyTheme } from '../../../theme';
import { createMossyLayoutSurfaceModifiers } from '../surface.ios';
import type { MossyModifier } from '../../../foundation/modifier';
import {
  isFullBoxLength,
  normalizeBoxFlexGrow,
  resolveBoxZIndex,
  toMossyBoxSurfaceProps,
  type MossyBoxProps,
} from './types';

const FILL = 1_000_000;

/** 자식을 겹쳐 쌓는 기초 레이아웃 컨테이너. SwiftUI `ZStack`으로 렌더된다. */
export function Box(props: MossyBoxProps) {
  const { children } = props;
  const theme = useMossyTheme();

  return (
    <ZStack
      alignment="topLeading"
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyBoxSurfaceProps(props), {
        beforeSurface: createBoxFrameModifiers(props),
        afterSurface: createBoxEffectModifiers(theme, props),
      })}>
      {children}
    </ZStack>
  );
}

export type { MossyBoxProps, MossyBoxRadiusToken } from './types';

function createBoxFrameModifiers(props: MossyBoxProps): MossyModifier[] {
  const width = isFullBoxLength(props.width) ? FILL : undefined;
  const height = isFullBoxLength(props.height) ? FILL : undefined;

  return width == null && height == null ? [] : [frame({ maxWidth: width, maxHeight: height })];
}

function createBoxEffectModifiers(theme: ReturnType<typeof useMossyTheme>, props: MossyBoxProps): MossyModifier[] {
  const modifiers: MossyModifier[] = [];
  const flexGrow = normalizeBoxFlexGrow(props.flexGrow);
  const shadowValue = props.boxShadow == null ? undefined : theme.shadow[props.boxShadow];
  const zIndexValue = resolveBoxZIndex(props.zIndex);

  if (flexGrow != null) modifiers.push(layoutPriority(flexGrow));

  if (shadowValue != null) {
    modifiers.push(
      shadow({
        radius: shadowValue.shadowRadius ?? 0,
        x: shadowValue.shadowOffset?.width,
        y: shadowValue.shadowOffset?.height,
        color: shadowValue.shadowColor,
      }),
    );
  }

  if (zIndexValue != null) modifiers.push(zIndex(zIndexValue));

  return modifiers;
}
