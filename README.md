# Mossy UI

Expo UI 기반의 React Native 디자인 시스템.
iOS는 SwiftUI, Android는 Jetpack Compose로 **네이티브 컴포넌트**를 렌더링하며,
그 위에 일관된 디자인 토큰을 적용해 접근성 높은 모바일 인터페이스를 만듭니다.

## 소개

Mossy UI는 [Seed Design System](https://github.com/daangn/seed-design)의
**디자인 철학과 API 설계에서 영감을 받아(inspired by)**, [Expo UI](https://docs.expo.dev/versions/latest/sdk/ui/)(`@expo/ui`)
위에 **독립적으로 구현한** React Native 디자인 시스템입니다.

원본 Seed Design은 웹(React)을 CSS 기반으로 구현하지만, Mossy UI는
완전히 다른 토대 위에서 동작합니다. iOS는 SwiftUI, Android는 Jetpack
Compose로 네이티브 컴포넌트를 렌더링하고, 스타일은 네이티브 modifier를
중심으로 적용합니다. 따라서 원본과 소스 코드를 공유하지 않으며, 색상을
포함한 모든 디자인 토큰은 자체적으로 정의하고 사용자가 자유롭게
커스터마이즈할 수 있도록 개방되어 있습니다.

본 프로젝트는 OS별 룩앤필을 통일하는 것을 목표로 하지 않습니다. 각
플랫폼의 네이티브 컴포넌트를 그대로 활용하면서, 검증된 디자인 시스템의
구조와 접근성 원칙을 React Native 환경에서 일관되게 적용하는 데 초점을
둡니다.

> **참고**
> 본 프로젝트는 독립적인 커뮤니티 프로젝트로, 주식회사 당근마켓 및
> Seed Design 팀과 **제휴·보증·후원 관계가 없습니다.** 원본의 브랜드
> 리소스(명칭·로고·캐릭터·상표·브랜드 색상)는 일절 사용하지 않습니다.

## 특징

- **진짜 네이티브 렌더링** — iOS는 SwiftUI, Android는 Jetpack Compose로 렌더링합니다. JS로 흉내 낸 UI가 아닙니다.
- **단일 소스, 멀티 플랫폼** — `@expo/ui`의 universal 컴포넌트를 기반으로 하여, 한 번 작성한 코드가 iOS·Android에서 각각 네이티브로 동작합니다.
- **개방형 디자인 토큰** — 색상·간격·타이포그래피 등을 자체 정의하며, 특정 브랜드 색을 강제하지 않고 사용자가 자유롭게 테마를 커스터마이즈할 수 있습니다.
- **접근성 우선** — 검증된 디자인 시스템의 접근성 원칙을 따릅니다.

## 요구 사항

- React Native (Expo SDK 56 이상 권장)
- `@expo/ui` (peer dependency)

> Mossy UI는 `@expo/ui`의 네이티브 컴포넌트를 사용하므로, Expo UI의
> 네이티브 API가 안정화된 Expo SDK 56 이상 환경에서 동작합니다.

## 설치

```bash
npm install mossy-ui
# 또는
yarn add mossy-ui
```

`@expo/ui`가 설치되어 있지 않다면 함께 설치해 주세요.

```bash
npx expo install @expo/ui
```

## 사용 예시

```tsx
import { Host, Column, Button } from 'mossy-ui';

export default function Example() {
  return (
    <Host style={{ flex: 1 }}>
      <Column spacing={12} alignment="center">
        <Button variant="filled" label="시작하기" onPress={() => {}} />
        <Button variant="outlined" label="더 알아보기" onPress={() => {}} />
      </Column>
    </Host>
  );
}
```

## 테마 커스터마이즈

```tsx
import { MossyThemeProvider, defaultLightTheme } from 'mossy-ui';

const theme = {
  ...defaultLightTheme,
  colors: {
    ...defaultLightTheme.colors,
    accent: '#176B5B',
  },
};

export function App() {
  return (
    <MossyThemeProvider theme={theme}>
      {/* app */}
    </MossyThemeProvider>
  );
}
```

## 라이선스

본 프로젝트는 **Apache License 2.0**을 따릅니다. 자세한 내용은
[LICENSE](./LICENSE) 파일을 참고하세요.

Mossy UI는 [Seed Design System](https://github.com/daangn/seed-design)
(Apache License 2.0)의 디자인 철학과 API 설계에서 영감을 받았습니다.
원본 소스 코드나 디자인 토큰 값을 포함하지 않으며, React Native 환경에
맞게 독립적으로 구현되었습니다.

본 프로젝트는 [Expo UI](https://github.com/expo/expo)(`@expo/ui`,
Copyright 650 Industries, Inc., MIT License)를 의존성으로 사용합니다.

## 상표 고지

"Seed", "당근", "Daangn" 등의 명칭, 로고, 캐릭터, 브랜드 색상은 주식회사
당근마켓의 자산이며 본 프로젝트에서는 사용하지 않습니다. 여기에 사용된
모든 제품명 및 브랜드명은 각 권리자의 자산입니다.
