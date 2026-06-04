import { createContext, type PropsWithChildren, use } from 'react';

import { defaultLightTheme, type MossyTheme } from './tokens';

const MossyThemeContext = createContext<MossyTheme>(defaultLightTheme);

export type MossyThemeProviderProps = PropsWithChildren<{
  theme?: MossyTheme;
}>;

export function MossyThemeProvider({
  children,
  theme = defaultLightTheme,
}: MossyThemeProviderProps) {
  return (
    <MossyThemeContext.Provider value={theme}>
      {children}
    </MossyThemeContext.Provider>
  );
}

export function useMossyTheme() {
  return use(MossyThemeContext);
}
