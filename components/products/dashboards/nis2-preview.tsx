import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The real NIS2 Analyzer interface, shown as two of its own screens (stacked
 * on small screens, cascaded on desktop) so the pair fills the product row: the dashboard a team lands on, and the
 * gap browser the analysis ends in. The site is a static export, so the
 * images are served as-is (`unoptimized`) rather than through the image
 * loader. The app is dark, so its window chrome stays dark in both themes.
 */
const SCREENS = [
  {
    src: "/previews/nis2-dashboard.png",
    width: 1007,
    height: 471,
    route: "Dashboard",
    alt: "NIS2 Analyzer dashboard: sidebar with Dashboard, Clients, Audits and Gap Analysis, a three-step start panel, and cards for total clients, active audits, compliance score and critical open gaps.",
  },
  {
    src: "/previews/nis2-gap-analysis.png",
    width: 1436,
    height: 660,
    route: "Gap analysis",
    alt: "NIS2 Analyzer gap analysis browser: totals for gaps, critical and open gaps, average risk and remediation time, a treemap by category, severity filters and the table of gaps.",
  },
] as const;

export default function Nis2Preview() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col justify-center gap-4 lg:gap-0">
      {SCREENS.map((screen, i) => (
        <figure
          key={screen.src}
          className={cn(
            "overflow-hidden rounded-[var(--radius-panel)] border border-white/15 bg-[#0b0b0d] shadow-[0_32px_64px_-30px_rgba(0,0,0,0.75)]",
            /* Desktop: a cascade. The second screen sits in front, lower and to
               the right, so the pair matches the height of the copy beside it. */
            "lg:w-[88%]",
            i === 0 ? "lg:self-start" : "relative lg:-mt-[9%] lg:self-end lg:shadow-[0_36px_72px_-28px_rgba(0,0,0,0.7)]",
          )}
        >
          <figcaption className="flex h-9 items-center justify-between gap-3 border-b border-white/10 px-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
            <span className="flex min-w-0 items-center gap-2">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-signal" />
              <span className="truncate">NIS2 Analyzer</span>
            </span>
            <span className="shrink-0">{screen.route}</span>
          </figcaption>
          <Image
            src={screen.src}
            alt={screen.alt}
            width={screen.width}
            height={screen.height}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="h-auto w-full"
            unoptimized
          />
        </figure>
      ))}
    </div>
  );
}
