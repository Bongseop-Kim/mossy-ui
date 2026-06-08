import { Row } from '@expo/ui';
import type { ReactNode } from 'react';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';
import { toMossyLayoutSurfaceProps } from './surfaceProps.shared';
import { resolveHStackAlign, resolveHStackJustify } from './HStack.shared';
import { StackChildren } from './StackChildren';
import { resolveMossyLayoutSurfaceStyle, shouldRenderLayoutSurface } from './surface.shared';
import {
  resolveAlignment,
  shouldStretchCrossAxis,
  stretchChildrenCrossAxis,
  type MossyStackBaseProps,
  type MossyStackSizeConstraint,
  type MossyStackSurfaceProps,
} from './stack';

export type MossyHStackSizeConstraint = MossyStackSizeConstraint;

export interface MossyHStackProps extends MossyStackBaseProps, MossyStackSurfaceProps {
  /** 가로로 쌓을 콘텐츠. */
  children?: ReactNode;
}

/** 가로로 쌓이는 레이아웃 컨테이너. universal `Row`의 래퍼. */
export function HStack(props: MossyHStackProps) {
  const { display, gap, children } = props;
  const theme = useMossyTheme();
  const align = resolveHStackAlign(props);
  const stretchedChildren = shouldStretchCrossAxis(align)
    ? stretchChildrenCrossAxis(children, 'height')
    : children;

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <Row
      alignment={resolveAlignment(align, undefined)}
      spacing={resolveMossyDimension(theme, gap)}
      style={resolveMossyLayoutSurfaceStyle(theme, toMossyLayoutSurfaceProps(props))}>
      <StackChildren justify={resolveHStackJustify(props)}>{stretchedChildren}</StackChildren>
    </Row>
  );
}
