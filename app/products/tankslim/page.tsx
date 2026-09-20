import type { Metadata } from "next";
import TankSlimPage from "@/components/products/tankslim-page";
import { getProduct } from "@/lib/products";

const product = getProduct("tankslim");

export const metadata: Metadata = {
  title: product.metadata.title,
  description: product.metadata.description,
};

export default function TankSlimRoute() {
  return <TankSlimPage product={product} />;
}
