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

