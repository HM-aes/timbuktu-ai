import type { Metadata } from "next";
import ArticleLayout from "@/components/writing/article-layout";
import { getArticle } from "@/lib/writing";

const article = getArticle("rag-data-leaks");

export const metadata: Metadata = {
  title: article.metadata.title,
  description: article.metadata.description,
};

export default function RagDataLeaksPage() {
  return <ArticleLayout article={article} />;
}
