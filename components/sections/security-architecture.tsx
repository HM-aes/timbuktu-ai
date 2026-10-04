import Section from "@/components/layout/section";
import ArchitectureIntro from "@/components/sections/architecture-intro";
import ArchitectureStage, { type SecurityLayer } from "@/components/sections/architecture-stage";
import { StandardsStrip } from "@/components/standards-tag-list";

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

export default function SecurityArchitecture() {
  return (
    <Section id="architecture" chapter>
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
