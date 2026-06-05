import { CircularProgressIndicator } from '@expo/ui/jetpack-compose';
import { testID as testIDModifier } from '@expo/ui/jetpack-compose/modifiers';

import { resolveMossyColor } from '../../foundation/component-tokens';
import type { MossyProgressCircleProps } from './types';
import { useMossyTheme } from '../../theme';

/** 원형 진행 표시기. Compose `CircularProgressIndicator`로 렌더된다. */
export function ProgressCircle({
  value,
  color = 'fg.brand',
  trackColor,
  testID,
  modifiers = [],
}: MossyProgressCircleProps) {
  const theme = useMossyTheme();
  const resolvedColor = resolveMossyColor(theme, color) ?? color;
  const resolvedTrackColor =
    trackColor != null ? (resolveMossyColor(theme, trackColor) ?? trackColor) : undefined;

  return (
    <CircularProgressIndicator
      progress={value}
      color={resolvedColor}
      trackColor={resolvedTrackColor}
      modifiers={testID == null ? modifiers : [...modifiers, testIDModifier(testID)]}
    />
  );
}

export * from './types';
