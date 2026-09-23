import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import ProductShowcaseItem, { type ShowcaseProduct } from "@/components/products/product-showcase-item";
import Nis2Preview from "@/components/products/dashboards/nis2-preview";
import LexLegalPreview from "@/components/products/dashboards/lex-legal-preview";
import DocSensePreview from "@/components/products/dashboards/docsense-preview";
import TankSlimPreview from "@/components/products/dashboards/tankslim-preview";
import { getProduct, productHref, type ProductSlug } from "@/lib/products";
import { PRODUCTS_INDEX } from "@/lib/site";

/**
 * Showcase copy per product. Name, status, tagline and link come from
 * lib/products so the homepage never drifts from the product pages.
 */
const SHOWCASE: {
  slug: ProductSlug;
  /** The security problem it addresses — condensed from the product's own "risk" copy. */
  problem?: string;
  description: string;
  capabilities: string[];
  note?: string;
  preview: ReactNode;
}[] = [
  {
    slug: "nis2-analyzer",
    problem: "Proving NIS2 compliance means reconciling your policies against hundreds of pages of legal text — and a missed gap becomes a finding.",
    description:
      "Upload the documents you already have. The analyzer maps them against the directive and shows every gap in one place.",
    capabilities: ["Compliance mapping", "Evidence behind every finding", "Hosted or air-gapped"],
    preview: <Nis2Preview />,
  },
  {
    slug: "lex-legal",
    problem: "Matter-level access hands everyone on a case the entire file, and nothing on record draws the line.",
    description:
      "Control access at the level of the individual document — per file and per person, not per matter — with a complete audit trail.",
    capabilities: ["Per-file access", "Grant, restrict and revoke", "Complete audit trail"],
    preview: <LexLegalPreview />,
  },
  {
    slug: "docsense",
    problem: "The answer is buried in a stack of documents — and an answer with no source behind it is one nobody can rely on.",
    description:
      "Ask questions across your PDFs, contracts and reports. Every answer links straight to the passage it came from.",
    capabilities: ["Sourced answers", "Your documents stay private", "Hosted or air-gapped"],
    preview: <DocSensePreview />,
  },
  {
    slug: "tankslim",
    description:
      "TankSlim targets a recurring cost most operations absorb without questioning, and makes the better move obvious.",
    capabilities: [],
    note: "In development · full details at launch",
    preview: <TankSlimPreview />,
  },
];

const ITEMS: ShowcaseProduct[] = SHOWCASE.map(({ slug, problem, description, capabilities, note, preview }, i) => {
  const p = getProduct(slug);
  const soon = p.status === "Coming soon";
  return {
    number: String(i + 1).padStart(2, "0"),
    name: p.name,
    status: p.status,
    tagline: p.promise,
    problem,
    description,
    capabilities,
    note,
    href: productHref(slug),
    cta: soon ? "Get notified" : `Explore ${p.name}`,
    reversed: i % 2 === 1,
    preview,
  };
});

export default function ProductShowcase() {
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
              Four parts of one security architecture. Each closes a specific security, compliance or operational
              gap — shown here through its own interface.
            </p>
          </Reveal>
        </div>
      </div>

      {ITEMS.map((item) => (
        <ProductShowcaseItem key={item.href} product={item} />
      ))}

      <div className="gutter flex flex-col gap-3 border-t border-[var(--line)] py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">Interface previews use illustrative data</p>
        <Link href={PRODUCTS_INDEX} className="nav-link inline-flex items-center gap-1.5 text-[15px]">
          See all products
          <ArrowRight size={15} aria-hidden />
        </Link>
      </div>
    </Section>
  );
}
