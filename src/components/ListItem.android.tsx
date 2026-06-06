import { HStack } from './Layout/HStack';
import { Spacer } from './Layout/Spacer';
import { VStack } from './Layout/VStack';
import {
  extractMossyListItemSlots,
  listItemMarkers,
  type MossyListItemProps,
} from './ListItem.shared';

/**
 * 탭 가능한 목록 행. Android Material 3 `ListItem`의 기본 content padding을
 * 사용하지 않고 Mossy 레이아웃으로 렌더한다.
 */
export const ListItem = Object.assign(
  function ListItem(props: MossyListItemProps) {
    const { onPress, testID } = props;
    const slots = extractMossyListItemSlots(props);

    return (
      <HStack
        alignment="center"
        spacing="x3"
        onPress={onPress}
        testID={testID}
        style={{ width: '100%' }}
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
