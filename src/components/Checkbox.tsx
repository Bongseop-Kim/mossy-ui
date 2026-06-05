import { Checkbox as ExpoCheckbox } from '@expo/ui';
import type { ComponentProps } from 'react';

export type MossyCheckboxProps = ComponentProps<typeof ExpoCheckbox>;

/** 선택/해제 체크박스 컨트롤. universal `Checkbox`의 pass-through 래퍼. */
export function Checkbox(props: MossyCheckboxProps) {
  return <ExpoCheckbox {...props} />;
}
