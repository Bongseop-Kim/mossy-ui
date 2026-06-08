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
import { createMossyLayoutSurfaceModifiers } from './surface.ios';
import { shouldRenderLayoutSurface } from './surface.shared';
import {
  createMossyEffectModifiers,
  createMossyFillFrameModifiers,
} from './surfaceModifiers.ios';
import {
  growChildrenMainAxis,
  normalizeGrow,
  resolveAlignment,
  shouldStretchCrossAxis,
  stretchChildrenCrossAxis,
} from './stack';
import type { MossyHStackProps } from './HStack';

/** 가로로 쌓이는 레이아웃 컨테이너. iOS universal `Row`의 래퍼. */
export function HStack(props: MossyHStackProps) {
  const { display, gap, testID, children } = props;
  const theme = useMossyTheme();
  const align = resolveHStackAlign(props);
  const crossStretched = shouldStretchCrossAxis(align)
    ? stretchChildrenCrossAxis(children, 'height')
    : children;
  // grow 자식을 main axis(width)로 채워 flexbox flex-grow처럼 균등 분배한다.
  const stretchedChildren = growChildrenMainAxis(crossStretched, 'width');

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <Row
      alignment={resolveAlignment(align, undefined)}
      spacing={resolveMossyDimension(theme, gap)}
      testID={testID}
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyLayoutSurfaceProps(props), {
        beforeSurface: createMossyFillFrameModifiers({
          fillWidth: isFullLayoutLength(props.width),
          fillHeight: isFullLayoutLength(props.height),
        }),
        afterSurface: createMossyEffectModifiers({
          grow: normalizeGrow(resolveHStackGrow(props)),
          shadowValue: props.boxShadow == null ? undefined : theme.shadow[props.boxShadow],
          zIndexValue: resolveLayoutZIndex(props.zIndex),
        }),
      })}>
      <StackChildren justify={resolveHStackJustify(props)}>{stretchedChildren}</StackChildren>
    </Row>
  );
}

export type { MossyHStackProps } from './HStack';
