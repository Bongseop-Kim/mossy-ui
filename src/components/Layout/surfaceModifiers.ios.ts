import { createModifier, frame, layoutPriority, shadow, zIndex } from '@expo/ui/swift-ui/modifiers';

import type { MossyModifier } from '../../foundation/modifier';
import type { MossyLayoutShadowValue, MossyLinearGradientConfig } from './surfaceModifiers.shared';

/** SwiftUI `.infinity` 대응 — 모디파이어 직렬화가 Infinity를 보장하지 않아 쓰는 유한 대값. */
export const SWIFTUI_FILL = 1_000_000;

/** `width`/`height: 'full'`을 SwiftUI `frame(maxWidth/maxHeight: FILL)`로 조립한다. */
export function createMossyFillFrameModifiers(params: {
  fillWidth: boolean;
  fillHeight: boolean;
}): MossyModifier[] {
  const maxWidth = params.fillWidth ? SWIFTUI_FILL : undefined;
  const maxHeight = params.fillHeight ? SWIFTUI_FILL : undefined;

  return maxWidth == null && maxHeight == null ? [] : [frame({ maxWidth, maxHeight })];
}

/** grow·boxShadow·zIndex를 SwiftUI 효과 모디파이어로 조립한다 (layoutPriority·shadow·zIndex). */
export function createMossyEffectModifiers(params: {
  grow?: number;
  shadowValue?: MossyLayoutShadowValue;
  zIndexValue?: number;
}): MossyModifier[] {
  const modifiers: MossyModifier[] = [];

  if (params.grow != null) modifiers.push(layoutPriority(params.grow));

  if (params.shadowValue != null) {
    modifiers.push(
      shadow({
        radius: params.shadowValue.shadowRadius ?? 0,
        x: params.shadowValue.shadowOffset?.width,
        y: params.shadowValue.shadowOffset?.height,
        color: params.shadowValue.shadowColor,
      }),
    );
  }

  if (params.zIndexValue != null) modifiers.push(zIndex(params.zIndexValue));

  return modifiers;
}

export function mossySizeConstraints(params: {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}): MossyModifier {
  return createModifier('mossySizeConstraints', params);
}

export function mossyLinearGradientBackground(params: MossyLinearGradientConfig): MossyModifier {
  return createModifier('mossyLinearGradientBackground', params);
}

export function mossyUnevenCornerRadius(params: {
  topLeft?: number;
  topRight?: number;
  bottomRight?: number;
  bottomLeft?: number;
}): MossyModifier {
  return createModifier('mossyUnevenCornerRadius', params);
}

export function mossyDirectionalBorder(params: {
  color: string;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}): MossyModifier {
  return createModifier('mossyDirectionalBorder', params);
}
