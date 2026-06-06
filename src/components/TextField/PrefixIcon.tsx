import { Icon } from '../Iconography/Icon';
import { affixIconColor, useTextFieldContext } from './context';
import type { MossyTextFieldPrefixIconProps } from './types';

export function TextFieldPrefixIcon(props: MossyTextFieldPrefixIconProps) {
  const context = useTextFieldContext();

  return <Icon size="x5" color={affixIconColor(context, props.color)} {...props} />;
}
