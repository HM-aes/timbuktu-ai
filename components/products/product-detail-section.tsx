import type { ReactNode } from "react";
import Section from "@/components/layout/section";
import { cn } from "@/lib/utils";

export function ProductDetailSection({
  title,
  children,
  tone = "base",
  className,
  wideBelow,
}: {
  title: string;
  children: ReactNode;
  tone?: "base" | "panel";
  className?: string;
  /** Full-bleed content below the measured copy column (e.g. product dashboard). */
  wideBelow?: ReactNode;
}) {
  return (
    <Section className={cn(tone === "panel" ? "tone-panel" : "tone-base", className)}>
      <div className={cn("gutter section-block pt-0", wideBelow && "pb-[var(--space-section-y)] md:pb-[var(--space-section-y-md)]")}>
        <h2 className="title max-w-[24ch] text-foreground">{title}</h2>
        <div className="mt-6 max-w-[42rem] space-y-4">{children}</div>
        {wideBelow && <div className="mt-10 md:mt-12">{wideBelow}</div>}
      </div>
    </Section>
  );
}
