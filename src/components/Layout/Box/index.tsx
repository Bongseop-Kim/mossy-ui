import type { MossyBoxProps } from './types';

/** iOS·Android 전용 — 웹은 지원 범위 밖이라 렌더하지 않는다. */
export function Box(_props: MossyBoxProps) {
  return null;
}

export type { MossyBoxProps } from './types';
export type { MossyLayoutRadiusToken } from '../surfaceProps.shared';
