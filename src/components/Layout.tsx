import { Column as ExpoColumn, Row as ExpoRow } from '@expo/ui';
import type { ComponentProps } from 'react';

import { useMossyTheme } from '../theme';

export type MossyColumnProps = ComponentProps<typeof ExpoColumn>;
export type MossyRowProps = ComponentProps<typeof ExpoRow>;

export function Column({ spacing, ...props }: MossyColumnProps) {
  const theme = useMossyTheme();

  return <ExpoColumn spacing={spacing ?? theme.spacing.md} {...props} />;
}

export function Row({ spacing, ...props }: MossyRowProps) {
  const theme = useMossyTheme();

  return <ExpoRow spacing={spacing ?? theme.spacing.md} {...props} />;
}

