import type { ReactNode } from 'react';

import type { MossyDimensionToken } from '../../../foundation/component-tokens';
import type { MossyModifier } from '../../../foundation/modifier';

export interface MossyGridProps {
  /** 셀로 배치할 콘텐츠. 왼쪽 위부터 행 우선으로 채워진다. */
  children?: ReactNode;
  /** 열 개수. 셀은 균등한 너비로 배치된다. */
  columns: number;
  /**
   * 셀 사이 가로 간격 — dimension 토큰(`'x2'`) 또는 숫자(pt/dp).
   * @default 0
   */
  horizontalSpacing?: number | MossyDimensionToken;
  /**
   * 셀 사이 세로 간격 — dimension 토큰(`'x2'`) 또는 숫자(pt/dp).
   * @default 0
   */
  verticalSpacing?: number | MossyDimensionToken;
  /** E2E 테스트에서 컴포넌트를 찾기 위한 식별자. */
  testID?: string;
  /** 플랫폼 모디파이어 패스스루 (`@expo/ui/swift-ui/modifiers` · `@expo/ui/jetpack-compose/modifiers`). */
  modifiers?: MossyModifier[];
}
