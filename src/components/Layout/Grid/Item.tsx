import { Box } from '../Box';
import type { MossyGridItemProps } from './types';

/**
 * Grid 안에서 아이템의 열 배치를 선언하는 compound part.
 * 단독 렌더 시에는 Box surface로 동작한다.
 */
export function GridItem({
  colSpan: _colSpan,
  rowSpan: _rowSpan,
  colStart: _colStart,
  colEnd: _colEnd,
  rowStart: _rowStart,
  rowEnd: _rowEnd,
  ...props
}: MossyGridItemProps) {
  return <Box {...props} />;
}
