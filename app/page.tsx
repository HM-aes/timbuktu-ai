import Hero from "@/components/sections/hero";
import SecurityArchitecture from "@/components/sections/security-architecture";
import ProductShowcase from "@/components/products/product-showcase";
import Founder from "@/components/sections/founder";
import HomeFaq from "@/components/sections/home-faq";
import FinalCta from "@/components/sections/final-cta";

/**
 * The homepage is one story: build AI → it needs protection → security at
 * every layer → four products → the person who builds them → book a call.
 * Depth lives on the product pages; the secure RAG walkthrough is on DocSense.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <SecurityArchitecture />
      <ProductShowcase />
      <Founder />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
