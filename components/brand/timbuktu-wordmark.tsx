import { cn } from "@/lib/utils";

/**
 * TIMBUKTU AI lockup — primary wordmark + optional provenance inscription.
 * Typography-first identity (no symbol). Provenance is a heritage reference,
 * not a product tagline.
 */
export default function TimbuktuWordmark({
  variant = "header",
  showProvenance = variant === "header",
  className,
}: {
  variant?: "header" | "footer";
  showProvenance?: boolean;
  className?: string;
}) {
  const isHeader = variant === "header";

  return (
    <span
      className={cn(
        "brand-lockup inline-flex max-w-[13.125rem] flex-col sm:max-w-[15rem]",
        isHeader ? "brand-lockup--header" : "brand-lockup--footer",
        className,
      )}
    >
      <span
        className={cn(
          "brand-wordmark inline-flex items-baseline",
          isHeader ? "brand-wordmark--header" : "brand-wordmark--footer",
        )}
      >
        <span className="brand-wordmark-primary">Timbuktu</span>
        <span className="brand-wordmark-accent">AI</span>
      </span>

      {showProvenance && (
        <span className="brand-provenance" aria-hidden>
          <span className="brand-provenance-est max-[420px]:hidden">Est. </span>
          <span>Liptako–Gourma</span>
          <span className="brand-provenance-sep" aria-hidden>
            {" "}
            ·{" "}
          </span>
          <span className="max-[420px]:hidden">16 Sep 2023</span>
          <span className="min-[421px]:hidden">16 Sep 23</span>
        </span>
      )}
    </span>
  );
}
