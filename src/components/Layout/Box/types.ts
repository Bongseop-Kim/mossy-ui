import type { ReactNode } from 'react';

import type {
  MossyBackgroundColorToken,
  MossyBannerColorToken,
  MossyDimensionToken,
  MossyStrokeColorToken,
} from '../../../foundation/component-tokens';
import type { MossyTheme } from '../../../foundation/theme';
import type {
  MossyLayoutSurfaceProps,
  MossyLayoutSurfaceRadiusToken,
} from '../surface.shared';

export type MossyBoxRadiusToken = MossyLayoutSurfaceRadiusToken;
export type MossyBoxGradient = keyof MossyTheme['gradient'];
export type MossyBoxBackground = MossyBackgroundColorToken | MossyBannerColorToken | (string & {});
export type MossyBoxBorderColor = MossyStrokeColorToken | (string & {});
export type MossyBoxLength = MossyDimensionToken | 0 | 'full';
export type MossyBoxPadding = MossyDimensionToken | 0;
export type MossyBoxBorderWidth = 0 | 1 | number | `${number}`;
export type MossyBoxShadow = keyof MossyTheme['shadow'];
export type MossyBoxZIndex = number | `${number}`;
export type MossyBoxFlexGrow = 0 | 1 | (number & {}) | true;

export interface MossyBoxSurfaceInput {
  display?: string;
  width?: MossyBoxLength;
  height?: MossyBoxLength;
  minWidth?: MossyBoxLength;
  maxWidth?: MossyBoxLength;
  minHeight?: MossyBoxLength;
  maxHeight?: MossyBoxLength;
  bg?: MossyBoxBackground;
  background?: MossyBoxBackground;
  bgGradient?: MossyBoxGradient;
  backgroundGradient?: MossyBoxGradient;
  bgGradientDirection?: MossyBoxGradientDirection;
  backgroundGradientDirection?: MossyBoxGradientDirection;
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

export interface MossyBoxProps {
  children?: ReactNode;
  bg?: MossyBoxBackground;
  background?: MossyBoxBackground;
  bgGradient?: MossyBoxGradient;
  backgroundGradient?: MossyBoxGradient;
  bgGradientDirection?: MossyBoxGradientDirection;
  backgroundGradientDirection?: MossyBoxGradientDirection;
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
  boxShadow?: MossyBoxShadow;
  width?: MossyBoxLength;
  height?: MossyBoxLength;
  minWidth?: MossyBoxLength;
  maxWidth?: MossyBoxLength;
  minHeight?: MossyBoxLength;
  maxHeight?: MossyBoxLength;
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
  flexGrow?: MossyBoxFlexGrow;
  zIndex?: MossyBoxZIndex;
}

export type MossyBoxGradientDirection =
  | 'to right'
  | 'to left'
  | 'to top'
  | 'to bottom'
  | 'to top right'
  | 'to top left'
  | 'to bottom right'
  | 'to bottom left'
  | `${number}deg`;

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
    backgroundGradient: props.backgroundGradient ?? props.bgGradient,
    backgroundGradientDirection:
      props.backgroundGradientDirection ?? props.bgGradientDirection,
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
