---
description: 변경 사항을 푸시하고 PR 생성, 스쿼시 머지 후 master로 복귀하는 워크플로우
---

# PR Squash & Merge Workflow

이 워크플로우는 현재 브랜치의 변경 사항을 푸시하고, GitHub Pull Request(PR)를 생성한 뒤 스쿼시 머지(Squash Merge)하고 로컬을 정리하는 과정을 안내합니다.

## 사전 요구 사항

- **GitHub CLI (`gh`)**: 설치 및 로그인 필수.

## 단계별 실행

### 1. 변경 사항 푸시 (Push)

현재 작업 중인 브랜치를 원격 저장소에 푸시합니다.

```bash
git push -u origin HEAD
```

### 2. PR 생성 (Create PR)

GitHub CLI를 사용하여 PR을 생성합니다. 웹 브라우저를 열지 않고 터미널에서 바로 생성할 수 있습니다.
제목과 내용은 **한국어**로 작성해 주세요. `--web` 옵션을 추가하면 브라우저에서 작성할 수도 있습니다.

```bash
gh pr create --base master --title "<PR 제목>" --body "<PR 내용>"
```

**대화형으로 생성하기 (추천):**
```bash
gh pr create
```
*(실행 후 Title, Body 등을 차례로 입력하면 됩니다)*

### 3. 스쿼시 머지 (Squash Merge)

PR이 승인되었거나 바로 머지할 준비가 되었다면, 스쿼시 머지를 수행합니다.
`--delete-branch` 옵션은 머지 후 원격 브랜치를 자동으로 삭제합니다.

```bash
gh pr merge --squash --delete-branch
```

**팁**: CI 통과 후 자동 머지하려면 `--auto`를 추가하세요.
```bash
gh pr merge --squash --auto --delete-branch
```

### 4. 로컬 정리 및 최신화 (Cleanup)

머지가 완료되면 로컬 `master` 브랜치로 이동하여 최신 내용을 받아옵니다.

// turbo
```bash
git checkout master && git pull origin master
```

### 5. 로컬 브랜치 정리 (선택 사항)

더 이상 필요 없는 로컬 브랜치를 삭제합니다.

```bash
git branch -d <branch-name>
```
