import { Row } from '@expo/ui';
import { weight } from '@expo/ui/jetpack-compose/modifiers';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';
import { toMossyBoxSurfaceProps } from './Box/types';
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
  const { display, align, alignItems, justify, justifyContent, grow, flexGrow, gap, children } = props;
  const theme = useMossyTheme();
  const resolvedGrow = normalizeGrow(grow ?? flexGrow);

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <Row
      alignment={resolveAlignment(align ?? alignItems, undefined)}
      spacing={resolveMossyDimension(theme, gap)}
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyBoxSurfaceProps(props), {
        afterSurface: resolvedGrow == null ? undefined : [weight(resolvedGrow)],
      })}>
      <StackChildren justify={justify ?? justifyContent}>{children}</StackChildren>
    </Row>
  );
}

export type { MossyHStackProps } from './HStack';
