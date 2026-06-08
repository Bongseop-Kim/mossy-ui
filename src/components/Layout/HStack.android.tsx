import { Row } from '@expo/ui';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';
import { isFullLayoutLength, resolveLayoutZIndex, toMossyLayoutSurfaceProps } from './surfaceProps.shared';
import {
  resolveHStackAlign,
  resolveHStackGrow,
  resolveHStackJustify,
} from './HStack.shared';
import { StackChildren } from './StackChildren';
import { createMossyLayoutSurfaceModifiers } from './surface.android';
import { shouldRenderLayoutSurface } from './surface.shared';
import {
  createMossyEffectModifiers,
  createMossyFillSizeModifiers,
} from './surfaceModifiers.android';
import { normalizeGrow, resolveAlignment } from './stack';
import type { MossyHStackProps } from './HStack';

/** 가로로 쌓이는 레이아웃 컨테이너. Android universal `Row`의 래퍼. */
export function HStack(props: MossyHStackProps) {
  const { display, gap, children } = props;
  const theme = useMossyTheme();

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <Row
      alignment={resolveAlignment(resolveHStackAlign(props), undefined)}
      spacing={resolveMossyDimension(theme, gap)}
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyLayoutSurfaceProps(props), {
        beforeSurface: createMossyFillSizeModifiers({
          fillWidth: isFullLayoutLength(props.width),
          fillHeight: isFullLayoutLength(props.height),
        }),
        afterSurface: createMossyEffectModifiers({
          grow: normalizeGrow(resolveHStackGrow(props)),
          shadowValue: props.boxShadow == null ? undefined : theme.shadow[props.boxShadow],
          zIndexValue: resolveLayoutZIndex(props.zIndex),
        }),
      })}>
      <StackChildren justify={resolveHStackJustify(props)}>{children}</StackChildren>
    </Row>
  );
}

export type { MossyHStackProps } from './HStack';
