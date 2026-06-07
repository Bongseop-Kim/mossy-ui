import { Row } from '@expo/ui';
import { fillMaxWidth } from '@expo/ui/jetpack-compose/modifiers';

import { resolveMossyDimension } from '../foundation/component-tokens';
import { useMossyTheme } from '../theme';
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
    const theme = useMossyTheme();
    const slots = extractMossyListItemSlots(props);

    return (
      <Row
        alignment="center"
        spacing={resolveMossyDimension(theme, 'x3')}
        onPress={onPress}
        testID={testID}
        modifiers={[fillMaxWidth()]}>
        {slots.leading}
        <VStack gap="x0_5">
          {slots.headline}
          {slots.supporting}
        </VStack>
        <Spacer flexible />
        {slots.trailing}
      </Row>
    );
  },
  listItemMarkers,
);

export type { MossyListItemProps };
