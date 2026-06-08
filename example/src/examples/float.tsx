import { Box, Float } from 'mossy-ui';

import { PreviewToken } from './preview-token';

export default function FloatExample() {
  return (
    <Box bg="bg.neutralWeak" borderRadius="r2" height={96}>
      <Float placement="middle-center">
        <PreviewToken label="Float" />
      </Float>
    </Box>
  );
}
