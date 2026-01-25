---
description: GitHub 이슈를 확인하고 해결을 위한 브랜치를 생성하는 워크플로우
---

# Solve GitHub Issue Workflow

이 워크플로우는 GitHub 이슈 목록을 확인하고, 선택한 이슈를 해결하기 위한 브랜치를 프로젝트 컨벤션에 맞춰 생성합니다.

## 사전 요구 사항

- **GitHub CLI (`gh`)**: 설치 및 로그인 상태여야 합니다.
- **Git**: 현재 `master`나 `main` 브랜치에서 최신 상태여야 합니다.

---

## 단계별 실행

### 1. 이슈 목록 확인

현재 열려 있는 이슈 목록을 확인합니다.

// turbo
```bash
gh issue list
```

### 2. 이슈 상세 내용 확인 (선택 사항)

특정 이슈의 상세 내용과 번호를 확인하려면 아래 명령어를 사용하세요. (`<번호>`를 실제 이슈 번호로 교체)

```bash
gh issue view <번호>
```

### 3. 브랜치 생성 및 체크아웃

이슈 해결을 위한 브랜치를 생성합니다. 프로젝트 컨벤션(`feat/`, `fix/`, `refactor/`)을 따르며, 브랜치명에 이슈 번호를 포함하는 것을 권장합니다.

**형식:** `git checkout -b <type>/issue-<number>-<description>`

**실행 명령어 예시:**
```bash
# 버그 수정을 위한 브랜치 생성 예시
git checkout -b fix/issue-123-login-error

# 기능 구현을 위한 브랜치 생성 예시
git checkout -b feat/issue-456-add-profile-image
```

### 4. 작업 시작 전 master 최신화 (권장)

브랜치를 만들기 전에 `master` 브랜치를 최신 상태로 유지하는 것이 좋습니다.

```bash
git checkout master && git pull origin master
```
