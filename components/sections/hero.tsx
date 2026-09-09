"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { BOOKING_URL } from "@/lib/site";
import Panel from "@/components/panel";
import RequestPathDiagram from "@/components/diagrams/request-path";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const BASE = 0.15;
const STEP = 0.14;

const settle = (i: number, distance = 20) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.95, delay: BASE + i * STEP, ease },
});

export default function Hero() {
  const reduced = useReducedMotionSafe();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [160, 760], [1, 0]);
  const y = useTransform(scrollY, [160, 760], [0, -36]);

  return (
    <section className="hero-section relative overflow-hidden">
      {/* Ambient aurora — one warm field, one cool, both slow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-16 -top-32 h-[34rem] w-[34rem] rounded-full bg-amber-500/[.08] blur-[140px]"
          style={{ animation: "bento-aurora-a 26s ease-in-out infinite" }}
        />
        <div
          className="absolute right-[-6rem] top-24 h-[26rem] w-[26rem] rounded-full bg-verify/[.05] blur-[130px]"
          style={{ animation: "bento-aurora-b 32s ease-in-out infinite" }}
        />
      </div>

      <div className="shell split relative">
        {/* ── Text ── */}
        <motion.div style={reduced ? undefined : { opacity, y }}>
          <motion.p
            {...settle(0, 10)}
            className="eyebrow flex items-center gap-3"
          >
            <span className="inline-block size-1.5 rounded-full bg-amber-400" aria-hidden />
            Secure AI systems · RAG, agents, access control
          </motion.p>

          <motion.h1
            {...settle(1, 24)}
            className="mt-6 font-display text-[2.6rem] font-medium leading-[1.06] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[3.9rem]"
          >
            Secure AI systems, architected from the first commit.
          </motion.h1>

          <motion.p
            {...settle(2, 18)}
            className="measure mt-7 text-base font-light leading-[1.7] text-foreground/75 sm:text-lg"
          >
            Timbuktu AI Solutions designs and builds RAG, agents and access
            control that run in production — hosted inside hard boundaries, or
            fully air-gapped on your own infrastructure. Every system is
            reviewed against the OWASP Top 10 for LLM applications before it is
            built.
          </motion.p>

          <motion.div
            {...settle(3, 14)}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            {/* TODO(placeholder): BOOKING_URL — set real Calendly/Cal.com link in lib/site.ts */}
            <a
              href={BOOKING_URL}
              className="group btn-glow-primary inline-flex h-11 items-center gap-2.5 rounded-xl px-6 text-sm font-medium tracking-wide"
            >
              Book a call
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#solutions"
              className="btn-corporate-light inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-normal"
            >
              See the work
              <ArrowDown size={14} className="opacity-60" />
            </a>
          </motion.div>

          <motion.dl
            {...settle(4, 10)}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-foreground/10 pt-6"
          >
            {[
              ["4", "systems in production"],
              ["10/10", "OWASP LLM risks covered"],
              ["1", "specialist, no handoffs"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-2xl font-medium tracking-tight text-foreground">
                  {n}
                </dd>
                <dd className="mt-1 text-[12.5px] leading-snug text-muted-foreground">
                  {l}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── Diagram ── */}
        <Panel
          caption="Request path"
          status="live · one request, one boundary"
          x={40}
          y={0}
          delay={0.55}
          grid
          className="w-full"
        >
          <RequestPathDiagram />
        </Panel>
      </div>
    </section>
  );
}
