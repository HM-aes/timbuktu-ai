import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Text wordmark — TIMBUKTU AI (no symbol yet).
 * Typography carries the identity; "AI" uses the site signal accent.
 */
export default function BrandMark({
  href = "/",
  className,
  variant = "header",
}: {
  href?: string;
  className?: string;
  /** Slightly quieter scale for footer lockups. */
  variant?: "header" | "footer";
}) {
  const isHeader = variant === "header";

  const wordmark = (
    <span
      className={cn(
        "brand-wordmark inline-flex items-baseline",
        isHeader ? "brand-wordmark--header" : "brand-wordmark--footer",
      )}
      aria-hidden
    >
      <span className="brand-wordmark-primary">Timbuktu</span>
      <span className="brand-wordmark-accent">AI</span>
    </span>
  );

  return (
    <Link
      href={href}
      aria-label="Timbuktu AI — home"
      className={cn(
        "inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {wordmark}
    </Link>
  );
}
