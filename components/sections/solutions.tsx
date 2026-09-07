"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import SectionRule from "@/components/section-rule";
import ScrollReveal from "@/components/scroll-reveal";
import { Motif, type MotifKind } from "@/components/motifs";
import { NIS2_APP_URL, LEX_DEMO_URL, DOCSENSE_URL, NOTIFY_URL } from "@/lib/site";

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
  const reduced = useReducedMotion();
  const flip = index % 2 === 1;
  const isSoon = product.label === "Coming soon";

  function glowMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--bx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--by", `${e.clientY - r.top}px`);
  }

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease }}
      className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12"
    >
      {/* Motif panel */}
      <div
        onMouseMove={glowMove}
        className={`bento-tile group/card relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/[.08] bg-[color-mix(in_srgb,var(--surface)_78%,transparent)] backdrop-blur-md sm:aspect-[16/9] ${
          flip ? "lg:order-2" : ""
        }`}
      >
        <div className="absolute inset-0 p-8 [mask-image:radial-gradient(120%_120%_at_50%_40%,#000_55%,transparent)]">
          <Motif kind={product.motif} />
        </div>
        <span
          className={`absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] ${
            isSoon
              ? "border-white/10 bg-white/[.04] text-slatey-400"
              : "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${
              isSoon ? "bg-slatey-400" : "bg-emerald-400"
            }`}
            style={{ animation: "bento-node-pulse 2.6s ease-in-out infinite" }}
          />
          {product.label}
        </span>
      </div>

      {/* Text */}
      <div>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {product.name}
        </h3>
        <p className="mt-2.5 text-lg font-medium text-amber-300 sm:text-xl">
          {product.tagline}
        </p>

        {product.blocks && (
          <dl className="mt-7 space-y-6">
            {product.blocks.map((b) => (
              <div
                key={b.label}
                className="grid gap-x-5 gap-y-1.5 sm:grid-cols-[7rem_1fr]"
              >
                <dt className="pt-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-slatey-400">
                  {b.label}
                </dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">
                  {b.body}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {product.teaser && (
          <div className="mt-6 space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.teaser}
            </p>
            <p className="font-mono text-xs text-slatey-400">{product.status}</p>
          </div>
        )}

        {/* TODO(placeholder): product CTA URLs — set real destinations in lib/site.ts */}
        <a
          href={product.cta.href}
          className="group mt-7 inline-flex h-10 items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 text-sm font-semibold text-amber-300 transition-all hover:border-amber-500/50 hover:bg-amber-500/15"
        >
          {product.cta.text}
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>
      </div>
    </motion.div>
  );
}

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="relative overflow-hidden border-t border-foreground/10 bg-background py-6"
    >
      {/* Ambient aurora */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-[6%] top-[12%] h-[30rem] w-[30rem] rounded-full bg-amber-500/[.07] blur-[130px]"
          style={{ animation: "bento-aurora-a 28s ease-in-out infinite" }}
        />
        <div
          className="absolute left-[4%] bottom-[10%] h-[24rem] w-[24rem] rounded-full bg-violet-500/[.05] blur-[120px]"
          style={{ animation: "bento-aurora-b 32s ease-in-out infinite" }}
        />
      </div>

      <SectionRule label="SOLUTIONS" align="left" />

      <div className="max-w-6xl px-6 pb-24 sm:px-10 lg:pl-16">
        <ScrollReveal
          text="Four systems in production. Each one closes a specific security or compliance gap."
          className="max-w-4xl font-display text-2xl font-medium leading-[1.3] tracking-tight text-zinc-300 sm:text-3xl lg:text-[2.4rem]"
        />

        <div className="mt-20 space-y-24 lg:space-y-32">
          {PRODUCTS.map((product, i) => (
            <ProductRow key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
