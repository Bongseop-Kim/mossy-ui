import { mossyDefaultScaleValues } from './default-token-values';
import { numberToken, prefixedTokenEntries } from './utils';

export function buildScaleNumberGroup(prefix: string) {
  return Object.fromEntries(
    prefixedTokenEntries(mossyDefaultScaleValues, prefix, numberToken),
  );
}

export function buildDimensionTokens() {
  return {
    x: buildScaleNumberGroup('dimension-x'),
    spacingX: buildScaleNumberGroup('dimension-spacing-x-'),
    spacingY: buildScaleNumberGroup('dimension-spacing-y-'),
  };
}
