import { MaskedView } from '@expo/ui/community/masked-view';
import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { resolveMossyDimension, type MossyDimensionToken } from '../foundation/component-tokens';
import { useMossyTheme } from '../theme';

type FogEdge = 'top' | 'bottom' | 'left' | 'right';

export type MossyScrollFogProps = ViewProps & {
  /** fog로 가릴 스크롤 영역 — 보통 `Host` + `ScrollView`/`List`. */
  children?: ReactNode;
  /**
   * fog를 표시할 가장자리.
   * @default ['top', 'bottom']
   */
  placement?: FogEdge[];
  /**
   * fog 크기 — dimension 토큰(`'x5'`) 또는 숫자(pt/dp).
   * @default 'x5'
   */
  size?: number | MossyDimensionToken;
  /** 가장자리별 fog 크기 재정의. */
  sizes?: Partial<Record<FogEdge, number | MossyDimensionToken>>;
};

// 가장자리에서 안쪽으로 알파 0 → 1. 마스크는 알파만 사용하므로 색은 무관하다.
const FOG_GRADIENTS: Record<FogEdge, string> = {
  top: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
  bottom: 'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,1))',
  left: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1))',
  right: 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,1))',
};

/**
 * 스크롤 영역 가장자리를 투명하게 페이드해 콘텐츠가 더 있음을 암시하는 fog 오버레이.
 * 알파 마스크 방식(iOS SwiftUI `Mask` · Android Compose `BlendMode.DstIn`)이라
 * 배경색과 무관하게 동작한다.
 *
 * React Native 레이어 컴포넌트다. children에 스크롤 영역을 감싼 `Host`를 통째로
 * 넣는다 (내부적으로 `@expo/ui/community/masked-view`가 자체 `Host`를 생성하는
 * 키트 컴포넌트 Host-free 규칙의 명시적 예외). universal 레이어가 스크롤 이벤트를
 * 노출하지 않으므로 fog는 스크롤 위치와 무관하게 항상 표시되는 정적 효과다.
 */
export function ScrollFog({
  children,
  placement = ['top', 'bottom'],
  size = 'x5',
  sizes,
  ...props
}: MossyScrollFogProps) {
  const theme = useMossyTheme();

  const edgeSize = (edge: FogEdge) =>
    placement.includes(edge) ? (resolveMossyDimension(theme, sizes?.[edge] ?? size) ?? 0) : 0;

  const top = edgeSize('top');
  const bottom = edgeSize('bottom');
  const left = edgeSize('left');
  const right = edgeSize('right');

  const maskElement = (
    <View style={styles.mask}>
      <View style={[styles.center, { top, bottom, left, right }]} />
      {top > 0 ? (
        <View
          style={[styles.top, { height: top, experimental_backgroundImage: FOG_GRADIENTS.top }]}
        />
      ) : null}
      {bottom > 0 ? (
        <View
          style={[
            styles.bottom,
            { height: bottom, experimental_backgroundImage: FOG_GRADIENTS.bottom },
          ]}
        />
      ) : null}
      {left > 0 ? (
        <View
          style={[styles.left, { width: left, experimental_backgroundImage: FOG_GRADIENTS.left }]}
        />
      ) : null}
      {right > 0 ? (
        <View
          style={[
            styles.right,
            { width: right, experimental_backgroundImage: FOG_GRADIENTS.right },
          ]}
        />
      ) : null}
    </View>
  );

  return (
    <MaskedView maskElement={maskElement} {...props}>
      {children}
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  mask: {
    flex: 1,
    pointerEvents: 'none',
  },
  center: {
    position: 'absolute',
    backgroundColor: '#000',
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  left: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  right: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
  },
});
