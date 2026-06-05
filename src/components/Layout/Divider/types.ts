import type { MossyDimensionToken, MossyStrokeColorToken } from '../../../foundation/component-tokens';
import type { MossyModifier } from '../../../foundation/modifier';

export interface MossyDividerProps {
  /**
   * 구분선 방향. horizontal은 부모 너비를, vertical은 부모 높이를 가득 채운다.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * 선 두께(pt/dp).
   * @default 1
   */
  thickness?: number;
  /**
   * 선 색상 — 토큰(`stroke.*` · `palette.*`) 또는 원시 색상 문자열.
   * @default 'stroke.neutralMuted'
   */
  color?: MossyStrokeColorToken | (string & {});
  /** 양 끝 들여쓰기 — dimension 토큰(`'x4'`) 또는 숫자(pt/dp). */
  inset?: number | MossyDimensionToken;
  /** E2E 테스트에서 컴포넌트를 찾기 위한 식별자. */
  testID?: string;
  /** 플랫폼 모디파이어 패스스루 (`@expo/ui/swift-ui/modifiers` · `@expo/ui/jetpack-compose/modifiers`). */
  modifiers?: MossyModifier[];
}
