import type { DashboardKind, ProductSlug } from "@/lib/products";
import { Nis2Dashboard } from "@/components/dashboards";
import LexLegalPreview from "@/components/products/dashboards/lex-legal-preview";
import DocSensePreview from "@/components/products/dashboards/docsense-preview";

/** Interface previews that stand in until a product has a full dashboard. */
const PREVIEWS: Partial<Record<ProductSlug, () => React.JSX.Element>> = {
  "lex-legal": LexLegalPreview,
  docsense: DocSensePreview,
};

function MockupPlaceholder({ productName }: { productName: string }) {
  return (
    <div
      className="flex min-h-[20rem] flex-col items-center justify-center gap-3 px-6 py-16 text-center sm:min-h-[24rem]"
      role="status"
    >
      <p className="label">Product mockup</p>
      <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
        A full {productName} dashboard is on the way. This page will show the real interface
        when it is ready — not a simulated one.
      </p>
    </div>
  );
}

export default function ProductDashboard({
  kind,
  slug,
  productName,
  embedded = false,
}: {
  kind: DashboardKind;
  slug?: ProductSlug;
  productName: string;
  embedded?: boolean;
}) {
  if (kind === "none") return null;
  const Preview = slug ? PREVIEWS[slug] : undefined;

  return (
    <div className={embedded ? undefined : "gutter pb-[var(--space-section-y)] lg:pb-[var(--space-section-y-lg)]"}>
      <div className="stage-glow relative p-3 sm:p-6 lg:p-8">
        <div className="panel overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
          {kind === "nis2" ? (
            <Nis2Dashboard />
          ) : Preview ? (
            <div className="p-3 sm:p-4">
              <Preview />
            </div>
          ) : (
            <MockupPlaceholder productName={productName} />
          )}
        </div>
      </div>
    </div>
  );
}
