import { toMossyBoxSurfaceProps } from './Box/types';
import type { MossyHStackProps } from './HStack';
import { resolveStackGrow } from './stack';

export function resolveHStackAlign(props: MossyHStackProps) {
  return props.alignItems ?? props.align;
}

export function resolveHStackJustify(props: MossyHStackProps) {
  return props.justifyContent ?? props.justify;
}

export function resolveHStackGrow(props: MossyHStackProps) {
  return resolveStackGrow(props);
}

export function toMossyHStackSurfaceProps(props: MossyHStackProps) {
  return toMossyBoxSurfaceProps({
    ...props,
    backgroundGradient: props.bgGradient ?? props.backgroundGradient,
    backgroundGradientDirection:
      props.bgGradientDirection ?? props.backgroundGradientDirection,
  });
}
