# Seed Component Parity

Seed Design 참고 구현 대비 mossy-ui 구현 진행 상태를 점검하기 위한 문서.

## 기준

- **Seed 기준 경로** — `.ai/refs/seed-design/packages/react/src/components`.
- **mossy 기준 경로** — `src/index.ts`가 named export하는 `src/components/*`.
- **문서 사이트** — Starlight 문서 앱 `docs-site/`에서 컴포넌트별 페이지로 제공한다.
- **데이터 원천** — `docs-site/src/data/seed-parity.json`을 수정하고 `docs-site/src/data/seed-parity.ts`의 typed helper로 렌더한다.
- **Props 우선** — 각 컴포넌트 페이지의 `Props` 섹션을 Seed props와 Mossy 구현 상태 판단의 첫 진입점으로 사용한다.
- **미리보기 제외** — 미리보기는 별도 example 앱과 추후 QR 제공 범위다. parity 문서는 preview/example을 포함하지 않는다.

## 상태

| 상태 | 의미 |
| --- | --- |
| 완료 | Seed 대응 범위를 Mossy React Native API와 필요한 경우 선택한 Expo UI API로 구현 완료했다. |
| 부분완료 | Mossy 대응 컴포넌트는 있으나 Seed props·파트·variant 대비 누락 범위가 남아 있다. |
| 미구현 | Seed 컴포넌트를 확인했지만 mossy-ui 공개 API에 대응 컴포넌트가 없다. |
| 제약 | DOM/HTML, Ark web primitive, web portal, web-only CSS layout, Expo UI native slot 제약 때문에 Seed API 형태를 그대로 제공하지 않는다. |
| Mossy only | seed-design에는 없으나 mossy-ui에서만 제공한다. |

## 갱신

- **컴포넌트 추가·수정 전** — `docs-site/src/data/seed-parity.json`에서 대상 컴포넌트 페이지와 Props 상태를 확인한다.
- **컴포넌트 추가·수정 후** — 같은 JSON의 Mossy 대응·Mossy props·상태·Props별 상태·다음 액션·메모를 갱신한다.
- **검증** — `npm run docs:validate`로 데이터 형태를 검증하고, 문서 변경 시 `npm run docs:build`로 Starlight 빌드를 확인한다.
