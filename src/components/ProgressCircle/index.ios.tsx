import { ProgressView } from '@expo/ui/swift-ui';
import { progressViewStyle, tint } from '@expo/ui/swift-ui/modifiers';

import { resolveMossyColor } from '../../foundation/component-tokens';
import type { MossyProgressCircleProps } from './types';
import { useMossyTheme } from '../../theme';

/** 원형 진행 표시기. SwiftUI `ProgressView`(circular 스타일)로 렌더된다. */
export function ProgressCircle({
  value,
  color = 'fg.brand',
  testID,
  modifiers = [],
}: MossyProgressCircleProps) {
  const theme = useMossyTheme();
  const resolvedColor = resolveMossyColor(theme, color) ?? color;

  return (
    <ProgressView
      value={value}
      testID={testID}
      modifiers={[progressViewStyle('circular'), tint(resolvedColor), ...modifiers]}
    />
  );
}

export * from './types';
