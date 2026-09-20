import { ArrowRight, Check } from "lucide-react";
import Section from "@/components/layout/section";
import { CtaButton } from "@/components/shadcn-space/button/button-16";
import { BOOKING_URL, CONTACT_EMAIL, mailto } from "@/lib/site";

const TRUST = [
  "Hosted inside hard boundaries, or air-gapped on your own hardware",
  "Runs in production, explained in language your stakeholders can follow",
  "KVK-registered, Netherlands · operating from Porto",
];

export default function Contact() {
  return (
    <Section id="contact">
      <div className="bg-dots">
        <div className="gutter section-block mx-auto flex max-w-[46rem] flex-col items-center text-center">
          <h2 className="title text-foreground">
            Putting AI to work on data that <span className="accent">can&apos;t leak?</span>
          </h2>
          <p className="lede mt-6 max-w-[36rem]">
            The quickest way to see whether this is a fit is a short call. No
            slide deck, no obligation. Bring the architecture you are planning,
            or the one already in production, and we will walk through where its
            boundaries need to sit.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {/* TODO(placeholder): BOOKING_URL — set real Calendly/Cal.com link in lib/site.ts */}
            <CtaButton href={BOOKING_URL}>
              Book a call
              <ArrowRight size={16} data-arrow />
            </CtaButton>
            <CtaButton href={mailto("Timbuktu AI Solutions — enquiry")}>
              Email us directly
            </CtaButton>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Talk to the person who builds it. About 30 minutes — enough to tell
            whether it is a fit, and what the first step would be.
          </p>
          <p className="label mt-2 normal-case tracking-[0.06em]">{CONTACT_EMAIL}</p>
        </div>
      </div>

      <ul className="cells cells-3 cells-md">
        {TRUST.map((t) => (
          <li key={t} className="cell flex items-start gap-3 py-6">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-verify/50 text-verify">
              <Check size={11} strokeWidth={2.75} />
            </span>
            <span className="cell-body">{t}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
