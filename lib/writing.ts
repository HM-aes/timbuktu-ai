export type ArticleSlug =
  | "owasp-llm-top-10"
  | "rag-data-leaks"
  | "air-gapped-vs-hosted"
  | "prompt-injection-explained"
  | "beyond-matter-level-access";

export type Article = {
  slug: ArticleSlug;
  title: string;
  dek: string;
  intro: string;
  /** Visible until the article body is written. */
  draftNote: string;
  published: string;
  readMinutes: number;
  metadata: { title: string; description: string };
};

export const WRITING_INDEX_METADATA = {
  title: "Writing — AI security and RAG, in plain language | Timbuktu AI",
  description:
    "Notes on securing RAG, agents and AI systems — the OWASP LLM risks and what they mean for the people who sign off on them.",
};

export const ARTICLES: Article[] = [
  {
    slug: "owasp-llm-top-10",
    title: "The OWASP Top 10 for LLMs, in plain business terms",
    dek: "What the ten risks actually mean when it's your data and your board asking.",
    intro:
      "Every AI vendor says they're \"secure.\" OWASP publishes the list of what actually goes wrong with LLM applications. Here's each risk in one sentence, and the question to ask before you sign off.",
    draftNote:
      "[DRAFT — one plain-language line per risk + \"ask this\" question]",
    published: "2026-09-19",
    readMinutes: 8,
    metadata: {
      title: "The OWASP Top 10 for LLMs, in plain business terms | Timbuktu AI",
      description:
        "What the ten OWASP LLM risks mean when it's your data and your board asking — and the questions to ask before you sign off.",
    },
  },
  {
    slug: "rag-data-leaks",
    title: "Why RAG quietly leaks your data — and where the boundary goes",
    dek: "Retrieval is where sensitive data escapes. Most teams find out after go-live.",
    intro:
      "RAG makes AI useful by feeding it your documents. It also creates the most common leak path in production AI. This is where the data goes, and where the boundary has to sit.",
    draftNote: "[DRAFT — retrieval flow, the leak points, boundary design]",
    published: "2026-09-19",
    readMinutes: 7,
    metadata: {
      title: "Why RAG quietly leaks your data | Timbuktu AI",
      description:
        "Retrieval is where sensitive data escapes in production AI. Where the data goes, and where the boundary has to sit.",
    },
  },
  {
    slug: "air-gapped-vs-hosted",
    title: "Air-gapped or hosted: which does your data actually need?",
    dek: "A decision most teams make by accident. Here's how to make it on purpose.",
    intro:
      "Not every system needs to be air-gapped, and not every system can afford not to be. The deciding factor isn't paranoia — it's what your data is and who's asking about it later.",
    draftNote: "[DRAFT — decision criteria, trade-offs, examples]",
    published: "2026-09-19",
    readMinutes: 6,
    metadata: {
      title: "Air-gapped or hosted: which does your data need? | Timbuktu AI",
      description:
        "How to decide on purpose whether your AI system should run hosted or fully air-gapped.",
    },
  },
  {
    slug: "prompt-injection-explained",
    title: "Prompt injection, without the jargon",
    dek: "The attack that turns your helpful AI against you, explained with a real example.",
    intro:
      "Prompt injection is the number-one risk on the OWASP LLM list, and the easiest to demonstrate. No code — just what it is, why it works, and what actually stops it.",
    draftNote: "[DRAFT — everyday analogy, worked example, the controls that work]",
    published: "2026-09-19",
    readMinutes: 5,
    metadata: {
      title: "Prompt injection, without the jargon | Timbuktu AI",
      description:
        "What prompt injection is, why it works, and what actually stops it — explained for people who approve AI systems.",
    },
  },
  {
    slug: "beyond-matter-level-access",
    title: "Why matter-level access isn't confidentiality",
    dek: "The permission model most firms rely on draws the line in the wrong place.",
    intro:
      "\"Only people on the matter can see the file\" sounds like confidentiality. It isn't — and the gap is exactly where confidentiality breaches happen. (Ties to Lex Legal.)",
    draftNote: "[DRAFT — the gap, the per-document model, the audit trail]",
    published: "2026-09-19",
    readMinutes: 6,
    metadata: {
      title: "Why matter-level access isn't confidentiality | Timbuktu AI",
      description:
        "The permission model most firms rely on draws the line in the wrong place — and where confidentiality breaches happen.",
    },
  },
];

export function getArticle(slug: ArticleSlug): Article {
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) throw new Error(`Unknown article: ${slug}`);
  return article;
}

export function formatArticleDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const ARTICLE_PATH = (slug: ArticleSlug) => `/writing/${slug}`;
