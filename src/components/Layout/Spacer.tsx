import { Spacer as ExpoSpacer } from '@expo/ui';
import type { ComponentProps } from 'react';

import { resolveMossyDimension, type MossyDimensionToken } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';

export type MossySpacerProps = Omit<ComponentProps<typeof ExpoSpacer>, 'size'> & {
  /** 고정 간격 — dimension 토큰(`'x2'`) 또는 숫자(pt/dp). 부모의 주축 방향으로 적용된다. */
  size?: number | MossyDimensionToken;
};

/**
 * `HStack`·`VStack` 안에서 빈 공간을 만든다.
 * `flexible`이면 남는 공간을 채워 형제를 반대쪽 끝으로 민다. universal `Spacer`의 래퍼.
 */
export function Spacer({ size, ...props }: MossySpacerProps) {
  const theme = useMossyTheme();

  return <ExpoSpacer size={resolveMossyDimension(theme, size)} {...props} />;
}
