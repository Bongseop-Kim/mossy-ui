import { Column, Row } from '@expo/ui';
import type { ReactNode } from 'react';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';
import {
  toMossyBoxSurfaceProps,
  type MossyBoxGradient,
  type MossyBoxGradientDirection,
  type MossyBoxLength,
  type MossyBoxBorderWidth,
  type MossyBoxRadiusToken,
  type MossyBoxShadow,
  type MossyBoxZIndex,
} from './Box/types';
import { StackChildren } from './StackChildren';
import { resolveMossyLayoutSurfaceStyle, shouldRenderLayoutSurface } from './surface.shared';
import {
  isColumnDirection,
  isReverseDirection,
  maybeReverseChildren,
  resolveDirectedJustify,
  resolveAlignment,
  type MossyStackBaseProps,
  type MossyStackDirection,
} from './stack';

export type MossyVStackSizeConstraint = Exclude<MossyBoxLength, 'full'>;

export interface MossyVStackProps extends MossyStackBaseProps {
  /** 기본 세로 방향으로 쌓을 콘텐츠. */
  children?: ReactNode;
  /** 주축 방향. Seed `direction` shorthand와 동일하며 기본값은 `column`이다. */
  direction?: MossyStackDirection;
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
  minWidth?: MossyVStackSizeConstraint;
  maxWidth?: MossyVStackSizeConstraint;
  minHeight?: MossyVStackSizeConstraint;
  maxHeight?: MossyVStackSizeConstraint;
  zIndex?: MossyBoxZIndex;
}

/** 기본 세로 방향으로 쌓이는 레이아웃 컨테이너. universal `Column`/`Row`의 래퍼. */
export function VStack(props: MossyVStackProps) {
  const { display, align, alignItems, justify, justifyContent, gap, direction = 'column', children } = props;
  const theme = useMossyTheme();
  const isColumn = isColumnDirection(direction);
  const isReverse = isReverseDirection(direction);
  const renderedChildren = maybeReverseChildren(children, isReverse);
  const directedJustify = resolveDirectedJustify(justify ?? justifyContent, isReverse);
  const stackChildren = <StackChildren justify={directedJustify}>{renderedChildren}</StackChildren>;
  const stackProps = {
    alignment: resolveAlignment(align ?? alignItems, undefined),
    spacing: resolveMossyDimension(theme, gap),
    style: resolveMossyLayoutSurfaceStyle(theme, toMossyBoxSurfaceProps(props)),
  };

  if (!shouldRenderLayoutSurface(display)) return null;

  return isColumn ? <Column {...stackProps}>{stackChildren}</Column> : <Row {...stackProps}>{stackChildren}</Row>;
}
