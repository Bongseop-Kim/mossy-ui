# src/components

mossy-ui 컴포넌트 작성 가이드. `src/components/`의 모든 컴포넌트에 적용된다. 루트 [AGENTS.md](../../AGENTS.md)의 전역 규칙(네임스페이스 우선순위, React 19/Compiler, Expo UI Host 규칙)을 전제로 하며 여기서는 반복하지 않는다.

## 디렉토리 개요

- `src/foundation/` — 순수 토큰 시스템(빌더·테마·해석 함수). 컴포넌트를 두지 않는다.
- `src/components/` — 모든 컴포넌트. 기초 프리미티브는 `Layout/`·`Typography/`·`Iconography/` 그룹 폴더에, 키트 컴포넌트(Switch 등)는 평면에 둔다. Host-free·조합 가능해야 한다.
- 토큰 해석은 [`src/foundation/component-tokens.ts`](../foundation/component-tokens.ts), 공유 모디파이어 타입은 [`src/foundation/modifier.ts`](../foundation/modifier.ts), 테마 구독은 [`src/theme.tsx`](../theme.tsx)를 사용한다.

## 파일 작성 컨벤션

- **단일 구현 컴포넌트** — universal 래퍼처럼 플랫폼 분기가 없으면 `{Name}.tsx` 한 파일 (예: `Layout/HStack.tsx`).
- **OS 분기 컴포넌트** — `{Name}/` 디렉토리에 4파일 고정 (예: `Layout/Divider/`).
  - `types.ts` — 공유 props 인터페이스 `Mossy{Name}Props`
  - `index.tsx` — 웹/기타 폴백. 렌더하지 않고(`return null`) 공개 타입 선언의 기준이 된다
  - `index.ios.tsx` — swift-ui 구현
  - `index.android.tsx` — jetpack-compose 구현
  - 플랫폼 파일은 `export * from './types'`로 타입을 재노출한다
- **배럴 등록** — 모든 공개 컴포넌트는 `src/index.ts`에 named export로 등록하고(`export *` 금지) `Mossy{Name}Props` 타입을 함께 export한다. 경로 알파벳순 정렬.

## 코드 작성 컨벤션

- **닫힌 pass-through 래퍼** — universal 컴포넌트는 `ComponentProps<typeof ExpoX>` 기반으로 전달한다. 토큰 prop으로 대체할 prop만 `Omit`으로 교체하고, 교체로 잃는 expo-ui 기능(예: Text의 `fontFamily`·`letterSpacing`)은 동등 prop으로 복원한다.
- **토큰 해석** — 토큰 prop은 `useMossyTheme()` + `resolveMossy*`로 해석한다. 색상은 `resolveMossyColor(theme, value) ?? value` 원시값 폴백 패턴을 유지한다. 간격·크기는 `number | MossyDimensionToken` 유니언으로 받는다.
- **테마 기본값 주입** — 기본값은 디자인 가이드 문서(`src/foundation/docs/*`)에 근거를 둔다 (예: Icon 기본 크기 `'x6'` ← iconography.md).
- **testID** — OS 분기 컴포넌트는 `testID?: string`을 받는다. iOS는 prop으로(swift-ui `CommonViewModifierProps`), Android는 `testID` modifier로 전달한다.
- **modifiers 패스스루** — 커스터마이징 escape hatch. 내부 생성 modifier 뒤에 사용자 `...modifiers`를 spread해 사용자가 덮어쓸 수 있게 한다.
- **compound component 금지** — 네이티브 뷰는 내부 파츠 분해가 불가하다. 슬롯이 필요하면 children 중첩 또는 데이터 선언형 마커(예: expo-ui `Picker.Item`)만 허용한다.
- **variant 처리** — variant 축(`variant`, `size`, `tone` 등)이 있는 컴포넌트는 variant별 스타일을 본문에 흩뿌리지 않고, 정적 `variant → 토큰 이름` Record로 정의한 뒤 `resolveMossy*`로 해석한다.

```tsx
// variant → 토큰 매핑 예시 (정적 테이블)
const buttonVariants = {
  brandSolid: { bg: 'bg.brandSolid', fg: 'fg.staticWhite' },
  neutralWeak: { bg: 'bg.neutralWeak', fg: 'fg.neutral' },
} as const;
```

## 검증

- `npx tsc --noEmit` · `npm run lint` — 코드 변경 후 필수
- `npx react-doctor@latest --verbose --diff` — React 코드 변경 후 점수 회귀 확인
