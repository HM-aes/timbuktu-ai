import Link from "next/link";
import TimbuktuWordmark from "@/components/brand/timbuktu-wordmark";
import { cn } from "@/lib/utils";

export default function BrandMark({
  href = "/",
  className,
  variant = "header",
  showProvenance,
}: {
  href?: string;
  className?: string;
  variant?: "header" | "footer";
  /** Defaults to on for header, off for footer. */
  showProvenance?: boolean;
}) {
  const provenance = showProvenance ?? variant === "header";

  return (
    <Link
      href={href}
      aria-label="Timbuktu AI — home"
      className={cn("brand-lockup-link group/brand rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background", className)}
    >
      <TimbuktuWordmark variant={variant} showProvenance={provenance} />
    </Link>
  );
}
