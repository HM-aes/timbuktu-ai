"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Reveal — scroll-triggered entrance: fades and lifts content in once as it
 * enters the viewport. Same ease and pace as the hero settle.
 *
 * The rendered tree is identical on server and client; reduced motion only
 * swaps the transition for an instant snap (see useReducedMotionSafe), so
 * the static content stays server-rendered and hydration never mismatches.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
}) {
  const reduced = useReducedMotionSafe();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={reduced ? INSTANT : { duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
