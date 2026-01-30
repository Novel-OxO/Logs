import { createElement, useMemo } from 'react';
import * as runtime from 'react/jsx-runtime';
import { CodeBlock } from '@/components/code-block';

const useMDXComponent = (code: string) => {
  return useMemo(() => {
    const fn = new Function(code);
    return fn({ ...runtime }).default;
  }, [code]);
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

const components = {
  pre: CodeBlock,
};

export function MDXContent({ code, components: userComponents }: MDXProps) {
  const Component = useMDXComponent(code);
  return createElement(Component, {
    components: { ...components, ...userComponents },
  });
}
