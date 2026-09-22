"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import gsap from "gsap";
import { motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ProductVisual, STAGE, type ProductVisualKind } from "@/components/visuals/product-visuals";
import type { ProductStatus } from "@/lib/products";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";
import { useScrollScene } from "@/lib/use-scroll-scene";
import { useStageActivity } from "@/lib/use-stage-activity";
import { cn } from "@/lib/utils";

export type ProductPanelData = {
  number: string;
  category: string;
  name: string;
  promise: string;
  status: ProductStatus;
  href: string;
  cta: string;
  visual: ProductVisualKind;
  /** Desktop only: object above the copy. Alternating builds the checkerboard. */
  visualFirst: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The four product panels — one bordered 2 × 2 grid sharing the frame's
 * hairlines. Motion handles the staggered entrance and hover; GSAP adds a
 * slow scroll parallax to each object inside its stage.
 */
export default function ProductGrid({ items }: { items: ProductPanelData[] }) {
  const grid = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotionSafe();
  useStageActivity(grid);

  useScrollScene(grid, (root) => {
    root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
      gsap.fromTo(
        el,
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.8 },
        },
      );
    });
  });

  const t = (delay = 0) => (reduced ? INSTANT : { duration: 0.85, delay, ease });

  const panel: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: t() },
  };
  const object: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: t(0.15) },
    hover: { y: -6, scale: 1.02, transition: { duration: 0.6, ease } },
  };
  const arrow: Variants = {
    show: { x: 0 },
    hover: { x: 4, transition: { duration: 0.4, ease } },
  };

  return (
    <motion.ul
      ref={grid}
      className="cells cells-2"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: reduced ? 0 : 0.1 }}
    >
      {items.map((p) => (
        <motion.li key={p.href} variants={panel} whileHover={reduced ? undefined : "hover"} className="cell p-0">
          <Link
            href={p.href}
            className="iso-hover group/panel flex h-full flex-col px-[var(--space-cell)] py-[var(--space-cell-y)] transition-colors duration-500 hover:bg-foreground/[0.015] focus-visible:outline-offset-[-2px] sm:px-[var(--space-cell-md)] lg:px-[var(--space-cell-lg)] lg:py-[var(--space-cell-y-lg)]"
          >
            {/* Metadata row */}
            <div className="flex items-center gap-3">
              <span className="label text-signal">{p.number}</span>
              <span aria-hidden className="h-px w-5 bg-[var(--line-strong)]" />
              <span className="label">{p.category}</span>
              <span className="pill ml-auto shrink-0">
                <span className="dot" data-tone={p.status === "Coming soon" ? "muted" : "verify"} aria-hidden />
                {p.status}
              </span>
            </div>

            {/* Copy + object: copy first on mobile; checkerboard on desktop */}
            <div
              className={cn(
                "mt-7 flex flex-col gap-8 lg:mt-8 lg:gap-10",
                p.visualFirst && "lg:flex-col-reverse",
              )}
            >
              <div>
                <h3 className="text-[1.75rem] font-medium leading-[1.1] tracking-[-0.02em] text-foreground lg:text-[2rem]">
                  {p.name}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[1.0625rem] leading-[1.55] text-foreground/80">{p.promise}</p>
              </div>

              <motion.div
                variants={object}
                className="iso-stage stage-object aspect-[16/11] rounded-[var(--radius-panel)] border border-[var(--line)] transition-[--glow] duration-700 [--glow:12%] group-hover/panel:[--glow:22%]"
                style={{ "--glow-x": STAGE[p.visual].x, "--glow-y": STAGE[p.visual].y, "--iso-unit": STAGE[p.visual].unit } as CSSProperties}
              >
                <div data-parallax className="iso-root" style={{ translate: `0 ${STAGE[p.visual].shift}` }}>
                  <ProductVisual kind={p.visual} />
                </div>
              </motion.div>
            </div>

            <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-[15px] font-medium text-foreground transition-colors group-hover/panel:text-signal">
              {p.cta}
              <motion.span variants={arrow} className="inline-flex">
                <ArrowRight size={15} aria-hidden />
              </motion.span>
            </span>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}
