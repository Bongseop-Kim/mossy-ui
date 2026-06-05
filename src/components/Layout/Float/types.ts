import type { ReactNode } from 'react';

import type { MossyDimensionToken } from '../../../foundation/component-tokens';
import type { MossyModifier } from '../../../foundation/modifier';
import type { MossyAlignment } from '../types';

export interface MossyFloatProps {
  /** 고정 위치에 띄울 콘텐츠. */
  children?: ReactNode;
  /** 부모 기준 고정 위치. 크기가 정해진 `Box` 안에서 사용한다. */
  placement: MossyAlignment;
  /**
   * 가로 오프셋 — dimension 토큰(`'x2'`) 또는 숫자(pt/dp).
   * `*Start`·`*Center`는 오른쪽, `*End`는 왼쪽 — 항상 안쪽 방향으로 이동한다.
   * @default 0
   */
  offsetX?: number | MossyDimensionToken;
  /**
   * 세로 오프셋 — dimension 토큰(`'x2'`) 또는 숫자(pt/dp).
   * `top*`·`center*`는 아래쪽, `bottom*`은 위쪽 — 항상 안쪽 방향으로 이동한다.
   * @default 0
   */
  offsetY?: number | MossyDimensionToken;
  /** E2E 테스트에서 컴포넌트를 찾기 위한 식별자. */
  testID?: string;
  /** 플랫폼 모디파이어 패스스루 (`@expo/ui/swift-ui/modifiers` · `@expo/ui/jetpack-compose/modifiers`). */
  modifiers?: MossyModifier[];
}
