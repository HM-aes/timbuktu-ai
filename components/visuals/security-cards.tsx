import type { SecurityLayer } from "@/components/sections/architecture-stage";
import { GlassCard } from "@/components/ui/glass-card";

/**
 * SecurityCards — the RAG system as four readable cards.
 *
 * Operations is the dashed boundary everything runs inside. Within it the
 * Application sits on top, where people use it, with the Model and the Data
 * it retrieves from side by side underneath. Every card carries a lock and
 * the one safeguard that layer adds.
 *
 * Cards are frosted glass (GlassCard), each tinted by its layer's colour.
 * They carry `data-layer` (1 = Data … 4 = Operations). ArchitectureStage
 * drives them with custom properties: `--card-in` brings a card into the
 * structure, `--focus` pulls it forward to be read, `--dim` quiets the
 * others, and `--sec` on the scene lights every lock once the structure is
 * whole.
 */

const GUARDS: Record<string, string> = {
  "01": "Access-controlled",
  "02": "Injection-guarded",
  "03": "Human approval",
  "04": "Logged · air-gap ready",
};

export default function SecurityCards({
  layers,
  onSelect,
}: {
  layers: SecurityLayer[];
  /** Free mode: tapping a card focuses that layer. */
  onSelect?: (n: number) => void;
}) {
  return (
    <div aria-hidden data-scene="" className="crd-scene">
      {/* Operations first, so the boundary sits underneath the cards inside it. */}
      {[...layers].reverse().map((l) => {
        const n = Number(l.n);
        return (
          <GlassCard
            key={l.n}
            data-layer={n}
            onClick={onSelect ? () => onSelect(n) : undefined}
            className={n === 4 ? "crd-frame" : undefined}
            tilt={n === 4 ? 0 : 5}
          >
            <span className="crd-lock">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
                <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
              </svg>
            </span>
            <span className="crd-head">
              <span className="crd-n">{l.n}</span>
              <span className="crd-name">{l.name}</span>
              <span className="crd-guard">{GUARDS[l.n]}</span>
            </span>
            <span className="crd-purpose">{l.purpose}</span>
            <span className="crd-detail">{l.detail}</span>
          </GlassCard>
        );
      })}
    </div>
  );
}
