import { Column, Row } from '@expo/ui';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';
import {
  isFullLayoutLength,
  resolveLayoutZIndex,
  toMossyLayoutSurfaceProps,
} from './surfaceProps.shared';
import { StackChildren } from './StackChildren';
import { createMossyLayoutSurfaceModifiers } from './surface.ios';
import { shouldRenderLayoutSurface } from './surface.shared';
import {
  createMossyEffectModifiers,
  createMossyFillFrameModifiers,
} from './surfaceModifiers.ios';
import {
  isColumnDirection,
  isReverseDirection,
  maybeReverseChildren,
  growChildrenMainAxis,
  normalizeGrow,
  resolveDirectedJustify,
  resolveAlignment,
  resolveStackGrow,
  shouldStretchCrossAxis,
  stretchChildrenCrossAxis,
} from './stack';
import type { MossyVStackProps } from './VStack';

/** 기본 세로 방향으로 쌓이는 레이아웃 컨테이너. iOS universal `Column`/`Row`의 래퍼. */
export function VStack(props: MossyVStackProps) {
  const {
    display,
    align,
    alignItems,
    justify,
    justifyContent,
    gap,
    direction = 'column',
    testID,
    children,
  } = props;
  const theme = useMossyTheme();
  const isColumn = isColumnDirection(direction);
  const isReverse = isReverseDirection(direction);
  const crossAlign = align ?? alignItems;
  const crossStretched = shouldStretchCrossAxis(crossAlign)
    ? stretchChildrenCrossAxis(children, isColumn ? 'width' : 'height')
    : children;
  // grow 자식을 main axis(column이면 height, row면 width)로 채워 flex-grow처럼 균등 분배한다.
  const stretchedChildren = growChildrenMainAxis(crossStretched, isColumn ? 'height' : 'width');
  const renderedChildren = maybeReverseChildren(stretchedChildren, isReverse);
  const directedJustify = resolveDirectedJustify(justify ?? justifyContent, isReverse);
  const stackChildren = <StackChildren justify={directedJustify}>{renderedChildren}</StackChildren>;
  const stackProps = {
    alignment: resolveAlignment(align ?? alignItems, undefined),
    spacing: resolveMossyDimension(theme, gap),
    testID,
    modifiers: createMossyLayoutSurfaceModifiers(theme, toMossyLayoutSurfaceProps(props), {
      beforeSurface: createMossyFillFrameModifiers({
        fillWidth: isFullLayoutLength(props.width),
        fillHeight: isFullLayoutLength(props.height),
      }),
      afterSurface: createMossyEffectModifiers({
        grow: normalizeGrow(resolveStackGrow(props)),
        shadowValue: props.boxShadow == null ? undefined : theme.shadow[props.boxShadow],
        zIndexValue: resolveLayoutZIndex(props.zIndex),
      }),
    }),
  };

  if (!shouldRenderLayoutSurface(display)) return null;

  return isColumn ? <Column {...stackProps}>{stackChildren}</Column> : <Row {...stackProps}>{stackChildren}</Row>;
}

export type { MossyVStackProps } from './VStack';
