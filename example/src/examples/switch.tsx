import { useState } from 'react';

import { Switch } from 'mossy-ui';

export default function SwitchExample() {
  const [allowsNotice, setAllowsNotice] = useState(false);

  return (
    <Switch
      label="새 소식 알림 받기"
      value={allowsNotice}
      onValueChange={setAllowsNotice}
    />
  );
}
