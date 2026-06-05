import { createMossyThemes, type MossyThemeMode } from 'mossy-ui';

export const themeModes: MossyThemeMode[] = ['light', 'dark'];

export const appThemes = createMossyThemes({
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
