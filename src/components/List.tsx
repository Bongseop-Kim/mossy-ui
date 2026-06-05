import { List as ExpoList } from '@expo/ui';
import type { ComponentProps } from 'react';

export type MossyListProps = ComponentProps<typeof ExpoList>;

/**
 * 세로 행 목록 컨테이너. universal `List`의 래퍼 (iOS SwiftUI `List` · Android
 * `LazyColumn`). 외부 `Host` 안에서 렌더해야 한다.
 *
 * 자체 스크롤과 가상화를 내장하므로 `ScrollView` 안에 중첩하지 않는다. 임의 콘텐츠
 * 스크롤에는 `ScrollView`를, 행 데이터 목록·pull-to-refresh에는 `List`를 사용한다.
 */
export function List(props: MossyListProps) {
  return <ExpoList {...props} />;
}
