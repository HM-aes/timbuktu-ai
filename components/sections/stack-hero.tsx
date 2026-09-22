"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ChevronRight, Eye, Layers, Lock, ShieldCheck } from "lucide-react";
import DefenseLayers from "@/components/diagrams/defense-layers";
import { CtaButton } from "@/components/shadcn-space/button/button-16";
import { APPROACH_URL } from "@/lib/site";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const BASE = 0.08;
const STEP = 0.1;

const OWASP_ARTICLE = "/writing/owasp-llm-top-10";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "OWASP Top 10",
    body: "Protection against the most critical LLM risks.",
  },
  {
    icon: Layers,
    title: "Multi-layer guardrails",
    body: "Input validation, tool restrictions, output filtering.",
  },
  {
    icon: Lock,
    title: "Data protection",
    body: "No sensitive data leaves your environment.",
  },
  {
    icon: Eye,
    title: "Full audit & observability",
    body: "Track, log and investigate all activity.",
  },
] as const;

export default function StackHero() {
  const reduced = useReducedMotionSafe();

  const settle = (i: number, distance = 16) => ({
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: reduced ? INSTANT : { duration: 0.75, delay: BASE + i * STEP, ease },
  });

  const visualSettle = {
    initial: reduced ? false : { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: reduced ? INSTANT : { duration: 0.9, delay: BASE + 3 * STEP, ease },
  };

  return (
    <div className="gutter pb-10 pt-[var(--space-head-gap-lg)] md:pb-12 md:pt-8 lg:pb-14 lg:pt-10">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
        {/* ── Copy ── */}
        <div className="flex min-w-0 flex-col lg:col-span-5">
          <motion.div {...settle(0, 10)} className="flex items-center gap-4">
            <p className="label shrink-0 text-signal">03 — Security</p>
            <span aria-hidden className="h-px min-w-0 flex-1 bg-signal/30" />
          </motion.div>

          <motion.h2
            {...settle(1, 20)}
            className="title mt-6 max-w-[16ch] text-pretty text-foreground"
          >
            Built with security<br />
            <span className="accent">at every layer.</span>
          </motion.h2>

          <motion.p {...settle(2, 14)} className="lede mt-5 max-w-[46ch] text-foreground/90">
            We follow the <span className="font-medium text-foreground">OWASP Top 10 for LLMs</span>{" "}
            and apply multiple layers of defence — from input validation to runtime guardrails.
            Threats are detected, blocked and logged before they can reach your AI system.
          </motion.p>

          <motion.ul
            {...settle(3, 12)}
            className="mt-9 grid grid-cols-1 gap-x-8 gap-y-6 min-[480px]:grid-cols-2"
          >
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex min-w-0 gap-3.5">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-[var(--radius-control)] border border-signal/35 bg-signal/[0.06] text-signal">
                  <Icon size={16} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-medium leading-tight text-foreground">{title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-[1.55] text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </motion.ul>

          <motion.div {...settle(4, 12)} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <CtaButton
              href={APPROACH_URL}
              className="border-signal bg-signal text-primary-foreground hover:bg-signal"
            >
              Explore security
              <ArrowRight size={16} data-arrow />
            </CtaButton>
            <Link
              href={OWASP_ARTICLE}
              className="nav-link inline-flex items-center gap-1 text-[15px]"
            >
              See OWASP Top 10
              <ChevronRight size={15} aria-hidden />
            </Link>
          </motion.div>
        </div>

        {/* ── Diagram ── */}
        <motion.div {...visualSettle} className="min-w-0 lg:col-span-7">
          <DefenseLayers />
        </motion.div>
      </div>
    </div>
  );
}
