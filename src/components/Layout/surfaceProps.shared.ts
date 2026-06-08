import type {
  MossyBackgroundColorToken,
  MossyBannerColorToken,
  MossyDimensionToken,
  MossyStrokeColorToken,
} from '../../foundation/component-tokens';
import type { MossyModifier } from '../../foundation/modifier';
import type { MossyTheme } from '../../foundation/theme';
import type {
  MossyLayoutSurfaceGradientDirection,
  MossyLayoutSurfaceProps,
  MossyLayoutSurfaceRadiusToken,
} from './surface.shared';

export type MossyLayoutRadiusToken = MossyLayoutSurfaceRadiusToken;
export type MossyLayoutGradient = keyof MossyTheme['gradient'];
export type MossyLayoutGradientDirection = MossyLayoutSurfaceGradientDirection;
export type MossyLayoutBackground = MossyBackgroundColorToken | MossyBannerColorToken | (string & {});
export type MossyLayoutBorderColor = MossyStrokeColorToken | (string & {});
export type MossyLayoutLength = number | MossyDimensionToken | 'full';
export type MossyLayoutPadding = number | MossyDimensionToken;
export type MossyLayoutBorderWidth = 0 | 1 | number | `${number}`;
export type MossyLayoutShadow = keyof MossyTheme['shadow'];
export type MossyLayoutZIndex = number | `${number}`;
export type MossyLayoutFlexGrow = 0 | 1 | (number & {}) | true;

/** 모든 레이아웃 컨테이너가 공유하는 커스터마이징 통로 (E2E 식별자·플랫폼 모디파이어 패스스루). */
export interface MossyLayoutCustomizationProps {
  /** E2E 테스트에서 컴포넌트를 찾기 위한 식별자. iOS는 prop, Android는 modifier로 전달된다. */
  testID?: string;
  /** 플랫폼 모디파이어 패스스루. 내부 modifier 뒤에 적용되어 덮어쓸 수 있다. */
  modifiers?: MossyModifier[];
}

export interface MossyLayoutPaddingProps {
  padding?: MossyLayoutPadding;
  p?: MossyLayoutPadding;
  paddingX?: MossyLayoutPadding;
  px?: MossyLayoutPadding;
  paddingY?: MossyLayoutPadding;
  py?: MossyLayoutPadding;
  paddingTop?: MossyLayoutPadding;
  pt?: MossyLayoutPadding;
  paddingRight?: MossyLayoutPadding;
  pr?: MossyLayoutPadding;
  paddingBottom?: MossyLayoutPadding;
  pb?: MossyLayoutPadding;
  paddingLeft?: MossyLayoutPadding;
  pl?: MossyLayoutPadding;
}

export interface MossyLayoutBackgroundProps {
  bg?: MossyLayoutBackground;
  background?: MossyLayoutBackground;
  bgGradient?: MossyLayoutGradient;
  backgroundGradient?: MossyLayoutGradient;
  bgGradientDirection?: MossyLayoutGradientDirection;
  backgroundGradientDirection?: MossyLayoutGradientDirection;
}

export interface MossyLayoutBorderProps {
  borderColor?: MossyLayoutBorderColor;
  borderWidth?: MossyLayoutBorderWidth;
  borderTopWidth?: MossyLayoutBorderWidth;
  borderRightWidth?: MossyLayoutBorderWidth;
  borderBottomWidth?: MossyLayoutBorderWidth;
  borderLeftWidth?: MossyLayoutBorderWidth;
  borderRadius?: MossyLayoutRadiusToken | 0;
  borderTopLeftRadius?: MossyLayoutRadiusToken | 0;
  borderTopRightRadius?: MossyLayoutRadiusToken | 0;
  borderBottomRightRadius?: MossyLayoutRadiusToken | 0;
  borderBottomLeftRadius?: MossyLayoutRadiusToken | 0;
}

export interface MossyLayoutSurfaceInput
  extends MossyLayoutPaddingProps,
    MossyLayoutBackgroundProps,
    MossyLayoutBorderProps,
    MossyLayoutCustomizationProps {
  display?: string;
  width?: MossyLayoutLength;
  height?: MossyLayoutLength;
  minWidth?: MossyLayoutLength;
  maxWidth?: MossyLayoutLength;
  minHeight?: MossyLayoutLength;
  maxHeight?: MossyLayoutLength;
}

export function isFullLayoutLength(value: MossyLayoutLength | undefined) {
  return value === 'full';
}

export function toMossyLayoutSurfaceProps(props: MossyLayoutSurfaceInput): MossyLayoutSurfaceProps {
  return {
    display: props.display === 'none' ? 'none' : 'flex',
    width: isFullLayoutLength(props.width) ? undefined : props.width,
    height: isFullLayoutLength(props.height) ? undefined : props.height,
    minWidth: isFullLayoutLength(props.minWidth) ? undefined : props.minWidth,
    maxWidth: isFullLayoutLength(props.maxWidth) ? undefined : props.maxWidth,
    minHeight: isFullLayoutLength(props.minHeight) ? undefined : props.minHeight,
    maxHeight: isFullLayoutLength(props.maxHeight) ? undefined : props.maxHeight,
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
    borderWidth: resolveLayoutBorderWidth(props.borderWidth),
    borderTopWidth: resolveLayoutBorderWidth(props.borderTopWidth),
    borderRightWidth: resolveLayoutBorderWidth(props.borderRightWidth),
    borderBottomWidth: resolveLayoutBorderWidth(props.borderBottomWidth),
    borderLeftWidth: resolveLayoutBorderWidth(props.borderLeftWidth),
    radius: props.borderRadius,
    topStartRadius: props.borderTopLeftRadius,
    topEndRadius: props.borderTopRightRadius,
    bottomEndRadius: props.borderBottomRightRadius,
    bottomStartRadius: props.borderBottomLeftRadius,
    testID: props.testID,
    modifiers: props.modifiers,
  };
}

export function resolveLayoutZIndex(value: MossyLayoutZIndex | undefined) {
  if (value == null) return undefined;

  const resolved = Number(value);
  return Number.isNaN(resolved) ? undefined : resolved;
}

export function normalizeLayoutFlexGrow(value: MossyLayoutFlexGrow | undefined) {
  if (value === true) return 1;
  if (value == null || value <= 0 || !Number.isFinite(value)) return undefined;
  return value;
}

function resolveLayoutBorderWidth(value: MossyLayoutBorderWidth | undefined) {
  if (value == null) return undefined;

  const resolved = Number(value);
  return Number.isNaN(resolved) ? undefined : resolved;
}
