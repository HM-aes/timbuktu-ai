import type { Metadata } from "next";
import ProductPage from "@/components/products/product-page";
import { getProduct } from "@/lib/products";

const product = getProduct("lex-legal");

export const metadata: Metadata = {
  title: product.metadata.title,
  description: product.metadata.description,
};

export default function LexLegalPage() {
  return <ProductPage product={product} />;
}
