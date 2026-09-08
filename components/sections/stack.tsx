"use client";

import SectionRule from "@/components/section-rule";
import ScrollReveal from "@/components/scroll-reveal";
import Panel from "@/components/panel";
import FadeIn from "@/components/fade-in";

/* Small line glyphs — currentColor for structure, --signal for the one
   thing each tool is chosen for. */
function Glyph({ kind }: { kind: string }) {
  const c = "h-14 w-14 text-foreground/45 transition-colors duration-500 group-hover/card:text-foreground/70";
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
    <section id="stack" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-[6%] bottom-[8%] h-[26rem] w-[26rem] rounded-full bg-amber-500/[.06] blur-[140px]"
          style={{ animation: "bento-aurora-a 28s ease-in-out infinite" }}
        />
      </div>

      <SectionRule index="03" label="Stack" />

      <div className="shell pb-24 sm:pb-28">
        <div className="max-w-3xl">
          <ScrollReveal
            text="A Python stack chosen for security, not convenience."
            className="font-display text-[1.9rem] font-medium leading-[1.15] tracking-[-0.015em] text-foreground sm:text-4xl lg:text-[2.6rem]"
          />
          <FadeIn className="measure-wide mt-6 text-base leading-[1.75] text-muted-foreground">
            <p>
              Each component is there because it closes a specific risk from the
              threat model. Mature, audited, and understood by the security team
              you already have.
            </p>
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map((s, i) => (
            <Panel key={s.key} delay={(i % 3) * 0.08} y={20} bodyClassName="flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-amber-400/90">{s.role}</p>
                  <h3 className="mt-2 font-display text-[17px] font-medium text-foreground">
                    {s.name}
                  </h3>
                </div>
                <Glyph kind={s.key} />
              </div>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
                {s.why}
              </p>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
