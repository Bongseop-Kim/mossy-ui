import { Row } from '@expo/ui';
import type { ReactNode } from 'react';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';
import {
  type MossyBoxBorderWidth,
  type MossyBoxGradient,
  type MossyBoxGradientDirection,
  type MossyBoxLength,
  type MossyBoxRadiusToken,
  type MossyBoxShadow,
  type MossyBoxZIndex,
} from './Box/types';
import {
  resolveHStackAlign,
  resolveHStackJustify,
  toMossyHStackSurfaceProps,
} from './HStack.shared';
import { StackChildren } from './StackChildren';
import { resolveMossyLayoutSurfaceStyle, shouldRenderLayoutSurface } from './surface.shared';
import {
  resolveAlignment,
  type MossyStackBaseProps,
} from './stack';

export type MossyHStackSizeConstraint = Exclude<MossyBoxLength, 'full'>;

export interface MossyHStackProps extends MossyStackBaseProps {
  /** 가로로 쌓을 콘텐츠. */
  children?: ReactNode;
  bgGradient?: MossyBoxGradient;
  backgroundGradient?: MossyBoxGradient;
  bgGradientDirection?: MossyBoxGradientDirection;
  backgroundGradientDirection?: MossyBoxGradientDirection;
  borderTopWidth?: MossyBoxBorderWidth;
  borderRightWidth?: MossyBoxBorderWidth;
  borderBottomWidth?: MossyBoxBorderWidth;
  borderLeftWidth?: MossyBoxBorderWidth;
  borderTopLeftRadius?: MossyBoxRadiusToken | 0;
  borderTopRightRadius?: MossyBoxRadiusToken | 0;
  borderBottomRightRadius?: MossyBoxRadiusToken | 0;
  borderBottomLeftRadius?: MossyBoxRadiusToken | 0;
  boxShadow?: MossyBoxShadow;
  minWidth?: MossyHStackSizeConstraint;
  maxWidth?: MossyHStackSizeConstraint;
  minHeight?: MossyHStackSizeConstraint;
  maxHeight?: MossyHStackSizeConstraint;
  zIndex?: MossyBoxZIndex;
}

/** 가로로 쌓이는 레이아웃 컨테이너. universal `Row`의 래퍼. */
export function HStack(props: MossyHStackProps) {
  const { display, gap, children } = props;
  const theme = useMossyTheme();

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <Row
      alignment={resolveAlignment(resolveHStackAlign(props), undefined)}
      spacing={resolveMossyDimension(theme, gap)}
      style={resolveMossyLayoutSurfaceStyle(theme, toMossyHStackSurfaceProps(props))}>
      <StackChildren justify={resolveHStackJustify(props)}>{children}</StackChildren>
    </Row>
  );
}
