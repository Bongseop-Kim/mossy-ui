import { Row } from '@expo/ui';
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
} from './Box/types';
import {
  resolveHStackAlign,
  resolveHStackGrow,
  resolveHStackJustify,
  toMossyHStackSurfaceProps,
} from './HStack.shared';
import { StackChildren } from './StackChildren';
import { createMossyLayoutSurfaceModifiers } from './surface.android';
import { shouldRenderLayoutSurface } from './surface.shared';
import {
  normalizeGrow,
  resolveAlignment,
} from './stack';
import type { MossyHStackProps } from './HStack';

/** 가로로 쌓이는 레이아웃 컨테이너. Android universal `Row`의 래퍼. */
export function HStack(props: MossyHStackProps) {
  const { display, gap, children } = props;
  const theme = useMossyTheme();
  const resolvedGrow = normalizeGrow(resolveHStackGrow(props));

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <Row
      alignment={resolveAlignment(resolveHStackAlign(props), undefined)}
      spacing={resolveMossyDimension(theme, gap)}
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyHStackSurfaceProps(props), {
        beforeSurface: createHStackSizeModifiers(props),
        afterSurface: createHStackEffectModifiers(theme, props, resolvedGrow),
      })}>
      <StackChildren justify={resolveHStackJustify(props)}>{children}</StackChildren>
    </Row>
  );
}

export type { MossyHStackProps } from './HStack';

function createHStackSizeModifiers(props: MossyHStackProps): MossyModifier[] {
  const modifiers: MossyModifier[] = [];

  if (isFullBoxLength(props.width)) modifiers.push(fillMaxWidth());
  if (isFullBoxLength(props.height)) modifiers.push(fillMaxHeight());

  return modifiers;
}

function createHStackEffectModifiers(
  theme: ReturnType<typeof useMossyTheme>,
  props: MossyHStackProps,
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
