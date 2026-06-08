import { Flex } from 'mossy-ui';

import { PreviewToken } from './preview-token';

export default function FlexExample() {
  return (
    <Flex direction="row" align="center" gap="x2">
      <PreviewToken label="A" />
      <PreviewToken label="B" />
      <PreviewToken label="C" />
    </Flex>
  );
}
