import { Column, Row } from '@expo/ui';
import { frame, layoutPriority, shadow, zIndex } from '@expo/ui/swift-ui/modifiers';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import type { MossyModifier } from '../../foundation/modifier';
import { useMossyTheme } from '../../theme';
import {
  isFullBoxLength,
  resolveBoxZIndex,
  toMossyBoxSurfaceProps,
} from './Box/types';
import { StackChildren } from './StackChildren';
import { createMossyLayoutSurfaceModifiers } from './surface.ios';
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

const FILL = 1_000_000;

/** 기본 세로 방향으로 쌓이는 레이아웃 컨테이너. iOS universal `Column`/`Row`의 래퍼. */
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
      beforeSurface: createVStackFrameModifiers(props),
      afterSurface: createVStackEffectModifiers(theme, props, resolvedGrow),
    }),
  };

  if (!shouldRenderLayoutSurface(display)) return null;

  return isColumn ? <Column {...stackProps}>{stackChildren}</Column> : <Row {...stackProps}>{stackChildren}</Row>;
}

export type { MossyVStackProps } from './VStack';

function createVStackFrameModifiers(props: MossyVStackProps): MossyModifier[] {
  const width = isFullBoxLength(props.width) ? FILL : undefined;
  const height = isFullBoxLength(props.height) ? FILL : undefined;

  return width == null && height == null ? [] : [frame({ maxWidth: width, maxHeight: height })];
}

function createVStackEffectModifiers(
  theme: ReturnType<typeof useMossyTheme>,
  props: MossyVStackProps,
  resolvedGrow: ReturnType<typeof normalizeGrow>,
): MossyModifier[] {
  const modifiers: MossyModifier[] = [];
  const shadowValue = props.boxShadow == null ? undefined : theme.shadow[props.boxShadow];
  const zIndexValue = resolveBoxZIndex(props.zIndex);

  if (resolvedGrow != null) modifiers.push(layoutPriority(resolvedGrow));

  if (shadowValue != null) {
    modifiers.push(
      shadow({
        radius: shadowValue.shadowRadius ?? 0,
        x: shadowValue.shadowOffset?.width,
        y: shadowValue.shadowOffset?.height,
        color: shadowValue.shadowColor,
      }),
    );
  }

  if (zIndexValue != null) modifiers.push(zIndex(zIndexValue));

  return modifiers;
}
