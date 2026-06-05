import { Row } from '@expo/ui';
import type { ComponentProps } from 'react';

import { resolveMossyDimension, type MossyDimensionToken } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';

export type MossyHStackProps = Omit<ComponentProps<typeof Row>, 'spacing'> & {
  /** 자식 사이 간격 — dimension 토큰(`'x2'`) 또는 숫자(pt/dp). */
  spacing?: number | MossyDimensionToken;
};

/** 가로로 쌓이는 레이아웃 컨테이너. universal `Row`의 래퍼. */
export function HStack({ spacing, ...props }: MossyHStackProps) {
  const theme = useMossyTheme();

  return <Row spacing={resolveMossyDimension(theme, spacing)} {...props} />;
}
