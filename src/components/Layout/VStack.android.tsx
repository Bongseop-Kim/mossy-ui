import { Column, Row } from '@expo/ui';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';
import {
  isFullBoxLength,
  resolveBoxZIndex,
  toMossyBoxSurfaceProps,
} from './Box/types';
import { StackChildren } from './StackChildren';
import { createMossyLayoutSurfaceModifiers } from './surface.android';
import { shouldRenderLayoutSurface } from './surface.shared';
import {
  createMossyEffectModifiers,
  createMossyFillSizeModifiers,
} from './surfaceModifiers.android';
import {
  isColumnDirection,
  isReverseDirection,
  maybeReverseChildren,
  normalizeGrow,
  resolveDirectedJustify,
  resolveAlignment,
  resolveStackGrow,
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
  const renderedChildren = maybeReverseChildren(children, isReverse);
  const directedJustify = resolveDirectedJustify(justify ?? justifyContent, isReverse);
  const stackChildren = <StackChildren justify={directedJustify}>{renderedChildren}</StackChildren>;
  const stackProps = {
    alignment: resolveAlignment(align ?? alignItems, undefined),
    spacing: resolveMossyDimension(theme, gap),
    modifiers: createMossyLayoutSurfaceModifiers(theme, toMossyBoxSurfaceProps(props), {
      beforeSurface: createMossyFillSizeModifiers({
        fillWidth: isFullBoxLength(props.width),
        fillHeight: isFullBoxLength(props.height),
      }),
      afterSurface: createMossyEffectModifiers({
        grow: normalizeGrow(resolveStackGrow(props)),
        shadowValue: props.boxShadow == null ? undefined : theme.shadow[props.boxShadow],
        zIndexValue: resolveBoxZIndex(props.zIndex),
      }),
    }),
  };

  if (!shouldRenderLayoutSurface(display)) return null;

  return isColumn ? <Column {...stackProps}>{stackChildren}</Column> : <Row {...stackProps}>{stackChildren}</Row>;
}

export type { MossyVStackProps } from './VStack';
