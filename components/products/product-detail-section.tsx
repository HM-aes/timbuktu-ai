import type { ReactNode } from "react";
import Section from "@/components/layout/section";
import { cn } from "@/lib/utils";

export function ProductDetailSection({
  title,
  children,
  tone = "base",
  className,
}: {
  title: string;
  children: ReactNode;
  tone?: "base" | "panel";
  className?: string;
}) {
  return (
    <Section className={cn(tone === "panel" ? "tone-panel" : "tone-base", className)}>
      <div className="gutter section-block pt-0">
        <h2 className="title max-w-[24ch] text-foreground">{title}</h2>
        <div className="mt-6 max-w-[42rem] space-y-4">{children}</div>
      </div>
    </Section>
  );
}
