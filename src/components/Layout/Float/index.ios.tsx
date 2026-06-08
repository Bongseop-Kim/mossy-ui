import { ZStack } from '@expo/ui/swift-ui';
import { frame, offset, zIndex } from '@expo/ui/swift-ui/modifiers';

import type { MossyModifier } from '../../../foundation/modifier';
import { useMossyTheme } from '../../../theme';
import { resolveBoxZIndex } from '../Box/types';
import { SWIFTUI_FILL } from '../surfaceModifiers.ios';
import { swiftUIAlignment } from '../types';
import { floatPlacementAlignment, resolveFloatOffset } from './shared';
import type { MossyFloatProps } from './types';

/** 부모 영역을 채운 뒤 placement 위치에 자식을 고정 배치한다. 크기가 정해진 `Box` 안에서 사용한다. */
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
  const alignment = swiftUIAlignment[floatPlacementAlignment[placement]];
  const { x, y } = resolveFloatOffset(theme, placement, offsetX, offsetY);
  const zIndexValue = resolveBoxZIndex(zIndexProp);
  const modifiers: MossyModifier[] = [
    frame({ maxWidth: SWIFTUI_FILL, maxHeight: SWIFTUI_FILL, alignment }),
    offset({ x, y }),
  ];

  if (zIndexValue != null) modifiers.push(zIndex(zIndexValue));
  if (userModifiers != null) modifiers.push(...userModifiers);

  return (
    <ZStack alignment={alignment} testID={testID} modifiers={modifiers}>
      {children}
    </ZStack>
  );
}

export type { MossyFloatOffset, MossyFloatProps } from './types';
