import { useState } from 'react';

import { Checkbox } from 'mossy-ui';

export default function CheckboxExample() {
  const [isLocalOnly, setIsLocalOnly] = useState(true);

  return (
    <Checkbox
      label="가까운 동네만 보기"
      value={isLocalOnly}
      onValueChange={setIsLocalOnly}
    />
  );
}
