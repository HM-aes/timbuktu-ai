import Link from "next/link";
import TimbuktuMark from "@/components/brand/timbuktu-mark";
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
  showProvenance?: boolean;
}) {
  const provenance = showProvenance ?? variant === "header";

  return (
    <Link
      href={href}
      aria-label="Timbuktu AI home"
      className={cn(
        "brand-lockup-link group/brand rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <TimbuktuMark className={variant === "header" ? "brand-mark-glyph--header" : "brand-mark-glyph--footer"} />
      <TimbuktuWordmark
        variant={variant}
        showProvenance={provenance}
        animate={variant === "header"}
      />
    </Link>
  );
}
