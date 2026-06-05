import { frame } from '@expo/ui/swift-ui/modifiers';

import { createTextField } from './shared';

const FILL = 1_000_000;

const textField = createTextField({
  inputModifiers: [frame({ maxWidth: FILL, alignment: 'leading' })],
});

export const {
  TextField,
  TextFieldRoot,
  TextFieldInput,
  TextFieldTextarea,
  TextFieldPrefixIcon,
  TextFieldPrefixText,
  TextFieldSuffixIcon,
  TextFieldSuffixText,
} = textField;

export * from './types';
