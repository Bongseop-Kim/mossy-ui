import { createTextField } from './shared';

const textField = createTextField({ inputModifiers: [] });

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
