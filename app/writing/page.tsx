import type { Metadata } from "next";
import Link from "next/link";
import Section, { SectionHead } from "@/components/layout/section";
import {
  ARTICLES,
  ARTICLE_PATH,
  formatArticleDate,
  WRITING_INDEX_METADATA,
} from "@/lib/writing";

export const metadata: Metadata = {
  title: WRITING_INDEX_METADATA.title,
  description: WRITING_INDEX_METADATA.description,
};

export default function WritingIndexPage() {
  return (
    <>
      <Section className="tone-base border-t-0">
        <SectionHead
          title={
            <>
              AI security and RAG, in <span className="accent">plain language</span>
            </>
          }
        >
          <p>
            Notes for the people who approve AI systems — not only the engineers who build
            them. OWASP LLM risks, retrieval boundaries, and what to ask before you sign off.
          </p>
        </SectionHead>
      </Section>

      <Section className="tone-panel border-b border-[var(--line)]">
        <ul className="cells border-t border-[var(--line)]">
          {ARTICLES.map((article) => (
            <li key={article.slug} className="cell">
              <article>
                <p className="label">
                  {formatArticleDate(article.published)} · {article.readMinutes} min read
                </p>
                <h2 className="cell-title mt-3 text-[1.25rem] sm:text-[1.375rem]">
                  <Link
                    href={ARTICLE_PATH(article.slug)}
                    className="text-foreground transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-sm"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="cell-body mt-2 max-w-[40rem]">{article.dek}</p>
              </article>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
