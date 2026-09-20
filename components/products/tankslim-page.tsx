"use client";

import Section from "@/components/layout/section";
import ProductHero from "@/components/products/product-hero";
import type { ProductDefinition } from "@/lib/products";
import NotifyForm from "@/components/products/notify-form";

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

      <Section className="tone-panel border-b border-[var(--line)]">
        <div className="gutter section-block mx-auto max-w-[36rem]">
          <p className="cell-body text-[15px] leading-relaxed sm:text-base">
            {product.teaser} {product.developmentNote}
          </p>
          <div id="notify" className="mt-10 scroll-mt-28">
            <NotifyForm />
          </div>
        </div>
      </Section>
    </>
  );
}
