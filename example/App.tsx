import { useState } from 'react';
import { Button, Host } from '@expo/ui';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createMossyThemes, type MossyThemeMode } from 'mossy-ui';

const themeModes: MossyThemeMode[] = ['light', 'dark'];
const appThemes = createMossyThemes({
  light: {
    color: {
      bg: {
        brandSolid: '#176b5b',
      },
      fg: {
        brand: '#176b5b',
      },
      stroke: {
        brandSolid: '#176b5b',
      },
    },
  },
  dark: {
    color: {
      bg: {
        brandSolid: '#8fd9c7',
      },
      fg: {
        brand: '#8fd9c7',
      },
      stroke: {
        brandSolid: '#8fd9c7',
      },
    },
  },
});

export default function App() {
  const [mode, setMode] = useState<MossyThemeMode>('light');
  const theme = appThemes[mode];

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.color.bg.layerBasement },
      ]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { padding: theme.dimension.spacingX.globalGutter },
        ]}
      >
        <View style={styles.header}>
          <View>
            <Text
              style={[
                theme.typography.textStyleT2Bold,
                styles.eyebrow,
                { color: theme.color.fg.brand },
              ]}
            >
              Mossy Foundation
            </Text>
            <Text
              style={[
                theme.typography.textStyleScreenTitle,
                { color: theme.color.fg.neutral },
              ]}
            >
              Mossy UI
            </Text>
          </View>

          <View
            style={[
              styles.segmentedControl,
              {
                backgroundColor: theme.color.bg.neutralWeak,
                borderColor: theme.color.stroke.neutralSubtle,
                borderRadius: theme.radius.r2,
              },
            ]}
          >
            {themeModes.map((themeMode) => {
              const isSelected = themeMode === mode;

              return (
                <Pressable
                  key={themeMode}
                  accessibilityLabel={`Use ${themeMode} theme`}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => setMode(themeMode)}
                  style={[
                    styles.segment,
                    { borderRadius: theme.radius.r1_5 },
                    isSelected && {
                      backgroundColor: theme.color.bg.brandSolid,
                    },
                  ]}
                >
                  <Text
                    style={[
                      theme.typography.textStyleT2Bold,
                      styles.segmentLabel,
                      {
                        color: isSelected
                          ? theme.color.fg.neutralInverted
                          : theme.color.fg.neutral,
                      },
                    ]}
                  >
                    {themeMode}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View
          style={[
            styles.panel,
            theme.shadow.s1,
            {
              backgroundColor: theme.color.bg.layerDefault,
              borderColor: theme.color.stroke.neutralSubtle,
              borderRadius: theme.radius.r3,
            },
          ]}
        >
          <Text
            style={[
              theme.typography.textStyleT5Bold,
              { color: theme.color.fg.neutral },
            ]}
          >
            Foundation tokens
          </Text>
          <Text
            style={[
              theme.typography.textStyleT4Regular,
              { color: theme.color.fg.neutralMuted },
            ]}
          >
            {`$color.bg.layer-basement = ${theme.reference['$color.bg.layer-basement']}`}
          </Text>
          <Text
            style={[
              theme.typography.textStyleT4Regular,
              { color: theme.color.fg.neutralMuted },
            ]}
          >
            {`$dimension.spacing-x.global-gutter = ${theme.reference['$dimension.spacing-x.global-gutter']}`}
          </Text>
        </View>

        <View
          style={[
            styles.panel,
            {
              backgroundColor: theme.color.bg.layerDefault,
              borderColor: theme.color.stroke.neutralSubtle,
              borderRadius: theme.radius.r3,
            },
          ]}
        >
          <Text
            style={[
              theme.typography.textStyleT5Bold,
              { color: theme.color.fg.neutral },
            ]}
          >
            Expo UI primitive
          </Text>
          <Host
            colorScheme={mode}
            matchContents={{ vertical: true }}
            style={[
              styles.host,
              {
                backgroundColor: theme.color.bg.layerFill,
                borderRadius: theme.radius.r2,
              },
            ]}
          >
            <Button
              label="Mossy action"
              onPress={() => {}}
              style={{
                backgroundColor: theme.color.bg.brandSolid,
                borderColor: theme.color.stroke.brandSolid,
                borderRadius: theme.radius.r2,
              }}
              variant="filled"
            />
          </Host>
        </View>
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
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  eyebrow: {
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  segmentedControl: {
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    padding: 3,
  },
  segment: {
    alignItems: 'center',
    minWidth: 58,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  segmentLabel: {
    letterSpacing: 0,
    textTransform: 'capitalize',
  },
  panel: {
    borderWidth: StyleSheet.hairlineWidth,
    gap: 8,
    padding: 16,
  },
  host: {
    padding: 12,
  },
});
