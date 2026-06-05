import { Box as ComposeBox } from '@expo/ui/jetpack-compose';
import { testID as testIDModifier } from '@expo/ui/jetpack-compose/modifiers';

import type { MossyBoxProps } from './types';

/** 자식을 겹쳐 쌓는 기초 레이아웃 컨테이너. Compose `Box`로 렌더된다. */
export function Box({ alignment = 'topStart', children, modifiers, testID }: MossyBoxProps) {
  const composedModifiers =
    testID == null ? modifiers : [...(modifiers ?? []), testIDModifier(testID)];

  return (
    <ComposeBox contentAlignment={alignment} modifiers={composedModifiers}>
      {children}
    </ComposeBox>
  );
}

export * from './types';
