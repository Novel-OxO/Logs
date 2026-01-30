'use client';

import { Check, Copy } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

export function CodeBlock({ children, className, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const [isCopied, setIsCopied] = React.useState(false);
  const preRef = React.useRef<HTMLPreElement>(null);

  const copyToClipboard = async () => {
    if (!preRef.current) return;

    // textContent helps avoid getting style-injected hidden text if any
    const code = preRef.current.textContent;

    if (code) {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="group relative mb-4">
      <pre
        ref={preRef}
        className={cn('bg-muted overflow-x-auto rounded-lg border p-4', className)}
        {...props}
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={copyToClipboard}
        className={cn(
          'bg-background/50 hover:bg-background absolute top-4 right-4 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border p-2 backdrop-blur-sm',
          isCopied && 'text-primary border-primary/50 opacity-100',
        )}
        aria-label="Copy code"
      >
        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
