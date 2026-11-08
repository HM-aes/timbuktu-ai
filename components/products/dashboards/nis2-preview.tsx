import Image from "next/image";

/**
 * The real NIS2 Analyzer dashboard — sidebar, navigation and KPI cards —
 * shown as the product's own interface. The site is a static export, so the
 * image is served as-is (`unoptimized`) rather than through the image loader.
 */
export default function Nis2Preview() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col justify-center">
      <div className="overflow-hidden rounded-[var(--radius-panel)] border border-[var(--line-strong)] bg-surface shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]">
        <Image
          src="/previews/nis2-dashboard.png"
          alt="NIS2 Analyzer dashboard: sidebar with Dashboard, Clients, Audits and Gap Analysis, a compliance overview and cards for total clients, active audits, compliance score and critical open gaps."
          width={1007}
          height={471}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="h-auto w-full"
          unoptimized
        />
      </div>
    </div>
  );
}
