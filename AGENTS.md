# AGENTS.md

mossy-ui — Expo UI(`@expo/ui`) 기반 React Native 디자인 시스템. 작업 시 이 문서의 규칙을 따른다.

## Docs 참조

디자인 시스템 가이드 문서는 `src/foundation/docs/`와 `src/components/docs/`에 있다. 관련 작업 전에 해당 문서를 먼저 읽고 따른다.

| 문서 | 읽어야 할 때 |
| --- | --- |
| [`src/components/docs/composition.md`](./src/components/docs/composition.md) | 컴포넌트 합성·children 중첩·pass-through 래퍼 작성 시 |
| [`src/components/docs/interaction-states.md`](./src/components/docs/interaction-states.md) | pressed 등 상호작용 피드백 구현 시 |
| [`src/components/docs/seed-component-parity.md`](./src/components/docs/seed-component-parity.md) | Seed Design 참고 구현과 mossy-ui 구현 상태·props 대응 규칙을 확인할 때 |
| [`src/foundation/docs/state.md`](./src/foundation/docs/state.md) | Pressed·Focused·Disabled 등 컴포넌트 상태 표현 시 |
| [`src/foundation/docs/elevation.md`](./src/foundation/docs/elevation.md) | 레이어 고도·쌓임 순서(zIndex·모달)·그림자·표면 색상 결정 시 |
| [`src/foundation/docs/iconography.md`](./src/foundation/docs/iconography.md) | 아이콘 크기·터치 영역·색상·`Icon.select` 사용 시 |
| [`src/foundation/docs/loading.md`](./src/foundation/docs/loading.md) | Progress Circle·Bar·Skeleton 등 로딩 UI 선택 시 |
| [`src/foundation/docs/voice-and-tone.md`](./src/foundation/docs/voice-and-tone.md) | UI 문구의 화법·톤 방향(원칙) 결정 시 — 문장 단위 실행 규칙은 writing.md |
| [`src/foundation/docs/writing.md`](./src/foundation/docs/writing.md) | UI 텍스트(레이블·메시지 등) 문장 작성·수정 시 — 화법·톤 방향은 voice-and-tone.md |
| [`src/foundation/docs/international-design.md`](./src/foundation/docs/international-design.md) | 다국어 지원, 로케일별 시간·날짜·숫자·통화·괄호·강조 표기, 번역 텍스트 확장 대응 시 |

## AI 참조 리소스

외부 디자인 시스템 코드를 참조해야 할 때는 가능하면 원격 GitHub를 매번 열지 말고 로컬 참조본을 먼저 사용한다.

- `daangn/seed-design` React 패키지: `.ai/refs/seed-design/packages/react`
- 위 경로는 git에서 제외된 AI 참조용 clone이다.
- 경로가 없거나 오래된 경우 `.ai/README.md`의 명령으로 다시 받거나 갱신한다.

## Docs 작성

`src/*/docs/*.md` 문서를 작성·수정할 때는 루트의 [`docs.md`](./docs.md) 양식을 먼저 읽고 따른다. 핵심 원칙은 **AI Agent 가독성 최우선**이다.

- **범위는 Expo UI 레이어** — docs는 패키지가 제공하는 Expo UI 레이어 기준으로 작성한다. 소비자 측 RN 사용법은 범위 밖이다.
- **한글로 작성** — 국내 대상이므로 문서는 항상 한글로 작성한다.

## 컴포넌트 API 방향

- **Seed parity 상태 점검** — 컴포넌트를 추가·수정하기 전에 [`src/components/docs/seed-component-parity.md`](./src/components/docs/seed-component-parity.md)에서 기준과 데이터 원천을 확인한 뒤 `docs-site/src/data/seed-parity.json`에서 Seed Design 참고 구현 props와 mossy-ui 대응 상태를 확인한다. 작업 후 공개 props나 구현 상태가 바뀌면 같은 JSON의 Mossy 대응·Mossy props·상태·Props별 상태·다음 액션·메모를 갱신하고 `npm run docs:validate`를 실행한다.
- **네임스페이스 우선순위** — 컴포넌트 구현 시 반드시 아래 순서로 검토한다.
  1. **`@expo/ui` (universal)** — 1순위. 항상 universal에 해당 컴포넌트가 있는지 먼저 확인하고, 있으면 universal을 사용한다.
  2. **`@expo/ui/swift-ui` · `@expo/ui/jetpack-compose`** — universal에 없는 컴포넌트에 한해서만 플랫폼별로 구현한다.
- **닫힌 pass-through 래퍼** — `ComponentProps<typeof ExpoX>` 형태로 props를 그대로 전달하고 테마 기본값만 주입한다. 슬롯·확장은 [`src/components/AGENTS.md`](./src/components/AGENTS.md)의 선택 기준(children 중첩 · 데이터 선언형 마커 · 닫힌 데이터 prop · compound)을 따른다.
- **토큰 prop 강제** — 순수 패스스루로 끝나는 래퍼는 만들지 않는다. 디자인 속성(간격·크기·색상 등)을 받는 prop은 반드시 Mossy 토큰을 받는 prop으로 교체해 노출한다 (간격·크기는 `number | MossyDimensionToken` 유니언, 색상은 색상 토큰). 토큰 주입점이 없는 컴포넌트는 디자인 시스템 컴포넌트로서 의미가 없다.
- **커스터마이징 통로** — `modifiers` prop 패스스루와 children 중첩.
- **asChild 지원** — React Native 레이어 조합형 컴포넌트는 `asChild` prop으로 기능 합성을 지원한다.
- **상호작용 상태** — 눌림 시각 피드백은 시스템 기본 press 피드백(iOS highlight, Android ripple)을 사용한다. pressed 토큰은 색상 스펙 정의다 (Expo UI modifier는 정적 색만 받으므로 상태 조건부 주입에 쓰지 않는다).
- **컴포넌트 파일 구조·작성 규칙** — [`src/components/AGENTS.md`](./src/components/AGENTS.md)를 따른다 (foundation 컴포넌트 포함).

## React 19 / React Compiler 규칙

React Compiler가 `babel.config.cjs`에 활성화되어 있다 (`target: '19'`).

- **수동 메모이제이션 금지** — `React.memo`·`useMemo`·`useCallback`을 새로 쓰지 않는다. 컴파일러가 자동 처리한다. 프로파일링으로 입증된 경우에만 예외.
- **Rules of React 준수** — 렌더 중 mutation·부수효과 금지. 위반 시 컴파일러가 해당 컴포넌트를 조용히 건너뛴다(`panicThreshold: 'none'`이라 에러도 안 남). 문제 컴포넌트는 `'use no memo'`로 임시 opt-out 후 근본 원인을 고친다.
- **`forwardRef` 금지** — React 19에서 `ref`는 일반 prop. `ref`를 props로 직접 받는다.
- **`defaultProps`·`propTypes` 금지** — TS 타입 + 파라미터 기본값 사용.
- **Context는 `<Ctx value={...}>` 직접 렌더** — `<Ctx.Provider>` 대신.

## 렌더 패턴 규칙

- 파생 상태는 렌더 중 계산한다. `useEffect`로 state를 복제하지 않는다.
- 조건부 렌더는 삼항(`cond ? <X /> : null`). `&&`는 RN에서 `0`·빈 문자열이 텍스트 노드로 렌더되어 크래시할 수 있다.
- 컴포넌트 안에서 컴포넌트를 정의하지 않는다 (인라인 컴포넌트 금지).
- 비싼 `useState` 초기값은 함수형 초기화, 이전 값 의존 setState는 함수형 업데이트.
- 상호작용 로직은 effect가 아닌 이벤트 핸들러에 둔다.

## 라이브러리 패키징

- `sideEffects: false` 유지 — 모듈 최상위에서 부수효과(전역 등록, 즉시 실행) 금지.
- 리뷰 시 추측성 memo/deps 지적 금지 — 프로파일링 증거 없으면 제안하지 않는다.

## 검증

- 코드 변경 후 `npm run lint` — `eslint-plugin-react-hooks` recommended-latest(React Compiler 규칙 포함). 컴파일러가 최적화를 건너뛰는 코드는 여기서 잡힌다.
- React 코드 변경 후 `npx react-doctor@latest --verbose --diff`로 점수 회귀 확인.

## Expo UI Host 규칙

- 페이지당 `Host` 하나. `<Screen>` 래퍼 안에만 둔다.
- 키트 컴포넌트(Button, Card 등)는 `Host`를 래핑하지 않는다. Host-free·조합 가능.
- 컴포넌트는 외부 Host 안에서 렌더된다고 가정. `Host` 필수임을 타입/문서에 명시.
- `<Screen>`은 페이지당 하나만 사용한다. Host 컨텍스트 있으면 중복 skip.
- 스타일: Expo UI는 modifier, 일반 RN은 StyleSheet.
- 모션은 reanimated, 네비게이션은 Expo Router. Host로 재구현 안 함.
