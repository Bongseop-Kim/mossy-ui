import { Column } from '@expo/ui';
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
import type { MossyVStackProps } from './VStack';

/** 세로로 쌓이는 레이아웃 컨테이너. Android universal `Column`의 래퍼. */
export function VStack(props: MossyVStackProps) {
  const { display, align, alignItems, justify, justifyContent, grow, flexGrow, gap, children } = props;
  const theme = useMossyTheme();
  const resolvedGrow = normalizeGrow(grow ?? flexGrow);

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <Column
      alignment={resolveAlignment(align ?? alignItems, undefined)}
      spacing={resolveMossyDimension(theme, gap)}
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyBoxSurfaceProps(props), {
        afterSurface: resolvedGrow == null ? undefined : [weight(resolvedGrow)],
      })}>
      <StackChildren justify={justify ?? justifyContent}>{children}</StackChildren>
    </Column>
  );
}

export type { MossyVStackProps } from './VStack';
