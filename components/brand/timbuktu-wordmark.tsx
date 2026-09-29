"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * TIMBUKTU AI — typography-first lockup with provenance metadata.
 * Registration hairline + partial corner stroke (not a badge).
 */
export default function TimbuktuWordmark({
  variant = "header",
  showProvenance = variant === "header",
  animate = variant === "header",
  className,
}: {
  variant?: "header" | "footer";
  showProvenance?: boolean;
  animate?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotionSafe();
  const isHeader = variant === "header";
  const motionOn = animate && isHeader && !reduced;

  const PrimaryTag = motionOn ? motion.span : "span";
  const MetaTag = motionOn ? motion.span : "span";

  const primaryProps = motionOn
    ? {
        initial: { opacity: 0, y: 5 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease },
      }
    : {};

  const metaProps = motionOn
    ? {
        initial: { opacity: 0, y: 4 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, delay: 0.07, ease },
      }
    : {};

  return (
    <span
      className={cn(
        "brand-lockup inline-flex flex-col",
        isHeader ? "brand-lockup--header" : "brand-lockup--footer",
        className,
      )}
    >
      <PrimaryTag {...primaryProps} className="block">
        <span
          className={cn(
            "brand-wordmark inline-flex items-baseline",
            isHeader ? "brand-wordmark--header" : "brand-wordmark--footer",
          )}
        >
          <span className="brand-wordmark-primary">Timbuktu</span>
          <span className="brand-wordmark-accent">AI</span>
        </span>
      </PrimaryTag>

      {showProvenance && (
        <MetaTag {...metaProps} className="brand-provenance-row">
          <span className="brand-provenance-mark" aria-hidden />
          <span className="brand-provenance-text">
            <span className="brand-provenance" aria-hidden>
              Liptako–Gourma
              <span className="brand-provenance-sep"> · </span>
              <span className="max-[380px]:hidden">16 Sep 2023</span>
              <span className="min-[381px]:hidden">16 Sep 23</span>
            </span>
          </span>
        </MetaTag>
      )}
    </span>
  );
}
