'use client';

import { cn } from '@/lib/utils';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SpotlightCard({ children, className, ...props }: SpotlightCardProps) {
  return (
    <div
      className={cn(
        'group text-foreground relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 p-[2px] shadow-sm dark:border-neutral-800 dark:bg-neutral-800',
        className,
      )}
      {...props}
    >
      {/* Animated Gradient Border Layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `
            radial-gradient(
              600px circle at var(--mouse-x) var(--mouse-y), 
              rgba(255, 180, 0, 0.4), 
              transparent 40%
            )
          `,
        }}
      />

      {/* Moving Border Beam Effect 1 */}
      <span
        className="pointer-events-none absolute inset-[-150%] z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          animation: 'spin 4s linear infinite',
          background: 'conic-gradient(from 0deg, transparent 0 300deg, #FFB400 360deg)',
        }}
      />

      {/* Moving Border Beam Effect 2 */}
      <span
        className="pointer-events-none absolute inset-[-150%] z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          animation: 'spin 4s linear infinite',
          background: 'conic-gradient(from 180deg, transparent 0 300deg, #FFB400 360deg)',
        }}
      />

      {/* Inner Content Mask to show border only */}
      <div className="absolute inset-[2px] z-10 rounded-[9px] bg-white dark:bg-[#1C1C1F]" />

      {/* Content */}
      <div className="relative z-20 h-full overflow-hidden rounded-[9px]">{children}</div>
    </div>
  );
}
