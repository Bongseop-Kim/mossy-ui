import { Host as ExpoHost } from '@expo/ui';
import type { ComponentProps } from 'react';

import { useMossyTheme } from '../theme';

export type MossyHostProps = ComponentProps<typeof ExpoHost>;

export function Host({ colorScheme, style, ...props }: MossyHostProps) {
  const theme = useMossyTheme();

  return (
    <ExpoHost
      colorScheme={colorScheme ?? theme.mode}
      style={[{ backgroundColor: theme.colors.canvas }, style]}
      {...props}
    />
  );
}

