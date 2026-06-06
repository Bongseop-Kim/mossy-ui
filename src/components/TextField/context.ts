import { createContext, use } from 'react';

import { resolveMossyColor } from '../../foundation/component-tokens';
import type { MossyTheme } from '../../foundation/theme';
import type {
  MossyTextFieldContextValue,
  MossyTextFieldPrefixIconProps,
  MossyTextFieldPrefixTextProps,
} from './types';

export const TextFieldContext = createContext<MossyTextFieldContextValue | null>(null);

export function useTextFieldContext() {
  return use(TextFieldContext);
}

export function affixIconColor(
  context: MossyTextFieldContextValue | null,
  color: MossyTextFieldPrefixIconProps['color'],
) {
  if (color != null) return color;
  if (context?.disabled) return 'fg.disabled';
  if (context?.invalid) return 'fg.critical';

  return 'fg.neutralSubtle';
}

export function affixTextColor(
  context: MossyTextFieldContextValue | null,
  color: MossyTextFieldPrefixTextProps['color'],
) {
  if (color != null) return color;
  if (context?.disabled) return 'fg.disabled';
  if (context?.invalid) return 'fg.critical';

  return context?.color ?? 'fg.neutral';
}

export function resolveColor(theme: MossyTheme, value: string) {
  return resolveMossyColor(theme, value) ?? value;
}
