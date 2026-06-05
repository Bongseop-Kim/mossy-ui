import type { ReactNode } from 'react';

import type { MossyColorToken, MossyTextStyleToken } from '../../foundation/component-tokens';
import type { MossyModifier } from '../../foundation/modifier';

export interface MossyListHeaderProps {
  /** 헤더 제목 — variant의 토큰 스타일로 렌더된다. */
  title: string;
  /**
   * 스타일 variant.
   * @default 'mediumWeak'
   */
  variant?: 'mediumWeak' | 'boldSolid';
  /** 오른쪽 끝 보조 영역 (Expo UI 노드). */
  children?: ReactNode;
  /** E2E 테스트에서 컴포넌트를 찾기 위한 식별자. */
  testID?: string;
  /** 플랫폼 모디파이어 패스스루 (`@expo/ui/swift-ui/modifiers` · `@expo/ui/jetpack-compose/modifiers`). */
  modifiers?: MossyModifier[];
}

/** variant → 토큰 매핑 (seed `list-header` 스펙: rootage list-header.yaml). */
export const listHeaderVariants = {
  mediumWeak: { textStyle: 't4Medium', color: 'fg.neutralSubtle' },
  boldSolid: { textStyle: 't4Bold', color: 'fg.neutral' },
} as const satisfies Record<string, { textStyle: MossyTextStyleToken; color: MossyColorToken }>;
