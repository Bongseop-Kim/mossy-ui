import type { MossyZStackProps } from './types';

/** iOS(`ZStack`)·Android(Compose `Box`) 전용 — 웹은 지원 범위 밖이라 렌더하지 않는다. */
export function ZStack(_props: MossyZStackProps) {
  return null;
}

export type { MossyZStackProps } from './types';
export type { MossyLayoutRadiusToken } from '../surfaceProps.shared';
