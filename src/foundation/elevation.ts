import { prefixedTokenEntries, toShadow } from './utils';
import { modeValue } from './color';

export function buildShadowGroup(modeVariables: Record<string, string>) {
  return Object.fromEntries(
    prefixedTokenEntries(modeVariables, 'shadow-', (key) =>
      toShadow(modeValue(key, modeVariables)),
    ),
  );
}
