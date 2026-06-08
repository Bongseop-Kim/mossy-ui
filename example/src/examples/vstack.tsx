import { VStack } from 'mossy-ui';

import { PreviewToken } from './preview-token';

export default function VStackExample() {
  return (
    <VStack gap="x2">
      <PreviewToken label="첫 번째" />
      <PreviewToken label="두 번째" />
      <PreviewToken label="세 번째" />
    </VStack>
  );
}
