import Section from "@/components/layout/section";
import ArchitectureIntro from "@/components/sections/architecture-intro";
import ArchitectureStage, { type SecurityLayer } from "@/components/sections/architecture-stage";
import { StandardsStrip } from "@/components/standards-tag-list";

/**
 * Four layers of one system, in the order a request meets them. Operations
 * comes last because it is the boundary the other three run inside.
 *
 * `purpose` and `detail` are the plain-language reading (left column).
 * `tools`, `checks` and `closes` are the engineering reading (the stage):
 * what the layer is built with, what it checks, and the OWASP LLM Top 10
 * (2025) risk that closes. They restate the stack and threat ledger on
 * /approach; keep the two in step.
 */
const LAYERS: SecurityLayer[] = [
  {
    n: "01",
    name: "Application",
    purpose: "People use a protected application.",
    detail: "What comes back is filtered. Anything that changes the world waits for a person.",
    tools: ["Django Auth", "Pydantic"],
    checks: [
      "Session and permissions are checked before anything runs.",
      "A request that does not fit its typed schema is rejected.",
      "Write actions wait for a person to approve them.",
    ],
    closes: ["LLM06 Excessive agency"],
  },
  {
    n: "02",
    name: "Model",
    purpose: "The model only processes what it should.",
    detail: "It can read what it is given. It cannot be told what to do by that text.",
    tools: ["scikit-learn", "Pydantic"],
    checks: [
      "A classifier screens every input for injection attempts.",
      "Retrieved text is treated as data, never as instructions.",
      "Output is validated against a schema before it leaves.",
    ],
    closes: ["LLM01 Prompt injection", "LLM05 Improper output handling"],
  },
  {
    n: "03",
    name: "Data",
    purpose: "Sensitive information stays protected.",
    detail: "Your conversations, documents, and business data never leave this layer unchecked.",
    tools: ["Qdrant"],
    checks: [
      "Search is filtered by the asker's own document permissions.",
      "Collections are scoped per tenant.",
      "Every answer carries the passage it came from.",
    ],
    closes: ["LLM02 Sensitive information disclosure", "LLM08 Vector and embedding weaknesses"],
  },
  {
    n: "04",
    name: "Operations",
    purpose: "The system stays watched after it goes live.",
    detail: "Every action is recorded — hosted inside hard boundaries, or fully air-gapped.",
    tools: ["SSH-only hosts", "Air-gap ready"],
    checks: [
      "Key-based access only, with no public admin surface.",
      "Encrypted at rest, and every action recorded.",
      "Hosted inside hard boundaries, or fully air-gapped.",
    ],
    closes: ["LLM03 Supply chain"],
  },
];

export default function SecurityArchitecture() {
  return (
    <Section id="architecture" chapter className="tone-raised">
      <div className="gutter pb-12 pt-[var(--space-section-y)] md:pb-14 md:pt-[var(--space-section-y-md)] lg:pb-16 lg:pt-[var(--space-section-y-lg)]">
        <ArchitectureIntro />
      </div>

      <ArchitectureStage layers={LAYERS} />

      <div className="gutter flex flex-col gap-4 border-t border-[var(--line)] py-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
        <StandardsStrip />
      </div>
    </Section>
  );
}
