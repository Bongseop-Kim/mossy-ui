import { Icon as ExpoIcon } from '@expo/ui';
import type { ComponentProps } from 'react';
import type { OpaqueColorValue } from 'react-native';

import {
  resolveMossyColor,
  resolveMossyDimension,
  type MossyColorToken,
  type MossyDimensionToken,
} from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';

export type MossyIconProps = Omit<ComponentProps<typeof ExpoIcon>, 'color' | 'size'> & {
  /** 아이콘 색상 — 토큰(`fg.*` · `palette.*`) 또는 원시 ColorValue. */
  color?: MossyColorToken | (string & {}) | OpaqueColorValue;
  /**
   * 아이콘 크기 — dimension 토큰(`'x6'`) 또는 숫자(pt/dp).
   * @default 'x6'
   */
  size?: number | MossyDimensionToken;
};

/** 플랫폼 네이티브 아이콘. universal `Icon`의 래퍼. 기본 크기는 iconography 가이드의 `x6`(24). */
export function Icon({ size = 'x6', color, ...props }: MossyIconProps) {
  const theme = useMossyTheme();
  const resolvedColor =
    typeof color === 'string' ? (resolveMossyColor(theme, color) ?? color) : color;

  return <ExpoIcon size={resolveMossyDimension(theme, size)} color={resolvedColor} {...props} />;
}

/**
 * 플랫폼별 아이콘 소스 선택. universal `Icon.select`에 위임한다.
 * 주의: `@expo/ui/babel-plugin`의 플랫폼별 에셋 트리셰이킹은 `@expo/ui`에서 직접 import한
 * `Icon.select` 호출에만 적용된다. 번들 크기가 중요하면 select는 `@expo/ui`의 것을 직접 사용한다.
 */
// @expo/ui와 동일한 정적 멤버 패턴 — 모듈 미사용 시 함께 제거되므로 DCE를 막지 않는다.
Icon.select = ExpoIcon.select;
