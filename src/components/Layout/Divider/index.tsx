import type { MossyDividerProps } from './types';

/** iOS(`Rectangle`)·Android(Compose `Divider`) 전용 — 웹은 지원 범위 밖이라 렌더하지 않는다. */
export function Divider(_props: MossyDividerProps) {
  return null;
}

export * from './types';
