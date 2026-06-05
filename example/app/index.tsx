import { Host } from '@expo/ui';
import { useState } from 'react';

import {
  HStack,
  Spacer,
  Text,
  VStack,
  useMossyTheme,
  type MossyThemeMode,
} from 'mossy-ui';

import { useShowcaseMode } from './_layout';
import { ComponentList } from '../src/components/component-list';
import { SearchField } from '../src/components/search-field';
import { showcaseComponents } from '../src/data';

export default function ComponentsIndexScreen() {
  const theme = useMossyTheme();
  const { mode, setMode } = useShowcaseMode();
  const [search, setSearch] = useState('');
  const normalizedSearch = search.trim().toLowerCase();
  const nextMode = mode === 'light' ? 'dark' : 'light';

  const filteredComponents =
    normalizedSearch.length === 0
      ? showcaseComponents
      : showcaseComponents.filter((item) =>
          item.name.toLowerCase().includes(normalizedSearch)
        );

  return (
    <Host
      colorScheme={mode}
      style={{
        flex: 1,
        backgroundColor: theme.color.bg.layerBasement,
      }}
    >
      <VStack spacing="x4" style={{ padding: theme.dimension.spacingX.globalGutter }}>
        <HStack alignment="center" spacing="x3">
          <VStack spacing="x1">
            <Text textStyle="t2Bold" color="fg.brand">
              Mossy UI
            </Text>
            <Text textStyle="screenTitle" color="fg.neutral">
              컴포넌트
            </Text>
          </VStack>
          <Spacer flexible />
          <ThemeModeButton mode={mode} onPress={() => setMode(nextMode)} />
        </HStack>
        <SearchField value={search} onChangeText={setSearch} />
        <ComponentList components={filteredComponents} />
      </VStack>
    </Host>
  );
}

type ThemeModeButtonProps = {
  mode: MossyThemeMode;
  onPress: () => void;
};

function ThemeModeButton({ mode, onPress }: ThemeModeButtonProps) {
  const isLight = mode === 'light';

  return (
    <VStack alignment="center" onPress={onPress}>
      <Text textStyle="t5Bold" color="fg.neutral" align="center">
        {isLight ? '☀' : '☾'}
      </Text>
    </VStack>
  );
}
