import Section from "@/components/layout/section";
import ArchitectureIntro from "@/components/sections/architecture-intro";
import ArchitectureStage, { type SecurityLayer } from "@/components/sections/architecture-stage";
import { StandardsStrip } from "@/components/standards-tag-list";

/**
 * Four layers of one system, top to bottom — the order a request meets them.
 * Names stay the ones already used across the site. The short line is what a
 * first-time visitor reads while that layer is in focus.
 */
const LAYERS: SecurityLayer[] = [
  {
    n: "01",
    name: "Data",
    purpose: "Sensitive information stays protected.",
    detail: "Conversations, documents, and business data are checked before they enter.",
  },
  {
    n: "02",
    name: "Model",
    purpose: "The model only processes what it should.",
    detail: "It can read what it is given. It cannot be commanded by it.",
  },
  {
    n: "03",
    name: "Application",
    purpose: "People interact through a protected application.",
    detail: "What comes back is filtered, and anything that changes the world waits for a person.",
  },
  {
    n: "04",
    name: "Operations",
    purpose: "The system stays watched after it goes live.",
    detail: "Every action is recorded — hosted inside hard boundaries, or fully air-gapped.",
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
