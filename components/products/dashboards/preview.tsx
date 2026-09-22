"use client";

import type { ReactNode } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

/**
 * Interface-preview primitives shared by the four product previews on the
 * homepage. Same materials as the hero dashboards (hairline panes, graphite
 * surfaces, one amber signal), sized to read beside a text column.
 *
 * Every piece marked with `rise` enters in sequence once the window scrolls
 * into view; with reduced motion everything snaps straight to its end state.
 */

const ease = [0.22, 1, 0.36, 1] as const;

/** Entrance for any row, card or value inside a preview window. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export function PreviewWindow({
  product,
  label,
  meta,
  children,
  className,
}: {
  product: string;
  /** What the preview shows, for screen readers — the UI itself is illustrative. */
  label: string;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotionSafe();

  return (
    <MotionConfig transition={reduced ? INSTANT : { duration: 0.55, ease }}>
      <motion.div
        role="img"
        aria-label={label}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: reduced ? 0 : 0.07, delayChildren: reduced ? 0 : 0.25 } },
        }}
        className={cn(
          "overflow-hidden rounded-[var(--radius-panel)] border border-[var(--line-strong)] bg-surface text-foreground",
          "shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]",
          className,
        )}
      >
        {/* Window bar */}
        <div className="flex h-11 items-center justify-between gap-3 border-b border-[var(--line)] bg-background/40 px-4">
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-5 shrink-0 place-items-center rounded-[5px] border border-signal/40 bg-signal/10">
              <span className="size-1.5 rounded-full bg-signal" />
            </span>
            <span className="truncate text-[13px] font-medium tracking-tight">{product}</span>
            {meta}
          </span>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
            Interface preview
          </span>
        </div>

        <div className="p-3 sm:p-4 lg:p-5">{children}</div>
      </motion.div>
    </MotionConfig>
  );
}

/** A titled pane inside a preview window. */
export function Pane({
  title,
  aside,
  children,
  className,
  bodyClassName,
}: {
  title: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <motion.section
      variants={rise}
      className={cn(
        "flex min-w-0 flex-col rounded-[10px] border border-[var(--line)] bg-background/40",
        className,
      )}
    >
      <header className="flex min-h-10 items-center justify-between gap-3 border-b border-[var(--line)] px-3.5 py-2">
        <p className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {title}
        </p>
        {aside}
      </header>
      <div className={cn("min-w-0 flex-1", bodyClassName)}>{children}</div>
    </motion.section>
  );
}

/** A single figure with its label and context line. */
export function Metric({
  label,
  value,
  detail,
  tone = "default",
  children,
  className,
}: {
  label: string;
  value: string;
  detail: string;
  tone?: "default" | "signal" | "verify" | "critical";
  children?: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={rise}
      className={cn("min-w-0 rounded-[10px] border border-[var(--line)] bg-background/40 px-3.5 py-3", className)}
    >
      <p className="text-[11.5px] leading-snug text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1.5 font-display text-[1.375rem] font-medium leading-none tracking-tight sm:text-[1.625rem]",
          tone === "signal" && "text-signal",
          tone === "verify" && "text-verify",
          tone === "critical" && "text-critical",
        )}
      >
        {value}
      </p>
      <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground/80">{detail}</p>
      {children}
    </motion.div>
  );
}

/** Small uppercase data label used inside previews. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--line)] px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
