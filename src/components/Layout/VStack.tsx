import { Column } from '@expo/ui';
import type { ComponentProps } from 'react';

import { resolveMossyDimension, type MossyDimensionToken } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';

export type MossyVStackProps = Omit<ComponentProps<typeof Column>, 'spacing'> & {
  /** 자식 사이 간격 — dimension 토큰(`'x2'`) 또는 숫자(pt/dp). */
  spacing?: number | MossyDimensionToken;
};

/** 세로로 쌓이는 레이아웃 컨테이너. universal `Column`의 래퍼. */
export function VStack({ spacing, ...props }: MossyVStackProps) {
  const theme = useMossyTheme();

  return <Column spacing={resolveMossyDimension(theme, spacing)} {...props} />;
}
