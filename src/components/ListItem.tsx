import { Row } from '@expo/ui';

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
 * 탭 가능한 목록 행. 기본 row inset 없이 Mossy 레이아웃으로 렌더한다.
 *
 * 텍스트 행은 `title`·`detail` prop으로 토큰 스타일을 적용하고, 커스텀 노드는
 * children 중첩 또는 `leading`·`trailing`·`supportingText` prop,
 * `<ListItem.Leading>` 등 데이터 선언형 마커로 지정한다.
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
        testID={testID}>
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
