import type { MossyBoxProps } from './types';

/** iOS(`ZStack`)·Android(Compose `Box`) 전용 — 웹은 지원 범위 밖이라 렌더하지 않는다. */
export function Box(_props: MossyBoxProps) {
  return null;
}

export * from './types';
