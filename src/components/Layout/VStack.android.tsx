import { Column, Row } from '@expo/ui';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';
import {
  isFullLayoutLength,
  resolveLayoutZIndex,
  toMossyLayoutSurfaceProps,
} from './surfaceProps.shared';
import { StackChildren } from './StackChildren';
import { createMossyLayoutSurfaceModifiers } from './surface.android';
import { shouldRenderLayoutSurface } from './surface.shared';
import {
  createMossyEffectModifiers,
  createMossyFillSizeModifiers,
  mossyMaxIntrinsicHeight,
} from './surfaceModifiers.android';
import {
  isColumnDirection,
  isReverseDirection,
  maybeReverseChildren,
  normalizeGrow,
  resolveDirectedJustify,
  resolveAlignment,
  resolveStackGrow,
  shouldStretchCrossAxis,
  stretchChildrenCrossAxis,
} from './stack';
import type { MossyVStackProps } from './VStack';

/** 기본 세로 방향으로 쌓이는 레이아웃 컨테이너. Android universal `Column`/`Row`의 래퍼. */
export function VStack(props: MossyVStackProps) {
  const {
    display,
    align,
    alignItems,
    justify,
    justifyContent,
    gap,
    direction = 'column',
    children,
  } = props;
  const theme = useMossyTheme();
  const isColumn = isColumnDirection(direction);
  const isReverse = isReverseDirection(direction);
  const crossAlign = align ?? alignItems;
  const stretchCrossAxis = shouldStretchCrossAxis(crossAlign);
  const stretchedChildren = stretchCrossAxis
    ? stretchChildrenCrossAxis(children, isColumn ? 'width' : 'height')
    : children;
  const renderedChildren = maybeReverseChildren(stretchedChildren, isReverse);
  const directedJustify = resolveDirectedJustify(justify ?? justifyContent, isReverse);
  const stackChildren = <StackChildren justify={directedJustify}>{renderedChildren}</StackChildren>;
  const stackProps = {
    alignment: resolveAlignment(align ?? alignItems, undefined),
    spacing: resolveMossyDimension(theme, gap),
    modifiers: createMossyLayoutSurfaceModifiers(theme, toMossyLayoutSurfaceProps(props), {
      beforeSurface: [
        // Row로 렌더하고 높이가 wrap-content일 때만 IntrinsicSize.Max가 필요하다. 부모가 늘리는(height='full')
        // Row면 fillMaxHeight와 충돌하므로 제외한다. Column 너비는 부모가 정해주므로 자식 fillMaxWidth로 충분하다.
        ...(stretchCrossAxis && !isColumn && !isFullLayoutLength(props.height)
          ? [mossyMaxIntrinsicHeight()]
          : []),
        ...createMossyFillSizeModifiers({
          fillWidth: isFullLayoutLength(props.width),
          fillHeight: isFullLayoutLength(props.height),
        }),
      ],
      shadowValue: props.boxShadow == null ? undefined : theme.shadow[props.boxShadow],
      afterSurface: createMossyEffectModifiers({
        grow: normalizeGrow(resolveStackGrow(props)),
        zIndexValue: resolveLayoutZIndex(props.zIndex),
      }),
    }),
  };

  if (!shouldRenderLayoutSurface(display)) return null;

  return isColumn ? <Column {...stackProps}>{stackChildren}</Column> : <Row {...stackProps}>{stackChildren}</Row>;
}

export type { MossyVStackProps } from './VStack';
