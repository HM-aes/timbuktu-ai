import Hero from "@/components/sections/hero";
import SecurityArchitecture from "@/components/sections/security-architecture";
import ProductShowcase from "@/components/products/product-showcase";
import SecureRagShowcase from "@/components/sections/secure-rag-showcase";
import FinalCta from "@/components/sections/final-cta";

/**
 * The homepage is one story: build AI → it needs protection → security at
 * every layer → four products → one mission.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <SecurityArchitecture />
      <ProductShowcase />
      <SecureRagShowcase />
      <FinalCta />
    </>
  );
}
