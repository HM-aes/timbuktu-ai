import { ArrowRight } from "lucide-react";
import Section from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { CtaButton } from "@/components/shadcn-space/button/button-16";
import { BOOKING_URL, PRODUCTS_INDEX } from "@/lib/site";

/** The closing line: the story's claim, restated once, and where to go next. */
export default function FinalCta() {
  return (
    <Section id="start">
      <div className="bg-dots">
        <div className="gutter section-block mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <Reveal distance={20}>
            <h2 className="display text-foreground">
              Build <span className="accent">secure AI.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} distance={14}>
            <p className="lede mt-6 max-w-[38rem]">
              Four products, one architecture, and a direct line to the person who builds it — hosted inside hard
              boundaries, or fully air-gapped on your own infrastructure.
            </p>
          </Reveal>
          <Reveal delay={0.22} distance={10} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <CtaButton href={PRODUCTS_INDEX} tone="signal">
              Explore Timbuktu AI
              <ArrowRight size={16} data-arrow />
            </CtaButton>
            {/* TODO(placeholder): BOOKING_URL — set real Calendly/Cal.com link in lib/site.ts */}
            <CtaButton href={BOOKING_URL}>Book a call</CtaButton>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
