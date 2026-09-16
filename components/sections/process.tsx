import Section, { SectionHead } from "@/components/layout/section";

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
  return (
    <Section id="process">
      <SectionHead
        title={
          <>
            From first call to a system you can <span className="accent">hand to an auditor.</span>
          </>
        }
      />

      <ol className="cells cells-4">
        {STEPS.map((s) => (
          <li key={s.n} className="cell flex flex-col">
            <div className="flex items-center justify-between">
              <span className="grid size-8 place-items-center rounded-full border border-signal/50 font-mono text-[11px] text-signal">
                {s.n}
              </span>
              <span className="label">{s.time}</span>
            </div>
            <h3 className="cell-title mt-[var(--space-stack-lg)] text-foreground">{s.title}</h3>
            <p className="cell-body mt-[var(--space-stack)]">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
