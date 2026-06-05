import { fillMaxWidth, weight } from '@expo/ui/jetpack-compose/modifiers';

import { createTextField } from './shared';

const textField = createTextField({
  inputModifiers: [weight(1), fillMaxWidth()],
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
