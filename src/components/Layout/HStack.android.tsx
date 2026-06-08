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
  mossyMaxIntrinsicHeight,
} from './surfaceModifiers.android';
import {
  normalizeGrow,
  resolveAlignment,
  shouldStretchCrossAxis,
  stretchChildrenCrossAxis,
} from './stack';
import type { MossyHStackProps } from './HStack';

/** 가로로 쌓이는 레이아웃 컨테이너. Android universal `Row`의 래퍼. */
export function HStack(props: MossyHStackProps) {
  const { display, gap, children } = props;
  const theme = useMossyTheme();
  const align = resolveHStackAlign(props);
  const stretchCrossAxis = shouldStretchCrossAxis(align);
  const stretchedChildren = stretchCrossAxis ? stretchChildrenCrossAxis(children, 'height') : children;
  // IntrinsicSize.Max는 높이가 wrap-content인 Row에서만 자식을 동일 높이로 정렬한다.
  // 부모가 늘리는(height='full') Row에 적용하면 자기 콘텐츠 높이로 고정돼 fillMaxHeight와 충돌한다.
  const needsIntrinsicHeight = stretchCrossAxis && !isFullLayoutLength(props.height);

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <Row
      alignment={resolveAlignment(align, undefined)}
      spacing={resolveMossyDimension(theme, gap)}
      modifiers={createMossyLayoutSurfaceModifiers(theme, toMossyLayoutSurfaceProps(props), {
        beforeSurface: [
          ...(needsIntrinsicHeight ? [mossyMaxIntrinsicHeight()] : []),
          ...createMossyFillSizeModifiers({
            fillWidth: isFullLayoutLength(props.width),
            fillHeight: isFullLayoutLength(props.height),
          }),
        ],
        shadowValue: props.boxShadow == null ? undefined : theme.shadow[props.boxShadow],
        afterSurface: createMossyEffectModifiers({
          grow: normalizeGrow(resolveHStackGrow(props)),
          zIndexValue: resolveLayoutZIndex(props.zIndex),
        }),
      })}>
      <StackChildren justify={resolveHStackJustify(props)}>{stretchedChildren}</StackChildren>
    </Row>
  );
}

export type { MossyHStackProps } from './HStack';
