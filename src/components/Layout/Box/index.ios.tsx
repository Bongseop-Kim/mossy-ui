import { ZStack } from '@expo/ui/swift-ui';

import { swiftUIAlignment } from '../types';
import type { MossyBoxProps } from './types';

/** 자식을 겹쳐 쌓는 기초 레이아웃 컨테이너. SwiftUI `ZStack`으로 렌더된다. */
export function Box({ alignment = 'topStart', children, modifiers, testID }: MossyBoxProps) {
  return (
    <ZStack alignment={swiftUIAlignment[alignment]} modifiers={modifiers} testID={testID}>
      {children}
    </ZStack>
  );
}

export * from './types';
