import type { ReactNode } from 'react';

import type {
  MossyBoxBackground,
  MossyBoxBorderColor,
  MossyBoxBorderWidth,
  MossyBoxFlexGrow,
  MossyBoxGradient,
  MossyBoxGradientDirection,
  MossyBoxLength,
  MossyBoxPadding,
  MossyBoxRadiusToken,
  MossyBoxShadow,
  MossyBoxZIndex,
  MossyBoxProps,
} from '../Box/types';

export type MossyGridDisplay = 'grid' | 'none';
export type MossyGridTrackCount = number;
export type MossyGridAutoFlow = 'row' | 'column';
export type MossyGridSizeConstraint = Exclude<MossyBoxLength, 'full'>;
export type MossyGridItemSpan = number | 'full';
export type MossyGridItemLine = number;

export interface MossyGridProps {
  /** 셀로 배치할 콘텐츠. 기본은 행 우선이며 `autoFlow="column"`이면 열 우선으로 채워진다. */
  children?: ReactNode;
  /**
   * 렌더 여부. Seed Grid는 `grid`와 `none`만 제공한다.
   * @default 'grid'
   */
  display?: MossyGridDisplay;
  /** 열 개수. Seed `columns` number 값을 균등 열 개수로 정규화한다. */
  columns?: MossyGridTrackCount;
  /** 행 개수. `autoFlow="column"`일 때 Seed `rows` number 값을 균등 행 개수로 정규화한다. */
  rows?: MossyGridTrackCount;
  /** 아이템 배치 방향. Seed `row`/`column` auto-flow를 행·열 우선 배치로 정규화한다. */
  autoFlow?: MossyGridAutoFlow;
  /** 셀 사이 간격. Seed `gap` prop과 동일하다. */
  gap?: MossyBoxPadding;
  flexGrow?: MossyBoxFlexGrow;
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
  minWidth?: MossyGridSizeConstraint;
  maxWidth?: MossyGridSizeConstraint;
  minHeight?: MossyGridSizeConstraint;
  maxHeight?: MossyGridSizeConstraint;
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
  zIndex?: MossyBoxZIndex;
}

export interface MossyGridItemProps extends Omit<
  MossyBoxProps,
  'minWidth' | 'maxWidth' | 'minHeight' | 'maxHeight'
> {
  /**
   * 아이템이 차지할 열 개수. `full`은 현재 Grid의 전체 열을 차지한다.
   * `autoFlow="row"` 배치에서만 적용된다.
   */
  colSpan?: MossyGridItemSpan;
  /**
   * 1부터 시작하는 열 시작선. `autoFlow="row"` 배치에서만 적용된다.
   */
  colStart?: MossyGridItemLine;
  /**
   * 열 끝선. 양수는 1부터 시작하는 CSS Grid line, 음수는 끝에서부터 세는 line으로 정규화한다.
   */
  colEnd?: MossyGridItemLine;
  minWidth?: MossyGridSizeConstraint;
  maxWidth?: MossyGridSizeConstraint;
  minHeight?: MossyGridSizeConstraint;
  maxHeight?: MossyGridSizeConstraint;
}
