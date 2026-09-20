import type { DashboardKind } from "@/lib/products";
import { Nis2Dashboard } from "@/components/dashboards";

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
  productName,
}: {
  kind: DashboardKind;
  productName: string;
}) {
  if (kind === "none") return null;

  return (
    <div className="gutter pb-[var(--space-section-y)] lg:pb-[var(--space-section-y-lg)]">
      <div className="stage-glow relative p-3 sm:p-6 lg:p-8">
        <div className="panel overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
          {kind === "nis2" ? <Nis2Dashboard /> : <MockupPlaceholder productName={productName} />}
        </div>
      </div>
    </div>
  );
}
