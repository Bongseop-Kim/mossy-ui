import { ListItem as ExpoListItem } from '@expo/ui';
import type { ComponentProps } from 'react';

import { Text } from './Typography/Text';

export type MossyListItemProps = ComponentProps<typeof ExpoListItem> & {
  /**
   * headline 텍스트 — `t5Regular`·`fg.neutral` 토큰 스타일로 렌더된다 (seed
   * `list-item` title 스펙). children의 비마커 노드와 함께 headline 영역에 표시된다.
   */
  title?: string;
  /**
   * title 아래 보조 텍스트 — `t3Regular`·`fg.neutralSubtle` 토큰 스타일로
   * supporting 슬롯에 주입된다 (seed `list-item` detail 스펙). `supportingText`
   * prop이나 `<ListItem.Supporting>` 마커가 있으면 그쪽이 우선한다.
   */
  detail?: string;
};

/**
 * 탭 가능한 목록 행. universal `ListItem`의 래퍼 (iOS plain `Button` + 시스템
 * highlight · Android Material 3 `ListItem` + ripple). `List`의 자식으로 사용한다.
 *
 * 텍스트 행은 `title`·`detail` prop으로 토큰 스타일을 적용하고, 커스텀 노드는
 * children 중첩 또는 `leading`·`trailing`·`supportingText` prop,
 * `<ListItem.Leading>` 등 데이터 선언형 마커로 지정한다. 마커 외의 children은
 * headline 영역에 렌더된다.
 */
export const ListItem = Object.assign(
  function ListItem({ title, detail, supportingText, children, ...props }: MossyListItemProps) {
    return (
      <ExpoListItem
        supportingText={
          supportingText ??
          (detail != null ? (
            <Text textStyle="t3Regular" color="fg.neutralSubtle">
              {detail}
            </Text>
          ) : undefined)
        }
        {...props}
      >
        {title != null ? (
          <Text textStyle="t5Regular" color="fg.neutral">
            {title}
          </Text>
        ) : null}
        {children}
      </ExpoListItem>
    );
  },
  {
    // 마커는 expo의 마커를 그대로 재노출한다 — 슬롯 추출이 element type 레퍼런스
    // 비교로 동작하므로 재구현하면 슬롯이 인식되지 않는다.
    Leading: ExpoListItem.Leading,
    Trailing: ExpoListItem.Trailing,
    Supporting: ExpoListItem.Supporting,
  },
);
