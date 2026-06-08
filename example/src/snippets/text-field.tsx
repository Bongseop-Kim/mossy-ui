import type { ReactNode } from 'react';

import {
  Text,
  TextField as MossyTextField,
  VStack,
  type MossyTextFieldInputProps,
  type MossyTextFieldRootProps,
  type MossyTextFieldTextareaProps,
} from 'mossy-ui';

export type TextFieldProps = Omit<MossyTextFieldRootProps, 'children'> & {
  children: ReactNode;
  label?: string;
  description?: string;
  errorMessage?: string;
};

export type TextFieldInputProps = MossyTextFieldInputProps;
export type TextFieldTextareaProps = MossyTextFieldTextareaProps;

export function TextField({
  children,
  label,
  description,
  errorMessage,
  invalid = false,
  ...rootProps
}: TextFieldProps) {
  const hasErrorMessage = invalid ? errorMessage != null : false;
  const supportingMessage = hasErrorMessage ? errorMessage : description;
  const supportingColor = hasErrorMessage ? 'fg.critical' : 'fg.neutralMuted';

  return (
    <VStack gap="x2">
      {label != null ? (
        <Text textStyle="t3Bold" color={invalid ? 'fg.critical' : 'fg.neutral'}>
          {label}
        </Text>
      ) : null}
      <MossyTextField.Root invalid={invalid} {...rootProps}>
        {children}
      </MossyTextField.Root>
      {supportingMessage != null ? (
        <Text textStyle="t2Regular" color={supportingColor}>
          {supportingMessage}
        </Text>
      ) : null}
    </VStack>
  );
}

export function TextFieldInput(props: TextFieldInputProps) {
  return <MossyTextField.Input {...props} />;
}

export function TextFieldTextarea(props: TextFieldTextareaProps) {
  return <MossyTextField.Textarea {...props} />;
}
