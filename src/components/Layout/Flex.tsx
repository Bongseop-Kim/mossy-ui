import { Children, type ReactNode } from 'react';

import { HStack, type MossyHStackProps } from './HStack';
import { VStack, type MossyVStackProps } from './VStack';

export type MossyFlexDirection =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse'
  | 'rowReverse'
  | 'columnReverse';

export type MossyFlexProps = MossyHStackProps & {
  /**
   * 주축 방향. Seed `direction` shorthand와 동일하다.
   * @default 'row'
   */
  direction?: MossyFlexDirection;
};

function normalizeDirection(direction: MossyFlexDirection) {
  if (direction === 'rowReverse') return 'row-reverse';
  if (direction === 'columnReverse') return 'column-reverse';
  return direction;
}

function maybeReverseChildren(children: ReactNode, shouldReverse: boolean) {
  if (!shouldReverse) return children;
  return Children.toArray(children).reverse();
}

function isReverseDirection(direction: MossyFlexDirection) {
  return direction === 'row-reverse' || direction === 'column-reverse';
}

/** 주축 방향을 선택할 수 있는 flex 컨테이너. `HStack` 또는 `VStack`으로 렌더된다. */
export function Flex({ direction = 'row', children, ...props }: MossyFlexProps) {
  const normalizedDirection = normalizeDirection(direction);
  const isColumn = normalizedDirection === 'column' || normalizedDirection === 'column-reverse';
  const reversedChildren = maybeReverseChildren(children, isReverseDirection(normalizedDirection));

  return isColumn ? (
    <VStack {...(props as MossyVStackProps)}>{reversedChildren}</VStack>
  ) : (
    <HStack {...props}>{reversedChildren}</HStack>
  );
}
