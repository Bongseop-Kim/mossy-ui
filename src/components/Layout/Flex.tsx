import type { ReactNode } from 'react';

import { HStack, type MossyHStackProps, type MossyHStackSizeConstraint } from './HStack';
import {
  isColumnDirection,
  isReverseDirection,
  maybeReverseChildren,
  normalizeDirection,
  type MossyStackDirection,
} from './stack';
import { VStack, type MossyVStackProps } from './VStack';

export type MossyFlexDirection = MossyStackDirection;

export type MossyFlexSizeConstraint = MossyHStackSizeConstraint;

export type MossyFlexProps = MossyHStackProps & {
  /**
   * 주축 방향. Seed `direction` shorthand와 동일하다.
   * @default 'row'
   */
  direction?: MossyFlexDirection;
  /**
   * Seed Box `flexDirection` prop. `direction`과 같은 native Row/Column 선택으로 정규화한다.
   */
  flexDirection?: MossyFlexDirection;
};

/** 주축 방향을 선택할 수 있는 flex 컨테이너. `HStack` 또는 `VStack`으로 렌더된다. */
export function Flex({ direction = 'row', flexDirection, children, ...props }: MossyFlexProps) {
  const normalizedDirection = normalizeDirection(flexDirection ?? direction);
  const isColumn = isColumnDirection(normalizedDirection);
  const reversedChildren = maybeReverseChildren(children, isReverseDirection(normalizedDirection));

  return isColumn ? (
    <VStack {...(props as MossyVStackProps)}>{reversedChildren}</VStack>
  ) : (
    <HStack {...props}>{reversedChildren}</HStack>
  );
}
