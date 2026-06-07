import { Row } from '@expo/ui';
import type { ReactNode } from 'react';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';
import { toMossyBoxSurfaceProps } from './Box/types';
import { StackChildren } from './StackChildren';
import { resolveMossyLayoutSurfaceStyle, shouldRenderLayoutSurface } from './surface.shared';
import {
  resolveAlignment,
  type MossyStackBaseProps,
} from './stack';

export interface MossyHStackProps extends MossyStackBaseProps {
  /** 가로로 쌓을 콘텐츠. */
  children?: ReactNode;
}

/** 가로로 쌓이는 레이아웃 컨테이너. universal `Row`의 래퍼. */
export function HStack(props: MossyHStackProps) {
  const { display, align, alignItems, justify, justifyContent, gap, children } = props;
  const theme = useMossyTheme();

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <Row
      alignment={resolveAlignment(align ?? alignItems, undefined)}
      spacing={resolveMossyDimension(theme, gap)}
      style={resolveMossyLayoutSurfaceStyle(theme, toMossyBoxSurfaceProps(props))}>
      <StackChildren justify={justify ?? justifyContent}>{children}</StackChildren>
    </Row>
  );
}
