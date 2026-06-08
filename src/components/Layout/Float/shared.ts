import { resolveMossyDimension } from '../../../foundation/component-tokens';
import type { MossyTheme } from '../../../foundation/theme';
import type { MossyAlignment } from '../types';
import type { MossyFloatOffset, MossyFloatPlacement } from './types';

/** Float placement → 9방향 정렬. iOS는 `swiftUIAlignment`로, Android는 `contentAlignment`로 그대로 쓴다. */
export const floatPlacementAlignment: Record<MossyFloatPlacement, MossyAlignment> = {
  'top-start': 'topStart',
  'top-center': 'topCenter',
  'top-end': 'topEnd',
  'middle-start': 'centerStart',
  'middle-center': 'center',
  'middle-end': 'centerEnd',
  'bottom-start': 'bottomStart',
  'bottom-center': 'bottomCenter',
  'bottom-end': 'bottomEnd',
};

/** placement 방향에 맞춰 오프셋 부호를 반전한다 (`-end`는 왼쪽, `bottom`은 위쪽). */
export function resolveFloatOffset(
  theme: MossyTheme,
  placement: MossyFloatPlacement,
  offsetX: MossyFloatOffset,
  offsetY: MossyFloatOffset,
): { x: number; y: number } {
  const resolvedX = resolveMossyDimension(theme, offsetX) ?? 0;
  const resolvedY = resolveMossyDimension(theme, offsetY) ?? 0;

  return {
    x: placement.endsWith('-end') ? -resolvedX : resolvedX,
    y: placement.startsWith('bottom') ? -resolvedY : resolvedY,
  };
}
