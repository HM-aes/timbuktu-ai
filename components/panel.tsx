import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Panel — flat product surface for diagrams and dashboards.
 * Hairline border, panel radius, optional caption bar so a diagram reads as
 * a monitored instrument rather than an illustration. Static: motion on the
 * page is reserved for the hero settle, the showcase tabs and the statement.
 */
export default function Panel({
  children,
  caption,
  status,
  statusTone = "signal",
  grid = false,
  className,
  bodyClassName,
  flush = false,
}: {
  children: ReactNode;
  caption?: string;
  status?: string;
  statusTone?: "signal" | "verify" | "muted";
  grid?: boolean;
  className?: string;
  bodyClassName?: string;
  /** Render without border/radius — used when the panel sits inside a cell. */
  flush?: boolean;
}) {
  const dotColor =
    statusTone === "verify"
      ? "var(--verify)"
      : statusTone === "muted"
        ? "var(--muted-foreground)"
        : "var(--signal)";

  return (
    <div className={cn(flush ? "relative" : "panel overflow-hidden", className)}>
      {caption && (
        <div className="panel-caption">
          <span className="inline-flex items-center gap-2">
            <span className="dot" style={{ background: dotColor }} aria-hidden />
            {caption}
          </span>
          {status && <span className="text-foreground/70">{status}</span>}
        </div>
      )}
      <div className={cn(grid && "panel-grid", bodyClassName)}>{children}</div>
    </div>
  );
}
