import Section from "@/components/layout/section";
import type { ProductDefinition } from "@/lib/products";
import ProductHero from "@/components/products/product-hero";
import ProductDashboard from "@/components/products/product-dashboard";
import Nis2Story from "@/components/products/nis2-story";
import ProductSecurityArchitecture from "@/components/products/product-security";
import SecureRagShowcase from "@/components/sections/secure-rag-showcase";
import FaqList from "@/components/faq-list";
import { ProductDetailSection } from "@/components/products/product-detail-section";
import ProductCta from "@/components/products/cta";

function hasProductBody(product: ProductDefinition): boolean {
  return Boolean(product.risk && product.design);
}

/**
 * One product, in the order a buyer reads it: the promise, the problem, how
 * it works (with the interface), what you get, the security architecture for
 * this product, deployment, the questions everyone asks, and the call.
 */
export default function ProductPage({ product }: { product: ProductDefinition }) {
  if (!hasProductBody(product)) {
    return null;
  }

  const isNis2 = product.slug === "nis2-analyzer";
  const isDocSense = product.slug === "docsense";

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
          <p className="cell-body mt-2 text-[15px] leading-relaxed sm:text-base">{product.audience}</p>
        </div>
      </ProductDetailSection>

      <ProductDetailSection
        title="How it works"
        tone="panel"
        wideBelow={
          isNis2 ? (
            <Nis2Story />
          ) : product.dashboard !== "none" ? (
            <div className="mx-auto w-full max-w-[var(--frame-max)]">
              <ProductDashboard kind={product.dashboard} slug={product.slug} productName={product.name} embedded />
            </div>
          ) : undefined
        }
      >
        <p className="cell-body text-[15px] leading-relaxed sm:text-base">{product.design}</p>
        {product.proof && (
          <div>
            <p className="label text-signal">What you get</p>
            <p className="cell-body mt-2 text-[15px] leading-relaxed sm:text-base">{product.proof}</p>
          </div>
        )}
      </ProductDetailSection>

      {isDocSense && <SecureRagShowcase embedded />}

      {product.security && (
        <Section className="tone-base">
          <div className="gutter section-block pt-0">
            <h2 className="title max-w-[24ch] text-foreground">Security architecture</h2>
            <p className="cell-body mt-6 max-w-[42rem] text-[15px] leading-relaxed sm:text-base">
              {product.security.summary}
            </p>
            <ProductSecurityArchitecture security={product.security} />
          </div>
        </Section>
      )}

      <ProductDetailSection title="Where it runs" tone="panel">
        <p className="cell-body text-[15px] leading-relaxed sm:text-base">{product.stack.body}</p>
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

      {product.faq.length > 0 && (
        <Section className="tone-base">
          <div className="gutter section-block grid grid-cols-1 gap-8 pt-0 lg:grid-cols-12 lg:gap-x-12">
            <h2 className="title text-foreground lg:col-span-4">Questions</h2>
            <FaqList items={product.faq} className="lg:col-span-8" />
          </div>
        </Section>
      )}

      <Section className="tone-panel border-b border-[var(--line)]">
        <ProductCta productName={product.name} />
      </Section>
    </>
  );
}
