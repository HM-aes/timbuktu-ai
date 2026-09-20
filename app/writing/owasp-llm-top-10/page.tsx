import type { Metadata } from "next";
import ArticleLayout from "@/components/writing/article-layout";
import { getArticle } from "@/lib/writing";

const article = getArticle("owasp-llm-top-10");

export const metadata: Metadata = {
  title: article.metadata.title,
  description: article.metadata.description,
};

export default function OwaspArticlePage() {
  return <ArticleLayout article={article} />;
}
