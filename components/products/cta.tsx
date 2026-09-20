import { ArrowRight } from "lucide-react";
import { CtaButton } from "@/components/shadcn-space/button/button-16";
import { BOOKING_URL } from "@/lib/site";

export default function ProductCta({ productName }: { productName: string }) {
  return (
    <div className="bg-dots tone-base">
      <div className="gutter section-block mx-auto flex max-w-[46rem] flex-col items-center text-center">
        <h2 className="title text-foreground">
          Talk through {productName} <span className="accent">on your data</span>
        </h2>
        <p className="lede mt-6 max-w-[36rem]">
          Book a short call. No slide deck — bring the documents or workflow you want to test.
        </p>
        <div className="mt-8">
          <CtaButton href={BOOKING_URL}>
            Book a call
            <ArrowRight size={16} data-arrow />
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
