import { Picker, Text } from '@expo/ui/swift-ui';
import { disabled as disabledModifier, pickerStyle, tag } from '@expo/ui/swift-ui/modifiers';

import type { MossySegmentedControlProps } from './types';

/** 단일 선택 세그먼트 컨트롤. SwiftUI `Picker`(segmented 스타일)로 렌더된다. */
export function SegmentedControl({
  options,
  selectedIndex,
  onSelectedIndexChange,
  disabled = false,
  testID,
  modifiers = [],
}: MossySegmentedControlProps) {
  return (
    <Picker<number>
      selection={selectedIndex}
      onSelectionChange={onSelectedIndexChange}
      testID={testID}
      modifiers={[
        pickerStyle('segmented'),
        ...(disabled ? [disabledModifier(true)] : []),
        ...modifiers,
      ]}>
      {options.map((option, index) => (
        <Text key={index} modifiers={[tag(index)]}>
          {option}
        </Text>
      ))}
    </Picker>
  );
}

export * from './types';
