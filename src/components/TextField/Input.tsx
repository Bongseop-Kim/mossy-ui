import type { MossyModifier } from '../../foundation/modifier';
import { TextFieldInputBase } from './Input.shared';
import type { MossyTextFieldInputProps } from './types';

const INPUT_MODIFIERS: readonly MossyModifier[] = [];

export function TextFieldInput(props: MossyTextFieldInputProps) {
  return <TextFieldInputBase inputModifiers={INPUT_MODIFIERS} {...props} />;
}
