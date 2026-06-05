import { createContext, use, type PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';

import { mossyThemes, type MossyTheme } from './foundation/index';

const MossyThemeContext = createContext<MossyTheme | null>(null);

export type MossyThemeProviderProps = PropsWithChildren<{
  /** 명시하면 시스템 컬러 스킴 대신 이 테마를 사용한다. */
  theme?: MossyTheme;
}>;

/** Mossy 테마를 하위 컴포넌트에 제공한다. 기본값은 시스템 컬러 스킴(light/dark)을 따른다. */
export function MossyThemeProvider({ children, theme }: MossyThemeProviderProps) {
  const colorScheme = useColorScheme();
  const systemTheme = colorScheme === 'dark' ? mossyThemes.dark : mossyThemes.light;

  return <MossyThemeContext value={theme ?? systemTheme}>{children}</MossyThemeContext>;
}

/** 현재 Mossy 테마를 읽는다. Provider 밖에서는 시스템 컬러 스킴에 맞는 기본 테마로 폴백한다. */
export function useMossyTheme(): MossyTheme {
  const colorScheme = useColorScheme();
  const contextTheme = use(MossyThemeContext);

  return contextTheme ?? (colorScheme === 'dark' ? mossyThemes.dark : mossyThemes.light);
}
