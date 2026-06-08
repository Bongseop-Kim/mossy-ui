import { Box as ComposeBox } from '@expo/ui/jetpack-compose';
import { matchParentSize, offset, zIndex } from '@expo/ui/jetpack-compose/modifiers';

import { resolveMossyDimension } from '../../../foundation/component-tokens';
import type { MossyModifier } from '../../../foundation/modifier';
import { useMossyTheme } from '../../../theme';
import type { MossyFloatPlacement, MossyFloatProps } from './types';

/** 부모 `Box` 크기에 맞춘 뒤 placement 위치에 자식을 고정 배치한다. `Box` 안에서 사용한다. */
export function Float(props: MossyFloatProps) {
  const { placement, offsetX = 0, offsetY = 0, zIndex: zIndexProp, children } = props;
  const theme = useMossyTheme();
  const resolvedX = resolveMossyDimension(theme, offsetX) ?? 0;
  const resolvedY = resolveMossyDimension(theme, offsetY) ?? 0;
  const alignment = toMossyFloatAlignment(placement);
  const x = placement.endsWith('-end') ? -resolvedX : resolvedX;
  const y = placement.startsWith('bottom') ? -resolvedY : resolvedY;
  const zIndexValue = resolveFloatZIndex(zIndexProp);
  const modifiers: MossyModifier[] = [matchParentSize(), offset(x, y)];

  if (zIndexValue != null) modifiers.push(zIndex(zIndexValue));

  return (
    <ComposeBox
      contentAlignment={alignment}
      modifiers={modifiers}>
      {children}
    </ComposeBox>
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
