"use client";

import { Check, ArrowRight } from "lucide-react";
import FadeIn from "@/components/fade-in";
import SectionRule from "@/components/section-rule";
import { BOOKING_URL, CONTACT_EMAIL, mailto } from "@/lib/site";

const TRUST = [
  "Hosted with hard boundaries, or air-gapped on your own hardware",
  "Runs in production, explained in language your stakeholders can follow",
  "KVK-registered, Netherlands · operating from Porto",
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-foreground/10 py-8"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/3 h-[26rem] w-[36rem] -translate-x-1/2 rounded-full bg-amber-500/[.06] blur-[130px]"
          style={{ animation: "bento-aurora-a 30s ease-in-out infinite" }}
        />
      </div>

      <SectionRule label="CONTACT" align="left" />

      <div className="grid max-w-5xl gap-10 px-6 pb-24 sm:px-10 lg:pl-16 md:grid-cols-2">
        <FadeIn>
          <h2 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Putting AI to work on data that can&apos;t leak?
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            The quickest way to see whether this is a fit is a short call — no
            slide deck, no obligation. Bring the architecture you are planning,
            or the one already in production, and we will walk through where its
            boundaries need to sit.
          </p>
          <ul className="mt-8 space-y-3">
            {TRUST.map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <Check
                  size={18}
                  className="mt-0.5 shrink-0 text-amber-500"
                />
                {t}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="glass-card rounded-2xl p-7 shadow-2xl">
            <h3 className="font-display text-xl font-medium text-foreground">
              Book a call
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              About 30 minutes — enough to tell whether it is a fit.
            </p>

            {/* TODO(placeholder): BOOKING_URL — set real Calendly/Cal.com link in lib/site.ts */}
            <a
              href={BOOKING_URL}
              className="group btn-glow-primary mt-6 flex h-11 items-center justify-center gap-2.5 rounded-xl text-sm font-medium tracking-wide transition-all hover:scale-[1.02]"
            >
              Book a call
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <div className="my-6 flex items-center gap-3 text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              <span className="font-mono text-[11px] uppercase tracking-widest">
                or
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            {/* TODO(placeholder): CONTACT_EMAIL — set real address in lib/site.ts */}
            <a
              href={mailto("AES AI Solutions — enquiry")}
              className="flex h-10 items-center justify-center rounded-xl border border-border bg-surface-secondary text-sm font-normal text-muted-foreground transition-colors hover:text-foreground dark:bg-white/5 dark:hover:bg-white/10"
            >
              Email us directly
            </a>

            <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {CONTACT_EMAIL}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
