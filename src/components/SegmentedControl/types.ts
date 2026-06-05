import type { MossyModifier } from '../../foundation/modifier';

export interface MossySegmentedControlProps {
  /** 세그먼트 레이블 목록. 배열 순서가 인덱스가 된다. */
  options: string[];
  /** 선택된 세그먼트 인덱스. */
  selectedIndex: number;
  /** 사용자가 세그먼트를 선택하면 호출된다. */
  onSelectedIndexChange: (index: number) => void;
  /**
   * 비활성화 여부.
   * @default false
   */
  disabled?: boolean;
  /** E2E 테스트에서 컴포넌트를 찾기 위한 식별자. */
  testID?: string;
  /** 플랫폼 모디파이어 패스스루 (`@expo/ui/swift-ui/modifiers` · `@expo/ui/jetpack-compose/modifiers`). */
  modifiers?: MossyModifier[];
}
