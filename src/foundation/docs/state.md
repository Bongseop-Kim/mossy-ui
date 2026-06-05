# State

컴포넌트 상태 표현을 위한 가이드.

## 유형

| 유형 | 정의 | 해당 상태 |
| --- | --- | --- |
| 상호작용 상태 | 사용자의 상호작용에 따라 변하는 상태 | Pressed, Focused |
| 옵션 상태 | 컴포넌트에 적용된 옵션에 따른 상태 | Disabled |

## 상태

| 상태 | 유형 | 표현 |
| --- | --- | --- |
| Enabled | 기본 | 상호작용이 없을 때의 기본 상태. 기본 시맨틱 토큰을 그대로 사용한다 |
| Pressed | 상호작용 | 터치·펜 등으로 요소를 누르고 있는 상태. 시스템 기본 press 피드백으로 표현하며, `*-pressed` 색상·그라데이션 토큰이 색상 스펙을 정의한다 |
| Focused | 상호작용 | 포커스 기반 탐색 환경(외부 키보드, TV 등)에서 포커스된 상태. `$color.stroke.focus-ring` 토큰으로 표현한다 |
| Disabled | 옵션 | 비활성화 상태. disabled 토큰으로 표현하며 사용자의 상호작용을 받지 않는다 |

## 조합 규칙

- **Pressed** — Enabled 스타일 위에 덮어쓴다.
- **Focused** — 스트로크(`$color.stroke.focus-ring`)로 표현되어 색상으로 표현되는 다른 상태와 레이어가 다르다. Pressed와 동시 발생 시 focus ring을 유지한 채 press 피드백을 함께 표시한다.
- **Disabled** — 상호작용을 차단하므로 Pressed·Focused 등 상호작용 상태와 조합하지 않는다. 포커스 탐색에서 disabled 요소는 포커스 대상에서 제외한다.

## Disabled 토큰

| Token | theme-light | theme-dark |
| --- | --- | --- |
| $color.fg.disabled | $color.palette.gray-500 | $color.palette.gray-500 |
| $color.bg.disabled | $color.palette.gray-200 | $color.palette.gray-300 |

## 구현 방식

universal 컴포넌트는 `disabled` prop으로 비활성화한다. disabled 스타일은 컴포넌트가 자체 처리하므로 토큰을 직접 적용하지 않는다.

```tsx
import { Button } from "@expo/ui";

<Button label="Submit" disabled />;
```

universal에 없어 swift-ui로 구현하는 컴포넌트는 `disabled` modifier를 사용한다.

```tsx
import { Button } from "@expo/ui/swift-ui";
import { disabled } from "@expo/ui/swift-ui/modifiers";

<Button label="Submit" modifiers={[disabled(true)]} />;
```

## 구현 참조

Pressed·Focused의 구현 방식과 전체 pressed 토큰 표는 [interaction-states](../../components/docs/interaction-states.md)를 따른다.
