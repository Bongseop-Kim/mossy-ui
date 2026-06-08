import { Text } from 'mossy-ui';

export function PreviewToken({ label }: { label: string }) {
  return (
    <Text textStyle="t3Bold" color="fg.neutral" align="center">
      {label}
    </Text>
  );
}
