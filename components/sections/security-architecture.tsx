import Section from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import ArchitectureStage, { type SecurityLayer } from "@/components/sections/architecture-stage";

/** Four layers of one system, top to bottom — the order a request meets them. */
const LAYERS: SecurityLayer[] = [
  {
    n: "01",
    name: "Data",
    purpose: "Protect what enters the AI system.",
    detail: "Inputs are validated, and retrieved documents and tool results are treated as data — never as instructions.",
  },
  {
    n: "02",
    name: "Model",
    purpose: "Protect the intelligence making decisions.",
    detail: "Narrow, allow-listed tools instead of open-ended keys. The model can read untrusted text, but it cannot be commanded by it.",
  },
  {
    n: "03",
    name: "Application",
    purpose: "Protect the application and its interactions.",
    detail: "Output is filtered, access is set per file, and anything with real-world side effects waits for a person to approve it.",
  },
  {
    n: "04",
    name: "Operations",
    purpose: "Monitor and protect AI after deployment.",
    detail: "Every action is logged and traceable — hosted inside hard boundaries, or fully air-gapped on your own infrastructure.",
  },
];

const STANDARDS = ["OWASP LLM Top 10", "OWASP Agentic Top 10", "MCP human-in-the-loop spec"] as const;

export default function SecurityArchitecture() {
  return (
    <Section id="architecture">
      <div className="gutter pb-12 pt-[var(--space-section-y)] md:pb-14 md:pt-[var(--space-section-y-md)] lg:pb-16 lg:pt-[var(--space-section-y-lg)]">
        <Reveal distance={10} className="flex items-center gap-4">
          <p className="label shrink-0 text-signal">01 — Architecture</p>
          <span aria-hidden className="h-px min-w-0 flex-1 bg-signal/30" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-x-12">
          <Reveal delay={0.08} distance={24} className="lg:col-span-7">
            <h2 className="display max-w-[16ch] text-foreground">
              Security is not a feature. <span className="accent">It is the architecture.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2} distance={14} className="lg:col-span-5 lg:pb-2">
            <p className="lede max-w-[36rem]">
              Built with security at every layer — from the data that enters a system to how it is watched after
              deployment. Every system is reviewed against the OWASP Top 10 for LLM applications before it is built.
            </p>
          </Reveal>
        </div>
      </div>

      <ArchitectureStage layers={LAYERS} />

      <div className="gutter flex flex-col gap-4 border-t border-[var(--line)] py-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
        <p className="label shrink-0">Aligned to</p>
        <ul className="flex flex-wrap gap-2">
          {STANDARDS.map((name) => (
            <li
              key={name}
              className="rounded-[var(--radius-control)] border border-[var(--line)] bg-foreground/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/85"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
