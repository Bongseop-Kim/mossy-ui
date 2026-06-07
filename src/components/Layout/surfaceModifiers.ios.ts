import { createModifier } from '@expo/ui/swift-ui/modifiers';

import type { MossyModifier } from '../../foundation/modifier';
import type { MossyLinearGradientConfig } from './surfaceModifiers.shared';

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
