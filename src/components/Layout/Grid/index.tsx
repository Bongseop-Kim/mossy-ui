import type { MossyGridProps } from './types';
import { GridItem } from './Item';

/** iOS(SwiftUI `Grid`)·Android(Compose `Column`/`Row`) 전용 — 웹은 지원 범위 밖이라 렌더하지 않는다. */
export function Grid(_props: MossyGridProps) {
  return null;
}

Grid.Item = GridItem;
export { GridItem };
export type {
  MossyGridAutoFlow,
  MossyGridDisplay,
  MossyGridItemLine,
  MossyGridItemProps,
  MossyGridItemSpan,
  MossyGridProps,
  MossyGridSizeConstraint,
  MossyGridTrackCount,
} from './types';
