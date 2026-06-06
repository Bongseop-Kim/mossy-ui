import { Icon } from '../Iconography/Icon';
import { affixIconColor, useTextFieldContext } from './context';
import type { MossyTextFieldSuffixIconProps } from './types';

export function TextFieldSuffixIcon(props: MossyTextFieldSuffixIconProps) {
  const context = useTextFieldContext();

  return <Icon size="x5" color={affixIconColor(context, props.color)} {...props} />;
}
