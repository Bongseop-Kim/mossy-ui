# Snippets

자주 쓰는 compound component 조합을 앱 코드로 복사해 쓰기 위한 가이드.

## 원칙

- **Core 우선** — `mossy-ui` 패키지의 정식 API는 compound component를 유지한다.
- **Snippet 분리** — snippet은 패키지 export가 아니라 `snippets/`에서 앱 코드로 복사하는 DX wrapper다.
- **복사 후 소유** — snippet 파일은 소비자 앱이 수정·확장한다.
- **좁은 조합** — snippet은 자주 반복되는 조합만 다루고, 세부 커스터마이징은 core part children으로 유지한다.
- **토큰 유지** — snippet props는 Mossy 토큰 prop을 그대로 전달한다.

## TextField

`snippets/text-field.tsx`는 `TextField.Root`와 `TextField.Input`을 field 패턴으로 감싼다.

| Snippet | Core 대응 | 역할 |
| --- | --- | --- |
| `TextField` | `TextField.Root` + `VStack` + `Text` | label, description, error message, root state를 묶는다 |
| `TextFieldInput` | `TextField.Input` | 입력 part를 짧은 이름으로 재노출한다 |
| `TextFieldTextarea` | `TextField.Textarea` | multiline 입력 part를 짧은 이름으로 재노출한다 |

## 사용 방식

```tsx
import { TextField, TextFieldInput } from './snippets/text-field';

export function ProfileNameField() {
  return (
    <TextField label="이름" description="프로필에 표시되는 이름입니다.">
      <TextFieldInput placeholder="이름을 입력하세요" />
    </TextField>
  );
}
```

## 오류 상태

```tsx
import { TextField, TextFieldInput } from './snippets/text-field';

export function InvalidNameField() {
  return (
    <TextField label="이름" invalid errorMessage="이름을 입력하세요.">
      <TextFieldInput placeholder="이름을 입력하세요" />
    </TextField>
  );
}
```

## Core 확장

Snippet은 children을 그대로 전달하므로 affix part를 함께 쓴다.

```tsx
import { TextField as MossyTextField } from 'mossy-ui';
import { TextField, TextFieldInput } from './snippets/text-field';

export function PriceField() {
  return (
    <TextField label="가격">
      <MossyTextField.PrefixText>₩</MossyTextField.PrefixText>
      <TextFieldInput keyboardType="number-pad" placeholder="0" />
    </TextField>
  );
}
```

## Variant 대응

Seed snippet의 `variant="underline"` 같은 web CSS variant는 Mossy snippet v1에서 별도 prop으로 제공하지 않는다. 필요한 경우 `TextField`가 전달하는 root token props로 앱에서 고정 조합을 만든다.

```tsx
import { TextField, TextFieldInput } from './snippets/text-field';

export function UnderlineNameField() {
  return (
    <TextField
      label="이름"
      backgroundColor="bg.transparent"
      paddingHorizontal={0}
      borderWidth={0}
      radius={0}>
      <TextFieldInput placeholder="이름을 입력하세요" />
    </TextField>
  );
}
```
