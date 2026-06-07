import { Row } from '@expo/ui';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';
import { Spacer } from '../Layout/Spacer';
import { createMossyLayoutSurfaceModifiers } from '../Layout/surface.android';
import { Text } from '../Typography/Text';
import { listHeaderVariants, type MossyListHeaderProps } from './types';

/**
 * 목록 섹션 헤더 (seed `list-header` 스펙). LazyColumn에는 기본 행 인셋이 없어
 * 가로 패딩(global-gutter)을 직접 적용한다.
 */
export function ListHeader({
  title,
  variant = 'mediumWeak',
  children,
  testID,
  modifiers,
}: MossyListHeaderProps) {
  const theme = useMossyTheme();
  const { textStyle, color } = listHeaderVariants[variant];

  return (
    <Row
      alignment="center"
      spacing={resolveMossyDimension(theme, 'x2_5')}
      testID={testID}
      modifiers={createMossyLayoutSurfaceModifiers(theme, {
        paddingVertical: 'x2',
        paddingHorizontal: theme.dimension.spacingX.globalGutter,
      }, {
        afterSurface: modifiers,
      })}>
      <Text textStyle={textStyle} color={color}>
        {title}
      </Text>
      {children != null ? (
        <>
          <Spacer flexible />
          {children}
        </>
      ) : null}
    </Row>
  );
}

export type { MossyListHeaderProps } from './types';
