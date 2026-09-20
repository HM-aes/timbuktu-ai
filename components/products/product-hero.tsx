"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CtaButton } from "@/components/shadcn-space/button/button-16";
import type { ProductStatus } from "@/lib/products";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProductHero({
  name,
  promise,
  status,
  cta,
}: {
  name: string;
  promise: string;
  status: ProductStatus;
  cta: { text: string; href: string };
}) {
  const reduced = useReducedMotionSafe();
  const isSoon = status === "Coming soon";

  return (
    <div className="gutter pb-[var(--space-section-y)] pt-[var(--space-hero-pt)] lg:pb-[var(--space-section-y-lg)] lg:pt-[var(--space-hero-pt-lg)]">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? INSTANT : { duration: 0.7, ease }}
        className="label text-foreground/90"
      >
        {name}
      </motion.p>

      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? INSTANT : { duration: 0.7, delay: 0.06, ease }}
        className="pill mt-4 inline-flex"
      >
        <span className="dot" data-tone={isSoon ? "muted" : "verify"} aria-hidden />
        {status}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? INSTANT : { duration: 0.8, delay: 0.12, ease }}
        className="display mt-5 max-w-[22ch] text-foreground"
      >
        {promise}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? INSTANT : { duration: 0.8, delay: 0.2, ease }}
        className="mt-8"
      >
        <CtaButton href={cta.href}>
          {cta.text}
          <ArrowRight size={16} data-arrow />
        </CtaButton>
      </motion.div>
    </div>
  );
}
