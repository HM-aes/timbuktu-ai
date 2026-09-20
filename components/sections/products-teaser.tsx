import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section, { SectionHead } from "@/components/layout/section";
import { PRODUCTS, productHref } from "@/lib/products";
import { PRODUCTS_INDEX } from "@/lib/site";

export default function ProductsTeaser() {
  return (
    <Section id="products">
      <SectionHead
        title={
          <>
            Systems in production for teams that need AI they can{" "}
            <span className="accent">sign off on.</span>
          </>
        }
      >
        <p>
          Three products live today, a fourth on the way. Each one closes a specific security or
          compliance gap — hosted inside hard boundaries, or fully air-gapped when you need it.
        </p>
      </SectionHead>

      <div className="gutter pb-[var(--space-section-y)] md:pb-[var(--space-section-y-md)] lg:pb-[var(--space-section-y-lg)]">
        <div className="mx-auto grid max-w-[70rem] grid-cols-1 gap-[18px] min-[720px]:grid-cols-2">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              href={productHref(p.slug)}
              className="group/card flex min-w-0 flex-col rounded-[var(--radius-panel)] border border-[var(--line)] bg-surface p-[var(--space-cell-md)] transition-[border-color] duration-200 hover:border-[var(--line-strong)] motion-reduce:transition-none sm:p-[1.875rem]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="cell-title text-foreground">{p.name}</h3>
                <span className="pill shrink-0">
                  <span
                    className="dot"
                    data-tone={p.status === "Coming soon" ? "muted" : "verify"}
                    aria-hidden
                  />
                  {p.status}
                </span>
              </div>
              <p className="mt-2 text-[15px] leading-snug text-foreground/85">{p.promise}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-foreground transition-colors group-hover/card:text-signal">
                View product
                <ArrowRight size={15} data-arrow className="transition-transform group-hover/card:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-[70rem]">
          <Link href={PRODUCTS_INDEX} className="nav-link inline-flex items-center gap-1.5 text-[15px]">
            See all products
            <ArrowRight size={15} aria-hidden />
          </Link>
        </p>
      </div>
    </Section>
  );
}
