# 🚀 Next.js MDX 개발 블로그

이 프로젝트는 **학습용**으로 제작된 MDX 기반의 개발 블로그입니다. Next.js의 최신 기능을 활용하여 현대적인 웹 개발 패턴을 익히는 것을 목표로 합니다.

## 📚 학습 목표 (Learning Objectives)

Next.js로 MDX 기반 블로그를 구축하며 다음과 같은 핵심 기술들을 학습합니다.

1.  **Next.js App Router & Server Components**
    *   React Server Components(RSC)를 활용하여 서버 사이드 렌더링 최적화 및 클라이언트 자바스크립트 최소화 방법을 익힙니다.
2.  **MDX 통합 및 콘텐츠 관리**
    *   Markdown과 JSX를 결합한 MDX를 연동하고, 파일을 동적으로 읽어와 렌더링하는 프로세스를 이해합니다.
    *   `@next/mdx`, `next-mdx-remote`, 또는 `contentlayer`와 같은 라이브러리 활용법을 배웁니다.
3.  **Static Site Generation (SSG)**
    *   `generateStaticParams`를 사용하여 수많은 블로그 포스트를 정적 페이지로 사전 렌더링함으로써 최고의 성능과 SEO를 확보하는 방법을 학습합니다.
4.  **Metadata API & SEO 최적화**
    *   Dynamic Metadata를 사용하여 각 포스트마다 고유한 타이틀, 설명, OpenGraph 이미지를 설정하여 검색 엔진 최적화를 실천합니다.
5.  **구문 강조 (Syntax Highlighting)**
    *   `rehype-highlight` 또는 `shiki`를 통합하여 코드 블록을 미려하게 시각화하는 방법을 익힙니다.
6.  **이미지 및 폰트 최적화**
    *   `next/image`를 통한 반응형 이미지 최적화와 `next/font`를 이용한 Layout Shift 없는 웹 폰트 로딩 기법을 적용합니다.
7.  **현대적인 스타일링 (Tailwind CSS & shadcn/ui)**
    *   Tailwind CSS를 활용하여 유틸리티 퍼스트 디자인을 구축합니다.
    *   `shadcn/ui` 라이브러리를 통해 재사용 가능한 고품질 UI 컴포넌트를 직접 구성하고 관리하는 법을 익힙니다.
8.  **Sitemap & RSS Feed 생성**
    *   스크립트를 통해 자동으로 사이트맵과 RSS 피드를 생성하여 외부 수집 엔진에 친화적인 구조를 만듭니다.

---

## 🛠 실행 방법 (Getting Started)

패키지를 설치하고 개발 서버를 실행하여 시작하세요.

```bash
yarn install
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.
