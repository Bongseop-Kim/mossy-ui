import { TextFieldInput } from './Input';
import { TextFieldPrefixIcon } from './PrefixIcon';
import { TextFieldPrefixText } from './PrefixText';
import { TextFieldRoot } from './Root';
import { TextFieldSuffixIcon } from './SuffixIcon';
import { TextFieldSuffixText } from './SuffixText';
import { TextFieldTextarea } from './Textarea';

export const TextField = {
  Root: TextFieldRoot,
  Input: TextFieldInput,
  Textarea: TextFieldTextarea,
  PrefixIcon: TextFieldPrefixIcon,
  PrefixText: TextFieldPrefixText,
  SuffixIcon: TextFieldSuffixIcon,
  SuffixText: TextFieldSuffixText,
} as const;
