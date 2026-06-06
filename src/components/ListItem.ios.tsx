import {
  frame,
  listRowBackground,
  listRowInsets,
} from '@expo/ui/swift-ui/modifiers';

import { HStack } from './Layout/HStack';
import { Spacer } from './Layout/Spacer';
import { VStack } from './Layout/VStack';
import {
  extractMossyListItemSlots,
  listItemMarkers,
  type MossyListItemProps,
} from './ListItem.shared';

const zeroListInset = 0.01;

const flushListRowInsets = listRowInsets({
  top: zeroListInset,
  leading: zeroListInset,
  bottom: zeroListInset,
  trailing: zeroListInset,
});
const transparentListRowBackground = listRowBackground('clear');
const fullWidthFrame = frame({ maxWidth: 100000, alignment: 'leading' });

/**
 * 탭 가능한 목록 행. SwiftUI `List`의 기본 row inset을 제거해 Seed List처럼
 * 외곽 여백 없이 렌더한다.
 */
export const ListItem = Object.assign(
  function ListItem(props: MossyListItemProps) {
    const { onPress, testID } = props;
    const slots = extractMossyListItemSlots(props);

    return (
      <HStack
        alignment="center"
        spacing="x3"
        modifiers={[
          flushListRowInsets,
          transparentListRowBackground,
          fullWidthFrame,
        ]}
        onPress={onPress}
        testID={testID}
      >
        {slots.leading}
        <VStack spacing={2}>
          {slots.headline}
          {slots.supporting}
        </VStack>
        <Spacer flexible />
        {slots.trailing}
      </HStack>
    );
  },
  listItemMarkers,
);

export type { MossyListItemProps };
