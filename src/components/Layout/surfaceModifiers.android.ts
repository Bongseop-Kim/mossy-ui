import {
  createModifier,
  fillMaxHeight,
  fillMaxWidth,
  weight,
  zIndex,
} from '@expo/ui/jetpack-compose/modifiers';

import type { MossyModifier } from '../../foundation/modifier';
import type { MossyLayoutShadowValue, MossyLinearGradientConfig } from './surfaceModifiers.shared';

/** `width`/`height: 'full'`을 Compose `fillMaxWidth`/`fillMaxHeight`로 조립한다. */
export function createMossyFillSizeModifiers(params: {
  fillWidth: boolean;
  fillHeight: boolean;
}): MossyModifier[] {
  const modifiers: MossyModifier[] = [];

  if (params.fillWidth) modifiers.push(fillMaxWidth());
  if (params.fillHeight) modifiers.push(fillMaxHeight());

  return modifiers;
}

/** grow·zIndex를 Compose 효과 모디파이어로 조립한다 (weight·zIndex). */
export function createMossyEffectModifiers(params: {
  grow?: number;
  zIndexValue?: number;
}): MossyModifier[] {
  const modifiers: MossyModifier[] = [];

  if (params.grow != null) modifiers.push(weight(params.grow));
  if (params.zIndexValue != null) modifiers.push(zIndex(params.zIndexValue));

  return modifiers;
}

export function mossyShadow(params: {
  elevation: number;
  topLeft?: number;
  topRight?: number;
  bottomRight?: number;
  bottomLeft?: number;
}): MossyModifier {
  return createModifier('mossyShadow', params);
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
