import { Host } from '@expo/ui';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import {
  List,
  ListHeader,
  ListItem,
  ScrollFog,
  ScrollView,
  Text,
  VStack,
  type MossyThemeMode,
} from 'mossy-ui';

import type { ComponentPreviewKey } from '../types';

const STANDALONE_KEYS = ['list', 'scroll-fog'] as const;

type StandaloneKey = (typeof STANDALONE_KEYS)[number];

export function isStandalonePreview(key: ComponentPreviewKey): key is StandaloneKey {
  return (STANDALONE_KEYS as readonly ComponentPreviewKey[]).includes(key);
}

type StandalonePreviewProps = {
  preview: StandaloneKey;
  mode: MossyThemeMode;
};

/**
 * 패널 Host 안(switch)에서 렌더할 수 없는 프리뷰 — RN 레이어 컴포넌트(ScrollFog)거나
 * 고정 높이 Host가 필요한 컴포넌트(List). 패널 Host 형제로 렌더된다.
 */
export function StandalonePreview({ preview, mode }: StandalonePreviewProps) {
  switch (preview) {
    case 'list':
      return <ListPreview mode={mode} />;
    case 'scroll-fog':
      return <ScrollFogPreview mode={mode} />;
  }
}

function ListPreview({ mode }: { mode: MossyThemeMode }) {
  const [taps, setTaps] = useState(0);

  return (
    <Host colorScheme={mode} style={styles.listHost}>
      <List>
        <ListHeader title="오늘의 동네" />
        <ListItem
          title="동네 소식"
          detail={`눌린 횟수 ${taps}회`}
          onPress={() => setTaps((count) => count + 1)}
        />
        <ListItem leading="🥕" title="중고 거래" detail="이웃과 가깝게 거래해요" />
        <ListItem>
          <ListItem.Leading>📍</ListItem.Leading>
          내 근처
          <ListItem.Trailing>NEW</ListItem.Trailing>
        </ListItem>
        <ListHeader title="나의 활동" variant="boldSolid" />
        <ListItem trailing="3건" title="관심 목록" detail="저장한 글을 확인해요" />
      </List>
    </Host>
  );
}

const FOG_ROWS = Array.from({ length: 20 }, (_, index) => `스크롤 항목 ${index + 1}`);

function ScrollFogPreview({ mode }: { mode: MossyThemeMode }) {
  return (
    <ScrollFog placement={['top', 'bottom']} size="x6" style={styles.fog}>
      <Host colorScheme={mode} style={styles.fogHost}>
        <ScrollView padding="x4">
          <VStack spacing="x3">
            {FOG_ROWS.map((label) => (
              <Text key={label} textStyle="t4Regular" color="fg.neutral">
                {label}
              </Text>
            ))}
          </VStack>
        </ScrollView>
      </Host>
    </ScrollFog>
  );
}

const styles = StyleSheet.create({
  listHost: {
    height: 360,
    width: '100%',
  },
  fog: {
    height: 240,
    width: '100%',
  },
  fogHost: {
    flex: 1,
  },
});
