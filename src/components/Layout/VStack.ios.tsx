import { Column } from '@expo/ui';
import { layoutPriority } from '@expo/ui/swift-ui/modifiers';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';
import { createMossyLayoutSurfaceModifiers } from './surface.ios';
import { shouldRenderLayoutSurface } from './surface.shared';
import {
  JustifiedStackChildren,
  normalizeGrow,
  resolveAlignment,
} from './stack';
import type { MossyVStackProps } from './VStack';

/** 세로로 쌓이는 레이아웃 컨테이너. iOS universal `Column`의 래퍼. */
export function VStack(props: MossyVStackProps) {
  const { display, align, alignment, justify, grow, spacing, children, testID } = props;
  const theme = useMossyTheme();
  const resolvedGrow = normalizeGrow(grow);

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <Column
      alignment={resolveAlignment(align, alignment)}
      spacing={resolveMossyDimension(theme, spacing)}
      modifiers={createMossyLayoutSurfaceModifiers(theme, props, {
        afterSurface: resolvedGrow == null ? undefined : [layoutPriority(resolvedGrow)],
      })}
      testID={testID}>
      <JustifiedStackChildren justify={justify}>{children}</JustifiedStackChildren>
    </Column>
  );
}

export type { MossyVStackProps } from './VStack';
