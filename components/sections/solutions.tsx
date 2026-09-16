import { ArrowRight } from "lucide-react";
import Section, { SectionHead } from "@/components/layout/section";
import Panel from "@/components/panel";
import { Motif, type MotifKind } from "@/components/motifs";
import { NIS2_APP_URL, LEX_DEMO_URL, DOCSENSE_URL, NOTIFY_URL } from "@/lib/site";

type Product = {
  name: string;
  label: "Available now" | "Coming soon";
  tagline: string;
  motif: MotifKind;
  cta: { text: string; href: string };
  blocks?: { label: string; body: string }[];
  teaser?: string;
  status?: string;
};

const PRODUCTS: Product[] = [
  {
    name: "NIS2 Analyzer",
    label: "Available now",
    tagline: "Know exactly where you stand on NIS2.",
    motif: "audit",
    cta: { text: "Try NIS2 Analyzer", href: NIS2_APP_URL },
    blocks: [
      {
        label: "The risk",
        body: "Proving your organisation meets the EU NIS2 directive means reconciling dozens of policies against hundreds of pages of legal text. A gap you miss becomes a finding, and NIS2 attaches real penalties to findings.",
      },
      {
        label: "The design",
        body: "Upload the documents you already have. The analyzer reads them, maps each one against the full directive, and lists every gap on a single dashboard. Runs hosted, or fully air-gapped on your own infrastructure.",
      },
      {
        label: "The proof",
        body: "A compliance picture you can act on in minutes — each gap in plain language, with what is missing and why it matters. Export it for your board or your auditor.",
      },
    ],
  },
  {
    name: "Lex Legal",
    label: "Available now",
    tagline: "The right people see the right files. Nothing more.",
    motif: "tree",
    cta: { text: "Book a demo", href: LEX_DEMO_URL },
    blocks: [
      {
        label: "The risk",
        body: "Matter-level access hands everyone on a case the entire file. A junior brought in for one document can open the rest, and nothing on record draws the line.",
      },
      {
        label: "The design",
        body: "Lex Legal sets access at the level of the individual document. Grant it, restrict it, and revoke it per file and per person — not per matter.",
      },
      {
        label: "The proof",
        body: "Tighter confidentiality, a smaller exposure surface, and a standing record of exactly who can open what, at any moment.",
      },
    ],
  },
  {
    name: "DocSense",
    label: "Available now",
    tagline: "Ask your documents a question. Get a sourced answer.",
    motif: "query",
    cta: { text: "Try it free", href: DOCSENSE_URL },
    blocks: [
      {
        label: "The risk",
        body: "The answer sits somewhere in a stack of PDFs, contracts, and reports. Reading by hand is slow, and an answer with no source behind it is one nobody can rely on.",
      },
      {
        label: "The design",
        body: "DocSense reads the documents you upload and answers questions in plain language, each answer carrying the exact passage it came from. Hosted, or air-gapped on your own hardware.",
      },
      {
        label: "The proof",
        body: "The knowledge held in your files, available on request — every answer traceable to its source and ready to act on.",
      },
    ],
  },
  {
    name: "TankSlim",
    label: "Coming soon",
    tagline: "A costly routine expense, about to get an obvious answer.",
    motif: "chart",
    cta: { text: "Get notified", href: NOTIFY_URL },
    teaser:
      "TankSlim targets a recurring cost most operations absorb without questioning, and makes the better move obvious.",
    status: "In development. Full details at launch.",
  },
];

function ProductRow({ product }: { product: Product }) {
  const isSoon = product.label === "Coming soon";

  return (
    <article className="cells cells-split">
      {/* Text */}
      <div className="cell">
        <div>
          <span className="pill">
            <span className="dot" data-tone={isSoon ? "muted" : "verify"} aria-hidden />
            {product.label}
          </span>
          <h3 className="mt-6 font-display text-[1.75rem] font-medium tracking-[-0.02em] text-foreground sm:text-[2rem]">
            {product.name}
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

          {/* TODO(placeholder): product CTA URLs — set real destinations in lib/site.ts */}
          <a href={product.cta.href} className="btn btn-ghost btn-sm mt-8">
            {product.cta.text}
            <ArrowRight size={15} data-arrow />
          </a>
        </div>
      </div>

      {/* Motif */}
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
            Three systems in production, a fourth on the way. Each one closes a specific <span className="accent">security or compliance gap.</span>
          </>
        }
      />

      <div>
        {PRODUCTS.map((product) => (
          <ProductRow key={product.name} product={product} />
        ))}
      </div>
    </Section>
  );
}
