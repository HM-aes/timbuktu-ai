"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

function glowMove(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--bx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--by", `${e.clientY - r.top}px`);
}

function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "brand-mark__logo relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-[10px]",
        className,
      )}
    >
      <svg
        viewBox="0 0 36 36"
        fill="none"
        className="relative z-[1] size-[22px]"
        aria-hidden
      >
        <path
          d="M18 4v28M4 12h28M4 24h28"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          className="text-amber-400/25"
        />
        <path
          d="M11 9h14M13 9v18M23 9v18"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-200"
        />
        <circle cx="18" cy="18" r="2.5" fill="currentColor" className="text-signal" />
      </svg>
    </span>
  );
}

type BrandMarkProps = Omit<HTMLMotionProps<"a">, "children"> & {
  compact?: boolean;
};

/**
 * BrandMark — identity badge for the header.
 * Instrument-panel glass tag with live signal dot and pointer-tracked amber edge.
 */
export default function BrandMark({
  className,
  compact = false,
  ...props
}: BrandMarkProps) {
  return (
    <motion.a
      onMouseMove={glowMove}
      aria-label="Timbuktu AI Solutions — back to top"
      {...props}
      className={cn(
        "brand-mark bento-tile group/brand inline-flex max-w-full items-stretch overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.55),0_0_0_1px_rgba(245,166,35,0.08)_inset,0_0_24px_-8px_rgba(245,166,35,0.35)] backdrop-blur-md transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-amber-400/30 hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.6),0_0_0_1px_rgba(245,166,35,0.14)_inset,0_0_32px_-6px_rgba(245,166,35,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        compact ? "h-10" : "h-11",
        className,
      )}
    >
      <span
        aria-hidden
        className="brand-mark__rail w-[3px] shrink-0 bg-gradient-to-b from-amber-300 via-signal to-amber-600/70"
      />

      <span className="inline-flex min-w-0 flex-1 items-center gap-2.5 px-2.5 py-1.5 sm:gap-3 sm:px-3">
        <BrandLogo />

        <span className="min-w-0 flex flex-col justify-center leading-none">
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden
              className="brand-mark__dot pulse-dot size-1.5 shrink-0 rounded-full bg-signal shadow-[0_0_8px_1px_color-mix(in_srgb,var(--signal)_55%,transparent)]"
            />
            <span className="truncate font-display text-[15px] font-semibold tracking-[-0.03em] text-white sm:text-base">
              Timbuktu
            </span>
          </span>
          <span className="mt-1 truncate font-mono text-[9.5px] font-medium uppercase tracking-[0.24em] text-amber-300/95 sm:text-[10px]">
            AI Solutions
          </span>
        </span>
      </span>
    </motion.a>
  );
}
