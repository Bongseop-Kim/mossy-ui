import { fillMaxWidth, weight } from '@expo/ui/jetpack-compose/modifiers';

import { TextFieldInputBase } from './Input.shared';
import type { MossyTextFieldInputProps } from './types';

const INPUT_MODIFIERS = [weight(1), fillMaxWidth()];

export function TextFieldInput(props: MossyTextFieldInputProps) {
  return <TextFieldInputBase inputModifiers={INPUT_MODIFIERS} {...props} />;
}
