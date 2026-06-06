import { useMossyTheme } from '../../theme';
import { HStack } from '../Layout/HStack';
import { TextFieldContext } from './context';
import type { MossyTextFieldContextValue, MossyTextFieldRootProps } from './types';

export function TextFieldRoot({
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
  testID,
  modifiers,
}: MossyTextFieldRootProps) {
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
  const resolvedBorderColor = borderColor ?? (invalid ? 'stroke.criticalSolid' : 'stroke.neutralSubtle');

  return (
    <TextFieldContext value={context}>
      <HStack
        alignment={alignment}
        spacing={spacing}
        disabled={disabled}
        testID={testID}
        modifiers={modifiers}
        height={height}
        paddingHorizontal={paddingHorizontal}
        paddingVertical={paddingVertical}
        backgroundColor={backgroundColor}
        borderColor={resolvedBorderColor}
        radius={radius}
        borderWidth={borderWidth}>
        {children}
      </HStack>
    </TextFieldContext>
  );
}
