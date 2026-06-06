import type { ReactNode } from 'react';

import type { MossyDimensionToken } from '../../../foundation/component-tokens';
import type { MossyLayoutSurfaceProps } from '../surface.shared';

export interface MossyGridProps extends MossyLayoutSurfaceProps {
  /** 셀로 배치할 콘텐츠. 왼쪽 위부터 행 우선으로 채워진다. */
  children?: ReactNode;
  /** 열 개수. 셀은 균등한 너비로 배치된다. */
  columns: number;
  /**
   * 셀 사이 가로 간격 — dimension 토큰(`'x2'`) 또는 숫자(pt/dp).
   * @default 0
   */
  horizontalSpacing?: number | MossyDimensionToken;
  /**
   * 셀 사이 세로 간격 — dimension 토큰(`'x2'`) 또는 숫자(pt/dp).
   * @default 0
   */
  verticalSpacing?: number | MossyDimensionToken;
}
