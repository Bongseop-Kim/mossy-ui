# Composition

컴포넌트를 조합하여 복잡한 UI를 구성하기 위한 합성 가이드.

## 원칙

- **구현 기술 선택** — Mossy 컴포넌트는 React Native primitive와 Expo UI를 요구사항에 맞게 선택한다. RN primitive로 충분하면 RN 레이어에서 조합하고, 네이티브 컨트롤·Host 트리·modifier가 필요하면 Expo UI를 사용한다.
- **pass-through 래퍼** — Expo UI 래퍼를 만들 때는 props를 `ComponentProps<typeof ExpoX>` 형태로 전달하고, 테마 기본값만 내부에서 주입한다.
- **children 중첩** — 합성의 기본 수단이다. 네이티브 레이아웃 컴포넌트 안에 자식을 배치하여 UI를 구성한다.

```tsx
import { Host, VStack, Text, Button } from "@expo/ui/swift-ui";

<Host matchContents>
  <VStack gap="x2">
    <Text>제목</Text>
    <Button label="확인" onPress={handlePress} />
  </VStack>
</Host>;
```

## 시맨틱

- **React Native 레이어** — 시맨틱이 필요하면 `role`, `accessibilityLabel` 등 접근성 props를 사용한다.
- **Expo UI 네이티브** — Expo UI를 선택한 컴포넌트는 SwiftUI / Compose가 접근성 시맨틱을 기본으로 처리한다.

```tsx
import { Text as RNText } from "react-native";

// 접근성 role로 의미를 부여한다
<RNText role="heading">제목</RNText>;
```

## `asChild` Prop

`asChild` prop은 컴포넌트의 기능(props, 이벤트 핸들러, ref)을 자식 요소에 합성하는 패턴이다. Mossy의 React Native 레이어 조합형 컴포넌트와 expo-router의 `Link`가 지원한다.

### 적용 범위

`asChild`는 props를 자식에 주입하는 JavaScript 레이어의 패턴이다.

- **적용 대상** — `Pressable`, `View` 등 React Native 컴포넌트와 그 래퍼
- **경계** — `Host` 내부의 Expo UI 네이티브 트리는 이벤트와 렌더링을 네이티브가 처리하므로 합성 범위 밖이다

### 라우터와 조합하기

```tsx
import { Pressable, Text as RNText } from "react-native";
import { Link } from "expo-router";

// expo-router의 Link에 Pressable 기반 컴포넌트를 합성한다
<Link href="/create" asChild>
  <Pressable>
    <RNText>새 글 쓰기</RNText>
  </Pressable>
</Link>;
```

`asChild`로 합성되는 컴포넌트는 두 가지 원칙을 따라야 한다.

### 1. 컴포넌트는 props를 전개해야 한다

`asChild`는 기능 제공과 접근성 유지를 위해 고유의 props와 이벤트 핸들러를 자식에게 전달한다. 컴포넌트가 이 props를 받아 전개하지 않으면 동작하지 않는다.

```tsx
import { Pressable, type PressableProps } from "react-native";

// Don't: 전달받은 props가 사라진다
const MyButton = () => <Pressable />;

// Do: 모든 props를 전개한다
const MyButton = (props: PressableProps) => <Pressable {...props} />;
```

`asChild`의 자식이 되는 컴포넌트는 항상 모든 props를 전개(spread)한다.

### 2. 컴포넌트는 ref를 전달해야 한다

요소 측정, 포커스 이동 등을 위해 `ref`가 전달될 수 있다. React 19에서는 `ref`가 일반 prop이므로 `forwardRef` 없이 props 전개만으로 함께 전달된다.

```tsx
import { type Ref } from "react";
import { Pressable, type PressableProps, type View } from "react-native";

type MyButtonProps = PressableProps & { ref?: Ref<View> };

// React 19 — props 전개에 ref가 포함된다
const MyButton = (props: MyButtonProps) => <Pressable {...props} />;

// ref를 별도로 다뤄야 한다면 명시적으로 전달한다
const MeasuredButton = ({ ref, ...props }: MyButtonProps) => (
  <Pressable {...props} ref={ref} />
);
```

Mossy UI는 React 19 이상을 요구하므로 `forwardRef`를 사용하지 않는다.

## Expo UI 네이티브 트리 합성

Expo UI를 선택한 컴포넌트는 `Host` 경계 안에서 네이티브(SwiftUI / Compose) 트리로 렌더링된다. 합성 시 다음을 지킨다.

- **Host 경계** — 네이티브 트리는 `Host`에서 시작하고, `Host` 내부에는 Expo UI 컴포넌트만 중첩한다.
- **레이어 분리** — 두 레이어를 섞을 때는 별도의 `Host`로 분리하고 React Native 레이아웃으로 배치한다.
- **modifier 스타일링** — 스타일 확장은 modifier(`padding`, `background` 등)로 한다.

```tsx
import { View, Text as RNText } from "react-native";
import { Host, Button } from "@expo/ui/swift-ui";
import { padding } from "@expo/ui/swift-ui/modifiers";

// 레이어를 분리한 합성
<View style={styles.container}>
  <RNText>React Native 레이어</RNText>
  <Host matchContents>
    <Button
      label="네이티브 레이어"
      onPress={handlePress}
      modifiers={[padding({ all: 8 })]}
    />
  </Host>
</View>;
```
