import type { UniversalStyle } from '@expo/ui';

import type {
  MossyBackgroundColorToken,
  MossyDimensionToken,
  MossyStrokeColorToken,
} from '../../foundation/component-tokens';
import { resolveMossyColor, resolveMossyDimension } from '../../foundation/component-tokens';
import type { MossyModifier } from '../../foundation/modifier';
import type { MossyTheme } from '../../foundation/theme';
import type { MossyGradient } from '../../foundation/types';

export type MossyLayoutSurfaceRadiusToken = keyof MossyTheme['radius'];
export type MossyLayoutSurfaceDimension = number | MossyDimensionToken;
export type MossyLayoutSurfaceGradientToken = keyof MossyTheme['gradient'];
export type MossyLayoutSurfaceGradientDirection =
  | 'to right'
  | 'to left'
  | 'to top'
  | 'to bottom'
  | 'to top right'
  | 'to top left'
  | 'to bottom right'
  | 'to bottom left'
  | `${number}deg`;

export const EMPTY_MODIFIERS: MossyModifier[] = [];

export interface MossyLayoutSurfaceStyle extends UniversalStyle {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  backgroundGradient?: MossyGradient;
  backgroundGradientDirection?: MossyLayoutSurfaceGradientDirection;
  borderTopWidth?: number;
  borderRightWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomRightRadius?: number;
  borderBottomLeftRadius?: number;
}

export interface MossyLayoutSurfaceProps {
  /**
   * 렌더 여부. `'none'`이면 네이티브 뷰를 렌더하지 않는다.
   * @default 'flex'
   */
  display?: 'flex' | 'none';
  /** 고정 너비 — dimension 토큰(`'x10'`) 또는 숫자(pt/dp). */
  width?: MossyLayoutSurfaceDimension;
  /** 고정 높이 — dimension 토큰(`'x10'`) 또는 숫자(pt/dp). */
  height?: MossyLayoutSurfaceDimension;
  /** 최소 너비 — dimension 토큰(`'x10'`) 또는 숫자(pt/dp). */
  minWidth?: MossyLayoutSurfaceDimension;
  /** 최대 너비 — dimension 토큰(`'x10'`) 또는 숫자(pt/dp). */
  maxWidth?: MossyLayoutSurfaceDimension;
  /** 최소 높이 — dimension 토큰(`'x10'`) 또는 숫자(pt/dp). */
  minHeight?: MossyLayoutSurfaceDimension;
  /** 최대 높이 — dimension 토큰(`'x10'`) 또는 숫자(pt/dp). */
  maxHeight?: MossyLayoutSurfaceDimension;
  /** 전체 안쪽 여백 — dimension 토큰(`'x4'`) 또는 숫자(pt/dp). */
  padding?: MossyLayoutSurfaceDimension;
  /** 가로 안쪽 여백 — dimension 토큰(`'x4'`) 또는 숫자(pt/dp). */
  paddingHorizontal?: MossyLayoutSurfaceDimension;
  /** 세로 안쪽 여백 — dimension 토큰(`'x4'`) 또는 숫자(pt/dp). */
  paddingVertical?: MossyLayoutSurfaceDimension;
  /** 위쪽 안쪽 여백 — dimension 토큰(`'x4'`) 또는 숫자(pt/dp). */
  paddingTop?: MossyLayoutSurfaceDimension;
  /** 아래쪽 안쪽 여백 — dimension 토큰(`'x4'`) 또는 숫자(pt/dp). */
  paddingBottom?: MossyLayoutSurfaceDimension;
  /** 시작 방향 안쪽 여백 — dimension 토큰(`'x4'`) 또는 숫자(pt/dp). */
  paddingStart?: MossyLayoutSurfaceDimension;
  /** 끝 방향 안쪽 여백 — dimension 토큰(`'x4'`) 또는 숫자(pt/dp). */
  paddingEnd?: MossyLayoutSurfaceDimension;
  /** 배경 색상 토큰 또는 원시 색상값. */
  backgroundColor?: MossyBackgroundColorToken | (string & {});
  /** 배경 그라디언트 토큰. 방향과 함께 지정해야 렌더된다. */
  backgroundGradient?: MossyLayoutSurfaceGradientToken;
  /** 배경 그라디언트 방향. */
  backgroundGradientDirection?: MossyLayoutSurfaceGradientDirection;
  /** 테두리 색상 토큰 또는 원시 색상값. */
  borderColor?: MossyStrokeColorToken | (string & {});
  /** 테두리 두께 — dimension 토큰(`'x0_5'`) 또는 숫자(pt/dp). */
  borderWidth?: MossyLayoutSurfaceDimension;
  /** 위쪽 테두리 두께 — dimension 토큰(`'x0_5'`) 또는 숫자(pt/dp). */
  borderTopWidth?: MossyLayoutSurfaceDimension;
  /** 오른쪽 테두리 두께 — dimension 토큰(`'x0_5'`) 또는 숫자(pt/dp). */
  borderRightWidth?: MossyLayoutSurfaceDimension;
  /** 아래쪽 테두리 두께 — dimension 토큰(`'x0_5'`) 또는 숫자(pt/dp). */
  borderBottomWidth?: MossyLayoutSurfaceDimension;
  /** 왼쪽 테두리 두께 — dimension 토큰(`'x0_5'`) 또는 숫자(pt/dp). */
  borderLeftWidth?: MossyLayoutSurfaceDimension;
  /** 모서리 반경 — radius 토큰(`'r2'`) 또는 숫자(pt/dp). */
  radius?: number | MossyLayoutSurfaceRadiusToken;
  /** 시작 위 모서리 반경 — radius 토큰(`'r2'`) 또는 숫자(pt/dp). */
  topStartRadius?: number | MossyLayoutSurfaceRadiusToken;
  /** 끝 위 모서리 반경 — radius 토큰(`'r2'`) 또는 숫자(pt/dp). */
  topEndRadius?: number | MossyLayoutSurfaceRadiusToken;
  /** 끝 아래 모서리 반경 — radius 토큰(`'r2'`) 또는 숫자(pt/dp). */
  bottomEndRadius?: number | MossyLayoutSurfaceRadiusToken;
  /** 시작 아래 모서리 반경 — radius 토큰(`'r2'`) 또는 숫자(pt/dp). */
  bottomStartRadius?: number | MossyLayoutSurfaceRadiusToken;
  /** 투명도. */
  opacity?: number;
  /** 탭했을 때 호출할 핸들러. */
  onPress?: () => void;
  /** iOS에서 화면에 나타날 때 호출할 핸들러. */
  onAppear?: () => void;
  /** iOS에서 화면에서 사라질 때 호출할 핸들러. */
  onDisappear?: () => void;
  /** 비활성 상태. */
  disabled?: boolean;
  /** 숨김 상태. */
  hidden?: boolean;
  /** E2E 테스트에서 컴포넌트를 찾기 위한 식별자. */
  testID?: string;
  /** 플랫폼 모디파이어 패스스루 (`@expo/ui/swift-ui/modifiers` · `@expo/ui/jetpack-compose/modifiers`). */
  modifiers?: MossyModifier[];
}

function resolveSurfaceColor(theme: MossyTheme, color: string | undefined) {
  if (color == null) return undefined;
  return resolveMossyColor(theme, color) ?? color;
}

export function shouldRenderLayoutSurface(display: string | undefined) {
  return display !== 'none';
}

export function resolveMossyLayoutSurfaceStyle(
  theme: MossyTheme,
  props: MossyLayoutSurfaceProps,
): MossyLayoutSurfaceStyle | undefined {
  const style: MossyLayoutSurfaceStyle = {};
  const width = resolveMossyDimension(theme, props.width);
  const height = resolveMossyDimension(theme, props.height);
  const minWidth = resolveMossyDimension(theme, props.minWidth);
  const maxWidth = resolveMossyDimension(theme, props.maxWidth);
  const minHeight = resolveMossyDimension(theme, props.minHeight);
  const maxHeight = resolveMossyDimension(theme, props.maxHeight);
  const padding = resolveMossyDimension(theme, props.padding);
  const paddingHorizontal = resolveMossyDimension(theme, props.paddingHorizontal);
  const paddingVertical = resolveMossyDimension(theme, props.paddingVertical);
  const paddingTop = resolveMossyDimension(theme, props.paddingTop);
  const paddingBottom = resolveMossyDimension(theme, props.paddingBottom);
  const paddingLeft = resolveMossyDimension(theme, props.paddingStart);
  const paddingRight = resolveMossyDimension(theme, props.paddingEnd);
  const backgroundColor = resolveSurfaceColor(theme, props.backgroundColor);
  const borderColor = resolveSurfaceColor(theme, props.borderColor);
  const borderWidth = resolveMossyDimension(theme, props.borderWidth);
  const borderTopWidth = resolveMossyDimension(theme, props.borderTopWidth);
  const borderRightWidth = resolveMossyDimension(theme, props.borderRightWidth);
  const borderBottomWidth = resolveMossyDimension(theme, props.borderBottomWidth);
  const borderLeftWidth = resolveMossyDimension(theme, props.borderLeftWidth);
  const borderRadius = typeof props.radius === 'string' ? theme.radius[props.radius] : props.radius;
  const borderTopLeftRadius = resolveMossyRadius(theme, props.topStartRadius);
  const borderTopRightRadius = resolveMossyRadius(theme, props.topEndRadius);
  const borderBottomRightRadius = resolveMossyRadius(theme, props.bottomEndRadius);
  const borderBottomLeftRadius = resolveMossyRadius(theme, props.bottomStartRadius);

  if (width != null) style.width = width;
  if (height != null) style.height = height;
  if (minWidth != null) style.minWidth = minWidth;
  if (maxWidth != null) style.maxWidth = maxWidth;
  if (minHeight != null) style.minHeight = minHeight;
  if (maxHeight != null) style.maxHeight = maxHeight;
  if (padding != null) style.padding = padding;
  if (paddingHorizontal != null) style.paddingHorizontal = paddingHorizontal;
  if (paddingVertical != null) style.paddingVertical = paddingVertical;
  if (paddingTop != null) style.paddingTop = paddingTop;
  if (paddingBottom != null) style.paddingBottom = paddingBottom;
  if (paddingLeft != null) style.paddingLeft = paddingLeft;
  if (paddingRight != null) style.paddingRight = paddingRight;
  if (backgroundColor != null) style.backgroundColor = backgroundColor;
  if (props.backgroundGradient != null && props.backgroundGradientDirection != null) {
    style.backgroundGradient = theme.gradient[props.backgroundGradient];
    style.backgroundGradientDirection = props.backgroundGradientDirection;
  }
  if (borderColor != null) style.borderColor = borderColor;
  if (borderWidth != null) style.borderWidth = borderWidth;
  if (borderTopWidth != null) style.borderTopWidth = borderTopWidth;
  if (borderRightWidth != null) style.borderRightWidth = borderRightWidth;
  if (borderBottomWidth != null) style.borderBottomWidth = borderBottomWidth;
  if (borderLeftWidth != null) style.borderLeftWidth = borderLeftWidth;
  if (borderRadius != null) style.borderRadius = borderRadius;
  if (borderTopLeftRadius != null) style.borderTopLeftRadius = borderTopLeftRadius;
  if (borderTopRightRadius != null) style.borderTopRightRadius = borderTopRightRadius;
  if (borderBottomRightRadius != null) style.borderBottomRightRadius = borderBottomRightRadius;
  if (borderBottomLeftRadius != null) style.borderBottomLeftRadius = borderBottomLeftRadius;
  if (props.opacity != null) style.opacity = props.opacity;

  return Object.keys(style).length === 0 ? undefined : style;
}

function resolveMossyRadius(
  theme: MossyTheme,
  radius: MossyLayoutSurfaceProps['radius'] | undefined,
) {
  return typeof radius === 'string' ? theme.radius[radius] : radius;
}
