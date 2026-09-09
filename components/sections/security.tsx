"use client";

import SectionRule from "@/components/section-rule";
import ScrollReveal from "@/components/scroll-reveal";
import Panel from "@/components/panel";
import ThreatLedger from "@/components/diagrams/threat-ledger";
import FadeIn from "@/components/fade-in";

export default function Security() {
  return (
    <section id="security" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-[4%] top-[18%] h-[28rem] w-[28rem] rounded-full bg-verify/[.05] blur-[140px]"
          style={{ animation: "bento-aurora-b 30s ease-in-out infinite" }}
        />
      </div>

      <SectionRule index="02" label="Security" />

      <div className="shell split section-body lg:!items-start">
        {/* Text */}
        <div className="lg:sticky lg:top-28">
          <ScrollReveal
            text="Reviewed against the OWASP Top 10 for LLM applications before a line of code is written."
            className="font-display text-[1.9rem] font-medium leading-[1.15] tracking-[-0.015em] text-foreground sm:text-4xl lg:text-[2.6rem]"
          />

          <FadeIn className="measure-wide mt-8 space-y-5 text-base leading-[1.75] text-muted-foreground">
            <p>
              Most AI projects add a security review at the end, when the only
              options left are a filter here and a warning label there. We start
              with the threat model. Each of the ten risks OWASP lists for LLM
              applications gets a specific, named control in the architecture,
              and that control decides which library, which database and which
              hosting model we use.
            </p>
            <p>
              The result is a system whose boundaries can be explained in one
              page to the people who sign it off, and whose findings can be
              handed to an auditor without translation.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-8 flex flex-wrap gap-2">
            {["OWASP LLM Top 10 · 2025", "Threat model first", "Findings written for the board"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </FadeIn>
        </div>

        {/* Ledger */}
        <Panel
          caption="Threat → control"
          status="10 / 10 in place"
          statusTone="verify"
          delay={0.1}
          className="w-full"
        >
          <ThreatLedger />
        </Panel>
      </div>
    </section>
  );
}
