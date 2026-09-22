import {
  BrainCircuit,
  CircleCheck,
  CodeXml,
  Database,
  FileText,
  Filter,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * DefenseLayers — how a request reaches the AI system, and what it passes
 * through on the way.
 *
 * Three columns: the checks a request is put through, the system itself, and
 * what comes back out. Drawn in the site's flat panel language — hairlines,
 * one amber signal, one teal "passed the check" — rather than as an
 * illustration.
 */

const CHECKS = [
  { n: "1", title: "Input validation", detail: "Pydantic schemas", icon: ShieldCheck },
  { n: "2", title: "Injection detection", detail: "scikit-learn", icon: BrainCircuit },
  { n: "3", title: "Tool restrictions", detail: "Allow-list policy", icon: Wrench },
  { n: "4", title: "Output filtering", detail: "Content safety rules", icon: Filter },
] as const;

const SYSTEM = [
  { title: "LLM", detail: "Hosted or air-gapped", icon: Sparkles },
  { title: "RAG", detail: "Qdrant", icon: Database },
  { title: "Application", detail: "Django", icon: CodeXml },
] as const;

const BLOCKED = [
  "Prompt injection",
  "Sensitive data leak",
  "Hallucinations",
  "Malicious tools",
  "Policy violations",
] as const;

/** A hairline tile — the one surface every node in the diagram uses. */
function Tile({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-[var(--radius-control)] border border-[var(--line)] bg-surface-secondary/60 px-3.5 py-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function DefenseLayers({ className }: { className?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      {/* The request that enters the system */}
      <Tile className="max-w-[24rem]">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-[6px] border border-[var(--line)] text-foreground/70">
            <MessageSquare size={14} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[13.5px] font-medium leading-tight text-foreground">User request</p>
            <p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">
              &ldquo;Summarise this document and find any compliance risks…&rdquo;
            </p>
          </div>
        </div>
      </Tile>

      <div className="mt-3 grid grid-cols-1 gap-3 min-[560px]:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,1fr)]">
        {/* ── Column 1 — the checks, in order ── */}
        <ol className="relative flex min-w-0 flex-col gap-2.5 pl-4">
          <span
            aria-hidden
            className="absolute left-0 top-2 bottom-2 w-px bg-signal/35"
          />
          {CHECKS.map(({ n, title, detail, icon: Icon }) => (
            <li key={n} className="relative min-w-0">
              <span
                aria-hidden
                className="absolute -left-4 top-5 h-px w-4 bg-signal/35"
              />
              <Tile>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-[6px] border border-signal/35 text-signal">
                    <Icon size={14} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-medium leading-tight text-foreground">
                      <span className="font-mono text-[11px] text-signal">{n}.</span> {title}
                    </p>
                    <p className="mt-1 font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
                      {detail}
                    </p>
                  </div>
                </div>
              </Tile>
            </li>
          ))}
        </ol>

        {/* ── Column 2 — the system itself ── */}
        <div className="relative min-w-0">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[var(--radius-panel)]"
            style={{
              background:
                "radial-gradient(75% 60% at 50% 100%, color-mix(in srgb, var(--signal) 18%, transparent), transparent 70%)",
            }}
          />
          <div className="panel panel-grid relative flex h-full min-w-0 flex-col gap-2.5 p-3.5">
            <p className="label flex items-center gap-2 text-signal">
              <Sparkles size={12} aria-hidden />
              AI system
            </p>
            {SYSTEM.map(({ title, detail, icon: Icon }) => (
              <Tile key={title} className="bg-surface">
                <div className="flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-[6px] border border-[var(--line)] bg-surface-secondary text-foreground/75">
                    <Icon size={15} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-medium leading-tight text-foreground">{title}</p>
                    <p className="mt-0.5 font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
                      {detail}
                    </p>
                  </div>
                </div>
              </Tile>
            ))}
          </div>
        </div>

        {/* ── Column 3 — what comes back ── */}
        <div className="flex min-w-0 flex-col gap-2.5">
          <Tile className="border-verify/40">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-verify/50 text-verify">
                <CircleCheck size={14} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium leading-tight text-verify">Safe output</p>
                <p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">
                  Validated, filtered and logged.
                </p>
              </div>
            </div>
          </Tile>

          <Tile>
            <p className="label">Threats blocked</p>
            <ul className="mt-2.5 flex flex-col gap-1.5">
              {BLOCKED.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-[12.5px] text-foreground/85">
                  <span
                    aria-hidden
                    className="size-1.5 shrink-0 rounded-full bg-critical"
                  />
                  {t}
                </li>
              ))}
            </ul>
          </Tile>

          <Tile>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-[6px] border border-[var(--line)] text-foreground/70">
                <FileText size={14} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium leading-tight text-foreground">Audit log</p>
                <p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">
                  Full traceability, handed over as evidence.
                </p>
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </div>
  );
}
