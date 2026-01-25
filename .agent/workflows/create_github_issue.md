---
description: .agent 디렉토리를 생성하고 GitHub 이슈를 한국어로 생성하는 워크플로우
---

# GitHub Issue Creation Workflow

이 워크플로우는 `.agent` 디렉토리의 존재를 확인하고, GitHub CLI(`gh`)를 사용하여 새로운 이슈를 한국어로 생성합니다.

## 사전 요구 사항

- **GitHub CLI (`gh`)**: 설치되어 있고 로그인되어 있어야 합니다.
  - 설치 확인: `gh --version`
  - 로그인: `gh auth login`

## 단계별 실행

### 1. .agent 디렉토리 확인 및 생성

`.agent` 디렉토리가 존재하는지 확인하고, 없다면 생성합니다.

// turbo
```bash
mkdir -p .agent
```

### 2. 이슈 생성 명령 실행

아래 명령어를 복사하여 터미널에 입력하되, `<제목>`과 `<설명>`을 원하는 내용으로 변경하여 실행하세요.

```bash
gh issue create --title "<제목>" --body "<설명>"
```

**예시:**
```bash
gh issue create --title "로그인 페이지 버그 수정" --body "로그인 버튼 클릭 시 반응이 없습니다. 확인 부탁드립니다."
```

### 3. (선택 사항) 라벨 추가

이슈 생성 시 라벨을 함께 추가하려면 `--label` 옵션을 사용하세요.

```bash
gh issue create --title "<제목>" --body "<설명>" --label "bug" --label "frontend"
```
