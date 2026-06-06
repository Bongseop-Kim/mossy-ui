import { Text } from '../Typography/Text';
import { affixTextColor, useTextFieldContext } from './context';
import type { MossyTextFieldSuffixTextProps } from './types';

export function TextFieldSuffixText(props: MossyTextFieldSuffixTextProps) {
  const context = useTextFieldContext();

  return <Text textStyle={context?.textStyle} color={affixTextColor(context, props.color)} {...props} />;
}
