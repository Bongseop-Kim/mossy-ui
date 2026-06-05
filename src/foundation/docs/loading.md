# Loading

일관된 로딩 UI 선택을 위한 가이드.

## 원칙

- 로딩 자체를 줄이는 것이 최우선이다.
- 로딩이 불가피하면 사용자가 로딩 중임을 명확히 인지하도록 설계한다.
- 로딩 요소는 예상 로딩 시간에 맞춰 선택한다.

## 로딩 요소 비교

| 구분 | Progress Circle | Progress Bar | Skeleton |
| --- | --- | --- | --- |
| 형태 | 원형 인디케이터 | 선형 막대 | 콘텐츠 구조를 회색 톤으로 추상화 |
| 용도 | 짧은 프로세스, 레이아웃 미리보기 불필요 시 | 시작/끝이 명확한 설치·업로드·다운로드 | 길거나 복잡한 데이터 로딩 시 레이아웃 예고 |
| 장점 | 공간 차지 적음, 범용적 | 남은 시간 파악 가능 | 콘텐츠 배치 예측으로 불확실성 감소 |
| 적합 시간 | 1~4초 | 1~10초, 10초 이상도 가능 | 1~10초 |

### Progress Circle 유형

| 구분 | Determinate | Indeterminate |
| --- | --- | --- |
| 목적 | 완료까지 남은 시간 표시 | 진행 중임만 표시 |
| 동작 | 원을 채움 | 회전 |
| 사용 조건 | 진행률/소요 시간을 알거나 추정 가능 (다운로드, 업로드, 파일 변환) | 진행률/소요 시간이 가변적이거나 알 수 없음 |

## 상황별 사용 요소

| 상황 | 사용 가능한 요소 |
| --- | --- |
| 첫 진입 | Progress Circle(Indeterminate), Skeleton |
| 페이지 전환 (보통 전체 화면 표시) | Progress Circle(Indeterminate), Skeleton, Progress Bar |
| 추가 정보 로드 (무한 스크롤, 지연 로딩) | Progress Circle(Indeterminate) |
| 데이터 재요청 (PTR 등) | Progress Circle(Determinate) |
| 입력 데이터 저장/제출 (로그인, 인증) | Progress Circle(Indeterminate), Loading Animation |
| 상태 전환 (데이터/리소스 재로드) | Progress Circle(Indeterminate), Skeleton |

## 로딩 시간별 권장 요소

| 로딩 시간 | 권장 요소 | 비고 |
| --- | --- | --- |
| 1초 이내 | 표시하지 않음 | 표시하면 플리커링으로 UX가 저하된다 |
| 1~4초 | Progress Circle(Indeterminate), Skeleton | 인식 가능한 짧은 지연 |
| 4~10초 | Skeleton, Progress Circle(Indeterminate), Progress Bar | 로딩 관련 정보를 제공한다 |
| 10초 이상 | Progress Circle(Determinate), Progress Bar | 예상 소요 시간을 제공한다 |
| 1분 이상 | Progress Circle(Determinate), Progress Bar | 진행 상황을 명시하고 백그라운드 처리·취소 옵션을 제공한다 |

## Skeleton vs Progress Circle 선택 기준

- **Skeleton** — 레이아웃이 명확하고 다양한 데이터가 로드되는 화면(상세 페이지 등), 곧 나타날 콘텐츠 구조를 미리 보여주고 싶은 반복형 콘텐츠(목록, 카드, 댓글 등)에 사용한다.
- **Progress Circle** — 공간이 제한되고 로딩 범위가 한정적인 경우(메시지 전송 중 표시, 버튼 내부 등)에 사용한다.

## 로딩 단계별 처리

| 단계 | 처리 |
| --- | --- |
| 시작 | 로딩 시작 피드백을 제공한다. 1초 이내 완료 시 표시하지 않는다 |
| 진행 | 진행 중임을 지속적으로 알린다. 길어지면 안내 메시지 등 시각적 표현을 추가한다 (예: 5초 경과 시 안내) |
| 완료 | 간단한 로딩은 완료 메시지가 불필요하다. 피드백이 필요한 경우만 성공 표시를 한다 |
| 실패 | 무엇이 잘못됐는지와 다음 조치를 설명하는 오류 메시지를 표시하고 재시도 옵션을 제공한다 (예: 10초 초과 시 실패 처리) |
