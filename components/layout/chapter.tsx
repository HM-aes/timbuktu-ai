"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Thin metallic rule that marks the start of a chapter; draws outward once in view. */
export function SectionDivider({ className }: { className?: string }) {
  const reduced = useReducedMotionSafe();

  return (
    <motion.div
      aria-hidden
      className={cn("section-divider", className)}
      initial={{ opacity: 0, scaleX: 0.3 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={reduced ? INSTANT : { duration: 0.9, ease }}
    />
  );
}

/** Chapter metadata: "01 / Architecture". */
export function ChapterLabel({
  number,
  label,
  className,
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <p className={cn("chapter-label", className)}>
      <span className="chapter-label-number">{number}</span>
      <span className="chapter-label-slash" aria-hidden>
        /
      </span>
      <span>{label}</span>
    </p>
  );
}
