import Section from "@/components/layout/section";
import type { ProductDefinition } from "@/lib/products";
import ProductHero from "@/components/products/product-hero";
import ProductDashboard from "@/components/products/product-dashboard";
import RiskDesignProof from "@/components/products/risk-design-proof";
import ProductStackFit from "@/components/products/product-stack-fit";
import FaqBlock from "@/components/products/faq-block";
import ProductCta from "@/components/products/cta";

export default function ProductPage({ product }: { product: ProductDefinition }) {
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

      {product.dashboard !== "none" && (
        <Section className="tone-panel">
          <ProductDashboard kind={product.dashboard} productName={product.name} />
        </Section>
      )}

      <Section className="tone-base">
        <RiskDesignProof risk={product.risk} design={product.design} proof={product.proof} />
      </Section>

      <Section className="tone-panel">
        <ProductStackFit
          headline={product.stack.headline}
          body={product.stack.body}
          points={product.stack.points}
        />
      </Section>

      <Section className="tone-base">
        <FaqBlock items={product.faq} />
      </Section>

      <Section className="tone-panel border-b border-[var(--line)]">
        <ProductCta productName={product.name} />
      </Section>
    </>
  );
}
