import { TextFieldInput } from './Input';
import type { MossyTextFieldTextareaProps } from './types';

export function TextFieldTextarea({
  autoresize = true,
  numberOfLines,
  rows,
  ...props
}: MossyTextFieldTextareaProps) {
  const fixedLines = autoresize ? numberOfLines : (numberOfLines ?? rows ?? 3);

  return <TextFieldInput multiline numberOfLines={fixedLines} rows={rows} {...props} />;
}
