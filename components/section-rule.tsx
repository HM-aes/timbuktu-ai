"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

/**
 * SectionRule — numbered chapter marker.
 * `01 — Approach` in mono, followed by a hairline that draws in on scroll.
 */
export default function SectionRule({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  const reduced = useReducedMotionSafe();
  return (
    <div className="shell section-rule flex items-center gap-5">
      <span className="eyebrow flex items-center gap-3">
        <span className="text-amber-400">{index}</span>
        <span aria-hidden className="text-foreground/30">—</span>
        <span className="text-foreground/80">{label}</span>
      </span>
      <motion.div
        aria-hidden
        className="h-px flex-1 origin-left bg-gradient-to-r from-foreground/20 via-foreground/10 to-transparent"
        initial={{ scaleX: 0 }}
        animate={reduced ? { scaleX: 1 } : undefined}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={reduced ? INSTANT : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
