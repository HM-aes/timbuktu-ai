import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import SecureAiStage from "@/components/sections/secure-ai-stage";
import { APPROACH_URL } from "@/lib/site";

/** The four layers drawn in the stage, outermost last. */
const LAYERS = [
  {
    n: "01",
    title: "AI core",
    body: "The model and its retrieval, working only on the data it is allowed to see.",
  },
  {
    n: "02",
    title: "Guardrails",
    body: "Input validation, tool restrictions and output filtering on every request.",
  },
  {
    n: "03",
    title: "Audit trail",
    body: "Every action logged — fully traceable, and handed over as evidence.",
  },
  {
    n: "04",
    title: "Boundary",
    body: "Hosted inside hard boundaries, or fully air-gapped on your own infrastructure.",
  },
] as const;

export default function SecureAi() {
  return (
    <Section id="secure-ai">
      <div className="gutter pb-12 pt-[var(--space-section-y)] md:pb-14 md:pt-[var(--space-section-y-md)] lg:pb-20 lg:pt-[var(--space-section-y-lg)]">
        <Reveal distance={10} className="flex items-center gap-4">
          <p className="label shrink-0 text-signal">01 — Principle</p>
          <span aria-hidden className="h-px min-w-0 flex-1 bg-signal/30" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-x-12">
          <Reveal delay={0.08} distance={28} className="lg:col-span-7">
            <h2 className="headline-xl text-foreground">
              Build <span className="accent">secure AI.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.22} distance={16} className="lg:col-span-5 lg:pb-3">
            <p className="lede max-w-[38rem] text-foreground/90">
              Build, deploy, and protect AI applications with security at the core — from
              intelligent workflows to real-world products.
            </p>
            <Link
              href={APPROACH_URL}
              className="nav-link mt-6 inline-flex items-center gap-1.5 text-[15px]"
            >
              How we build it
              <ArrowRight size={15} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </div>

      <SecureAiStage />

      <ol aria-label="Layers of a secure AI system" className="cells cells-4">
        {LAYERS.map(({ n, title, body }, i) => (
          <li key={n} className="cell">
            <Reveal delay={0.06 * i} distance={12}>
              <p className="label text-signal">{n}</p>
              <h3 className="cell-title mt-[var(--space-stack)] text-foreground">{title}</h3>
              <p className="cell-body mt-2">{body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
