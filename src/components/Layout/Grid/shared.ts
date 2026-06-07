import { toMossyBoxSurfaceProps } from '../Box/types';
import type { MossyGridProps } from './types';

export function toMossyGridSurfaceProps(props: MossyGridProps) {
  return toMossyBoxSurfaceProps({
    ...props,
    display: props.display === 'none' ? 'none' : 'flex',
    // Seed useStyleProps resolves gradient shorthands as `bgGradient ?? backgroundGradient`.
    backgroundGradient: props.bgGradient ?? props.backgroundGradient,
    backgroundGradientDirection: props.bgGradientDirection ?? props.backgroundGradientDirection,
  });
}
