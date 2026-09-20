import type { Metadata } from "next";
import ProductPage from "@/components/products/product-page";
import { getProduct } from "@/lib/products";

const product = getProduct("docsense");

export const metadata: Metadata = {
  title: product.metadata.title,
  description: product.metadata.description,
};

export default function DocSensePage() {
  return <ProductPage product={product} />;
}
