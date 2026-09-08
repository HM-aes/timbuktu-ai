"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

/**
 * FadeIn — standard scroll-triggered entrance.
 * Same DOM on server and client; snaps to visible under reduced motion.
 */
export default function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotionSafe();
  const visible = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={reduced ? visible : undefined}
      whileInView={reduced ? undefined : visible}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduced ? INSTANT : { duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
