# Mossy UI

React Native 기반 디자인 시스템.
React Native primitive와 Expo UI를 컴포넌트 요구사항에 맞게 선택하고,
SEED Design System의 Foundation과 설계 원칙을 Expo 환경에 맞게 적용합니다.

## 소개

Mossy UI는 [Seed Design System](https://github.com/daangn/seed-design)의
디자인 시스템 구조와 Foundation 원칙을 React Native 앱 환경에 적용하는 디자인 시스템입니다.

원본 SEED는 웹/CSS 기반이지만, Mossy UI는 iOS/Android React Native 렌더링 모델을 기준으로 동작합니다.
따라서 Foundation 토큰은 React Native style 값으로 변환하고, 컴포넌트는
React Native primitive와 필요한 경우 Expo UI 네이티브 컴포넌트 위에서 SEED 원칙을 따르도록 구현하는 것을 목표로 합니다. SEED는 API와 설계 구조를 잡기 위한 참고 자료이며, Mossy UI의
토큰 값은 사용자가 본인의 브랜드와 제품에 맞게 바꿀 수 있어야 합니다.

현재 구현 범위는 Foundation입니다. 초기 세팅용 컴포넌트 래퍼는 제거했고,
Mossy 컴포넌트 레이어는 이 Foundation 위에 다시 쌓습니다.

> 참고: 본 프로젝트는 독립적인 커뮤니티 프로젝트로, 주식회사 당근마켓 및
> SEED Design 팀과 제휴, 보증, 후원 관계가 없습니다.

## 특징

- **React Native 기반** - RN primitive로 충분한 컴포넌트는 RN으로 구현하고,
  네이티브 컨트롤·Host 트리·modifier 이점이 필요한 컴포넌트는 Expo UI를 사용합니다.
- **Mossy Foundation 기본값** - 빠른 시작을 위해 color, dimension, radius,
  typography, motion, gradient, shadow 초기값을 제공합니다.
- **Mossy brand palette** - 기본 brand color scale은 `mossy` 네임스페이스를
  사용하며, 기준 색상은 `color.palette.mossy600` (`#4A7C59`)입니다.
- **커스터마이즈 가능한 토큰 시스템** - `createMossyTheme`와
  `createMossyThemes`로 브랜드 색상, 간격, 타이포그래피 등을 override할 수
  있습니다.
- **React Native 값 변환** - `px`와 `rem`은 number, duration은 ms number,
  typography는 `TextStyle` 호환 객체로 변환합니다.
- **Light / Dark 모드** - Mossy 기본 color, gradient, shadow 값을
  `mossyThemes.light`와 `mossyThemes.dark`로 제공합니다.
- **Flat token lookup** - `$color.bg.layer-basement` 같은 문서형 토큰명을
  `theme.reference`나 `mossyTokenReference`에서 조회할 수 있습니다.

## 요구 사항

- Expo SDK 56 이상
- React Native 0.85 이상
- `@expo/ui` 56 이상 (Expo UI 컴포넌트 사용 시)

## 설치

```bash
npm install mossy-ui
# Expo UI 컴포넌트를 사용하는 경우
npx expo install @expo/ui
```

## Foundation 사용 예시

```tsx
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { mossyThemes } from 'mossy-ui';

const theme = mossyThemes.light;

export function Example() {
  return (
    <View style={[styles.screen, { backgroundColor: theme.color.bg.layerBasement }]}>
      <Text style={[theme.typography.textStyleT6Bold, { color: theme.color.fg.neutral }]}>
        Mossy Foundation
      </Text>
      <Pressable
        style={{
          backgroundColor: theme.color.bg.brandSolid,
          borderRadius: theme.radius.r2,
          paddingHorizontal: theme.dimension.spacingX.globalGutter,
          paddingVertical: theme.dimension.x3,
        }}
      >
        <Text style={[theme.typography.textStyleT4Bold, { color: theme.color.fg.staticWhite }]}>
          시작하기
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: mossyThemes.light.dimension.spacingX.globalGutter,
    gap: mossyThemes.light.dimension.x4,
  },
});
```

## 커스텀 토큰

Mossy 기본값은 출발점입니다. 실제 제품에서는 필요한 토큰만 override해서
사용합니다. override된 값은 구조형 토큰과 flat token lookup에 같이 반영됩니다.

```tsx
import { createMossyThemes } from 'mossy-ui';

export const appThemes = createMossyThemes({
  light: {
    color: {
      bg: {
        brandSolid: '#176b5b',
      },
      fg: {
        brand: '#176b5b',
      },
    },
    radius: {
      r2: 10,
    },
  },
  dark: {
    color: {
      bg: {
        brandSolid: '#8fd9c7',
      },
      fg: {
        brand: '#8fd9c7',
      },
    },
  },
});

appThemes.light.color.bg.brandSolid;
appThemes.light.reference['$color.bg.brand-solid'];
```

## Foundation 구조

Foundation 구현은 영역별로 나뉩니다. 사용자는 필요한 영역만 읽고 교체할 수
있고, public API는 `mossy-ui` 진입점에서 계속 모아서 제공합니다.

```txt
src/foundation/
  color.ts
  typography.ts
  spacing.ts
  radius.ts
  motion.ts
  elevation.ts
  gradient.ts
  state.ts
  iconography.ts
  reference.ts
  theme.ts
```

## Public API

```tsx
import {
  createMossyTheme,
  createMossyThemes,
  mossyFoundation,
  mossyThemes,
  mossyTokenReference,
} from 'mossy-ui';
```

- `mossyThemes.light`, `mossyThemes.dark`: Mossy 기본 theme object.
- `createMossyTheme(mode, overrides)`: 한 가지 mode의 theme object 생성 및 override.
- `createMossyThemes(overrides)`: light/dark theme object를 함께 생성 및 override.
- `mossyFoundation`: scale token과 semantic theme를 함께 담은 Foundation object.
- `mossyTokenReference`: light mode 기준 flat token lookup.

## 라이선스

본 프로젝트는 Apache License 2.0을 따릅니다.

SEED Design System은 Apache License 2.0으로 배포됩니다. Mossy UI는 SEED의 API
구조와 Foundation 설계 원칙을 참고하지만, 토큰 값은 Mossy의 기본값으로 제공하며
사용자 제품에 맞게 교체하고 확장할 수 있습니다.

본 프로젝트는 주식회사 당근마켓 및 SEED Design 팀과 제휴, 보증, 후원 관계가
없습니다. "Seed", "당근", "Daangn" 등의 명칭, 로고, 캐릭터, 상표는 각
권리자의 자산입니다.
