import { Slider as ExpoSlider } from '@expo/ui';
import type { ComponentProps } from 'react';

export type MossySliderProps = ComponentProps<typeof ExpoSlider>;

/** 범위 내 값을 고르는 슬라이더 컨트롤. universal `Slider`의 pass-through 래퍼. */
export function Slider(props: MossySliderProps) {
  return <ExpoSlider {...props} />;
}
