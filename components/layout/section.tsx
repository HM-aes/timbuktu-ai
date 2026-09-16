import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section — one stacked block inside the page frame.
 * Draws the hairline rule that separates it from the block above and keeps
 * every section on the same framed column and gutter.
 */
export default function Section({
  id,
  children,
  className,
  frameClassName,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  frameClassName?: string;
}) {
  return (
    <section id={id} className={cn("section relative", className)}>
      <div className={cn("frame", frameClassName)}>{children}</div>
    </section>
  );
}

/** Heading block: title + supporting copy, left-aligned on the gutter. */
export function SectionHead({
  title,
  children,
  className,
}: {
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("gutter", className)}>
      <div className="section-head">
        <h2 className="title text-foreground">{title}</h2>
        {children && <div className="lede">{children}</div>}
      </div>
    </div>
  );
}
