import {
  mossyDefaultDarkValues,
  mossyDefaultLightValues,
  mossyDefaultScaleValues,
} from './default-token-values';
import { prefixedTokenEntries, resolveCssValue } from './utils';
import type { MossyThemeMode } from './types';

export function modeVariablesFor(mode: MossyThemeMode): Record<string, string> {
  return mode === 'light' ? mossyDefaultLightValues : mossyDefaultDarkValues;
}

export function modeValue(key: string, modeVariables: Record<string, string>) {
  return resolveCssValue(key, { ...mossyDefaultScaleValues, ...modeVariables });
}

export function buildColorGroup(prefix: string, modeVariables: Record<string, string>) {
  return Object.fromEntries(
    prefixedTokenEntries(modeVariables, prefix, (key) => modeValue(key, modeVariables)),
  );
}
