"use client";

import { motion } from "motion/react";
import SectionRule from "@/components/section-rule";
import ScrollReveal from "@/components/scroll-reveal";
import Panel from "@/components/panel";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const STEPS = [
  {
    n: "01",
    title: "Threat model",
    body: "We map your data, who may reach it, and where it could leave. Written in one page for the people who sign off.",
    time: "week 1",
  },
  {
    n: "02",
    title: "Architecture",
    body: "Boundaries, identity, retrieval and hosting are decided here, with each OWASP LLM risk assigned a named control.",
    time: "week 1–2",
  },
  {
    n: "03",
    title: "Build",
    body: "One specialist builds the system on the stack above, hosted inside your perimeter or fully air-gapped.",
    time: "weeks 3–8",
  },
  {
    n: "04",
    title: "Handover",
    body: "Runbooks, the audit trail, and a walkthrough your team can repeat without us in the room.",
    time: "final week",
  },
];

export default function Process() {
  const reduced = useReducedMotionSafe();
  return (
    <section id="process" className="relative overflow-hidden">
      <SectionRule index="05" label="How it runs" />

      <div className="shell section-body">
        <ScrollReveal
          text="From first call to a system you can hand to an auditor."
          className="max-w-3xl font-display text-[1.9rem] font-medium leading-[1.15] tracking-[-0.015em] text-foreground sm:text-4xl lg:text-[2.6rem]"
        />

        <Panel className="block-stack w-full" bodyClassName="relative p-2 sm:p-3">
          {/* progress rail */}
          <motion.div
            aria-hidden
            className="absolute left-8 right-8 top-[3.3rem] hidden h-px origin-left bg-gradient-to-r from-amber-400/70 via-amber-400/40 to-verify/60 lg:block"
            initial={{ scaleX: 0 }}
            animate={reduced ? { scaleX: 1 } : undefined}
            whileInView={reduced ? undefined : { scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduced ? INSTANT : { duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <ol className="grid gap-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                animate={reduced ? { opacity: 1, y: 0 } : undefined}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={reduced ? INSTANT : { duration: 0.6, delay: 0.2 + i * 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl p-5 transition-colors duration-300 hover:bg-foreground/[0.025] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="relative z-10 grid size-7 place-items-center rounded-full border border-amber-400/50 bg-background font-mono text-[10.5px] text-amber-300">
                    {s.n}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.06em] text-foreground/45">
                    {s.time}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[17px] font-medium text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </Panel>
      </div>
    </section>
  );
}
