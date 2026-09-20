import { ArrowRight } from "lucide-react";
import Section, { SectionHead } from "@/components/layout/section";
import Panel from "@/components/panel";
import { Motif } from "@/components/motifs";
import { CtaButton } from "@/components/shadcn-space/button/button-16";
import { SOLUTIONS_PRODUCTS } from "@/lib/products";

type SolutionProduct = (typeof SOLUTIONS_PRODUCTS)[number];

function ProductRow({ product }: { product: SolutionProduct }) {
  const isSoon = product.label === "Coming soon";

  return (
    <article className="cells cells-split">
      <div className="cell">
        <div>
          <span className="pill">
            <span className="dot" data-tone={isSoon ? "muted" : "verify"} aria-hidden />
            {product.label}
          </span>
          <h3 className="mt-6 font-display text-[1.75rem] font-medium tracking-[-0.02em] text-foreground sm:text-[2rem]">
            <a
              href={product.cta.href}
              className="rounded-sm transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              {product.name}
            </a>
          </h3>
          <p className="mt-2 max-w-[30rem] text-lg leading-snug text-foreground/85 sm:text-xl">
            {product.tagline}
          </p>

          {product.blocks && (
            <dl className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {product.blocks.map((b) => (
                <div key={b.label} className="grid gap-x-6 gap-y-1.5 py-4 sm:grid-cols-[6.5rem_1fr]">
                  <dt className="label pt-1">{b.label}</dt>
                  <dd className="cell-body max-w-[32rem]">{b.body}</dd>
                </div>
              ))}
            </dl>
          )}

          {product.teaser && (
            <div className="mt-8 space-y-3 border-y border-[var(--line)] py-4">
              <p className="cell-body max-w-[32rem]">{product.teaser}</p>
              <p className="label normal-case tracking-[0.04em]">{product.status}</p>
            </div>
          )}

          <CtaButton href={product.cta.href} size="sm" className="mt-8">
            {product.cta.text}
            <ArrowRight size={15} data-arrow />
          </CtaButton>
        </div>
      </div>

      <div className="cell cell-media">
        <Panel
          caption={product.name}
          status={isSoon ? "in development" : "in production"}
          statusTone={isSoon ? "muted" : "verify"}
          grid
          flush
          className="h-full"
          bodyClassName="relative aspect-[16/10] lg:aspect-auto lg:h-[calc(100%-2.6rem)] lg:min-h-[26rem]"
        >
          <div className="absolute inset-0 p-8 [mask-image:radial-gradient(120%_120%_at_50%_40%,#000_55%,transparent)]">
            <Motif kind={product.motif} />
          </div>
        </Panel>
      </div>
    </article>
  );
}

export default function Solutions() {
  return (
    <Section id="solutions">
      <SectionHead
        title={
          <>
            Three systems in production, a fourth on the way. Each one closes a specific{" "}
            <span className="accent">security or compliance gap.</span>
          </>
        }
      />

      <div>
        {SOLUTIONS_PRODUCTS.map((product) => (
          <ProductRow key={product.name} product={product} />
        ))}
      </div>
    </Section>
  );
}
