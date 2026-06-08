import { useState } from 'react';

import { SegmentedControl } from 'mossy-ui';

const options = ['추천', '인기', '최신'];

export default function SegmentedControlExample() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SegmentedControl
      options={options}
      selectedIndex={selectedIndex}
      onSelectedIndexChange={setSelectedIndex}
    />
  );
}
