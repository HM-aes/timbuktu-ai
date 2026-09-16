"use client";

import { motion } from "motion/react";
import SectionRule from "@/components/section-rule";
import ScrollReveal from "@/components/scroll-reveal";
import Panel from "@/components/panel";
import BoundaryDiagram from "@/components/diagrams/boundary";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const POINTS = [
  {
    title: "Secure by design",
    body: "The boundaries are drawn before the first line of code — where they still shape how data moves — not audited in afterward.",
  },
  {
    title: "Your data stays yours",
    body: "Hosted with hard boundaries, or fully air-gapped on your own hardware. It never leaves your control.",
  },
  {
    title: "Built to be understood",
    body: "Every system explained in the language of the people who approve it, not only the engineers who build it.",
  },
];

function Move({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotionSafe();
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={reduced ? { opacity: 1, y: 0 } : undefined}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={reduced ? INSTANT : { duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden">
      {/* Ambient aurora */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-[10%] top-[20%] h-[26rem] w-[26rem] rounded-full bg-amber-500/[.06] blur-[130px]"
          style={{ animation: "bento-aurora-a 26s ease-in-out infinite" }}
        />
      </div>

      <SectionRule index="01" label="Approach" />

      <div className="shell section-body">
        {/* Text steps back; the diagram carries the argument. */}
        <div className="split split-media">
          <div>
            <ScrollReveal
              text="Everyone is racing to add AI. Almost no one is securing it."
              className="font-display text-[1.9rem] font-medium leading-[1.15] tracking-[-0.015em] text-foreground sm:text-4xl lg:text-[2.4rem]"
            />

            <div className="measure mt-8 space-y-5 text-base leading-[1.75] text-muted-foreground">
              <p>
                Models, agents and connectors like MCP are wired into
                production systems every week, with sensitive data passing
                straight through them. The security review, when it comes,
                arrives after the architecture is already set.
              </p>
              <p>
                By then the choices are narrow. A system that touches your
                documents, your compliance data or your clients&apos; files
                needs its boundaries drawn at design time, while you can still
                govern where data moves, where it rests, and who can reach it.
              </p>
              <p className="text-foreground/90">
                That is how Timbuktu AI Solutions builds. Every system keeps
                your data under your control: hosted inside hard boundaries, or
                fully air-gapped on your own infrastructure when the work
                demands it. No data sold, no data shared, nothing to explain to
                a board later.
              </p>
            </div>
          </div>

          <Panel
            caption="How a request is governed"
            status="live"
            grid
            delay={0.1}
            bodyClassName="p-5 sm:p-7"
          >
            <BoundaryDiagram />
          </Panel>
        </div>

        {/* Pull-quote */}
        <Move delay={0.05} y={28} className="block-stack-lg max-w-3xl">
          <div aria-hidden className="h-px w-12 bg-amber-400/70" />
          <p className="mt-5 font-display text-xl font-normal leading-snug text-foreground/90 sm:text-2xl lg:text-[1.7rem]">
            Making AI capable is the easy half. Making it something you can put
            in front of an auditor is the half you design in from the start.
          </p>
        </Move>

        {/* Principles */}
        <div className="block-stack grid gap-4 md:grid-cols-3">
          {POINTS.map((p, i) => (
            <Panel key={p.title} delay={i * 0.08} y={20} bodyClassName="p-6 sm:p-7">
              <span aria-hidden className="block h-px w-8 bg-amber-400/80" />
              <h3 className="mt-5 font-display text-[17px] font-medium text-foreground">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
