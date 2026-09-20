"use client";

import Section from "@/components/layout/section";
import ProductHero from "@/components/products/product-hero";
import { ProductDetailSection } from "@/components/products/product-detail-section";
import NotifyForm from "@/components/products/notify-form";
import ProductCta from "@/components/products/cta";
import type { ProductDefinition } from "@/lib/products";
export default function TankSlimPage({ product }: { product: ProductDefinition }) {
  return (
    <>
      <Section className="tone-base border-t-0">
        <ProductHero
          name={product.name}
          promise={product.promise}
          status={product.status}
          cta={{ text: "Get notified", href: "#notify" }}
        />
      </Section>

      <ProductDetailSection title="The problem">
        <p className="cell-body text-[15px] leading-relaxed sm:text-base">
          {product.teaser}
        </p>
        <div>
          <p className="label text-signal">Who it is for</p>
          <p className="cell-body mt-2 text-[15px] leading-relaxed sm:text-base">
            {product.audience}
          </p>
        </div>
        <p className="label normal-case tracking-[0.04em] text-muted-foreground">
          {product.developmentNote}
        </p>
      </ProductDetailSection>

      <ProductDetailSection title="How it works" tone="panel">
        <p className="cell-body text-[15px] italic text-muted-foreground">
          TODO: Add source-backed content.
        </p>
      </ProductDetailSection>

      <ProductDetailSection title="Security">
        <p className="cell-body text-[15px] italic text-muted-foreground">
          TODO: Add product-specific security evidence.
        </p>
      </ProductDetailSection>

      <Section className="tone-panel">
        <div className="gutter section-block mx-auto max-w-[36rem]">
          <div id="notify" className="scroll-mt-28">
            <NotifyForm />
          </div>
        </div>
      </Section>

      <Section className="tone-base border-b border-[var(--line)]">
        <ProductCta productName={product.name} />
      </Section>
    </>
  );
}
