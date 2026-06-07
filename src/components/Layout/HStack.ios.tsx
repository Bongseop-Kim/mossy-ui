import { Row } from '@expo/ui';
import { frame, layoutPriority, shadow, zIndex } from '@expo/ui/swift-ui/modifiers';

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
import { createMossyLayoutSurfaceModifiers } from './surface.ios';
import { shouldRenderLayoutSurface } from './surface.shared';
import {
  normalizeGrow,
  resolveAlignment,
} from './stack';
import type { MossyHStackProps } from './HStack';

const FILL = 1_000_000;

/** 가로로 쌓이는 레이아웃 컨테이너. iOS universal `Row`의 래퍼. */
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
        beforeSurface: createHStackFrameModifiers(props),
        afterSurface: createHStackEffectModifiers(theme, props, resolvedGrow),
      })}>
      <StackChildren justify={resolveHStackJustify(props)}>{children}</StackChildren>
    </Row>
  );
}

export type { MossyHStackProps } from './HStack';

function createHStackFrameModifiers(props: MossyHStackProps): MossyModifier[] {
  const width = isFullBoxLength(props.width) ? FILL : undefined;
  const height = isFullBoxLength(props.height) ? FILL : undefined;

  return width == null && height == null ? [] : [frame({ maxWidth: width, maxHeight: height })];
}

function createHStackEffectModifiers(
  theme: ReturnType<typeof useMossyTheme>,
  props: MossyHStackProps,
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
