import { Column, Row } from '@expo/ui';
import {
  fillMaxHeight,
  fillMaxWidth,
  shadow,
  weight,
  zIndex,
} from '@expo/ui/jetpack-compose/modifiers';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import type { MossyModifier } from '../../foundation/modifier';
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
  isColumnDirection,
  isReverseDirection,
  maybeReverseChildren,
  normalizeGrow,
  resolveDirectedJustify,
  resolveAlignment,
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
    grow,
    flexGrow,
    gap,
    direction = 'column',
    children,
  } = props;
  const theme = useMossyTheme();
  const resolvedGrow = normalizeGrow(grow ?? flexGrow);
  const isColumn = isColumnDirection(direction);
  const isReverse = isReverseDirection(direction);
  const renderedChildren = maybeReverseChildren(children, isReverse);
  const directedJustify = resolveDirectedJustify(justify ?? justifyContent, isReverse);
  const stackChildren = <StackChildren justify={directedJustify}>{renderedChildren}</StackChildren>;
  const stackProps = {
    alignment: resolveAlignment(align ?? alignItems, undefined),
    spacing: resolveMossyDimension(theme, gap),
    modifiers: createMossyLayoutSurfaceModifiers(theme, toMossyBoxSurfaceProps(props), {
      beforeSurface: createVStackSizeModifiers(props),
      afterSurface: createVStackEffectModifiers(theme, props, resolvedGrow),
    }),
  };

  if (!shouldRenderLayoutSurface(display)) return null;

  return isColumn ? <Column {...stackProps}>{stackChildren}</Column> : <Row {...stackProps}>{stackChildren}</Row>;
}

export type { MossyVStackProps } from './VStack';

function createVStackSizeModifiers(props: MossyVStackProps): MossyModifier[] {
  const modifiers: MossyModifier[] = [];

  if (isFullBoxLength(props.width)) modifiers.push(fillMaxWidth());
  if (isFullBoxLength(props.height)) modifiers.push(fillMaxHeight());

  return modifiers;
}

function createVStackEffectModifiers(
  theme: ReturnType<typeof useMossyTheme>,
  props: MossyVStackProps,
  resolvedGrow: ReturnType<typeof normalizeGrow>,
): MossyModifier[] {
  const modifiers: MossyModifier[] = [];
  const shadowValue = props.boxShadow == null ? undefined : theme.shadow[props.boxShadow];
  const zIndexValue = resolveBoxZIndex(props.zIndex);

  if (resolvedGrow != null) modifiers.push(weight(resolvedGrow));
  if (shadowValue?.elevation != null) modifiers.push(shadow(shadowValue.elevation));
  if (zIndexValue != null) modifiers.push(zIndex(zIndexValue));

  return modifiers;
}
