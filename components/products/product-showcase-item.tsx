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

  const enter = (delay: number, distance: number) => ({
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -12% 0px" },
    transition: reduced ? INSTANT : { duration: 0.8, delay, ease },
  });

  return (
    <article
      aria-labelledby={`product-${p.number}`}
      className={cn(
        "group/product grid border-t border-[var(--line)] [grid-template-areas:'head'_'preview'_'body']",
        "lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:grid-rows-[1fr_1fr] lg:[grid-template-areas:'head_preview'_'body_preview']",
        p.reversed &&
          "lg:grid-cols-[minmax(0,0.64fr)_minmax(0,0.36fr)] lg:[grid-template-areas:'preview_head'_'preview_body']",
      )}
    >
      {/* Number, name, tagline */}
      <motion.header
        {...enter(0, 16)}
        className="gutter pb-8 pt-[var(--space-section-y)] [grid-area:head] lg:self-end lg:px-[var(--space-cell-lg)] lg:pb-6 lg:pt-16"
      >
        <div className="flex items-center gap-3">
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
        </div>
        <h3
          id={`product-${p.number}`}
          className="mt-6 text-[1.75rem] font-medium leading-[1.1] tracking-[-0.02em] text-foreground lg:text-[2rem]"
        >
          {p.name}
        </h3>
        <p className="mt-3 max-w-[26ch] text-[1.25rem] leading-snug tracking-[-0.01em] text-foreground/90">
          {p.tagline}
        </p>
      </motion.header>

      {/* The product's own interface */}
      <div
        className={cn(
          "stage-object relative border-y border-[var(--line)] px-4 py-8 [--glow:9%] [grid-area:preview] sm:px-8 sm:py-10 lg:border-y-0 lg:px-12 lg:py-16",
          p.reversed ? "lg:border-r" : "lg:border-l",
        )}
      >
        <motion.div
          {...enter(0.1, 28)}
          whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.5, ease } }}
          className="mx-auto max-w-[46rem]"
        >
          {p.preview}
        </motion.div>
      </div>

      {/* Description, capabilities, CTA */}
      <motion.div
        {...enter(0.18, 12)}
        className="gutter pb-[var(--space-section-y)] pt-8 [grid-area:body] lg:self-start lg:px-[var(--space-cell-lg)] lg:pb-16 lg:pt-0"
      >
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
