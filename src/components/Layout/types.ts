import type { Alignment } from '@expo/ui/swift-ui';

/** 9방향 정렬 위치. jetpack-compose `ContentAlignment` 명명을 따른다. */
export type MossyAlignment =
  | 'topStart'
  | 'topCenter'
  | 'topEnd'
  | 'centerStart'
  | 'center'
  | 'centerEnd'
  | 'bottomStart'
  | 'bottomCenter'
  | 'bottomEnd';

type SwiftUIBaseAlignment = Extract<
  Alignment,
  | 'center'
  | 'leading'
  | 'trailing'
  | 'top'
  | 'bottom'
  | 'topLeading'
  | 'topTrailing'
  | 'bottomLeading'
  | 'bottomTrailing'
>;

/** `MossyAlignment` → SwiftUI `Alignment` 매핑. Compose는 `ContentAlignment`를 그대로 사용한다. */
export const swiftUIAlignment: Record<MossyAlignment, SwiftUIBaseAlignment> = {
  topStart: 'topLeading',
  topCenter: 'top',
  topEnd: 'topTrailing',
  centerStart: 'leading',
  center: 'center',
  centerEnd: 'trailing',
  bottomStart: 'bottomLeading',
  bottomCenter: 'bottom',
  bottomEnd: 'bottomTrailing',
};
