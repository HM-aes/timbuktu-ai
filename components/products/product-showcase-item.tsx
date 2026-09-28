"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check, Clock3 } from "lucide-react";
import type { ProductStatus } from "@/lib/products";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

export type ShowcaseProduct = {
  number: string;
  name: string;
  status: ProductStatus;
  tagline: string;
  problem?: string;
  description: string;
  capabilities: string[];
  note?: string;
  href: string;
  cta: string;
  /** Desktop only: interface on the left, copy on the right. */
  reversed: boolean;
  preview: ReactNode;
};

const ease = [0.22, 1, 0.36, 1] as const;
/** Shared top inset so copy and preview share one baseline on desktop. */
const ROW_TOP =
  "pt-[var(--space-head-gap-lg)] md:pt-8 lg:pt-12 lg:pb-0";

const enter = (
  reduced: boolean,
  delay: number,
  distance: number,
  duration = 1.05,
) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -8% 0px" },
  transition: reduced ? INSTANT : { duration, delay, ease },
});

/**
 * One product row: copy column (~35%) beside its interface (~65%).
 *
 * Grid areas let the copy split around the interface on small screens —
 * number, name and tagline above it; description, capabilities and CTA
 * below — while on desktop both halves share one column beside it.
 */
export default function ProductShowcaseItem({ product: p }: { product: ShowcaseProduct }) {
  const reduced = useReducedMotionSafe();
  const soon = p.status === "Coming soon";

  return (
    <article
      aria-labelledby={`product-${p.number}`}
      className={cn(
        "group/product grid border-t border-[var(--line)] [grid-template-areas:'head'_'preview'_'body']",
        "lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:grid-rows-[auto_auto] lg:[grid-template-areas:'head_preview'_'body_preview']",
        p.reversed &&
          "lg:grid-cols-[minmax(0,0.64fr)_minmax(0,0.36fr)] lg:[grid-template-areas:'preview_head'_'preview_body']",
      )}
    >
      {/* Number, name, tagline — top-aligned with preview (industry split layout) */}
      <header
        className={cn(
          "gutter pb-8 [grid-area:head] lg:self-start lg:px-[var(--space-cell-lg)] lg:pb-10",
          ROW_TOP,
        )}
      >
        <motion.div {...enter(reduced, 0, 14)} className="flex items-center gap-3">
          <span className="label text-signal">{p.number}</span>
          <span aria-hidden className="h-px w-6 bg-[var(--line-strong)]" />
          <span className="pill">
            {soon ? (
              <Clock3 size={12} aria-hidden className="text-muted-foreground" />
            ) : (
              <span className="dot" data-tone="verify" aria-hidden />
            )}
            {p.status}
          </span>
        </motion.div>
        <motion.h3
          {...enter(reduced, 0.1, 22, 1.1)}
          id={`product-${p.number}`}
          className="mt-6 text-[1.75rem] font-medium leading-[1.1] tracking-[-0.02em] text-foreground lg:text-[2rem]"
        >
          {p.name}
        </motion.h3>
        <motion.p
          {...enter(reduced, 0.2, 16, 1.1)}
          className="mt-3 max-w-[26ch] text-[1.25rem] leading-snug tracking-[-0.01em] text-foreground/90"
        >
          {p.tagline}
        </motion.p>
      </header>

      {/* The product's own interface */}
      <div
        className={cn(
          "stage-object relative border-y border-[var(--line)] px-4 py-8 [--glow:9%] [grid-area:preview] sm:px-8 sm:py-10 lg:flex lg:items-start lg:border-y-0 lg:px-12 lg:pb-16",
          ROW_TOP,
          p.reversed ? "lg:border-r" : "lg:border-l",
        )}
      >
        <motion.div
          {...enter(reduced, 0.14, 32, 1.15)}
          whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.5, ease } }}
          className="mx-auto w-full max-w-[46rem] lg:mx-0 lg:max-w-none"
        >
          {p.preview}
        </motion.div>
      </div>

      {/* Description, capabilities, CTA */}
      <motion.div
        {...enter(reduced, 0.24, 12, 1.05)}
        className="gutter pb-[var(--space-section-y)] pt-8 [grid-area:body] lg:self-start lg:px-[var(--space-cell-lg)] lg:pb-16 lg:pt-6"
      >
        {p.problem && (
          <div className="mb-6">
            <p className="label text-signal">The problem</p>
            <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed text-foreground/85">{p.problem}</p>
          </div>
        )}
        {p.problem && <p className="label mb-2">What it does</p>}
        <p className="cell-body max-w-[38ch] text-[1rem]">{p.description}</p>

        {p.capabilities.length > 0 && (
          <ul className="mt-6 space-y-2.5" aria-label={`${p.name} capabilities`}>
            {p.capabilities.map((c) => (
              <li key={c} className="flex items-center gap-3 text-[14.5px] text-foreground/85">
                <span className="grid size-5 shrink-0 place-items-center rounded-full border border-signal/35 bg-signal/[0.06]">
                  <Check size={11} className="text-signal" aria-hidden />
                </span>
                {c}
              </li>
            ))}
          </ul>
        )}

        {p.note && <p className="label mt-6">{p.note}</p>}

        <Link
          href={p.href}
          className="group/cta mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground transition-colors hover:text-signal"
        >
          {p.cta}
          <ArrowRight
            size={16}
            aria-hidden
            className="transition-transform duration-300 group-hover/cta:translate-x-0.5 motion-reduce:transition-none"
          />
        </Link>
      </motion.div>
    </article>
  );
}
