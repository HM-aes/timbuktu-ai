import { ArrowRight } from "lucide-react";
import Section from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import { CtaButton } from "@/components/shadcn-space/button/button-16";
import { BOOKING_URL, CONTACT_EMAIL, PRODUCTS_INDEX } from "@/lib/site";

/**
 * What the call is, in the terms the contact page already uses. Kept beside
 * the button so the last step of the page is concrete: how long, what to
 * bring, who is on the other end.
 */
const TERMS = [
  {
    term: "About 30 minutes",
    detail: "Enough to tell whether it is a fit, and what the first step would be.",
  },
  {
    term: "No slide deck",
    detail: "Bring the architecture you are planning, or the one already in production.",
  },
  {
    term: "One person",
    detail: "You talk to the person who builds it. No account layer, no handoffs.",
  },
] as const;

/** The closing block: the story's claim, restated once, and the one next step. */
export default function FinalCta() {
  return (
    <Section id="start" chapter>
      <div className="closing">
        <div className="closing-main bg-dots">
          <Reveal distance={20}>
            <h2 className="display max-w-[12ch] text-foreground">
              Build <span className="accent">secure AI.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} distance={14}>
            <p className="lede mt-6 max-w-[34rem] text-pretty">
              Three RAG dashboards, one application, and a direct line to the person who builds them{" "}—
              hosted inside hard boundaries, or fully air-gapped on your own infrastructure.
            </p>
          </Reveal>
          <Reveal delay={0.22} distance={10} className="mt-9 flex flex-wrap items-center gap-3">
            {/* TODO(placeholder): BOOKING_URL — set real Calendly/Cal.com link in lib/site.ts */}
            <CtaButton href={BOOKING_URL} tone="solid">
              Book a call
              <ArrowRight size={16} data-arrow />
            </CtaButton>
            <CtaButton href={PRODUCTS_INDEX} tone="metal">
              Explore the products
            </CtaButton>
          </Reveal>
          <Reveal delay={0.3} distance={8}>
            <p className="mt-6 text-[15px] text-muted-foreground">
              Or write to{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-foreground underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:decoration-signal"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </Reveal>
        </div>

        <dl className="closing-terms" aria-label="What the call is">
          {TERMS.map((t) => (
            <div key={t.term} className="closing-term">
              <dt>{t.term}</dt>
              <dd>{t.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
