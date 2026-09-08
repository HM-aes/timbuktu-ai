"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

function glowMove(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--bx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--by", `${e.clientY - r.top}px`);
}

/**
 * Panel — the single card language for the page.
 *
 * Glass surface, hairline border, pointer-tracked amber edge (via .bento-tile),
 * and an optional caption bar so diagrams read as monitored instruments rather
 * than illustrations. Fades up once on scroll; snaps to visible under
 * reduced motion (same DOM on server and client).
 */
export default function Panel({
  children,
  caption,
  status,
  statusTone = "signal",
  grid = false,
  className,
  bodyClassName,
  delay = 0,
  x = 0,
  y = 24,
}: {
  children: ReactNode;
  caption?: string;
  status?: string;
  statusTone?: "signal" | "verify" | "muted";
  grid?: boolean;
  className?: string;
  bodyClassName?: string;
  delay?: number;
  x?: number;
  y?: number;
}) {
  const reduced = useReducedMotionSafe();
  const visible = { opacity: 1, x: 0, y: 0 };
  const dotColor =
    statusTone === "verify"
      ? "var(--verify)"
      : statusTone === "muted"
        ? "var(--muted-foreground)"
        : "var(--signal)";

  return (
    <motion.div
      onMouseMove={glowMove}
      initial={{ opacity: 0, x, y }}
      animate={reduced ? visible : undefined}
      whileInView={reduced ? undefined : visible}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduced ? INSTANT : { duration: 0.8, delay, ease }}
      className={cn("panel bento-tile group/card overflow-hidden", className)}
    >
      {caption && (
        <div className="panel-caption">
          <span className="inline-flex items-center gap-2">
            <span className="dot" style={{ background: dotColor }} aria-hidden />
            {caption}
          </span>
          {status && <span className="text-foreground/60">{status}</span>}
        </div>
      )}
      <div className={cn(grid && "panel-grid", bodyClassName)}>{children}</div>
    </motion.div>
  );
}
