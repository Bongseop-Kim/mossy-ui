import { mossyDefaultScaleValues } from './default-token-values';
import type {
  DeepPartial,
  MossyGradient,
  MossyShadow,
  MossyTimingFunction,
} from './types';

const cssVariablePattern = /var\(--mossy-([\w-]+)\)/g;

export function camelCase(value: string) {
  return value.replace(/-([a-z0-9])/g, (_, character: string) =>
    character.toUpperCase(),
  );
}

export function prefixedTokenEntries<T>(
  variables: Record<string, string>,
  prefix: string,
  tokenValue: (key: string) => T,
) {
  const entries: [string, T][] = [];

  for (const key of Object.keys(variables)) {
    if (key.startsWith(prefix)) {
      entries.push([camelCase(key.slice(prefix.length)), tokenValue(key)]);
    }
  }

  return entries;
}

export function resolveCssValue(
  key: string,
  variables: Record<string, string>,
  seen = new Set<string>(),
): string {
  const value = variables[key];

  if (value === undefined) {
    throw new Error(`Unknown Mossy default token: --mossy-${key}`);
  }

  if (seen.has(key)) {
    throw new Error(`Circular Mossy default token reference: --mossy-${key}`);
  }

  return value.replace(cssVariablePattern, (_, referencedKey: string) => {
    const nextSeen = new Set(seen);
    nextSeen.add(key);
    return resolveCssValue(referencedKey, variables, nextSeen);
  });
}

function toNumber(cssValue: string) {
  if (cssValue.endsWith('px')) return Number(cssValue.slice(0, -2));
  if (cssValue.endsWith('rem')) return Number(cssValue.slice(0, -3)) * 16;

  const numericValue = Number(cssValue);
  if (!Number.isNaN(numericValue)) return numericValue;

  throw new Error(`Cannot convert Mossy default CSS value to number: ${cssValue}`);
}

export function toMilliseconds(cssValue: string) {
  if (cssValue.endsWith('ms')) return Number(cssValue.slice(0, -2));
  if (cssValue.endsWith('s')) return Number(cssValue.slice(0, -1)) * 1000;

  throw new Error(`Cannot convert Mossy default duration to milliseconds: ${cssValue}`);
}

export function toTimingFunction(cssValue: string): MossyTimingFunction {
  const bezier = cssValue
    .match(/-?\d*\.?\d+/g)
    ?.map((value) => Number(value)) as [number, number, number, number] | undefined;

  if (!bezier || bezier.length !== 4) {
    throw new Error(`Cannot parse Mossy default timing function: ${cssValue}`);
  }

  return { css: cssValue, bezier };
}

export function toShadow(cssValue: string): MossyShadow {
  const [offsetX, offsetY, blurRadius, , color] = cssValue.split(/\s+/);
  const shadowRadius = toNumber(blurRadius);

  return {
    css: cssValue,
    shadowColor: color,
    shadowOffset: {
      width: toNumber(offsetX),
      height: toNumber(offsetY),
    },
    shadowOpacity: 1,
    shadowRadius,
    elevation: Math.max(1, Math.round(shadowRadius / 2)),
  };
}

export function toGradient(cssValue: string): MossyGradient {
  return {
    css: cssValue,
    stops: cssValue.split(',').map((stop) => {
      const [color, position] = stop.trim().split(/\s+/);
      return { color, position };
    }),
  };
}

export function numberToken(key: string) {
  if (
    (key.startsWith('font-size-t') || key.startsWith('line-height-t')) &&
    !key.endsWith('-static')
  ) {
    return numberToken(`${key}-static`);
  }

  return toNumber(resolveCssValue(key, mossyDefaultScaleValues));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function deepMerge<T>(base: T, overrides?: DeepPartial<T>): T {
  if (overrides === undefined) return base;

  if (!isRecord(base) || !isRecord(overrides)) {
    return overrides as T;
  }

  const merged: Record<string, unknown> = { ...base };

  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) continue;

    merged[key] = deepMerge(merged[key], value as DeepPartial<unknown>);
  }

  return merged as T;
}
