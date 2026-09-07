"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { BOOKING_URL } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;
const BASE = 0.15;
const STEP = 0.14;

const settle = (i: number, distance = 20) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.95, delay: BASE + i * STEP, ease },
});

export default function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [140, 720], [1, 0]);
  const y = useTransform(scrollY, [140, 720], [0, -40]);

  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-24 sm:px-10 sm:pt-28 sm:pb-28 lg:pl-16">
      {/* Ambient aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -left-10 -top-24 h-[32rem] w-[32rem] rounded-full bg-amber-500/[.09] blur-[130px]"
          style={{ animation: "bento-aurora-a 24s ease-in-out infinite" }}
        />
        <div
          className="absolute right-0 top-10 h-[24rem] w-[24rem] rounded-full bg-violet-500/[.06] blur-[120px]"
          style={{ animation: "bento-aurora-b 30s ease-in-out infinite" }}
        />
      </div>

      <motion.div style={{ opacity, y }} className="relative max-w-3xl">
        {/* Headline */}
        <motion.h1
          {...settle(0, 24)}
          className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[4.25rem]"
        >
          Secure AI systems,{" "}
          <span className="text-amber-300">
            architected from the first commit.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          {...settle(1, 18)}
          className="mt-6 max-w-xl text-base font-light leading-relaxed text-foreground/75 sm:text-lg"
        >
          AES designs and builds RAG, agents, and access control that run in
          production — hosted with hard boundaries, or fully air-gapped on your
          own infrastructure. Built by one specialist, with no account layer in
          between.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...settle(2, 14)}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          {/* TODO(placeholder): BOOKING_URL — set real Calendly/Cal.com link in lib/site.ts */}
          <a
            href={BOOKING_URL}
            className="group btn-glow-primary inline-flex h-11 items-center gap-2.5 rounded-xl px-6 text-sm font-medium tracking-wide transition-all hover:scale-[1.03]"
          >
            Book a call
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#solutions"
            className="btn-corporate-light inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-normal transition-all"
          >
            See our solutions
            <ArrowDown size={14} className="opacity-60" />
          </a>
        </motion.div>

        {/* Supporting line */}
        <motion.p
          {...settle(3, 10)}
          className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-slatey-400"
        >
          <span>Runs in production.</span>
          <span className="text-slatey-500">·</span>
          <span>Explained in plain language.</span>
          <span className="text-slatey-500">·</span>
          <span>Online or fully air-gapped.</span>
        </motion.p>
      </motion.div>
    </section>
  );
}
