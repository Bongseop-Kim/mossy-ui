import { TextInput } from '@expo/ui';
import type { UniversalFontWeight, UniversalTextStyle } from '@expo/ui';
import type { ComponentProps } from 'react';

import { toMossyTextStyleName } from '../../foundation/component-tokens';
import type { MossyModifier } from '../../foundation/modifier';
import { useMossyTheme } from '../../theme';
import { resolveColor, useTextFieldContext } from './context';
import type { MossyTextFieldInputProps } from './types';

type TextInputProps = ComponentProps<typeof TextInput>;

export function TextFieldInputBase({
  inputModifiers,
  value,
  defaultValue,
  onChangeText,
  editable,
  readOnly,
  textStyle,
  color,
  placeholderColor,
  modifiers,
  underlineColorAndroid,
  style,
  ...props
}: MossyTextFieldInputProps & { inputModifiers: readonly MossyModifier[] }) {
  const context = useTextFieldContext();
  const theme = useMossyTheme();
  const base = theme.typography[toMossyTextStyleName(textStyle ?? context?.textStyle ?? 't4Regular')];
  const resolvedTextStyle: UniversalTextStyle = {
    fontSize: base.fontSize,
    lineHeight: base.lineHeight,
    fontWeight: base.fontWeight as UniversalFontWeight,
    color: resolveColor(theme, color ?? context?.color ?? 'fg.neutral'),
  };
  const resolvedStyle: TextInputProps['style'] = {
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 0,
    ...style,
  };

  return (
    <TextInput
      value={value ?? context?.value}
      defaultValue={defaultValue ?? context?.defaultValue}
      onChangeText={onChangeText ?? context?.onValueChange}
      editable={editable ?? (context?.disabled ? false : undefined)}
      readOnly={readOnly ?? context?.readOnly}
      placeholderTextColor={resolveColor(
        theme,
        placeholderColor ?? context?.placeholderColor ?? 'fg.neutralSubtle',
      )}
      textStyle={resolvedTextStyle}
      style={resolvedStyle}
      underlineColorAndroid={underlineColorAndroid ?? 'transparent'}
      modifiers={[...inputModifiers, ...(modifiers ?? [])]}
      {...props}
    />
  );
}
