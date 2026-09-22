import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import ProductGrid, { type ProductPanelData } from "@/components/products/product-grid";
import type { ProductVisualKind } from "@/components/visuals/product-visuals";
import { getProduct, productHref, PRODUCTS, type ProductSlug } from "@/lib/products";
import { PRODUCTS_INDEX } from "@/lib/site";

/** How each product expresses the one mission. Copy comes from lib/products. */
const ECOSYSTEM: { slug: ProductSlug; category: string; visual: ProductVisualKind }[] = [
  { slug: "docsense", category: "AI Applications", visual: "applications" },
  { slug: "lex-legal", category: "AI Security", visual: "security" },
  { slug: "nis2-analyzer", category: "AI Automation", visual: "automation" },
  { slug: "tankslim", category: "AI Intelligence", visual: "intelligence" },
];

const PANELS: ProductPanelData[] = ECOSYSTEM.map(({ slug, category, visual }, i) => {
  const p = getProduct(slug);
  const soon = p.status === "Coming soon";
  return {
    number: String(i + 1).padStart(2, "0"),
    category,
    name: p.name,
    promise: p.promise,
    status: p.status,
    href: productHref(slug),
    cta: soon ? "Get notified" : "Explore",
    visual,
    // 01 and 04 lead with the object on desktop, 02 and 03 with the copy.
    visualFirst: i === 0 || i === 3,
  };
});

const LIVE = PRODUCTS.filter((p) => p.status === "Available now").length;

export default function Products() {
  return (
    <Section id="products">
      <div className="gutter pb-12 pt-[var(--space-section-y)] md:pb-14 md:pt-[var(--space-section-y-md)] lg:pb-16 lg:pt-[var(--space-section-y-lg)]">
        <Reveal distance={10} className="flex items-center gap-4">
          <p className="label shrink-0 text-signal">02 — Products</p>
          <span aria-hidden className="h-px min-w-0 flex-1 bg-signal/30" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-x-12">
          <Reveal delay={0.08} distance={24} className="lg:col-span-7">
            <h2 className="display max-w-[14ch] text-foreground">
              Four products. <span className="accent">One mission.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2} distance={14} className="lg:col-span-5 lg:pb-2">
            <p className="lede max-w-[36rem]">
              A focused ecosystem of AI products designed to make intelligent technology more
              useful, secure, and accessible.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <ProductGrid items={PANELS} />
      </div>

      <div className="gutter flex flex-col gap-3 border-t border-[var(--line)] py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          {LIVE} in production · {PRODUCTS.length - LIVE} in development
        </p>
        <Link href={PRODUCTS_INDEX} className="nav-link inline-flex items-center gap-1.5 text-[15px]">
          See all products
          <ArrowRight size={15} aria-hidden />
        </Link>
      </div>
    </Section>
  );
}
