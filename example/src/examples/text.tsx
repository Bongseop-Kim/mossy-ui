import { Text, VStack } from 'mossy-ui';

export default function TextExample() {
  return (
    <VStack gap="x2">
      <Text textStyle="screenTitle" color="fg.neutral">
        화면 제목
      </Text>
      <Text textStyle="t5Bold" color="fg.brand">
        강조 텍스트
      </Text>
      <Text textStyle="t4Regular" color="fg.neutralMuted">
        설명 문장은 짧고 이해하기 쉽게 씁니다.
      </Text>
    </VStack>
  );
}
