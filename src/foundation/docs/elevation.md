# Elevation

UI 요소 간 깊이와 쌓임 계층 표현을 위한 가이드.

## 원칙

- **계층 시각화** — 고도(Elevation)는 UI 요소 간의 상대적 깊이와 계층 구조를 표현한다. 사용자가 인터페이스 구조를 직관적으로 이해하도록 돕는다.
- **레벨 우선** — 쌓임은 레벨 정의(Global·Local)를 따른다. 겹침이 생겨도 레벨을 올리지 않고 스타일(표면색·스트로크·그림자)로 구분감을 준다.
- **표면색 우선** — 고도 표현은 Surface color → Stroke → Shadow 순으로 검토한다. RN 컴포넌트는 StyleSheet/style prop으로 적용하고, Expo UI 컴포넌트는 지원하는 style/modifier 경로로 적용한다.

## 쌓임 결정

쌓임 순서는 두 경로로 결정된다.

| 경로 | 수단 | 적용 대상 |
| --- | --- | --- |
| 동일 RN 트리 | RN `zIndex` style | 같은 RN 레이아웃 트리 안에서 겹치는 요소 |
| 동일 Expo UI Host 내부 | `zIndex` modifier (`@expo/ui/swift-ui/modifiers` · `@expo/ui/jetpack-compose/modifiers`) | 같은 Expo UI 네이티브 트리 안에서 겹치는 요소 |
| 네이티브 프레젠테이션 | Bottom Sheet·Alert Dialog 등 모달 컴포넌트의 표시 prop (`isPresented` 등) | 화면을 덮는 시트·다이얼로그 |

- **zIndex 경계** — `zIndex`는 동일 레이아웃 트리 내부에서만 유효하다. RN 트리는 style로, Expo UI Host 내부는 `modifiers` 통로로 주입한다.
- **모달은 OS가 관리** — Bottom Sheet·Alert Dialog는 네이티브 프레젠테이션이 최상위 쌓임과 scrim을 관리한다. `zIndex`를 지정하지 않는다.
- **페이지 전환** — 페이지 위에 페이지가 쌓이는 구조는 Expo Router 네비게이션으로 처리한다. 고도 시스템의 범위 밖이다.

## Global Level

애플리케이션의 구조적 층위. 화면 전체 또는 컨테이너 역할의 레이어다.

| Level | 역할 | 표현 |
| --- | --- | --- |
| 0 | 화면 최하단 배경. 스크롤되는 모든 콘텐츠 뒤에 깔린다 | `$color.bg.layer-basement` |
| 1 | 페이지 기본 레이아웃. 콘텐츠 블록과 주요 레이아웃 요소가 놓인다 | `$color.bg.layer-default` |
| 2 | 화면을 덮는 시트(Bottom Sheet, Menu Sheet). 새로운 쌓임 기준이 된다 | 네이티브 프레젠테이션 |
| 3 | 최상위 모달(Alert Dialog). 활성화된 다른 모달을 포함한 모든 요소 위에 표시된다 | 네이티브 프레젠테이션 |

Level 2 컴포넌트는 그 자체로 새로운 Global 기준이 된다. Bottom Sheet 위에 배치되는 콘텐츠는 시트 표면을 바닥으로 하는 Local 컴포넌트로 쌓인다.

## Local Level

특정 표면 위 콘텐츠의 시각적 깊이. 부모 표면(Global)의 레벨을 승계하고, 그 안에서 위계를 구분한다.

| Level | 역할 | 대표 요소 |
| --- | --- | --- |
| 1 | 페이지 골격을 형성하는 메인 콘텐츠 | List, Callout, Tabs, Top Navigation |
| 2 | 기본 레이아웃 위에 떠 있는 플로팅 표면 | Floating Action Button |
| 3 | 일시적 피드백·시스템 알림 | Snackbar, Toast |

## 동일 레벨 구분

같은 레벨 안에서 콘텐츠가 겹칠 때는 레벨을 올리지 않고 스타일로 구분감을 준다.

- Top Navigation과 List는 같은 Local Level 1이다. 스크롤로 겹칠 때 Top Navigation에 그림자 또는 스트로크를 추가해 구분한다.

## 표현 수단

| 수단 | 토큰 | 적용 경로 | 플랫폼 |
| --- | --- | --- | --- |
| Surface color | `$color.bg.layer-*` | RN `style.backgroundColor` 또는 Expo UI `style.backgroundColor` | iOS·Android |
| Stroke | `$color.stroke.*` | RN/Expo UI `style.borderWidth`·`borderColor` | iOS·Android |
| Shadow | `$shadow.s1`~`s3` | RN shadow/elevation style 또는 Expo UI 플랫폼별 `modifiers` (swift-ui `shadow` · jetpack-compose `shadow`) | iOS·Android |

- **Surface color** — 1순위 수단. layer 토큰으로 표면 고도를 표현한다.
- **Stroke** — 가장자리 테두리로 영역을 구분한다. 한쪽 변만 그리는 구분선은 React Native 레이아웃(StyleSheet `borderBottomWidth`)으로 합성한다. Expo UI style 경로를 쓰는 경우 전체 테두리 지원 범위를 확인한다.
- **Shadow** — 주목도가 높은 소수 요소에만 적용한다. 다크 모드에서는 그림자가 잘 보이지 않으므로 표면색·스트로크를 우선 검토한다.

## Shadow 토큰

| Token | theme-light | theme-dark |
| --- | --- | --- |
| $shadow.s1 | 0px 1px 4px 0px #00000014 | 0px 1px 4px 0px #00000080 |
| $shadow.s2 | 0px 2px 10px 0px #0000001a | 0px 2px 10px 0px #000000ad |
| $shadow.s3 | 0px 4px 16px 0px #0000001f | 0px 4px 16px 0px #000000cc |

값은 `offsetX offsetY blur spread color` 순이다.

- **RN 변환 경계** — 토큰은 `shadowColor`·`shadowOffset`·`shadowRadius`(+Android `elevation` 근사)로 변환된다. spread는 React Native가 지원하지 않아 무시된다(모든 토큰이 0px).
- **주입 경계** — RN 컴포넌트는 shadow/elevation style로 주입한다. Expo UI 컴포넌트에서 style 경로가 그림자를 지원하지 않으면 플랫폼별 modifier로 주입한다. Android는 `elevation`(dp) 기반이라 색·블러를 정밀 제어하지 않는다.

## Layer 토큰

Layer 토큰은 콘텐츠를 담는 컨테이너의 표면 색상을 정의한다. 다크 모드에서는 고도가 높을수록 표면이 밝아진다.

| Token | theme-light | theme-dark |
| --- | --- | --- |
| $color.bg.layer-basement | $color.palette.gray-200 | $color.palette.gray-00 |
| $color.bg.layer-default | $color.palette.gray-00 | $color.palette.gray-100 |
| $color.bg.layer-floating | $color.palette.gray-00 | $color.palette.gray-200 |

layer 표면의 pressed 토큰(`*-pressed`)은 [interaction-states](../../components/docs/interaction-states.md)를 따른다.

## 배경 토큰 선택

| Token | theme-light | theme-dark | 용도 |
| --- | --- | --- | --- |
| $color.bg.layer-basement | $color.palette.gray-200 | $color.palette.gray-00 | 화면 기본 배경. 다크 모드에서 가장 깊은 0단계 대지로 떨어진다 |
| $color.bg.neutral-weak | $color.palette.gray-200 | $color.palette.gray-300 | 고도 위에 얹히는 배경. 라이트 톤에 대응하는 톤을 유지한다 |

라이트 모드에서는 두 토큰이 같은 값이지만 다크 모드에서 갈린다. 화면 최하단 배경에는 `layer-basement`, 다양한 고도 위에 배치되는 배경에는 `neutral-weak`를 사용한다.

## 구현 방식

표면색은 RN style 또는 Expo UI style로 적용한다.

```tsx
import { View } from "react-native";

<View style={{ backgroundColor: theme.color.bg.layerFloating }}>
  {children}
</View>;
```
