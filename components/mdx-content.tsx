import * as runtime from 'react/jsx-runtime';
import { useMemo, createElement } from 'react';

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

export function MDXContent({ code, components }: MDXProps) {
  const Component = useMDXComponent(code);
  return createElement(Component, { components });
}
