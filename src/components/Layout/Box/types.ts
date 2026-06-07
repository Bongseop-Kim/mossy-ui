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
export type MossyBoxBackground = MossyBackgroundColorToken | MossyBannerColorToken | (string & {});
export type MossyBoxBorderColor = MossyStrokeColorToken | (string & {});
export type MossyBoxLength = MossyDimensionToken | 0 | 'full';
export type MossyBoxPadding = MossyDimensionToken | 0;
export type MossyBoxBorderWidth = 0 | 1 | number | `${number}`;
export type MossyBoxShadow = keyof MossyTheme['shadow'];
export type MossyBoxZIndex = number | `${number}`;

export interface MossyBoxSurfaceInput {
  display?: string;
  width?: MossyBoxLength;
  height?: MossyBoxLength;
  bg?: MossyBoxBackground;
  background?: MossyBoxBackground;
  borderColor?: MossyBoxBorderColor;
  borderWidth?: MossyBoxBorderWidth;
  borderRadius?: MossyBoxRadiusToken | 0;
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
  borderColor?: MossyBoxBorderColor;
  borderWidth?: MossyBoxBorderWidth;
  borderRadius?: MossyBoxRadiusToken | 0;
  boxShadow?: MossyBoxShadow;
  width?: MossyBoxLength;
  height?: MossyBoxLength;
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
  display?: 'block' | 'flex' | 'inline-flex' | 'inline' | 'inline-block' | 'none' | 'inlineFlex' | 'inlineBlock';
  zIndex?: MossyBoxZIndex;
}

export function shouldRenderBox(display: MossyBoxProps['display']) {
  return display !== 'none';
}

export function isFullBoxLength(value: MossyBoxLength | undefined) {
  return value === 'full';
}

export function toMossyBoxSurfaceProps(props: MossyBoxSurfaceInput): MossyLayoutSurfaceProps {
  return {
    display: props.display === 'none' ? 'none' : 'flex',
    width: isFullBoxLength(props.width) ? undefined : props.width,
    height: isFullBoxLength(props.height) ? undefined : props.height,
    padding: props.padding ?? props.p,
    paddingHorizontal: props.paddingX ?? props.px,
    paddingVertical: props.paddingY ?? props.py,
    paddingTop: props.paddingTop ?? props.pt,
    paddingBottom: props.paddingBottom ?? props.pb,
    paddingStart: props.paddingLeft ?? props.pl,
    paddingEnd: props.paddingRight ?? props.pr,
    backgroundColor: props.background ?? props.bg,
    borderColor: props.borderColor,
    borderWidth: resolveBoxBorderWidth(props.borderWidth),
    radius: props.borderRadius,
  };
}

export function resolveBoxZIndex(value: MossyBoxZIndex | undefined) {
  if (value == null) return undefined;

  const resolved = Number(value);
  return Number.isNaN(resolved) ? undefined : resolved;
}

function resolveBoxBorderWidth(value: MossyBoxBorderWidth | undefined) {
  if (value == null) return undefined;

  const resolved = Number(value);
  return Number.isNaN(resolved) ? undefined : resolved;
}
