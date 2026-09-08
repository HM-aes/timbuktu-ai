"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/* ───────────────────────────────────────────────────────────────────────
   RequestPathDiagram
   One request enters at the top and moves through six controls to a
   sourced answer. Then a hostile prompt follows and is stopped at the
   input gate. The loop *shows* the security claim instead of stating it.
   Reduced motion: final state, no timers.
──────────────────────────────────────────────────────────────────────── */

const STAGES = [
  { name: "Identity", tech: "Django Auth · session + permissions" },
  { name: "Input gate", tech: "Pydantic schema · injection classifier" },
  { name: "Retrieval", tech: "Qdrant · filtered by document ACL" },
  { name: "Model", tech: "runs inside your boundary" },
  { name: "Output check", tech: "schema-validated · tools allow-listed" },
  { name: "Sourced answer", tech: "every claim carries its passage" },
] as const;

type Phase = "legit" | "hostile";
type StageState = "idle" | "active" | "passed" | "blocked";

const STEP_MS = 820;
const HOLD_MS = 1500;
const BLOCK_AT = 1; // hostile prompt stops at the input gate

export default function RequestPathDiagram({ className }: { className?: string }) {
  // Server and first client render are identical (all idle); the safe hook
  // only reports the preference after mount, avoiding hydration drift.
  const reduced = useReducedMotionSafe();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("legit");
  const [step, setStep] = useState(-1); // -1 = nothing yet

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || reduced) return;
    let alive = true;
    let t: ReturnType<typeof setTimeout>;

    const run = async () => {
      const wait = (ms: number) =>
        new Promise<void>((r) => {
          t = setTimeout(r, ms);
        });
      while (alive) {
        // legitimate request
        setPhase("legit");
        setStep(-1);
        await wait(500);
        for (let i = 0; i < STAGES.length && alive; i++) {
          setStep(i);
          await wait(STEP_MS);
        }
        await wait(HOLD_MS);
        // hostile prompt
        setPhase("hostile");
        setStep(-1);
        await wait(500);
        for (let i = 0; i <= BLOCK_AT && alive; i++) {
          setStep(i);
          await wait(STEP_MS);
        }
        await wait(HOLD_MS + 400);
      }
    };
    run();
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [mounted, reduced]);

  const stateOf = (i: number): StageState => {
    if (reduced) return "passed";
    if (step < i) return "idle";
    if (phase === "hostile" && i === BLOCK_AT && step >= BLOCK_AT) return "blocked";
    if (step === i) return "active";
    return "passed";
  };

  const done = reduced || (phase === "legit" && step >= STAGES.length - 1);
  const blocked = !reduced && phase === "hostile" && step >= BLOCK_AT;

  const log = reduced
    ? "answer returned · 3 sources · logged"
    : blocked
      ? "rejected at input gate · LLM01 pattern · logged"
      : done
        ? "answer returned · 3 sources · logged"
        : phase === "hostile"
          ? "inbound: untrusted prompt"
          : step < 0
            ? "inbound: authenticated request"
            : `stage ${step + 1}/${STAGES.length} · ${STAGES[step].name.toLowerCase()}`;

  return (
    <div className={cn("relative p-6 sm:p-7", className)}>
      {/* rail */}
      <div
        aria-hidden
        className="absolute left-[2.35rem] top-8 bottom-24 w-px bg-foreground/[0.09] sm:left-[2.6rem]"
      />

      <ol className="relative space-y-2.5">
        {STAGES.map((s, i) => {
          const st = stateOf(i);
          return (
            <li key={s.name} className="relative flex items-center gap-4">
              {/* node */}
              <span
                className={cn(
                  "relative z-10 grid size-8 shrink-0 place-items-center rounded-full border text-[11px] font-medium transition-colors duration-500",
                  st === "idle" && "border-foreground/15 bg-background text-foreground/40",
                  st === "active" && "border-amber-400/70 bg-amber-400/10 text-amber-300",
                  st === "passed" && "border-verify/60 bg-verify/10 text-verify",
                  st === "blocked" && "border-danger/70 bg-danger/10 text-danger",
                )}
              >
                {st === "passed" ? (
                  <Check size={13} strokeWidth={2.5} />
                ) : st === "blocked" ? (
                  <X size={13} strokeWidth={2.5} />
                ) : (
                  <span className="font-mono">{i + 1}</span>
                )}
                {st === "active" && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-amber-400/60"
                    style={{ animation: "ping-soft 1.1s ease-out infinite" }}
                  />
                )}
              </span>

              {/* row */}
              <div
                className={cn(
                  "flex min-w-0 flex-1 items-center justify-between gap-4 rounded-xl border px-4 py-2.5 transition-colors duration-500",
                  st === "idle" && "border-transparent",
                  st === "active" && "border-amber-400/25 bg-amber-400/[0.05]",
                  st === "passed" && "border-foreground/[0.06] bg-foreground/[0.02]",
                  st === "blocked" && "border-danger/30 bg-danger/[0.06]",
                )}
              >
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-[15px] font-normal leading-tight transition-colors duration-500",
                      st === "idle" ? "text-foreground/55" : "text-foreground",
                    )}
                  >
                    {s.name}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[10.5px] tracking-[0.04em] text-muted-foreground/80">
                    {s.tech}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-500",
                    st === "idle" && "text-foreground/25",
                    st === "active" && "text-amber-300",
                    st === "passed" && "text-verify",
                    st === "blocked" && "text-danger",
                  )}
                >
                  {st === "idle"
                    ? "wait"
                    : st === "active"
                      ? "checking"
                      : st === "passed"
                        ? "ok"
                        : "blocked"}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      {/* audit line */}
      <div className="mt-6 flex items-center gap-3 rounded-xl border border-foreground/[0.07] bg-background/60 px-4 py-3 font-mono text-[11px] tracking-[0.04em]">
        <span
          aria-hidden
          className={cn(
            "size-1.5 shrink-0 rounded-full transition-colors duration-500",
            blocked ? "bg-danger" : done ? "bg-verify" : "bg-amber-400",
          )}
          style={!reduced && !done && !blocked ? { animation: "dot-pulse 1.4s ease-in-out infinite" } : undefined}
        />
        <span className="text-foreground/45">audit</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={log}
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "truncate",
              blocked ? "text-danger" : done ? "text-verify" : "text-foreground/80",
            )}
          >
            {log}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
