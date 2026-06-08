import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';

import { useMossyTheme } from 'mossy-ui';

import { useShowcaseMode } from '../_layout';
import { PreviewPanel } from '../../src/components/preview-panel';
import { showcaseComponents } from '../../src/data';

export default function ComponentDetailScreen() {
  const theme = useMossyTheme();
  const { mode } = useShowcaseMode();
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const component =
    showcaseComponents.find((item) => item.slug === slug) ?? showcaseComponents[0];

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.color.bg.layerBasement },
      ]}
    >
      <Stack.Screen options={{ title: component.name }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[
          styles.content,
          { padding: theme.dimension.spacingX.globalGutter },
        ]}
      >
        <PreviewPanel mode={mode} preview={component.preview} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    gap: 16,
  },
});
