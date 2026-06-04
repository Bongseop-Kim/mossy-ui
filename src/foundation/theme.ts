import { buildColorGroup, modeVariablesFor } from './color';
import { buildShadowGroup } from './elevation';
import { buildGradientGroup } from './gradient';
import { buildDurationGroup, buildTimingFunctionGroup } from './motion';
import { createMossyTokenReference, createThemeTokenReference } from './reference';
import { buildRadiusTokens } from './radius';
import { buildDimensionTokens } from './spacing';
import {
  buildFontSizeTokens,
  buildFontWeightTokens,
  buildLineHeightTokens,
  buildTextStyles,
} from './typography';
import { deepMerge } from './utils';
import type {
  DeepPartial,
  MossyThemeMode,
  MossyTokenReference,
} from './types';

function buildMossyTheme(mode: MossyThemeMode) {
  const modeVariables = modeVariablesFor(mode);

  return {
    mode,
    color: {
      palette: buildColorGroup('color-palette-', modeVariables),
      fg: buildColorGroup('color-fg-', modeVariables),
      bg: buildColorGroup('color-bg-', modeVariables),
      stroke: buildColorGroup('color-stroke-', modeVariables),
      mannerTemp: buildColorGroup('color-manner-temp-', modeVariables),
      banner: buildColorGroup('color-banner-', modeVariables),
    },
    dimension: buildDimensionTokens(),
    duration: buildDurationGroup(),
    fontSize: buildFontSizeTokens(),
    fontWeight: buildFontWeightTokens(),
    gradient: buildGradientGroup(modeVariables),
    lineHeight: buildLineHeightTokens(),
    radius: buildRadiusTokens(),
    shadow: buildShadowGroup(modeVariables),
    timingFunction: buildTimingFunctionGroup(),
    typography: buildTextStyles(),
    reference: createMossyTokenReference(mode),
  };
}

export type MossyTheme = ReturnType<typeof buildMossyTheme>;
export type MossyThemeOverrides = DeepPartial<Omit<MossyTheme, 'mode' | 'reference'>> & {
  reference?: Partial<MossyTokenReference>;
};
export type MossyThemeModeOverrides = Partial<Record<MossyThemeMode, MossyThemeOverrides>>;

export function createMossyTheme(
  mode: MossyThemeMode,
  overrides?: MossyThemeOverrides,
): MossyTheme {
  const baseTheme = buildMossyTheme(mode);
  const theme = deepMerge(baseTheme, overrides);

  return {
    ...theme,
    mode,
    reference: {
      ...createThemeTokenReference(theme),
      ...overrides?.reference,
    } as MossyTokenReference,
  };
}

export function createMossyThemes(overrides: MossyThemeModeOverrides = {}) {
  return {
    light: createMossyTheme('light', overrides.light),
    dark: createMossyTheme('dark', overrides.dark),
  };
}

export const mossyThemes = createMossyThemes();

export const mossyTokenReference = mossyThemes.light.reference;

export const mossyFoundation = {
  source: {
    name: 'mossy-ui',
    role: 'default foundation values',
  },
  scale: {
    dimension: mossyThemes.light.dimension,
    duration: mossyThemes.light.duration,
    fontSize: mossyThemes.light.fontSize,
    fontWeight: mossyThemes.light.fontWeight,
    lineHeight: mossyThemes.light.lineHeight,
    radius: mossyThemes.light.radius,
    timingFunction: mossyThemes.light.timingFunction,
  },
  semantic: {
    light: mossyThemes.light,
    dark: mossyThemes.dark,
  },
} as const;

export type MossyFoundation = typeof mossyFoundation;
