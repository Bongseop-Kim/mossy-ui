import { HStack, VStack } from 'mossy-ui';

import { TextField, TextFieldInput, TextFieldTextarea } from '../snippets/text-field';

export default function TextFieldExample() {
  return (
    <VStack gap="x4">
      <HStack gap="x3">
        <TextField label="라벨" description="설명을 써주세요">
          <TextFieldInput placeholder="플레이스홀더" />
        </TextField>
        <TextField label="라벨" invalid errorMessage="오류가 발생한 이유를 써주세요">
          <TextFieldInput placeholder="플레이스홀더" />
        </TextField>
      </HStack>
      <HStack gap="x3">
        <TextField
          description="설명을 써주세요"
          backgroundColor="bg.transparent"
          paddingHorizontal={0}
          borderWidth={0}
          radius={0}>
          <TextFieldInput placeholder="플레이스홀더" />
        </TextField>
        <TextField
          invalid
          errorMessage="오류가 발생한 이유를 써주세요"
          backgroundColor="bg.transparent"
          paddingHorizontal={0}
          borderWidth={0}
          radius={0}>
          <TextFieldTextarea placeholder="여러 줄 입력" autoresize={false} />
        </TextField>
      </HStack>
    </VStack>
  );
}
