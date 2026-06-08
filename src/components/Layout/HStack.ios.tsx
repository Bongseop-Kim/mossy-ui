import { Row } from '@expo/ui';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';
import { isFullBoxLength, resolveBoxZIndex, toMossyBoxSurfaceProps } from './Box/types';
import {
  resolveHStackAlign,
  resolveHStackGrow,
  resolveHStackJustify,
} from './HStack.shared';
import { StackChildren } from './StackChildren';
import { createMossyLayoutSurfaceModifiers } from './surface.ios';
import { shouldRenderLayoutSurface } from './surface.shared';
import {
  createMossyEffectModifiers,
  createMossyFillFrameModifiers,
} from './surfaceModifiers.ios';
import { normalizeGrow, resolveAlignment } from './stack';
import type { MossyHStackProps } from './HStack';

/** 가로로 쌓이는 레이아웃 컨테이너. iOS universal `Row`의 래퍼. */
export function HStack(props: MossyHStackProps) {
  const { display, gap, testID, children } = props;
  const theme = useMossyTheme();

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <Row
      alignment={resolveAlignment(resolveHStackAlign(props), undefined)}
      spacing={resolveMossyDimension(theme, gap)}
      testID={testID}
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyBoxSurfaceProps(props), {
        beforeSurface: createMossyFillFrameModifiers({
          fillWidth: isFullBoxLength(props.width),
          fillHeight: isFullBoxLength(props.height),
        }),
        afterSurface: createMossyEffectModifiers({
          grow: normalizeGrow(resolveHStackGrow(props)),
          shadowValue: props.boxShadow == null ? undefined : theme.shadow[props.boxShadow],
          zIndexValue: resolveBoxZIndex(props.zIndex),
        }),
      })}>
      <StackChildren justify={resolveHStackJustify(props)}>{children}</StackChildren>
    </Row>
  );
}

export type { MossyHStackProps } from './HStack';
