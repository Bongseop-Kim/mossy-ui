import { SegmentedButton, SingleChoiceSegmentedButtonRow, Text } from '@expo/ui/jetpack-compose';
import { testID as testIDModifier } from '@expo/ui/jetpack-compose/modifiers';

import type { MossySegmentedControlProps } from './types';

/** 단일 선택 세그먼트 컨트롤. Material 3 `SegmentedButton`으로 렌더된다. */
export function SegmentedControl({
  options,
  selectedIndex,
  onSelectedIndexChange,
  disabled = false,
  testID,
  modifiers = [],
}: MossySegmentedControlProps) {
  return (
    <SingleChoiceSegmentedButtonRow
      modifiers={testID == null ? modifiers : [...modifiers, testIDModifier(testID)]}>
      {options.map((option, index) => (
        <SegmentedButton
          key={index}
          selected={index === selectedIndex}
          onClick={() => onSelectedIndexChange(index)}
          enabled={!disabled}>
          <SegmentedButton.Label>
            <Text>{option}</Text>
          </SegmentedButton.Label>
        </SegmentedButton>
      ))}
    </SingleChoiceSegmentedButtonRow>
  );
}

export * from './types';
