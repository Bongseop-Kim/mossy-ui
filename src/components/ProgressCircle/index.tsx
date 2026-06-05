import type { MossyProgressCircleProps } from './types';

/** iOS(SwiftUI `ProgressView`)·Android(Compose `CircularProgressIndicator`) 전용 — 웹은 지원 범위 밖이라 렌더하지 않는다. */
export function ProgressCircle(_props: MossyProgressCircleProps) {
  return null;
}

export * from './types';
