"use client";

import { motion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { BOOKING_URL } from "@/lib/site";
import Showcase from "@/components/showcase";

const ease = [0.22, 1, 0.36, 1] as const;
const BASE = 0.15;
const STEP = 0.14;

const settle = (i: number, distance = 20) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.95, delay: BASE + i * STEP, ease },
});

export default function Hero() {
  return (
    <section className="hero-section relative overflow-hidden">
      {/* Ambient aurora — one warm field, one cool, both slow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 -top-40 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full bg-amber-500/[.07] blur-[150px]"
          style={{ animation: "bento-aurora-a 26s ease-in-out infinite" }}
        />
        <div
          className="absolute right-[-8rem] top-[28rem] h-[26rem] w-[26rem] rounded-full bg-verify/[.05] blur-[130px]"
          style={{ animation: "bento-aurora-b 32s ease-in-out infinite" }}
        />
      </div>

      {/* ── Headline ── */}
      <div className="shell relative flex flex-col items-center text-center">
        <motion.p {...settle(0, 10)} className="eyebrow flex items-center gap-3">
          <span className="inline-block size-1.5 rounded-full bg-amber-400" aria-hidden />
          Secure AI systems · RAG, agents, access control
        </motion.p>

        <motion.h1
          {...settle(1, 24)}
          className="mt-6 max-w-[15ch] font-display text-[2.6rem] font-medium leading-[1.06] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[3.9rem]"
        >
          Secure AI systems, architected from the first commit.
        </motion.h1>

        <motion.p
          {...settle(2, 18)}
          className="measure-wide mt-7 text-base font-light leading-[1.7] text-foreground/75 sm:text-lg"
        >
          Timbuktu AI Solutions designs and builds RAG, agents and access control
          that run in production — hosted inside hard boundaries, or fully
          air-gapped on your own infrastructure. Every system is reviewed against
          the OWASP Top 10 for LLM applications before it is built.
        </motion.p>

        <motion.div
          {...settle(3, 14)}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          {/* TODO(placeholder): BOOKING_URL — set real Calendly/Cal.com link in lib/site.ts */}
          <a
            href={BOOKING_URL}
            className="group btn-glow-primary inline-flex h-11 items-center gap-2.5 rounded-xl px-6 text-sm font-medium tracking-wide"
          >
            Book a call
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#solutions"
            className="btn-corporate-light inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-normal"
          >
            See the work
            <ArrowDown size={14} className="opacity-60" />
          </a>
        </motion.div>
      </div>

      {/* ── Live product showcase ── */}
      <div className="relative mt-16 sm:mt-20">
        <Showcase delay={BASE + 4 * STEP} />
      </div>
    </section>
  );
}
