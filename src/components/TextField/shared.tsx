import { TextInput } from '@expo/ui';
import type { UniversalFontWeight, UniversalTextStyle } from '@expo/ui';
import { createContext, use } from 'react';
import type { ComponentProps } from 'react';

import {
  resolveMossyColor,
  resolveMossyDimension,
  toMossyTextStyleName,
} from '../../foundation/component-tokens';
import type { MossyModifier } from '../../foundation/modifier';
import type { MossyTheme } from '../../foundation/theme';
import { useMossyTheme } from '../../theme';
import { Icon } from '../Iconography/Icon';
import { HStack } from '../Layout/HStack';
import { Text } from '../Typography/Text';
import type {
  MossyTextFieldContextValue,
  MossyTextFieldInputProps,
  MossyTextFieldPrefixIconProps,
  MossyTextFieldPrefixTextProps,
  MossyTextFieldRootProps,
  MossyTextFieldSuffixIconProps,
  MossyTextFieldSuffixTextProps,
  MossyTextFieldTextareaProps,
} from './types';

const TextFieldContext = createContext<MossyTextFieldContextValue | null>(null);
type TextInputProps = ComponentProps<typeof TextInput>;

type TextFieldPlatformConfig = {
  inputModifiers: readonly MossyModifier[];
};

export function createTextField({ inputModifiers }: TextFieldPlatformConfig) {
  function TextFieldRoot({
    children,
    value,
    defaultValue,
    onValueChange,
    disabled = false,
    invalid = false,
    readOnly = false,
    textStyle = 't4Regular',
    color = 'fg.neutral',
    placeholderColor = 'fg.neutralSubtle',
    backgroundColor = 'bg.layerDefault',
    borderColor,
    height,
    paddingHorizontal = 'x4',
    paddingVertical = 'x3',
    radius = 'r3',
    borderWidth = 1,
    spacing = 'x2',
    alignment = 'center',
    style,
    testID,
    modifiers,
  }: MossyTextFieldRootProps) {
    const theme = useMossyTheme();
    const context: MossyTextFieldContextValue = {
      value,
      defaultValue,
      onValueChange,
      disabled,
      invalid,
      readOnly,
      textStyle,
      color,
      placeholderColor,
    };
    const resolvedRadius = typeof radius === 'number' ? radius : theme.radius[radius];
    const resolvedBorderColor =
      borderColor ?? (invalid ? 'stroke.criticalSolid' : 'stroke.neutralSubtle');

    return (
      <TextFieldContext value={context}>
        <HStack
          alignment={alignment}
          spacing={spacing}
          disabled={disabled}
          testID={testID}
          modifiers={modifiers}
          style={{
            height: resolveMossyDimension(theme, height),
            paddingHorizontal: resolveMossyDimension(theme, paddingHorizontal),
            paddingVertical: resolveMossyDimension(theme, paddingVertical),
            backgroundColor: resolveColor(theme, backgroundColor),
            borderColor: resolveColor(theme, resolvedBorderColor),
            borderRadius: resolvedRadius,
            borderWidth: resolveMossyDimension(theme, borderWidth),
            ...style,
          }}>
          {children}
        </HStack>
      </TextFieldContext>
    );
  }

  function TextFieldInput({
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
  }: MossyTextFieldInputProps) {
    const context = useTextFieldContext();
    const theme = useMossyTheme();
    const base =
      theme.typography[toMossyTextStyleName(textStyle ?? context?.textStyle ?? 't4Regular')];
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

  function TextFieldTextarea({
    autoresize = true,
    numberOfLines,
    rows,
    ...props
  }: MossyTextFieldTextareaProps) {
    const fixedLines = autoresize ? numberOfLines : (numberOfLines ?? rows ?? 3);

    return <TextFieldInput multiline numberOfLines={fixedLines} rows={rows} {...props} />;
  }

  function TextFieldPrefixIcon(props: MossyTextFieldPrefixIconProps) {
    const context = useTextFieldContext();

    return <Icon size="x5" color={affixIconColor(context, props.color)} {...props} />;
  }

  function TextFieldSuffixIcon(props: MossyTextFieldSuffixIconProps) {
    const context = useTextFieldContext();

    return <Icon size="x5" color={affixIconColor(context, props.color)} {...props} />;
  }

  function TextFieldPrefixText(props: MossyTextFieldPrefixTextProps) {
    const context = useTextFieldContext();

    return (
      <Text
        textStyle={context?.textStyle}
        color={affixTextColor(context, props.color)}
        {...props}
      />
    );
  }

  function TextFieldSuffixText(props: MossyTextFieldSuffixTextProps) {
    const context = useTextFieldContext();

    return (
      <Text
        textStyle={context?.textStyle}
        color={affixTextColor(context, props.color)}
        {...props}
      />
    );
  }

  const TextField = {
    Root: TextFieldRoot,
    Input: TextFieldInput,
    Textarea: TextFieldTextarea,
    PrefixIcon: TextFieldPrefixIcon,
    PrefixText: TextFieldPrefixText,
    SuffixIcon: TextFieldSuffixIcon,
    SuffixText: TextFieldSuffixText,
  } as const;

  return {
    TextField,
    TextFieldRoot,
    TextFieldInput,
    TextFieldTextarea,
    TextFieldPrefixIcon,
    TextFieldPrefixText,
    TextFieldSuffixIcon,
    TextFieldSuffixText,
  };
}

function useTextFieldContext() {
  return use(TextFieldContext);
}

function affixIconColor(
  context: MossyTextFieldContextValue | null,
  color: MossyTextFieldPrefixIconProps['color'],
) {
  if (color != null) return color;
  if (context?.disabled) return 'fg.disabled';
  if (context?.invalid) return 'fg.critical';

  return 'fg.neutralSubtle';
}

function affixTextColor(
  context: MossyTextFieldContextValue | null,
  color: MossyTextFieldPrefixTextProps['color'],
) {
  if (color != null) return color;
  if (context?.disabled) return 'fg.disabled';
  if (context?.invalid) return 'fg.critical';

  return 'fg.neutralSubtle';
}

function resolveColor(theme: MossyTheme, value: string) {
  return resolveMossyColor(theme, value) ?? value;
}
