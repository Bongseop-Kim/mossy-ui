import type { ReactNode } from 'react';

import type { MossyDimensionToken } from '../../../foundation/component-tokens';
import type { MossyBoxZIndex } from '../Box/types';

export type MossyFloatPlacement =
  | 'bottom-end'
  | 'bottom-start'
  | 'top-end'
  | 'top-start'
  | 'bottom-center'
  | 'top-center'
  | 'middle-center'
  | 'middle-end'
  | 'middle-start';

export type MossyFloatOffset = number | MossyDimensionToken;

export interface MossyFloatProps {
  /** 고정 위치에 띄울 콘텐츠. */
  children?: ReactNode;
  /** 부모 기준 고정 위치. 크기가 정해진 `Box` 안에서 사용한다. */
  placement: MossyFloatPlacement;
  /**
   * 가로 오프셋.
   * `start`·`middle`은 오른쪽, `end`는 왼쪽으로 이동한다.
   * @default 0
   */
  offsetX?: MossyFloatOffset;
  /**
   * 세로 오프셋.
   * `top`·`middle`은 아래쪽, `bottom`은 위쪽으로 이동한다.
   * @default 0
   */
  offsetY?: MossyFloatOffset;
  zIndex?: MossyBoxZIndex;
}
