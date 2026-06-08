import { HStack } from 'mossy-ui';

import { PreviewToken } from './preview-token';

export default function HStackExample() {
  return (
    <HStack align="center" gap="x2">
      <PreviewToken label="왼쪽" />
      <PreviewToken label="가운데" />
      <PreviewToken label="오른쪽" />
    </HStack>
  );
}
