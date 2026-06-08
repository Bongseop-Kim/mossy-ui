# Interaction States

일관된 상호작용 피드백 적용을 위한 가이드.

## Pressed 상태

Mossy의 컴포넌트 스펙과 색상 토큰은 **pressed** 상태만 정의한다. React Native는 터치 환경이 기본이므로 pressed 하나로 모든 상호작용 피드백을 표현한다.

| 환경 | 트리거 | 표시되는 스타일 |
| --- | --- | --- |
| 터치 | 요소를 누르고 있을 때 | pressed 스타일 |
| 포인터 (iPadOS 트랙패드 등) | 요소에 포인터를 올릴 때 | 시스템 기본 hover 효과 |

| Token | theme-light | theme-dark |
| --- | --- | --- |
| $color.bg.brand-solid-pressed | $color.palette.mossy-700 | $color.palette.mossy-800 |
| $color.bg.brand-weak-pressed | $color.palette.mossy-200 | $color.palette.mossy-200 |
| $color.bg.critical-solid-pressed | $color.palette.red-800 | $color.palette.red-700 |
| $color.bg.critical-weak-pressed | $color.palette.red-200 | $color.palette.red-200 |
| $color.bg.informative-solid-pressed | $color.palette.blue-800 | $color.palette.blue-700 |
| $color.bg.informative-weak-pressed | $color.palette.blue-200 | $color.palette.blue-200 |
| $color.bg.layer-default-pressed | $color.palette.gray-100 | $color.palette.gray-300 |
| $color.bg.layer-floating-pressed | $color.palette.gray-100 | $color.palette.gray-300 |
| $color.bg.neutral-inverted-pressed | $color.palette.gray-800 | $color.palette.gray-800 |
| $color.bg.neutral-solid-muted-pressed | $color.palette.gray-900 | $color.palette.gray-500 |
| $color.bg.neutral-weak-alpha-pressed | $color.palette.static-black-alpha-300 | $color.palette.static-white-alpha-300 |
| $color.bg.neutral-weak-pressed | $color.palette.gray-300 | $color.palette.gray-400 |
| $color.bg.positive-solid-pressed | $color.palette.green-800 | $color.palette.green-600 |
| $color.bg.positive-weak-pressed | $color.palette.green-200 | $color.palette.green-200 |
| $color.bg.transparent-pressed | $color.palette.static-black-alpha-100 | $color.palette.static-white-alpha-50 |
| $color.bg.warning-solid-pressed | $color.palette.yellow-400 | $color.palette.yellow-900 |
| $color.bg.warning-weak-pressed | $color.palette.yellow-200 | $color.palette.yellow-200 |

magic 그라데이션을 사용하는 요소의 pressed 상태에는 그라데이션 pressed 토큰을 적용한다.

| Token | theme-light | theme-dark |
| --- | --- | --- |
| $gradient.glow-magic-pressed | #fbf0f2 0%, #ffe8db 80%, #f5f2ef 100% | #3e333e 0%, #51453e 80%, #434242 100% |
| $gradient.highlight-magic-pressed | #e14f00 20%, #ae58bf 100% | #ff9e65 20%, #e89bee 100% |

## 구현 방식

pressed 피드백은 별도 설정 없이 Mossy 컴포넌트에 포함된다.

RN 컴포넌트는 `Pressable`의 pressed 상태나 시스템 ripple/highlight로 누름을 처리한다. Expo UI 컴포넌트는 `onPress`와 시스템 기본 press 피드백(iOS highlight, Android ripple)을 사용한다. pressed 색상 토큰은 컴포넌트 스펙의 색상 정의다 — Expo UI modifier는 정적 색만 받으므로 상태 조건부 색상 주입에 쓰지 않는다.

```tsx
import { Pressable, Text } from "react-native";

<Pressable onPress={handleSubmit}>
  <Text>Submit</Text>
</Pressable>;
```

## 포커스 스타일

포커스 기반 탐색 환경(외부 키보드, TV 등)에서는 `$color.stroke.focus-ring` 토큰으로 현재 포커스된 요소를 표시한다.

| Token | theme-light | theme-dark |
| --- | --- | --- |
| $color.stroke.focus-ring | $color.palette.blue-600 | $color.palette.blue-600 |
