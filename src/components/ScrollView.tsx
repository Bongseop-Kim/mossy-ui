import { ScrollView as ExpoScrollView } from '@expo/ui';
import type { ComponentProps } from 'react';

import { resolveMossyDimension, type MossyDimensionToken } from '../foundation/component-tokens';
import { useMossyTheme } from '../theme';

type ExpoScrollViewProps = ComponentProps<typeof ExpoScrollView>;

type PaddingKey =
  | 'padding'
  | 'paddingHorizontal'
  | 'paddingVertical'
  | 'paddingTop'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingRight';

export type MossyScrollViewProps = Omit<ExpoScrollViewProps, 'style'> & {
  /** 패딩 키를 제외한 universal 스타일 — 패딩은 토큰 prop으로 받는다. */
  style?: Omit<NonNullable<ExpoScrollViewProps['style']>, PaddingKey>;
  /** 콘텐츠 패딩 — dimension 토큰(`'x4'`) 또는 숫자(pt/dp). */
  padding?: number | MossyDimensionToken;
  /** 좌우 콘텐츠 패딩. */
  paddingHorizontal?: number | MossyDimensionToken;
  /** 상하 콘텐츠 패딩. */
  paddingVertical?: number | MossyDimensionToken;
  /** 위 콘텐츠 패딩. */
  paddingTop?: number | MossyDimensionToken;
  /** 아래 콘텐츠 패딩. */
  paddingBottom?: number | MossyDimensionToken;
  /** 왼쪽 콘텐츠 패딩. */
  paddingLeft?: number | MossyDimensionToken;
  /** 오른쪽 콘텐츠 패딩. */
  paddingRight?: number | MossyDimensionToken;
};

/**
 * 스크롤 컨테이너. universal `ScrollView`의 래퍼 (iOS SwiftUI `ScrollView` · Android
 * `Column`/`Row` + scroll modifier). 외부 `Host` 안에서 렌더해야 한다.
 *
 * 행 데이터 목록에는 자체 스크롤·가상화를 가진 `List`를 사용하고, `ScrollView` 안에
 * `List`를 중첩하지 않는다.
 */
export function ScrollView({
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  style,
  ...props
}: MossyScrollViewProps) {
  const theme = useMossyTheme();

  return (
    <ExpoScrollView
      style={{
        ...style,
        padding: resolveMossyDimension(theme, padding),
        paddingHorizontal: resolveMossyDimension(theme, paddingHorizontal),
        paddingVertical: resolveMossyDimension(theme, paddingVertical),
        paddingTop: resolveMossyDimension(theme, paddingTop),
        paddingBottom: resolveMossyDimension(theme, paddingBottom),
        paddingLeft: resolveMossyDimension(theme, paddingLeft),
        paddingRight: resolveMossyDimension(theme, paddingRight),
      }}
      {...props}
    />
  );
}
