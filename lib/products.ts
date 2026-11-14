import type { MotifKind } from "@/components/motifs";
import { BOOKING_URL, PRODUCT_ROUTES } from "@/lib/site";

export type ProductSlug = "nis2-analyzer" | "lex-legal" | "docsense" | "tankslim";

export type ProductStatus = "Available now" | "Coming soon";

export type DashboardKind = "nis2" | "placeholder" | "none";

/** One product's reading of the four-layer architecture (see /approach). */
export type ProductSecurity = {
  summary: string;
  layers: {
    layer: "Application" | "Model" | "Data" | "Operations";
    control: string;
    detail: string;
    /** OWASP Top 10 for LLM applications (2025) risk ids this control closes here. */
    closes: string[];
  }[];
};

export type ProductDefinition = {
  slug: ProductSlug;
  name: string;
  status: ProductStatus;
  promise: string;
  metadata: { title: string; description: string };
  risk: string;
  design: string;
  proof: string;
  /** Who the product is for — from existing site copy only. */
  audience: string;
  faq: { question: string; answer: string }[];
  stack: {
    headline: string;
    body: string;
    points: { label: string; detail: string }[];
  };
  security?: ProductSecurity;
  primaryCta: { text: string; href: string };
  dashboard: DashboardKind;
  motif: MotifKind;
  teaser?: string;
  developmentNote?: string;
};

const BOOK_CTA = { text: "Book a call", href: BOOKING_URL };

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
    audience:
      "Teams responsible for proving the organisation meets the EU NIS2 directive — compliance, security leadership, and general counsel signing off on findings.",
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
    security: {
      summary:
        "The same four layers every Timbuktu AI system runs inside, read for a compliance analyzer: the people who may see a client's findings, a model that cannot be steered by the policies it reads, evidence that stays traceable, and a deployment an auditor can inspect.",
      layers: [
        {
          layer: "Application",
          control: "Findings are scoped per client and per role.",
          detail:
            "Django Auth gates every page; an auditor sees only the clients assigned to them, and exports are logged as actions. Nothing is written to a report without a person approving the run.",
          closes: ["LLM06 Excessive agency"],
        },
        {
          layer: "Model",
          control: "Policies are evidence, never instructions.",
          detail:
            "Uploaded documents are classified and screened for injection before analysis, and every finding is validated against a Pydantic schema before it reaches the dashboard.",
          closes: ["LLM01 Prompt injection", "LLM05 Improper output handling"],
        },
        {
          layer: "Data",
          control: "One tenant, one collection, one source per finding.",
          detail:
            "Each client's documents live in their own Qdrant collection. Every gap links back to the passage it was derived from, so the evidence pack is reproducible.",
          closes: ["LLM02 Sensitive information disclosure", "LLM08 Vector and embedding weaknesses"],
        },
        {
          layer: "Operations",
          control: "EU-hosted or air-gapped, with no public admin surface.",
          detail:
            "SSH key access only, encrypted at rest, every analysis run recorded. The full stack runs on your own hardware when the policies cannot leave the building.",
          closes: ["LLM03 Supply chain"],
        },
      ],
    },
    primaryCta: BOOK_CTA,
    dashboard: "nis2",
    motif: "audit",
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
    audience: "Law firms and legal teams that need per-file confidentiality beyond matter-level access.",
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
    security: {
      summary:
        "Lex Legal exists because matter-level access is not confidentiality. Its four layers are built around one rule: a person sees a document only when someone with authority granted it, and the record says so.",
      layers: [
        {
          layer: "Application",
          control: "Grant, restrict and revoke are the only write actions.",
          detail:
            "Each one requires a named person with owner rights on that file, is typed and validated with Pydantic, and takes effect immediately. Nothing changes access on a model's say-so.",
          closes: ["LLM06 Excessive agency"],
        },
        {
          layer: "Model",
          control: "Retrieval cannot widen what a person may read.",
          detail:
            "Questions over the matter run only against the files that person already holds. Retrieved text is data, never instructions, and answers are schema-checked before display.",
          closes: ["LLM01 Prompt injection", "LLM05 Improper output handling"],
        },
        {
          layer: "Data",
          control: "Permissions travel with the document into search.",
          detail:
            "Access is enforced as a filter inside Qdrant, per file and per person, so a withheld document is never a candidate for retrieval — not merely hidden afterwards.",
          closes: ["LLM02 Sensitive information disclosure", "LLM08 Vector and embedding weaknesses"],
        },
        {
          layer: "Operations",
          control: "A standing record of who could open what, when.",
          detail:
            "Every grant and revoke is appended to a tamper-evident log you can export. Hosted in an isolated tenant, or air-gapped when client confidentiality rules out off-site processing.",
          closes: ["LLM03 Supply chain"],
        },
      ],
    },
    primaryCta: BOOK_CTA,
    dashboard: "placeholder",
    motif: "tree",
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
    audience:
      "Teams that rely on PDFs, contracts and reports — legal, operations and compliance — who need answers they can stand behind.",
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
    security: {
      summary:
        "DocSense is the secure retrieval pipeline in its plainest form: private ingestion, an access check before anything is retrieved, an answer with its sources, and a record of all of it.",
      layers: [
        {
          layer: "Application",
          control: "Ask is the only action a model can trigger.",
          detail:
            "Session and permissions are checked before a question runs. Anything that would change a document, share one, or send one outside waits for a person.",
          closes: ["LLM06 Excessive agency"],
        },
        {
          layer: "Model",
          control: "Documents are read, not obeyed.",
          detail:
            "A classifier screens inputs for injection attempts, retrieved passages are isolated from instructions, and every answer is validated against a schema that requires a citation.",
          closes: ["LLM01 Prompt injection", "LLM05 Improper output handling"],
        },
        {
          layer: "Data",
          control: "Permission-filtered search, cited to the passage.",
          detail:
            "Candidates are filtered by the asker's own document permissions inside Qdrant before ranking. The answer carries the page and passage it came from.",
          closes: ["LLM02 Sensitive information disclosure", "LLM08 Vector and embedding weaknesses"],
        },
        {
          layer: "Operations",
          control: "Indexed, answered and logged inside your boundary.",
          detail:
            "Ingestion, embedding and inference run in your tenant or on your own hardware. Each question, policy decision and answer is sealed into an exportable audit trail.",
          closes: ["LLM03 Supply chain"],
        },
      ],
    },
    primaryCta: BOOK_CTA,
    dashboard: "placeholder",
    motif: "query",
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
    audience:
      "Operations teams absorbing a recurring cost without a clear view of the better move.",
    faq: [],
    stack: { headline: "", body: "", points: [] },
    primaryCta: { text: "Get notified", href: "#notify" },
    dashboard: "none",
    motif: "chart",
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

export function productHref(slug: ProductSlug): string {
  return PRODUCT_ROUTES[slug];
}
