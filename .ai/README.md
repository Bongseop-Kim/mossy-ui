# AI reference files

이 디렉터리는 AI Agent가 외부 디자인 시스템을 로컬에서 참조하기 위한 공간이다.

## seed-design React/CSS

`daangn/seed-design`의 `dev` 브랜치 `packages/react`, `packages/css`, `packages/design-token`은
아래 위치에 ignored clone으로 둔다.

```txt
.ai/refs/seed-design/packages/react
.ai/refs/seed-design/packages/css
.ai/refs/seed-design/packages/design-token
```

처음 받기:

```bash
mkdir -p .ai/refs
git clone --branch dev --depth 1 --filter=blob:none --sparse https://github.com/daangn/seed-design.git .ai/refs/seed-design
cd .ai/refs/seed-design
git sparse-checkout set packages/react packages/css packages/design-token
```

갱신:

```bash
cd .ai/refs/seed-design
git pull --depth 1
```

이 참조본은 git에 커밋하지 않는다.
