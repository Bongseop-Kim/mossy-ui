import type { ReactNode } from 'react';

import type { MossyAlignment } from '../types';
import type { MossyLayoutSurfaceProps, MossyLayoutSurfaceRadiusToken } from '../surface.shared';

export type MossyBoxRadiusToken = MossyLayoutSurfaceRadiusToken;

export interface MossyBoxProps extends MossyLayoutSurfaceProps {
  /** 박스 안에 렌더할 콘텐츠. 자식들은 겹쳐 쌓인다 (iOS `ZStack` / Android `Box`). */
  children?: ReactNode;
  /**
   * 자식 정렬 위치.
   * @default 'topStart'
   */
  alignment?: MossyAlignment;
}
