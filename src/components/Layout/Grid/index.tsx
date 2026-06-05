import type { MossyGridProps } from './types';

/** iOS(SwiftUI `Grid`)·Android(Compose `Column`/`Row`) 전용 — 웹은 지원 범위 밖이라 렌더하지 않는다. */
export function Grid(_props: MossyGridProps) {
  return null;
}

export * from './types';
