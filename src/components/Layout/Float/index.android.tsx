import { Box as ComposeBox } from '@expo/ui/jetpack-compose';
import { matchParentSize, offset, testID as testIDModifier, zIndex } from '@expo/ui/jetpack-compose/modifiers';

import type { MossyModifier } from '../../../foundation/modifier';
import { useMossyTheme } from '../../../theme';
import { resolveBoxZIndex } from '../Box/types';
import { floatPlacementAlignment, resolveFloatOffset } from './shared';
import type { MossyFloatProps } from './types';

/** 부모 `Box` 크기에 맞춘 뒤 placement 위치에 자식을 고정 배치한다. `Box` 안에서 사용한다. */
export function Float(props: MossyFloatProps) {
  const {
    placement,
    offsetX = 0,
    offsetY = 0,
    zIndex: zIndexProp,
    testID,
    modifiers: userModifiers,
    children,
  } = props;
  const theme = useMossyTheme();
  const alignment = floatPlacementAlignment[placement];
  const { x, y } = resolveFloatOffset(theme, placement, offsetX, offsetY);
  const zIndexValue = resolveBoxZIndex(zIndexProp);
  const modifiers: MossyModifier[] = [matchParentSize(), offset(x, y)];

  if (zIndexValue != null) modifiers.push(zIndex(zIndexValue));
  if (testID != null) modifiers.push(testIDModifier(testID));
  if (userModifiers != null) modifiers.push(...userModifiers);

  return (
    <ComposeBox contentAlignment={alignment} modifiers={modifiers}>
      {children}
    </ComposeBox>
  );
}

export type { MossyFloatOffset, MossyFloatProps } from './types';
