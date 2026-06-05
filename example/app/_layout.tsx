import { createContext, use, useState, type ReactNode } from 'react';
import { Stack } from 'expo-router';

import { MossyThemeProvider, type MossyThemeMode } from 'mossy-ui';

import { appThemes } from '../src/theme';

type ShowcaseModeContextValue = {
  mode: MossyThemeMode;
  setMode: (mode: MossyThemeMode) => void;
};

const ShowcaseModeContext = createContext<ShowcaseModeContextValue | null>(null);

export default function RootLayout() {
  const [mode, setMode] = useState<MossyThemeMode>('light');

  return (
    <ShowcaseModeContext value={{ mode, setMode }}>
      <MossyThemeProvider theme={appThemes[mode]}>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Mossy UI' }} />
          <Stack.Screen name="components/[slug]" options={{ title: 'Component' }} />
        </Stack>
      </MossyThemeProvider>
    </ShowcaseModeContext>
  );
}

export function useShowcaseMode() {
  const value = use(ShowcaseModeContext);

  if (value == null) {
    throw new Error('useShowcaseMode must be used inside RootLayout.');
  }

  return value;
}

export type ShowcaseScreenProps = {
  children: ReactNode;
};
