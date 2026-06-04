import { Button as ExpoButton } from '@expo/ui';
import type { ComponentProps } from 'react';

import { useMossyTheme } from '../theme';
import type { MossyTheme } from '../tokens';

export type MossyButtonProps = ComponentProps<typeof ExpoButton>;

function getButtonVariantStyle(
  theme: MossyTheme,
  variant: NonNullable<MossyButtonProps['variant']>,
) {
  switch (variant) {
    case 'outlined':
      return {
        backgroundColor: 'transparent',
        borderColor: theme.colors.border,
        borderWidth: 1,
      };
    case 'text':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
      };
    case 'filled':
    default:
      return {
        backgroundColor: theme.colors.accent,
        borderColor: theme.colors.accent,
        borderWidth: 1,
      };
  }
}

export function Button({
  disabled,
  style,
  variant = 'filled',
  ...props
}: MossyButtonProps) {
  const theme = useMossyTheme();

  return (
    <ExpoButton
      disabled={disabled}
      style={{
        borderRadius: theme.radius.control,
        height: theme.size.controlHeight,
        opacity: disabled ? theme.opacity.disabled : 1,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        ...getButtonVariantStyle(theme, variant),
        ...style,
      }}
      variant={variant}
      {...props}
    />
  );
}
