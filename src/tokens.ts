export type MossyThemeMode = 'light' | 'dark';

export type MossyTheme = {
  mode: MossyThemeMode;
  colors: {
    accent: string;
    accentContrast: string;
    border: string;
    canvas: string;
    muted: string;
    text: string;
  };
  radius: {
    control: number;
  };
  opacity: {
    disabled: number;
  };
  size: {
    controlHeight: number;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
};

export const defaultLightTheme: MossyTheme = {
  mode: 'light',
  colors: {
    accent: '#176B5B',
    accentContrast: '#FFFFFF',
    border: '#D7DEDA',
    canvas: '#F8FAF9',
    muted: '#EEF3F1',
    text: '#17231F',
  },
  radius: {
    control: 10,
  },
  opacity: {
    disabled: 0.5,
  },
  size: {
    controlHeight: 44,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
  },
};

export const defaultDarkTheme: MossyTheme = {
  mode: 'dark',
  colors: {
    accent: '#8FD9C7',
    accentContrast: '#09231D',
    border: '#34453F',
    canvas: '#101816',
    muted: '#1A2925',
    text: '#ECF4F1',
  },
  radius: {
    control: 10,
  },
  opacity: {
    disabled: 0.5,
  },
  size: {
    controlHeight: 44,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
  },
};

export const mossyTheme = {
  dark: defaultDarkTheme,
  light: defaultLightTheme,
};
