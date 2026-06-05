import { Rectangle } from '@expo/ui/swift-ui';
import { foregroundStyle, frame, padding } from '@expo/ui/swift-ui/modifiers';

import { resolveMossyColor, resolveMossyDimension } from '../../../foundation/component-tokens';
import type { MossyDividerProps } from './types';
import { useMossyTheme } from '../../../theme';

/**
 * 콘텐츠를 시각적으로 구분하는 선.
 * SwiftUI 네이티브 Divider는 두께·색 제어가 불가(hairline 고정)해 `Rectangle`로 렌더한다.
 */
export function Divider({
  orientation = 'horizontal',
  thickness = 1,
  color = 'stroke.neutralMuted',
  inset,
  testID,
  modifiers = [],
}: MossyDividerProps) {
  const theme = useMossyTheme();
  const resolvedColor = resolveMossyColor(theme, color) ?? color;
  const resolvedInset = resolveMossyDimension(theme, inset);
  const resolvedThickness = resolveMossyDimension(theme, thickness) ?? 1;

  return (
    <Rectangle
      testID={testID}
      modifiers={[
        foregroundStyle(resolvedColor),
        frame(
          orientation === 'horizontal'
            ? { height: resolvedThickness }
            : { width: resolvedThickness },
        ),
        ...(resolvedInset == null
          ? []
          : [
              padding(
                orientation === 'horizontal'
                  ? { horizontal: resolvedInset }
                  : { vertical: resolvedInset },
              ),
            ]),
        ...modifiers,
      ]}
    />
  );
}

export * from './types';
