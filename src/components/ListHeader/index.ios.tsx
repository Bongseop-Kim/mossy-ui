import { listRowSeparator } from '@expo/ui/swift-ui/modifiers';

import { HStack } from '../Layout/HStack';
import { Spacer } from '../Layout/Spacer';
import { Text } from '../Typography/Text';
import { listHeaderVariants, type MossyListHeaderProps } from './types';

const EMPTY_MODIFIERS: NonNullable<MossyListHeaderProps['modifiers']> = [];

/**
 * 목록 섹션 헤더 (seed `list-header` 스펙). `List` 안에서 행으로 렌더되므로 행
 * separator를 숨긴다. 가로 패딩은 SwiftUI List의 시스템 행 인셋을 그대로 사용한다.
 */
export function ListHeader({
  title,
  variant = 'mediumWeak',
  children,
  testID,
  modifiers = EMPTY_MODIFIERS,
}: MossyListHeaderProps) {
  const { textStyle, color } = listHeaderVariants[variant];

  return (
    <HStack
      alignment="center"
      spacing="x2_5"
      paddingVertical="x2"
      testID={testID}
      modifiers={[listRowSeparator('hidden'), ...modifiers]}
    >
      <Text textStyle={textStyle} color={color}>
        {title}
      </Text>
      {children != null ? (
        <>
          <Spacer flexible />
          {children}
        </>
      ) : null}
    </HStack>
  );
}

export type { MossyListHeaderProps } from './types';
