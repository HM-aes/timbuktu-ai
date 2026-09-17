"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/site";
import Showcase from "@/components/showcase";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const BASE = 0.1;
const STEP = 0.12;

export default function Hero() {
  const reduced = useReducedMotionSafe();
  const settle = (i: number, distance = 18) => ({
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: reduced ? INSTANT : { duration: 0.8, delay: BASE + i * STEP, ease },
  });

  return (
    <section className="relative">
      <div className="frame">
        {/* Copy */}
        <div className="gutter flex flex-col items-center pt-[var(--space-hero-pt)] text-center lg:pt-[var(--space-hero-pt-lg)]">
          <motion.p {...settle(0, 10)} className="pill">
            <span className="dot" aria-hidden />
            Secure AI systems · RAG, agents, access control
          </motion.p>

          <motion.h1 {...settle(1, 22)} className="display mt-5 max-w-[22ch] text-foreground">
            Secure AI systems, <span className="accent">architected</span> from the first commit.
          </motion.h1>

          <motion.p {...settle(2, 16)} className="lede mt-4 max-w-[48rem]">
            Timbuktu AI Solutions designs and builds RAG, agents and access control
            that run in production — hosted inside hard boundaries, or fully
            air-gapped on your own infrastructure. Every system is reviewed against
            the OWASP Top 10 for LLM applications before it is built.
          </motion.p>

          <motion.div {...settle(3, 12)} className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {/* TODO(placeholder): BOOKING_URL — set real Calendly/Cal.com link in lib/site.ts */}
            <a href={BOOKING_URL} className="btn btn-primary">
              Book a call
              <ArrowRight size={16} data-arrow />
            </a>
            <a href="#solutions" className="btn btn-secondary">
              See the work
            </a>
          </motion.div>
        </div>

        {/* Live product showcase — spans the frame edge to edge */}
        <div className="mt-[var(--space-hero-gap)] lg:mt-[var(--space-hero-gap-lg)]">
          <Showcase delay={BASE + 4 * STEP} />
        </div>
      </div>
    </section>
  );
}
