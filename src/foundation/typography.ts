import {
  mossyDefaultScaleValues,
  mossyDefaultTextStyleDefinitions,
  type MossyTextStyleName,
} from './default-token-values';
import { buildScaleNumberGroup } from './spacing';
import { numberToken, prefixedTokenEntries, resolveCssValue } from './utils';
import type { MossyFontWeight, MossyTextStyle } from './types';

export type { MossyTextStyleName } from './default-token-values';

export function buildFontSizeTokens() {
  return {
    ...buildScaleNumberGroup('font-size-'),
    t1: numberToken('font-size-t1-static'),
    t2: numberToken('font-size-t2-static'),
    t3: numberToken('font-size-t3-static'),
    t4: numberToken('font-size-t4-static'),
    t5: numberToken('font-size-t5-static'),
    t6: numberToken('font-size-t6-static'),
    t7: numberToken('font-size-t7-static'),
    t8: numberToken('font-size-t8-static'),
    t9: numberToken('font-size-t9-static'),
    t10: numberToken('font-size-t10-static'),
  };
}

export function buildFontWeightTokens() {
  return Object.fromEntries(
    prefixedTokenEntries(
      mossyDefaultScaleValues,
      'font-weight-',
      (key) => resolveCssValue(key, mossyDefaultScaleValues) as MossyFontWeight,
    ),
  );
}

export function buildLineHeightTokens() {
  return {
    ...buildScaleNumberGroup('line-height-'),
    t1: numberToken('line-height-t1-static'),
    t2: numberToken('line-height-t2-static'),
    t3: numberToken('line-height-t3-static'),
    t4: numberToken('line-height-t4-static'),
    t5: numberToken('line-height-t5-static'),
    t6: numberToken('line-height-t6-static'),
    t7: numberToken('line-height-t7-static'),
    t8: numberToken('line-height-t8-static'),
    t9: numberToken('line-height-t9-static'),
    t10: numberToken('line-height-t10-static'),
  };
}

export function buildTextStyles(): Record<MossyTextStyleName, MossyTextStyle> {
  return Object.fromEntries(
    Object.entries(mossyDefaultTextStyleDefinitions).map(([name, style]) => [
      name,
      {
        fontSize: numberToken(style.fontSize.replace(/^var\(--mossy-|\)$/g, '')),
        lineHeight: numberToken(style.lineHeight.replace(/^var\(--mossy-|\)$/g, '')),
        fontWeight: resolveCssValue(
          style.fontWeight.replace(/^var\(--mossy-|\)$/g, ''),
          mossyDefaultScaleValues,
        ) as MossyFontWeight,
      },
    ]),
  ) as Record<MossyTextStyleName, MossyTextStyle>;
}
