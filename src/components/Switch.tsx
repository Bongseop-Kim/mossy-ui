import { Switch as ExpoSwitch } from '@expo/ui';
import type { ComponentProps } from 'react';

export type MossySwitchProps = ComponentProps<typeof ExpoSwitch>;

/** 켜짐/꺼짐 토글 컨트롤. universal `Switch`의 pass-through 래퍼. */
export function Switch(props: MossySwitchProps) {
  return <ExpoSwitch {...props} />;
}
