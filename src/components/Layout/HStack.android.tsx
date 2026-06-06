import { Row } from '@expo/ui';
import { weight } from '@expo/ui/jetpack-compose/modifiers';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';
import { createMossyLayoutSurfaceModifiers } from './surface.android';
import { shouldRenderLayoutSurface } from './surface.shared';
import {
  JustifiedStackChildren,
  normalizeGrow,
  resolveAlignment,
} from './stack';
import type { MossyHStackProps } from './HStack';

/** 가로로 쌓이는 레이아웃 컨테이너. Android universal `Row`의 래퍼. */
export function HStack(props: MossyHStackProps) {
  const { display, align, alignment, justify, grow, spacing, children } = props;
  const theme = useMossyTheme();
  const resolvedGrow = normalizeGrow(grow);

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <Row
      alignment={resolveAlignment(align, alignment)}
      spacing={resolveMossyDimension(theme, spacing)}
      modifiers={createMossyLayoutSurfaceModifiers(theme, props, {
        afterSurface: resolvedGrow == null ? undefined : [weight(resolvedGrow)],
      })}>
      <JustifiedStackChildren justify={justify}>{children}</JustifiedStackChildren>
    </Row>
  );
}

export type { MossyHStackProps } from './HStack';
