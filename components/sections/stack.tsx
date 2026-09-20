import Section from "@/components/layout/section";
import StackHero from "@/components/sections/stack-hero";
import SecurityControlCard, {
  SecurityControlCardGrid,
} from "@/components/sections/security-control-card";

const CONTROLS = [
  {
    icon: "shield" as const,
    title: "Prompt injection",
    label: "Trust boundary",
    body: "Retrieved documents, tool results and web pages are treated as data, never instructions. The model can read untrusted text — it can't be commanded by anything hidden inside it. OWASP's number-one LLM risk, closed at the boundary.",
  },
  {
    icon: "key" as const,
    title: "MCP tools",
    label: "Least privilege",
    body: "Agents get narrow, audited tools instead of open-ended keys. Tool definitions are pinned and reviewed, so a server can't quietly redefine itself or hide instructions in the description the model reads.",
  },
  {
    icon: "person" as const,
    title: "Agent actions",
    label: "Human in the loop",
    body: "Sending, deleting, publishing, spending — anything with real-world side effects waits for explicit approval. The agent proposes and drafts; a person confirms, one action at a time.",
  },
  {
    icon: "alert" as const,
    title: "The lethal trifecta",
    label: "No exfiltration path",
    body: "Private data, untrusted input and an outbound channel are only dangerous together. No single agent is ever handed all three at once, so there's no route to leak what it can see.",
  },
];

const STANDARDS = [
  "OWASP LLM Top 10",
  "OWASP Agentic Top 10",
  "MCP human-in-the-loop spec",
] as const;

export default function Stack() {
  return (
    <Section id="stack">
      <StackHero />

      <div className="gutter border-t border-[var(--line)] pb-[var(--space-section-y)] pt-[var(--space-head-gap-lg)] md:pb-[var(--space-section-y-md)] md:pt-[var(--space-section-y-md)] lg:pb-[var(--space-section-y-lg)] lg:pt-[var(--space-section-y-lg)]">
        <SecurityControlCardGrid>
          {CONTROLS.map((c) => (
            <SecurityControlCard key={c.title} {...c} />
          ))}
        </SecurityControlCardGrid>

        <div className="mx-auto mt-10 flex max-w-[70rem] flex-col gap-4 border-t border-[var(--line)] pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
          <p className="label shrink-0 text-muted-foreground">Aligned to</p>
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
      </div>
    </Section>
  );
}
