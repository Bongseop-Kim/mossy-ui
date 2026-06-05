import { StyleSheet, type ViewStyle } from 'react-native';

import type { MossyTheme } from 'mossy-ui';

export function surfaceStyle(theme: MossyTheme, padding: number): ViewStyle {
  return {
    backgroundColor: theme.color.bg.layerDefault,
    borderColor: theme.color.stroke.neutralSubtle,
    borderRadius: theme.radius.r3,
    borderWidth: StyleSheet.hairlineWidth,
    padding,
  };
}

export const styles = StyleSheet.create({
  host: {
    flex: 1,
    width: '100%',
  },
});
