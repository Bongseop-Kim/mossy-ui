import { ProgressCircle, type MossyProgressCircleProps } from './ProgressCircle';

export type MossyLoadingIndicatorProps = Omit<MossyProgressCircleProps, 'value'>;

/**
 * 불확정(Indeterminate) 로딩 스피너. `value` 없는 `ProgressCircle`의 별칭 —
 * loading.md의 'Progress Circle(Indeterminate)'에 해당한다.
 */
export function LoadingIndicator(props: MossyLoadingIndicatorProps) {
  return <ProgressCircle {...props} />;
}
