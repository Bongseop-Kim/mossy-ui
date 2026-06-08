import type { ReactNode } from 'react';

import type {
  MossyBackgroundColorToken,
  MossyBannerColorToken,
  MossyDimensionToken,
  MossyStrokeColorToken,
} from '../../../foundation/component-tokens';
import type { MossyModifier } from '../../../foundation/modifier';
import type { MossyTheme } from '../../../foundation/theme';
import type {
  MossyLayoutSurfaceGradientDirection,
  MossyLayoutSurfaceProps,
  MossyLayoutSurfaceRadiusToken,
} from '../surface.shared';

export type MossyBoxRadiusToken = MossyLayoutSurfaceRadiusToken;
export type MossyBoxGradient = keyof MossyTheme['gradient'];
export type MossyBoxGradientDirection = MossyLayoutSurfaceGradientDirection;
export type MossyBoxBackground = MossyBackgroundColorToken | MossyBannerColorToken | (string & {});
export type MossyBoxBorderColor = MossyStrokeColorToken | (string & {});
export type MossyBoxLength = number | MossyDimensionToken | 'full';
export type MossyBoxPadding = number | MossyDimensionToken;
export type MossyBoxBorderWidth = 0 | 1 | number | `${number}`;
export type MossyBoxShadow = keyof MossyTheme['shadow'];
export type MossyBoxZIndex = number | `${number}`;
export type MossyBoxFlexGrow = 0 | 1 | (number & {}) | true;

/** 모든 레이아웃 컨테이너가 공유하는 커스터마이징 통로 (E2E 식별자·플랫폼 모디파이어 패스스루). */
export interface MossyLayoutCustomizationProps {
  /** E2E 테스트에서 컴포넌트를 찾기 위한 식별자. iOS는 prop, Android는 modifier로 전달된다. */
  testID?: string;
  /** 플랫폼 모디파이어 패스스루. 내부 modifier 뒤에 적용되어 덮어쓸 수 있다. */
  modifiers?: MossyModifier[];
}

export interface MossyBoxPaddingProps {
  padding?: MossyBoxPadding;
  p?: MossyBoxPadding;
  paddingX?: MossyBoxPadding;
  px?: MossyBoxPadding;
  paddingY?: MossyBoxPadding;
  py?: MossyBoxPadding;
  paddingTop?: MossyBoxPadding;
  pt?: MossyBoxPadding;
  paddingRight?: MossyBoxPadding;
  pr?: MossyBoxPadding;
  paddingBottom?: MossyBoxPadding;
  pb?: MossyBoxPadding;
  paddingLeft?: MossyBoxPadding;
  pl?: MossyBoxPadding;
}

export interface MossyBoxBackgroundProps {
  bg?: MossyBoxBackground;
  background?: MossyBoxBackground;
  bgGradient?: MossyBoxGradient;
  backgroundGradient?: MossyBoxGradient;
  bgGradientDirection?: MossyBoxGradientDirection;
  backgroundGradientDirection?: MossyBoxGradientDirection;
}

export interface MossyBoxBorderProps {
  borderColor?: MossyBoxBorderColor;
  borderWidth?: MossyBoxBorderWidth;
  borderTopWidth?: MossyBoxBorderWidth;
  borderRightWidth?: MossyBoxBorderWidth;
  borderBottomWidth?: MossyBoxBorderWidth;
  borderLeftWidth?: MossyBoxBorderWidth;
  borderRadius?: MossyBoxRadiusToken | 0;
  borderTopLeftRadius?: MossyBoxRadiusToken | 0;
  borderTopRightRadius?: MossyBoxRadiusToken | 0;
  borderBottomRightRadius?: MossyBoxRadiusToken | 0;
  borderBottomLeftRadius?: MossyBoxRadiusToken | 0;
}

export interface MossyBoxSurfaceInput
  extends MossyBoxPaddingProps,
    MossyBoxBackgroundProps,
    MossyBoxBorderProps,
    MossyLayoutCustomizationProps {
  display?: string;
  width?: MossyBoxLength;
  height?: MossyBoxLength;
  minWidth?: MossyBoxLength;
  maxWidth?: MossyBoxLength;
  minHeight?: MossyBoxLength;
  maxHeight?: MossyBoxLength;
}

export interface MossyBoxProps
  extends MossyBoxPaddingProps,
    MossyBoxBackgroundProps,
    MossyBoxBorderProps,
    MossyLayoutCustomizationProps {
  children?: ReactNode;
  boxShadow?: MossyBoxShadow;
  width?: MossyBoxLength;
  height?: MossyBoxLength;
  minWidth?: MossyBoxLength;
  maxWidth?: MossyBoxLength;
  minHeight?: MossyBoxLength;
  maxHeight?: MossyBoxLength;
  flexGrow?: MossyBoxFlexGrow;
  zIndex?: MossyBoxZIndex;
}

export function isFullBoxLength(value: MossyBoxLength | undefined) {
  return value === 'full';
}

export function toMossyBoxSurfaceProps(props: MossyBoxSurfaceInput): MossyLayoutSurfaceProps {
  return {
    display: props.display === 'none' ? 'none' : 'flex',
    width: isFullBoxLength(props.width) ? undefined : props.width,
    height: isFullBoxLength(props.height) ? undefined : props.height,
    minWidth: isFullBoxLength(props.minWidth) ? undefined : props.minWidth,
    maxWidth: isFullBoxLength(props.maxWidth) ? undefined : props.maxWidth,
    minHeight: isFullBoxLength(props.minHeight) ? undefined : props.minHeight,
    maxHeight: isFullBoxLength(props.maxHeight) ? undefined : props.maxHeight,
    padding: props.padding ?? props.p,
    paddingHorizontal: props.paddingX ?? props.px,
    paddingVertical: props.paddingY ?? props.py,
    paddingTop: props.paddingTop ?? props.pt,
    paddingBottom: props.paddingBottom ?? props.pb,
    paddingStart: props.paddingLeft ?? props.pl,
    paddingEnd: props.paddingRight ?? props.pr,
    backgroundColor: props.background ?? props.bg,
    // Seed useStyleProps와 동일하게 bg- 단축형이 long-form보다 우선한다.
    backgroundGradient: props.bgGradient ?? props.backgroundGradient,
    backgroundGradientDirection:
      props.bgGradientDirection ?? props.backgroundGradientDirection,
    borderColor: props.borderColor,
    borderWidth: resolveBoxBorderWidth(props.borderWidth),
    borderTopWidth: resolveBoxBorderWidth(props.borderTopWidth),
    borderRightWidth: resolveBoxBorderWidth(props.borderRightWidth),
    borderBottomWidth: resolveBoxBorderWidth(props.borderBottomWidth),
    borderLeftWidth: resolveBoxBorderWidth(props.borderLeftWidth),
    radius: props.borderRadius,
    topStartRadius: props.borderTopLeftRadius,
    topEndRadius: props.borderTopRightRadius,
    bottomEndRadius: props.borderBottomRightRadius,
    bottomStartRadius: props.borderBottomLeftRadius,
    testID: props.testID,
    modifiers: props.modifiers,
  };
}

export function resolveBoxZIndex(value: MossyBoxZIndex | undefined) {
  if (value == null) return undefined;

  const resolved = Number(value);
  return Number.isNaN(resolved) ? undefined : resolved;
}

export function normalizeBoxFlexGrow(value: MossyBoxFlexGrow | undefined) {
  if (value === true) return 1;
  if (value == null || value <= 0 || !Number.isFinite(value)) return undefined;
  return value;
}

function resolveBoxBorderWidth(value: MossyBoxBorderWidth | undefined) {
  if (value == null) return undefined;

  const resolved = Number(value);
  return Number.isNaN(resolved) ? undefined : resolved;
}
