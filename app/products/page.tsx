import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section, { SectionHead } from "@/components/layout/section";
import { PRODUCTS, productHref } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products — secure AI systems in production | Timbuktu AI",
  description:
    "NIS2 Analyzer, Lex Legal, DocSense and TankSlim — systems that close specific security and compliance gaps, hosted or air-gapped.",
};

export default function ProductsIndexPage() {
  return (
    <>
      <Section className="tone-base border-t-0">
        <SectionHead
          title={
            <>
              Three RAG dashboards in production. One{" "}
              <span className="accent">application</span> on the way.
            </>
          }
        >
          <p>
            NIS2 Analyzer, Lex Legal and DocSense are dashboards. TankSlim is the application.
            Hosted inside hard boundaries, or fully air-gapped on your own infrastructure.
          </p>
        </SectionHead>
      </Section>

      <Section className="tone-panel border-b border-[var(--line)]">
        <div className="gutter pb-[var(--space-section-y)] md:pb-[var(--space-section-y-md)] lg:pb-[var(--space-section-y-lg)]">
          <div className="mx-auto grid max-w-[70rem] grid-cols-1 gap-[18px] min-[720px]:grid-cols-2">
            {PRODUCTS.map((p) => (
              <article
                key={p.slug}
                className="@container flex min-w-0 flex-col rounded-[var(--radius-panel)] border border-[var(--line)] bg-surface p-[var(--space-cell-md)] sm:p-[1.875rem]"
              >
                <div className="flex flex-col items-start gap-3 @[28rem]:flex-row @[28rem]:items-start @[28rem]:justify-between">
                  <h2 className="cell-title text-foreground">
                    <Link
                      href={productHref(p.slug)}
                      className="rounded-sm transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                    >
                      {p.name}
                    </Link>
                  </h2>
                  <span className="flex max-w-full flex-wrap gap-2">
                    <span className="pill">{p.dashboard === "none" ? "Application" : "Dashboard"}</span>
                    <span className="pill">
                      <span
                        className="dot"
                        data-tone={p.status === "Coming soon" ? "muted" : "verify"}
                        aria-hidden
                      />
                      {p.status}
                    </span>
                  </span>
                </div>
                <p className="mt-2 text-[15px] leading-snug text-foreground/85">{p.promise}</p>
                <Link
                  href={productHref(p.slug)}
                  className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-foreground transition-colors hover:text-signal"
                >
                  View product
                  <ArrowRight size={15} data-arrow aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
