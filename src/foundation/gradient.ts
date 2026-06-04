import { prefixedTokenEntries, toGradient } from './utils';
import { modeValue } from './color';

export function buildGradientGroup(modeVariables: Record<string, string>) {
  return Object.fromEntries(
    prefixedTokenEntries(modeVariables, 'gradient-', (key) =>
      toGradient(modeValue(key, modeVariables)),
    ),
  );
}
