'use client';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { mdxComponents } from './index';

interface MdxRendererProps {
  source: MDXRemoteSerializeResult;
}

export function MdxRenderer({ source }: MdxRendererProps) {
  return <MDXRemote {...source} components={mdxComponents} />;
}
