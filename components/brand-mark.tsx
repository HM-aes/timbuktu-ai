import { cn } from "@/lib/utils";

function BrandLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      className={cn("size-7 shrink-0", className)}
      aria-hidden
    >
      <path
        d="M18 4v28M4 12h28M4 24h28"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        className="text-signal/30"
      />
      <path
        d="M11 9h14M13 9v18M23 9v18"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-signal"
      />
      <circle cx="18" cy="18" r="2.5" fill="currentColor" className="text-signal" />
    </svg>
  );
}

/**
 * BrandMark — wordmark lockup for header and footer.
 * Logo glyph + "Timbuktu" with the "AI Solutions" descriptor in one line.
 */
export default function BrandMark({
  href = "#top",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      aria-label="Timbuktu AI Solutions — back to top"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <BrandLogo />
      <span className="font-display text-[1.25rem] font-semibold leading-none tracking-[-0.03em]">
        Timbuktu
        <span className="ml-1.5 font-normal text-muted-foreground">AI</span>
      </span>
    </a>
  );
}
