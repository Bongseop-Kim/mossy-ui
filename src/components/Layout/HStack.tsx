import { Row, type UniversalAlignment } from '@expo/ui';
import type { ReactNode } from 'react';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';
import { resolveMossyLayoutSurfaceStyle, shouldRenderLayoutSurface, type MossyLayoutSurfaceProps } from './surface.shared';
import {
  JustifiedStackChildren,
  resolveAlignment,
  type MossyStackBaseProps,
} from './stack';

export type MossyHStackProps = MossyLayoutSurfaceProps &
  MossyStackBaseProps & {
    /** 가로로 쌓을 콘텐츠. */
    children?: ReactNode;
    /** cross-axis 정렬. Expo UI `Row`의 기존 `alignment` prop도 유지한다. */
    alignment?: UniversalAlignment;
  };

/** 가로로 쌓이는 레이아웃 컨테이너. universal `Row`의 래퍼. */
export function HStack({
  display,
  align,
  alignment,
  justify,
  grow: _grow,
  spacing,
  children,
  modifiers,
  onPress,
  onAppear,
  onDisappear,
  disabled,
  hidden,
  testID,
  ...surfaceProps
}: MossyHStackProps) {
  const theme = useMossyTheme();

  if (!shouldRenderLayoutSurface(display)) return null;

  return (
    <Row
      alignment={resolveAlignment(align, alignment)}
      spacing={resolveMossyDimension(theme, spacing)}
      style={resolveMossyLayoutSurfaceStyle(theme, surfaceProps)}
      onPress={disabled ? undefined : onPress}
      onAppear={onAppear}
      onDisappear={onDisappear}
      disabled={disabled}
      hidden={hidden}
      testID={testID}
      modifiers={modifiers}>
      <JustifiedStackChildren justify={justify}>{children}</JustifiedStackChildren>
    </Row>
  );
}
