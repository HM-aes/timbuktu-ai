"use client";

import { Check, ArrowRight } from "lucide-react";
import FadeIn from "@/components/fade-in";
import SectionRule from "@/components/section-rule";
import Panel from "@/components/panel";
import { BOOKING_URL, CONTACT_EMAIL, mailto } from "@/lib/site";

const TRUST = [
  "Hosted inside hard boundaries, or air-gapped on your own hardware",
  "Runs in production, explained in language your stakeholders can follow",
  "KVK-registered, Netherlands · operating from Porto",
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/3 h-[26rem] w-[36rem] -translate-x-1/2 rounded-full bg-amber-500/[.06] blur-[140px]"
          style={{ animation: "bento-aurora-a 30s ease-in-out infinite" }}
        />
      </div>

      <SectionRule index="06" label="Contact" />

      <div className="shell split section-body">
        <FadeIn>
          <h2 className="font-display text-[1.9rem] font-medium leading-[1.15] tracking-[-0.015em] text-foreground sm:text-4xl lg:text-[2.6rem]">
            Putting AI to work on data that can&apos;t leak?
          </h2>
          <p className="measure mt-6 text-base leading-[1.75] text-muted-foreground">
            The quickest way to see whether this is a fit is a short call. No
            slide deck, no obligation. Bring the architecture you are planning,
            or the one already in production, and we will walk through where its
            boundaries need to sit.
          </p>
          <ul className="mt-8 space-y-3.5">
            {TRUST.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[14.5px] text-muted-foreground">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-verify/50 bg-verify/10 text-verify">
                  <Check size={11} strokeWidth={2.75} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </FadeIn>

        <Panel caption="Book a call" status="about 30 minutes" delay={0.08} className="w-full max-w-md lg:ml-auto" bodyClassName="p-7 sm:p-8">
          <h3 className="font-display text-xl font-medium text-foreground">
            Talk to the person who builds it
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Enough time to tell whether it is a fit, and what the first step
            would be.
          </p>

          {/* TODO(placeholder): BOOKING_URL — set real Calendly/Cal.com link in lib/site.ts */}
          <a
            href={BOOKING_URL}
            className="group btn-glow-primary mt-7 flex h-11 items-center justify-center gap-2.5 rounded-xl text-sm font-medium tracking-wide"
          >
            Book a call
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>

          <div className="my-6 flex items-center gap-3 text-muted-foreground">
            <span className="h-px flex-1 bg-foreground/10" />
            <span className="eyebrow">or</span>
            <span className="h-px flex-1 bg-foreground/10" />
          </div>

          {/* TODO(placeholder): CONTACT_EMAIL — set real address in lib/site.ts */}
          <a
            href={mailto("Timbuktu AI Solutions — enquiry")}
            className="btn-corporate-light flex h-10 items-center justify-center rounded-xl text-sm font-normal"
          >
            Email us directly
          </a>

          <p className="mt-6 text-center font-mono text-[11px] tracking-[0.08em] text-muted-foreground">
            {CONTACT_EMAIL}
          </p>
        </Panel>
      </div>
    </section>
  );
}
