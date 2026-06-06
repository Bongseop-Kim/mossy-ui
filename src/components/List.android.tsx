import { LazyColumn, PullToRefreshBox } from '@expo/ui/jetpack-compose';
import { testID as testIDModifier, type ModifierConfig } from '@expo/ui/jetpack-compose/modifiers';
import { useState, type ReactNode } from 'react';

export type MossyListProps = {
  /** 목록 행. 보통 `<ListItem>`을 배치한다. */
  children?: ReactNode;
  /**
   * Pull-to-refresh handler. Android에서는 `PullToRefreshBox`로 연결한다.
   */
  onRefresh?: () => Promise<void>;
  /** E2E 테스트 식별자. */
  testID?: string;
};

const flushContentPadding = {
  start: 0,
  top: 0,
  end: 0,
  bottom: 0,
};

/**
 * 세로 행 목록 컨테이너. Android에서는 `LazyColumn` contentPadding을 0으로 고정해
 * 부모 폭에 맞춰 렌더한다.
 */
export function List({ children, onRefresh, testID }: MossyListProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const modifiers: ModifierConfig[] | undefined = testID ? [testIDModifier(testID)] : undefined;

  async function handleRefresh() {
    if (!onRefresh) return;

    setIsRefreshing(true);
    await onRefresh().finally(() => {
      setIsRefreshing(false);
    });
  }

  const list = (
    <LazyColumn contentPadding={flushContentPadding} modifiers={modifiers}>
      {children}
    </LazyColumn>
  );

  if (!onRefresh) {
    return list;
  }

  return (
    <PullToRefreshBox
      contentAlignment="topCenter"
      isRefreshing={isRefreshing}
      onRefresh={handleRefresh}
    >
      {list}
    </PullToRefreshBox>
  );
}
