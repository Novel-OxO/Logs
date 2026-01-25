'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="bg-primary fixed top-14 right-0 left-0 z-50 h-[3px] origin-left"
      style={{ scaleX }}
    />
  );
}
