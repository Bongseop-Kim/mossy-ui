import { Row } from '@expo/ui';

import { resolveMossyDimension } from '../../foundation/component-tokens';
import { useMossyTheme } from '../../theme';
import { resolveMossyLayoutSurfaceStyle } from '../Layout/surface.shared';
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
  const resolvedBorderColor = borderColor ?? (invalid ? 'stroke.criticalSolid' : 'stroke.neutralSubtle');

  return (
    <TextFieldContext value={context}>
      <Row
        alignment={alignment}
        spacing={resolveMossyDimension(theme, spacing)}
        disabled={disabled}
        testID={testID}
        modifiers={modifiers}
        style={resolveMossyLayoutSurfaceStyle(theme, {
          height,
          paddingHorizontal,
          paddingVertical,
          backgroundColor,
          borderColor: resolvedBorderColor,
          radius,
          borderWidth,
        })}>
        {children}
      </Row>
    </TextFieldContext>
  );
}
