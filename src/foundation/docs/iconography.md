# Iconography

아이콘 크기·터치 영역·색상·타입 선택을 위한 가이드.

## 원칙

- **공용 스케일 사용** — 아이콘 전용 토큰은 없다. 크기·여백은 공용 `$dimension` 스케일을 사용한다.
- **시맨틱 색상** — 아이콘 색상은 텍스트와 동일한 `$color.fg.*` 시맨틱 토큰을 따른다.
- **아이콘 소스** — Expo UI Icon을 사용할 때는 `name` prop으로 지정한다. iOS는 SF Symbol, Android는 `@expo/material-symbols` XML 드로어블을 사용한다. RN 기반 아이콘 컴포넌트를 선택한 경우에도 동일한 Mossy size/color 토큰 규칙을 적용한다.

## 지정 방식

Expo UI의 플랫폼별 아이콘은 `Icon.select`로 지정한다. plain `{ ios, android }` 객체는 양쪽 에셋이 모두 번들되므로 `Icon.select`를 사용한다.

```tsx
import { Icon } from "@expo/ui";

<Icon
  name={Icon.select({
    ios: "star.fill",
    android: import("@expo/material-symbols/star.xml"),
  })}
  size={24}
/>;
```

## Size

기본 크기는 24px이며, 용도에 맞게 비율을 유지하며 조정한다.

| 규칙 | 값 |
| --- | --- |
| 기본 크기 | 24px (`$dimension.x6`) |
| 최소 크기 | 12px (`$dimension.x3`) |
| Fill 전환 크기 | 16px (`$dimension.x4`) 이하에서는 Fill을 사용해 시각적 복잡도를 줄인다 |

## Touch Area

아이콘을 단독 버튼으로 사용할 때는 터치 영역을 확보한다.

| 규칙 | 값 |
| --- | --- |
| 최소 터치 영역 | 40px (`$dimension.x10`) |
| 24px 아이콘 권장 터치 영역 | 44px 이상 |

아이콘 시각 크기를 키우는 대신 `hitSlop`으로 터치 영역을 확장한다.

```tsx
import { Pressable } from "react-native";

// 24px 아이콘 + hitSlop 10 → 44px 터치 영역
<Pressable hitSlop={10}>{icon}</Pressable>;
```

## Color

- 모노크롬 아이콘은 함께 배치된 텍스트와 동일한 `$color.fg.*` 토큰을 적용한다.
- Disabled 상태는 `$color.fg.disabled`를 적용한다.

## Variants

아이콘은 Line·Fill 두 타입 중 사용 목적에 따라 선택한다. iOS SF Symbol은 `*.fill` 변형이 Fill에 해당한다.

| 구분 | Line | Fill |
| --- | --- | --- |
| 특성 | 디테일·세부 묘사에 유리 | 인식 속도가 빠르고 형태가 단순 |
| 글씨 조합 | 얇은 글씨 | 굵은 글씨 |
| 배치 | 상단 네비게이션 | 컨테이너 내부(버튼, 칩), 하단 네비게이션 메인 탭 |
| 크기 | 20px 이상 | 16px 이하 작은 크기 |

- **상태 전환** — On/Off 개념이 있는 버튼은 Default(Line), On(Fill), Off(Line + slash 변형, iOS는 `*.slash`)로 표현한다.

## With Typography

- **여백·정렬** — 아이콘과 텍스트를 한 줄에 배치할 때 사이 여백은 `$dimension` 토큰으로 설정하고 높이 중앙 정렬한다.
- **크기 조합** — 텍스트와 함께 쓰는 아이콘은 16px(`$dimension.x4`)·20px(`$dimension.x5`)·24px(`$dimension.x6`)을 기준으로 조합한다.
- **굵기 조합** — 얇은 글씨에는 Line, 굵은 글씨에는 Fill을 조합한다.
