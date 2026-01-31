'use client';

import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import { Children, isValidElement, type ReactNode } from 'react';
import { Bookmark, Embed, LinkPreview } from './bookmark';
import { Callout } from './callout';
import { Video } from './video';

// img 컴포넌트를 별도로 정의 (참조 비교를 위해)
function MdxImage({ src, alt }: { src?: string; alt?: string }) {
  return (
    <figure className="my-4">
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg"
        style={{ width: 'auto', height: 'auto' }}
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">{alt}</figcaption>
      )}
    </figure>
  );
}

// 블록 요소를 포함하는지 검사하는 헬퍼 함수
function hasBlockElement(children: ReactNode): boolean {
  return Children.toArray(children).some((child) => {
    if (!isValidElement(child)) return false;
    const type = child.type;
    // 함수 컴포넌트인 경우 (MDX가 매핑한 컴포넌트)
    if (type === MdxImage) return true;
    // 문자열 타입인 경우 (기본 HTML 태그)
    if (typeof type === 'string') {
      const blockTypes = ['figure', 'div', 'img', 'table', 'pre', 'ul', 'ol', 'blockquote'];
      return blockTypes.includes(type);
    }
    return false;
  });
}

export const mdxComponents: MDXComponents = {
  Callout,
  Bookmark,
  LinkPreview,
  Embed,
  Video,
  h1: ({ children }) => <h1 className="mt-8 mb-4 text-3xl font-bold">{children}</h1>,
  h2: ({ children }) => <h2 className="mt-6 mb-3 text-2xl font-semibold">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-4 mb-2 text-xl font-semibold">{children}</h3>,
  p: ({ children }) => {
    // 블록 요소가 포함되어 있으면 div 사용
    if (hasBlockElement(children)) {
      return <div className="my-4 leading-7">{children}</div>;
    }
    return <p className="my-4 leading-7">{children}</p>;
  },
  ul: ({ children }) => <ul className="my-4 list-disc pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="my-4 list-decimal pl-6">{children}</ol>,
  li: ({ children }) => <li className="my-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-muted-foreground/30 pl-4 italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-muted" />,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-4 hover:text-primary/80"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  code: ({ children, className }) => {
    const isInline = !className;
    if (isInline) {
      return <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{children}</code>;
    }
    return <code className={className}>{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-lg bg-muted p-4">{children}</pre>
  ),
  img: MdxImage,
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-muted bg-muted/50 px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="border border-muted px-4 py-2">{children}</td>,
};

export { Callout, Bookmark, LinkPreview, Embed, Video };
