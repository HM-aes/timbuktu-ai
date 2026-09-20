import type { MotifKind } from "@/components/motifs";
import { BOOKING_URL, PRODUCT_ROUTES } from "@/lib/site";

export type ProductSlug = "nis2-analyzer" | "lex-legal" | "docsense" | "tankslim";

export type ProductStatus = "Available now" | "Coming soon";

export type DashboardKind = "nis2" | "placeholder" | "none";

export type ProductDefinition = {
  slug: ProductSlug;
  name: string;
  status: ProductStatus;
  promise: string;
  metadata: { title: string; description: string };
  risk: string;
  design: string;
  proof: string;
  faq: { question: string; answer: string }[];
  stack: {
    headline: string;
    body: string;
    points: { label: string; detail: string }[];
  };
  primaryCta: { text: string; href: string };
  dashboard: DashboardKind;
  motif: MotifKind;
  /** Homepage solutions row CTA (unchanged labels on the landing page). */
  homeCta: { text: string; href: string };
  teaser?: string;
  developmentNote?: string;
};

const DEMO_CTA = { text: "Book a demo", href: BOOKING_URL };

export const PRODUCTS: ProductDefinition[] = [
  {
    slug: "nis2-analyzer",
    name: "NIS2 Analyzer",
    status: "Available now",
    promise: "Know exactly where you stand on NIS2.",
    metadata: {
      title: "NIS2 Analyzer — know exactly where you stand on NIS2",
      description:
        "Upload your policies, see every NIS2 gap in plain language on one dashboard, and export a report for your board or auditor. Hosted or air-gapped.",
    },
    risk:
      "Proving your organisation meets the EU NIS2 directive means reconciling dozens of policies against hundreds of pages of legal text. A gap you miss becomes a finding, and NIS2 attaches real penalties to findings.",
    design:
      "Upload the documents you already have. The analyzer reads them, maps each one against the full directive, and lists every gap on a single dashboard. Runs hosted, or fully air-gapped on your own infrastructure.",
    proof:
      "A compliance picture you can act on in minutes: each gap in plain language, with what is missing and why it matters. Export it for your board or your auditor.",
    faq: [
      {
        question: "Do our documents leave our infrastructure?",
        answer: "No. Runs hosted in the EU, or fully air-gapped on your own hardware.",
      },
      {
        question: "How long does a first analysis take?",
        answer: "Minutes, not weeks.",
      },
      {
        question: "Does it cover the full directive?",
        answer: "Every article, mapped to a named control.",
      },
      {
        question: "What do we hand our auditor?",
        answer: "An evidence pack with the source behind every finding.",
      },
    ],
    stack: {
      headline: "How it fits your stack",
      body: "Your policies stay in your boundary. The analyzer runs where you need it — hosted in the EU or on hardware you control.",
      points: [
        {
          label: "Hosted",
          detail: "EU-region deployment with hard boundaries between tenants and no training on your documents.",
        },
        {
          label: "Air-gapped",
          detail: "Full runs on your infrastructure when the data cannot leave the building.",
        },
        {
          label: "Evidence",
          detail: "Every finding links back to the source passage in the documents you uploaded.",
        },
      ],
    },
    primaryCta: DEMO_CTA,
    dashboard: "nis2",
    motif: "audit",
    homeCta: { text: "Try NIS2 Analyzer", href: PRODUCT_ROUTES["nis2-analyzer"] },
  },
  {
    slug: "lex-legal",
    name: "Lex Legal",
    status: "Available now",
    promise: "The right people see the right files. Nothing more.",
    metadata: {
      title: "Lex Legal — per-file access control for law firms",
      description:
        "Grant, restrict, and revoke document access per file and per person, with a standing record of who can open what. Tighter confidentiality, smaller exposure.",
    },
    risk:
      "Matter-level access hands everyone on a case the entire file. A junior brought in for one document can open the rest, and nothing on record draws the line.",
    design:
      "Lex Legal sets access at the level of the individual document. Grant it, restrict it, and revoke it per file and per person — not per matter.",
    proof:
      "Tighter confidentiality, a smaller exposure surface, and a standing record of exactly who can open what, at any moment.",
    faq: [
      {
        question: "How is this different from our DMS permissions?",
        answer: "Per-document, per-person, with a live audit trail — not folder- or matter-level.",
      },
      {
        question: "Can we revoke access instantly?",
        answer: "Yes, per file, effective immediately and logged.",
      },
      {
        question: "Does it run on-prem?",
        answer: "Hosted or fully air-gapped on your own hardware.",
      },
    ],
    stack: {
      headline: "How it fits your stack",
      body: "Permissions sit at document level and travel with retrieval — the same boundary your firm already expects from a matter file.",
      points: [
        {
          label: "Hosted",
          detail: "Tenant-isolated deployment when you want managed operations without widening access.",
        },
        {
          label: "Air-gapped",
          detail: "On-prem when client confidentiality rules out any off-site processing.",
        },
        {
          label: "Audit trail",
          detail: "Every grant and revoke is recorded — who changed what, and when.",
        },
      ],
    },
    primaryCta: DEMO_CTA,
    dashboard: "placeholder",
    motif: "tree",
    homeCta: { text: "Book a demo", href: PRODUCT_ROUTES["lex-legal"] },
  },
  {
    slug: "docsense",
    name: "DocSense",
    status: "Available now",
    promise: "Ask your documents a question. Get a sourced answer.",
    metadata: {
      title: "DocSense — ask your documents a question, get a sourced answer",
      description:
        "Plain-language answers from your own PDFs, contracts and reports — every answer carrying the exact passage it came from. Hosted or air-gapped.",
    },
    risk:
      "The answer sits somewhere in a stack of PDFs, contracts, and reports. Reading by hand is slow, and an answer with no source behind it is one nobody can rely on.",
    design:
      "DocSense reads the documents you upload and answers questions in plain language, each answer carrying the exact passage it came from. Hosted, or air-gapped on your own hardware.",
    proof:
      "The knowledge held in your files, available on request — every answer traceable to its source and ready to act on.",
    faq: [
      {
        question: "Can we trust the answer?",
        answer: "Every answer links to the exact source passage.",
      },
      {
        question: "What file types?",
        answer: "PDFs, contracts, reports — the documents you already have.",
      },
      {
        question: "Does our data train a model?",
        answer: "No data sold, no data shared, nothing leaves your control.",
      },
    ],
    stack: {
      headline: "How it fits your stack",
      body: "Retrieval and answers stay inside the boundary you choose. Sources are shown with every response so legal and ops can sign off.",
      points: [
        {
          label: "Hosted",
          detail: "Your tenant, your documents — isolated from other customers.",
        },
        {
          label: "Air-gapped",
          detail: "Indexing and inference on hardware you operate when data cannot leave.",
        },
        {
          label: "Sourced answers",
          detail: "Each response cites the passage it came from — no hand-waving.",
        },
      ],
    },
    primaryCta: DEMO_CTA,
    dashboard: "placeholder",
    motif: "query",
    homeCta: { text: "Try it free", href: PRODUCT_ROUTES.docsense },
  },
  {
    slug: "tankslim",
    name: "TankSlim",
    status: "Coming soon",
    promise: "A costly routine expense, about to get an obvious answer.",
    metadata: {
      title: "TankSlim — coming soon",
      description:
        "A recurring operational cost, about to get an obvious answer. In development — full details at launch.",
    },
    risk: "",
    design: "",
    proof: "",
    faq: [],
    stack: { headline: "", body: "", points: [] },
    primaryCta: { text: "Get notified", href: "#notify" },
    dashboard: "none",
    motif: "chart",
    homeCta: { text: "Get notified", href: PRODUCT_ROUTES.tankslim },
    teaser:
      "TankSlim targets a recurring cost most operations absorb without questioning, and makes the better move obvious.",
    developmentNote: "In development. Full details at launch.",
  },
];

export function getProduct(slug: ProductSlug): ProductDefinition {
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) throw new Error(`Unknown product: ${slug}`);
  return product;
}

/** Homepage solutions section — same products, tile links to dedicated pages. */
export const SOLUTIONS_PRODUCTS = PRODUCTS.map((p) => ({
  name: p.name,
  label: p.status,
  tagline: p.promise,
  motif: p.motif,
  cta: p.homeCta,
  blocks:
    p.risk && p.design && p.proof
      ? [
          { label: "The risk", body: p.risk },
          { label: "The design", body: p.design },
          { label: "The proof", body: p.proof },
        ]
      : undefined,
  teaser: p.teaser,
  status: p.developmentNote,
}));
