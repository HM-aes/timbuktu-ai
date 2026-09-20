import Section from "@/components/layout/section";
import type { ProductDefinition } from "@/lib/products";
import ProductHero from "@/components/products/product-hero";
import ProductDashboard from "@/components/products/product-dashboard";
import Nis2DashboardShowcase from "@/components/products/nis2-dashboard-showcase";
import { ProductDetailSection } from "@/components/products/product-detail-section";
import ProductCta from "@/components/products/cta";

function hasProductBody(product: ProductDefinition): boolean {
  return Boolean(product.risk && product.design);
}

export default function ProductPage({ product }: { product: ProductDefinition }) {
  if (!hasProductBody(product)) {
    return null;
  }

  const securityCopy = product.proof?.trim()
    ? product.proof
    : "TODO: Add product-specific security evidence.";

  return (
    <>
      <Section className="tone-base border-t-0">
        <ProductHero
          name={product.name}
          promise={product.promise}
          status={product.status}
          cta={product.primaryCta}
        />
      </Section>

      <ProductDetailSection title="The problem">
        <p className="cell-body text-[15px] leading-relaxed sm:text-base">{product.risk}</p>
        <div>
          <p className="label text-signal">Who it is for</p>
          <p className="cell-body mt-2 text-[15px] leading-relaxed sm:text-base">
            {product.audience || "TODO: Add source-backed problem/audience copy."}
          </p>
        </div>
      </ProductDetailSection>

      <ProductDetailSection
        title="How it works"
        tone="panel"
        wideBelow={
          product.slug === "nis2-analyzer" ? <Nis2DashboardShowcase /> : undefined
        }
      >
        <p className="cell-body text-[15px] leading-relaxed sm:text-base">{product.design}</p>
        {product.dashboard !== "none" && product.slug !== "nis2-analyzer" && (
          <div className="mt-8 max-w-none">
            <ProductDashboard
              kind={product.dashboard}
              productName={product.name}
              embedded
            />
          </div>
        )}
      </ProductDetailSection>

      <ProductDetailSection title="Security">
        <p className="cell-body text-[15px] leading-relaxed sm:text-base">{securityCopy}</p>
        {product.stack.points.length > 0 && (
          <ul className="mt-4 space-y-3 border-t border-[var(--line)] pt-4">
            {product.stack.points.map((point) => (
              <li key={point.label}>
                <p className="label text-signal">{point.label}</p>
                <p className="cell-body mt-1.5 text-[15px]">{point.detail}</p>
              </li>
            ))}
          </ul>
        )}
      </ProductDetailSection>

      <Section className="tone-panel border-b border-[var(--line)]">
        <ProductCta productName={product.name} />
      </Section>
    </>
  );
}
