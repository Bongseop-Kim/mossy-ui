import { Text } from '../Typography/Text';
import { affixTextColor, useTextFieldContext } from './context';
import type { MossyTextFieldPrefixTextProps } from './types';

export function TextFieldPrefixText(props: MossyTextFieldPrefixTextProps) {
  const context = useTextFieldContext();

  return <Text textStyle={context?.textStyle} color={affixTextColor(context, props.color)} {...props} />;
}
