import Section, { SectionHead } from "@/components/layout/section";

/* Small line glyphs — currentColor for structure, --signal for the one
   thing each tool is chosen for. */
function Glyph({ kind }: { kind: string }) {
  const c = "h-12 w-12 text-foreground/50 transition-colors duration-300 group-hover/card:text-foreground/80";
  const s = { stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  switch (kind) {
    case "django":
      return (
        <svg viewBox="0 0 56 56" className={c} aria-hidden>
          <rect x="10" y="14" width="36" height="30" rx="5" {...s} />
          <path d="M10 24h36" {...s} />
          <circle cx="28" cy="35" r="4" stroke="var(--signal)" strokeWidth="1.8" fill="none" />
          <path d="M28 39v3" stroke="var(--signal)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "pydantic":
      return (
        <svg viewBox="0 0 56 56" className={c} aria-hidden>
          <path d="M14 14h20l8 8v20H14z" {...s} />
          <path d="M34 14v8h8" {...s} />
          <path d="M20 31h10M20 37h14" {...s} />
          <path d="M39 33l3 3 6-7" stroke="var(--signal)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "qdrant":
      return (
        <svg viewBox="0 0 56 56" className={c} aria-hidden>
          {[
            [16, 18], [24, 30], [36, 16], [40, 36], [22, 42],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.2" fill="currentColor" />
          ))}
          <circle cx="30" cy="27" r="3" fill="var(--signal)" />
          <circle cx="30" cy="27" r="11" stroke="var(--signal)" strokeWidth="1.4" strokeDasharray="3 4" fill="none" />
        </svg>
      );
    case "sklearn":
      return (
        <svg viewBox="0 0 56 56" className={c} aria-hidden>
          <path d="M12 42V14M12 42h32" {...s} />
          <path d="M16 38c8-2 12-14 22-18" stroke="var(--signal)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <circle cx="20" cy="30" r="1.8" fill="currentColor" />
          <circle cx="27" cy="34" r="1.8" fill="currentColor" />
          <circle cx="33" cy="22" r="1.8" fill="currentColor" />
          <circle cx="40" cy="18" r="1.8" fill="currentColor" />
        </svg>
      );
    case "ssh":
      return (
        <svg viewBox="0 0 56 56" className={c} aria-hidden>
          <rect x="12" y="12" width="32" height="32" rx="6" {...s} />
          <path d="M20 24l6 4-6 4" stroke="var(--signal)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M28 34h8" {...s} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 56 56" className={c} aria-hidden>
          <path d="M28 12l14 6v10c0 9-6 15-14 18-8-3-14-9-14-18V18z" {...s} />
          <path d="M22 28l4 4 8-9" stroke="var(--signal)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

const STACK = [
  {
    key: "django",
    name: "Django + Django Auth",
    role: "Identity & permissions",
    why: "Sessions, permissions and password hashing that have been attacked in public for fifteen years. We do not write our own.",
  },
  {
    key: "pydantic",
    name: "Pydantic",
    role: "Input & output contracts",
    why: "Every request and every model response is a typed schema. Anything that does not fit is rejected before it reaches the model, or after it leaves.",
  },
  {
    key: "qdrant",
    name: "Qdrant",
    role: "Permission-aware retrieval",
    why: "Vector search with payload filters, so retrieval respects the same per-document permissions as the file system it came from.",
  },
  {
    key: "sklearn",
    name: "scikit-learn",
    role: "Injection & anomaly detection",
    why: "A small classifier in front of the model flags injection and exfiltration attempts. Trained on your traffic, explainable to your team.",
  },
  {
    key: "ssh",
    name: "Hardened hosts, SSH-only",
    role: "Operations",
    why: "Key-based access, no public admin surface, encrypted at rest. Fully air-gapped when the data requires it.",
  },
  {
    key: "guard",
    name: "Tool & output guardrails",
    role: "Agency under control",
    why: "Allow-listed tools, scoped credentials, an approval step on write actions, and every answer carrying its source.",
  },
];

export default function Stack() {
  return (
    <Section id="stack">
      <SectionHead
        title={
          <>
            A Python stack chosen for <span className="accent">security</span>, not convenience.
          </>
        }
      >
        <p>
          Each component is there because it closes a specific risk from the
          threat model. Mature, audited, and understood by the security team you
          already have.
        </p>
      </SectionHead>

      <div className="cells cells-3">
        {STACK.map((s) => (
          <div key={s.key} className="cell group/card flex flex-col">
            <Glyph kind={s.key} />
            <h3 className="cell-title mt-[var(--space-stack-lg)] text-foreground">{s.name}</h3>
            <p className="label mt-1.5 text-signal">{s.role}</p>
            <p className="cell-body mt-[var(--space-stack)]">{s.why}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
