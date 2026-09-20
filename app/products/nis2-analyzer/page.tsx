import type { Metadata } from "next";
import ProductPage from "@/components/products/product-page";
import { getProduct } from "@/lib/products";

const product = getProduct("nis2-analyzer");

export const metadata: Metadata = {
  title: product.metadata.title,
  description: product.metadata.description,
};

export default function Nis2AnalyzerPage() {
  return <ProductPage product={product} />;
}
