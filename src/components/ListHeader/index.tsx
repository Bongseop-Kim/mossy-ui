import type { MossyListHeaderProps } from './types';

/** iOS·Android 전용 — 웹은 지원 범위 밖이라 렌더하지 않는다. */
export function ListHeader(_props: MossyListHeaderProps) {
  return null;
}

export * from './types';
