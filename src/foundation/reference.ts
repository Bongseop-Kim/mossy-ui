import { modeValue, modeVariablesFor } from './color';
import { buildTextStyles } from './typography';
import { mossyDefaultScaleValues } from './default-token-values';
import {
  camelCase,
  numberToken,
  resolveCssValue,
} from './utils';
import { durationToken, timingFunctionToken } from './motion';
import { toGradient, toShadow } from './utils';
import type {
  MossyFontWeight,
  MossyThemeMode,
  MossyTokenName,
  MossyTokenReference,
  MossyTokenValue,
} from './types';
import type { MossyTheme } from './theme';

function tokenNameFromMossyKey(key: string): MossyTokenName {
  if (key.startsWith('color-manner-temp-')) {
    return `$color.manner-temp.${key.slice('color-manner-temp-'.length)}`;
  }

  if (key.startsWith('color-')) {
    const [, group, ...rest] = key.split('-');
    return `$color.${group}.${rest.join('-')}`;
  }

  if (key.startsWith('dimension-spacing-x-')) {
    return `$dimension.spacing-x.${key.slice('dimension-spacing-x-'.length)}`;
  }

  if (key.startsWith('dimension-spacing-y-')) {
    return `$dimension.spacing-y.${key.slice('dimension-spacing-y-'.length)}`;
  }

  if (key.startsWith('dimension-x')) {
    return `$dimension.${key.slice('dimension-'.length)}`;
  }

  const [namespace, ...rest] = key.split('-');

  if (namespace === 'font' || namespace === 'line' || namespace === 'timing') {
    const [secondNamespace, ...tokenParts] = rest;
    return `$${namespace}-${secondNamespace}.${tokenParts.join('-')}`;
  }

  return `$${namespace}.${rest.join('-')}`;
}

function tokenValueFromMossyKey(
  key: string,
  modeVariables: Record<string, string>,
): MossyTokenValue {
  if (key.startsWith('color-')) return modeValue(key, modeVariables);
  if (key.startsWith('gradient-')) return toGradient(modeValue(key, modeVariables));
  if (key.startsWith('shadow-')) return toShadow(modeValue(key, modeVariables));
  if (key.startsWith('duration-')) return durationToken(key);
  if (key.startsWith('timing-function-')) return timingFunctionToken(key);
  if (key.startsWith('font-weight-')) {
    return resolveCssValue(key, mossyDefaultScaleValues) as MossyFontWeight;
  }

  if (key.startsWith('font-size-t') && !key.endsWith('-static')) {
    return numberToken(`${key}-static`);
  }

  if (key.startsWith('line-height-t') && !key.endsWith('-static')) {
    return numberToken(`${key}-static`);
  }

  return numberToken(key);
}

export function createMossyTokenReference(mode: MossyThemeMode): MossyTokenReference {
  const modeVariables = modeVariablesFor(mode);
  const referenceEntries = [...Object.keys(mossyDefaultScaleValues), ...Object.keys(modeVariables)].map(
    (key) => [tokenNameFromMossyKey(key), tokenValueFromMossyKey(key, modeVariables)],
  );
  const typographyEntries = Object.entries(buildTextStyles()).map(([name, value]) => [
    `$typography.${name}`,
    value,
  ]);

  return Object.fromEntries([...referenceEntries, ...typographyEntries]) as MossyTokenReference;
}

function tokenFromGroup(
  group: Record<string, MossyTokenValue>,
  key: string,
  tokenKey: string,
) {
  const value = group[tokenKey];

  if (value === undefined) {
    throw new Error(`Unknown Mossy theme token: ${key}`);
  }

  return value;
}

function tokenValueFromTheme(key: string, theme: MossyTheme): MossyTokenValue {
  if (key.startsWith('color-manner-temp-')) {
    return tokenFromGroup(
      theme.color.mannerTemp,
      key,
      camelCase(key.slice('color-manner-temp-'.length)),
    );
  }

  if (key.startsWith('color-palette-')) {
    return tokenFromGroup(
      theme.color.palette,
      key,
      camelCase(key.slice('color-palette-'.length)),
    );
  }

  if (key.startsWith('color-fg-')) {
    return tokenFromGroup(theme.color.fg, key, camelCase(key.slice('color-fg-'.length)));
  }

  if (key.startsWith('color-bg-')) {
    return tokenFromGroup(theme.color.bg, key, camelCase(key.slice('color-bg-'.length)));
  }

  if (key.startsWith('color-stroke-')) {
    return tokenFromGroup(
      theme.color.stroke,
      key,
      camelCase(key.slice('color-stroke-'.length)),
    );
  }

  if (key.startsWith('color-banner-')) {
    return tokenFromGroup(
      theme.color.banner,
      key,
      camelCase(key.slice('color-banner-'.length)),
    );
  }

  if (key.startsWith('dimension-spacing-x-')) {
    return tokenFromGroup(
      theme.dimension.spacingX,
      key,
      camelCase(key.slice('dimension-spacing-x-'.length)),
    );
  }

  if (key.startsWith('dimension-spacing-y-')) {
    return tokenFromGroup(
      theme.dimension.spacingY,
      key,
      camelCase(key.slice('dimension-spacing-y-'.length)),
    );
  }

  if (key.startsWith('dimension-x')) {
    return tokenFromGroup(
      theme.dimension.x,
      key,
      camelCase(key.slice('dimension-x'.length)),
    );
  }

  if (key.startsWith('duration-')) {
    return tokenFromGroup(theme.duration, key, camelCase(key.slice('duration-'.length)));
  }

  if (key.startsWith('font-size-')) {
    return tokenFromGroup(theme.fontSize, key, camelCase(key.slice('font-size-'.length)));
  }

  if (key.startsWith('font-weight-')) {
    return tokenFromGroup(
      theme.fontWeight,
      key,
      camelCase(key.slice('font-weight-'.length)),
    );
  }

  if (key.startsWith('line-height-')) {
    return tokenFromGroup(
      theme.lineHeight,
      key,
      camelCase(key.slice('line-height-'.length)),
    );
  }

  if (key.startsWith('radius-')) {
    return tokenFromGroup(theme.radius, key, camelCase(key.slice('radius-'.length)));
  }

  if (key.startsWith('timing-function-')) {
    return tokenFromGroup(
      theme.timingFunction,
      key,
      camelCase(key.slice('timing-function-'.length)),
    );
  }

  if (key.startsWith('gradient-')) {
    return tokenFromGroup(theme.gradient, key, camelCase(key.slice('gradient-'.length)));
  }

  if (key.startsWith('shadow-')) {
    return tokenFromGroup(theme.shadow, key, camelCase(key.slice('shadow-'.length)));
  }

  throw new Error(`Unknown Mossy token key: ${key}`);
}

export function createThemeTokenReference(theme: MossyTheme): MossyTokenReference {
  const modeVariables = modeVariablesFor(theme.mode);
  const referenceEntries = [...Object.keys(mossyDefaultScaleValues), ...Object.keys(modeVariables)].map(
    (key) => [tokenNameFromMossyKey(key), tokenValueFromTheme(key, theme)],
  );
  const typographyEntries = Object.entries(theme.typography).map(([name, value]) => [
    `$typography.${name}`,
    value,
  ]);

  return Object.fromEntries([...referenceEntries, ...typographyEntries]) as MossyTokenReference;
}
