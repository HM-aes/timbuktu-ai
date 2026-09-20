import { ArrowRight } from "lucide-react";
import { CtaButton } from "@/components/shadcn-space/button/button-16";
import { BOOKING_URL, CONTACT_EMAIL, mailto } from "@/lib/site";

export default function ProductCta({ productName }: { productName: string }) {
  return (
    <div className="bg-dots tone-base">
      <div className="gutter section-block mx-auto flex max-w-[46rem] flex-col items-center text-center">
        <h2 className="title text-foreground">
          See {productName} <span className="accent">on your data</span>
        </h2>
        <p className="lede mt-6 max-w-[36rem]">
          Book a short demo or email us directly. No slide deck — bring the documents or
          workflow you want to test.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <CtaButton href={BOOKING_URL}>
            Book a demo
            <ArrowRight size={16} data-arrow />
          </CtaButton>
          <CtaButton href={mailto(`${productName} — enquiry`)}>Email us directly</CtaButton>
        </div>
        <p className="label mt-5 normal-case tracking-[0.06em]">{CONTACT_EMAIL}</p>
      </div>
    </div>
  );
}
