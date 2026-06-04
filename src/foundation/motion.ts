import { mossyDefaultScaleValues } from './default-token-values';
import {
  prefixedTokenEntries,
  resolveCssValue,
  toMilliseconds,
  toTimingFunction,
} from './utils';

export function durationToken(key: string) {
  return toMilliseconds(resolveCssValue(key, mossyDefaultScaleValues));
}

export function timingFunctionToken(key: string) {
  return toTimingFunction(resolveCssValue(key, mossyDefaultScaleValues));
}

export function buildDurationGroup() {
  return Object.fromEntries(
    prefixedTokenEntries(mossyDefaultScaleValues, 'duration-', durationToken),
  );
}

export function buildTimingFunctionGroup() {
  return Object.fromEntries(
    prefixedTokenEntries(
      mossyDefaultScaleValues,
      'timing-function-',
      timingFunctionToken,
    ),
  );
}
