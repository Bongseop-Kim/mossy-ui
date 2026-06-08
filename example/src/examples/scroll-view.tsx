import { HStack, ScrollView } from 'mossy-ui';

import { PreviewToken } from './preview-token';

export default function ScrollViewExample() {
  return (
    <ScrollView direction="horizontal" padding="x2">
      <HStack gap="x4">
        <PreviewToken label="동네 소식" />
        <PreviewToken label="중고 거래" />
        <PreviewToken label="알바" />
        <PreviewToken label="부동산" />
        <PreviewToken label="중고차" />
        <PreviewToken label="모임" />
        <PreviewToken label="동네 지도" />
      </HStack>
    </ScrollView>
  );
}
