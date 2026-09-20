import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Section from "@/components/layout/section";
import type { Article } from "@/lib/writing";
import { formatArticleDate } from "@/lib/writing";
import { WRITING_URL } from "@/lib/site";

export default function ArticleLayout({ article }: { article: Article }) {
  return (
    <>
      <Section className="tone-base border-t-0">
        <article className="gutter pb-[var(--space-section-y)] pt-[var(--space-hero-pt)] lg:pb-[var(--space-section-y-lg)] lg:pt-[var(--space-hero-pt-lg)]">
          <Link
            href={WRITING_URL}
            className="nav-link inline-flex items-center gap-2 text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            <ArrowLeft size={15} aria-hidden />
            Writing
          </Link>

          <header className="mt-8 max-w-[42rem]">
            <p className="label">
              {formatArticleDate(article.published)} · {article.readMinutes} min read
            </p>
            <h1 className="title mt-4 text-foreground">{article.title}</h1>
            <p className="lede mt-4">{article.dek}</p>
          </header>

          <div className="prose-width mt-10 max-w-[42rem] space-y-6">
            <p className="text-[1.0625rem] leading-relaxed text-foreground/90">{article.intro}</p>

            {/* TODO: replace draft block with full article body when written */}
            <aside
              className="rounded-[var(--radius-panel)] border border-[var(--line)] bg-surface-secondary/40 px-5 py-4"
              aria-label="Draft notice"
            >
              <p className="label text-signal">Draft in progress</p>
              <p className="cell-body mt-2 text-[15px]">{article.draftNote}</p>
            </aside>
          </div>
        </article>
      </Section>
    </>
  );
}
