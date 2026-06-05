import type { MossySegmentedControlProps } from './types';

/** iOS(SwiftUI `Picker`)·Android(Material 3 `SegmentedButton`) 전용 — 웹은 지원 범위 밖이라 렌더하지 않는다. */
export function SegmentedControl(_props: MossySegmentedControlProps) {
  return null;
}

export * from './types';
