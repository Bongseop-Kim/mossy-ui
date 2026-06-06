import { frame } from '@expo/ui/swift-ui/modifiers';

import { TextFieldInputBase } from './Input.shared';
import type { MossyTextFieldInputProps } from './types';

const FILL = 1_000_000;
const INPUT_MODIFIERS = [frame({ maxWidth: FILL, alignment: 'leading' })];

export function TextFieldInput(props: MossyTextFieldInputProps) {
  return <TextFieldInputBase inputModifiers={INPUT_MODIFIERS} {...props} />;
}
