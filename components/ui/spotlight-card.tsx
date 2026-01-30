'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SpotlightCard({ children, className, ...props }: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLButtonElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <button
      className={cn(
        'group text-foreground relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 p-[2px] shadow-sm dark:border-neutral-800 dark:bg-neutral-800',
        className,
      )}
      onMouseMove={handleMouseMove}
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

      {/* Moving Border Beam Effect */}
      <span className="pointer-events-none absolute inset-[-150%] z-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,#FFB400_360deg)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-30 rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              var(--spotlight-color),
              transparent 80%
            )
          `,
        }}
      />

      {/* Inner Content Mask to show border only */}
      <div className="absolute inset-[2px] z-10 rounded-[9px] bg-white dark:bg-[#1C1C1F]" />

      {/* Content */}
      <div className="relative z-20 h-full overflow-hidden rounded-[9px]">{children}</div>
    </button>
  );
}
