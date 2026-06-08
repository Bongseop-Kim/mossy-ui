import { Grid } from 'mossy-ui';

import { PreviewToken } from './preview-token';

export default function GridExample() {
  return (
    <Grid columns={2} gap="x2">
      <PreviewToken label="1" />
      <Grid.Item colSpan="full">
        <PreviewToken label="2 · full" />
      </Grid.Item>
      <PreviewToken label="3" />
      <PreviewToken label="4" />
    </Grid>
  );
}
