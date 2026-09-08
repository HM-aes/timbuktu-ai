"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import SectionRule from "@/components/section-rule";
import ScrollReveal from "@/components/scroll-reveal";
import Panel from "@/components/panel";
import { Motif, type MotifKind } from "@/components/motifs";
import { NIS2_APP_URL, LEX_DEMO_URL, DOCSENSE_URL, NOTIFY_URL } from "@/lib/site";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

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

function ProductRow({ product, index }: { product: Product; index: number }) {
  const reduced = useReducedMotionSafe();
  const isSoon = product.label === "Coming soon";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={reduced ? { opacity: 1, y: 0 } : undefined}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={reduced ? INSTANT : { duration: 0.8, ease }}
      className="split"
    >
      {/* Text */}
      <div>
        <p className="eyebrow flex items-center gap-3">
          <span className="text-amber-400">{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden className="text-foreground/30">/</span>
          <span>{String(PRODUCTS.length).padStart(2, "0")}</span>
        </p>
        <h3 className="mt-4 font-display text-[1.75rem] font-medium tracking-[-0.015em] text-foreground sm:text-3xl">
          {product.name}
        </h3>
        <p className="mt-2 text-lg font-light leading-snug text-amber-300/95 sm:text-xl">
          {product.tagline}
        </p>

        {product.blocks && (
          <dl className="mt-8 space-y-5 border-t border-foreground/10 pt-6">
            {product.blocks.map((b) => (
              <div
                key={b.label}
                className="grid gap-x-6 gap-y-1.5 sm:grid-cols-[6.5rem_1fr]"
              >
                <dt className="eyebrow pt-1">{b.label}</dt>
                <dd className="measure text-[14.5px] leading-relaxed text-muted-foreground">
                  {b.body}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {product.teaser && (
          <div className="mt-8 space-y-3 border-t border-foreground/10 pt-6">
            <p className="measure text-[14.5px] leading-relaxed text-muted-foreground">
              {product.teaser}
            </p>
            <p className="font-mono text-[11px] tracking-[0.04em] text-foreground/50">{product.status}</p>
          </div>
        )}

        {/* TODO(placeholder): product CTA URLs — set real destinations in lib/site.ts */}
        <a
          href={product.cta.href}
          className="group mt-8 inline-flex h-10 items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 text-sm font-medium text-amber-300 transition-colors hover:border-amber-500/50 hover:bg-amber-500/15"
        >
          {product.cta.text}
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>
      </div>

      {/* Diagram panel */}
      <Panel
        caption={product.name}
        status={isSoon ? "in development" : "in production"}
        statusTone={isSoon ? "muted" : "verify"}
        grid
        delay={0.1}
        className="w-full"
        bodyClassName="relative aspect-[16/10] sm:aspect-[16/9]"
      >
        <div className="absolute inset-0 p-8 [mask-image:radial-gradient(120%_120%_at_50%_40%,#000_55%,transparent)]">
          <Motif kind={product.motif} />
        </div>
      </Panel>
    </motion.article>
  );
}

export default function Solutions() {
  return (
    <section id="solutions" className="relative overflow-hidden">
      {/* Ambient aurora */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-[6%] top-[12%] h-[30rem] w-[30rem] rounded-full bg-amber-500/[.07] blur-[130px]"
          style={{ animation: "bento-aurora-a 28s ease-in-out infinite" }}
        />
        <div
          className="absolute left-[4%] bottom-[10%] h-[24rem] w-[24rem] rounded-full bg-verify/[.05] blur-[120px]"
          style={{ animation: "bento-aurora-b 32s ease-in-out infinite" }}
        />
      </div>

      <SectionRule index="04" label="Solutions" />

      <div className="shell pb-24 sm:pb-28">
        <ScrollReveal
          text="Four systems in production. Each one closes a specific security or compliance gap."
          className="max-w-3xl font-display text-[1.9rem] font-medium leading-[1.15] tracking-[-0.015em] text-foreground sm:text-4xl lg:text-[2.6rem]"
        />

        <div className="mt-20 space-y-24 lg:space-y-28">
          {PRODUCTS.map((product, i) => (
            <ProductRow key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
