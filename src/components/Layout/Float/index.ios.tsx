import { ZStack } from '@expo/ui/swift-ui';
import { frame, offset, zIndex } from '@expo/ui/swift-ui/modifiers';

import { resolveMossyDimension } from '../../../foundation/component-tokens';
import type { MossyModifier } from '../../../foundation/modifier';
import { useMossyTheme } from '../../../theme';
import { swiftUIAlignment } from '../types';
import type { MossyFloatPlacement, MossyFloatProps } from './types';

// SwiftUI `.infinity` 대응 — 모디파이어 직렬화가 Infinity를 보장하지 않아 유한 대값을 쓴다.
const FILL = 1_000_000;

/** 부모 영역을 채운 뒤 placement 위치에 자식을 고정 배치한다. 크기가 정해진 `Box` 안에서 사용한다. */
export function Float(props: MossyFloatProps) {
  const { placement, offsetX = 0, offsetY = 0, zIndex: zIndexProp, children } = props;
  const theme = useMossyTheme();
  const resolvedX = resolveMossyDimension(theme, offsetX) ?? 0;
  const resolvedY = resolveMossyDimension(theme, offsetY) ?? 0;
  const alignment = toMossyFloatAlignment(placement);
  const x = placement.endsWith('-end') ? -resolvedX : resolvedX;
  const y = placement.startsWith('bottom') ? -resolvedY : resolvedY;
  const zIndexValue = resolveFloatZIndex(zIndexProp);
  const modifiers: MossyModifier[] = [
    frame({ maxWidth: FILL, maxHeight: FILL, alignment: swiftUIAlignment[alignment] }),
    offset({ x, y }),
  ];

  if (zIndexValue != null) modifiers.push(zIndex(zIndexValue));

  return (
    <ZStack
      alignment={swiftUIAlignment[alignment]}
      modifiers={modifiers}>
      {children}
    </ZStack>
  );
}

export type { MossyFloatOffset, MossyFloatProps } from './types';

function toMossyFloatAlignment(placement: MossyFloatPlacement) {
  switch (placement) {
    case 'top-start':
      return 'topStart';
    case 'top-center':
      return 'topCenter';
    case 'top-end':
      return 'topEnd';
    case 'middle-start':
      return 'centerStart';
    case 'middle-center':
      return 'center';
    case 'middle-end':
      return 'centerEnd';
    case 'bottom-start':
      return 'bottomStart';
    case 'bottom-center':
      return 'bottomCenter';
    case 'bottom-end':
      return 'bottomEnd';
  }
}

function resolveFloatZIndex(value: MossyFloatProps['zIndex']) {
  if (value == null) return undefined;

  const resolved = Number(value);
  return Number.isNaN(resolved) ? undefined : resolved;
}
