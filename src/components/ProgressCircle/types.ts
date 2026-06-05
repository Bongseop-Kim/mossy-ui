import type { MossyColorToken } from '../../foundation/component-tokens';
import type { MossyModifier } from '../../foundation/modifier';

export interface MossyProgressCircleProps {
  /** 진행률(0~1). 생략하면 불확정(indeterminate) 스피너로 렌더된다. */
  value?: number;
  /**
   * 진행 표시 색 — 토큰(`fg.*` · `palette.*`) 또는 원시 색상 문자열.
   * @default 'fg.brand'
   */
  color?: MossyColorToken | (string & {});
  /**
   * 트랙(배경) 색 — 토큰 또는 원시 색상 문자열.
   * @platform android — iOS ProgressView는 트랙 색을 지원하지 않는다.
   */
  trackColor?: MossyColorToken | (string & {});
  /** E2E 테스트에서 컴포넌트를 찾기 위한 식별자. */
  testID?: string;
  /** 플랫폼 모디파이어 패스스루 (`@expo/ui/swift-ui/modifiers` · `@expo/ui/jetpack-compose/modifiers`). */
  modifiers?: MossyModifier[];
}
