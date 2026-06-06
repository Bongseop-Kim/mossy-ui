import { List as SwiftUIList } from '@expo/ui/swift-ui';
import {
  listRowInsets,
  listSectionMargins,
  listStyle,
  refreshable,
  scrollContentBackground,
  type ModifierConfig,
} from '@expo/ui/swift-ui/modifiers';
import type { ComponentProps } from 'react';

const zeroListInset = 0.01;

export type MossyListProps = ComponentProps<typeof SwiftUIList> & {
  /**
   * Pull-to-refresh handler. 기존 universal `List` iOS 동작과 동일하게
   * SwiftUI `.refreshable`로 연결한다.
   */
  onRefresh?: () => Promise<void>;
};

const defaultModifiers = [
  listStyle('plain'),
  scrollContentBackground('hidden'),
  listSectionMargins({ length: 0, edges: 'all' }),
  listRowInsets({
    top: zeroListInset,
    leading: zeroListInset,
    bottom: zeroListInset,
    trailing: zeroListInset,
  }),
];

/**
 * 세로 행 목록 컨테이너. iOS에서는 SwiftUI `List` 기본 grouped/inset 외곽을
 * modifier로 제거해 부모 폭에 맞춰 렌더한다.
 */
export function List({ modifiers, onRefresh, ...props }: MossyListProps) {
  const resolvedModifiers: ModifierConfig[] = [
    ...defaultModifiers,
    ...(onRefresh ? [refreshable(onRefresh)] : []),
    ...(modifiers ?? []),
  ];

  return <SwiftUIList modifiers={resolvedModifiers} {...props} />;
}
