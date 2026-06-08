import { HStack, Spacer } from 'mossy-ui';

import { PreviewToken } from './preview-token';

export default function SpacerExample() {
  return (
    <HStack align="center" gap="x2">
      <PreviewToken label="왼쪽" />
      <Spacer flexible />
      <PreviewToken label="오른쪽" />
    </HStack>
  );
}
