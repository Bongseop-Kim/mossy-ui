import { Divider, Text, VStack } from 'mossy-ui';

export default function DividerExample() {
  return (
    <VStack gap="x3">
      <Text textStyle="t4Bold" color="fg.neutral">
        위 영역
      </Text>
      <Divider />
      <Text textStyle="t4Regular" color="fg.neutralMuted">
        아래 영역
      </Text>
    </VStack>
  );
}
