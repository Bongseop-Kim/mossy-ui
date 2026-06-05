import type { ReactNode } from 'react';

import type { MossyModifier } from '../../../foundation/modifier';
import type { MossyAlignment } from '../types';

export interface MossyBoxProps {
  /** 박스 안에 렌더할 콘텐츠. 자식들은 겹쳐 쌓인다 (iOS `ZStack` / Android `Box`). */
  children?: ReactNode;
  /**
   * 자식 정렬 위치.
   * @default 'topStart'
   */
  alignment?: MossyAlignment;
  /** E2E 테스트에서 컴포넌트를 찾기 위한 식별자. */
  testID?: string;
  /** 플랫폼 모디파이어 패스스루 (`@expo/ui/swift-ui/modifiers` · `@expo/ui/jetpack-compose/modifiers`). */
  modifiers?: MossyModifier[];
}
