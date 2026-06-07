import type { ReactNode } from 'react';

import type {
  MossyBoxBackground,
  MossyBoxBorderColor,
  MossyBoxBorderWidth,
  MossyBoxLength,
  MossyBoxPadding,
  MossyBoxRadiusToken,
} from '../Box/types';

export interface MossyGridProps {
  /** 셀로 배치할 콘텐츠. 왼쪽 위부터 행 우선으로 채워진다. */
  children?: ReactNode;
  /**
   * 렌더 여부. Seed Grid는 `grid`와 `none`만 제공한다.
   * @default 'grid'
   */
  display?: 'grid' | 'none';
  /** 열 개수. 셀은 균등한 너비로 배치된다. */
  columns?: number;
  /** 셀 사이 간격. Seed `gap` prop과 동일하다. */
  gap?: MossyBoxPadding;
  bg?: MossyBoxBackground;
  background?: MossyBoxBackground;
  borderColor?: MossyBoxBorderColor;
  borderWidth?: MossyBoxBorderWidth;
  borderRadius?: MossyBoxRadiusToken | 0;
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
}
