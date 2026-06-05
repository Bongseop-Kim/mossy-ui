import { Column, Row } from '@expo/ui';
import type { ComponentProps } from 'react';

import { resolveMossyDimension, type MossyDimensionToken } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';

export type MossyFlexProps = Omit<ComponentProps<typeof Row>, 'spacing'> & {
  /**
   * 주축 방향.
   * @default 'row'
   */
  direction?: 'row' | 'column';
  /** 자식 사이 간격 — dimension 토큰(`'x2'`) 또는 숫자(pt/dp). */
  spacing?: number | MossyDimensionToken;
};

/** 주축 방향을 선택할 수 있는 flex 컨테이너. universal `Row` 또는 `Column`으로 렌더된다. */
export function Flex({ direction = 'row', spacing, ...props }: MossyFlexProps) {
  const theme = useMossyTheme();
  const resolvedSpacing = resolveMossyDimension(theme, spacing);

  return direction === 'row' ? (
    <Row spacing={resolvedSpacing} {...props} />
  ) : (
    <Column spacing={resolvedSpacing} {...props} />
  );
}
