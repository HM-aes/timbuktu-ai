"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/* ───────────────────────────────────────────────────────────────────────
   BoundaryDiagram
   Everything that wants in — prompts, files, connectors, tool calls, and
   one injected instruction — converges on a single gate. What passes runs
   inside your perimeter (model, agent, data, tools). Below, the same
   system stands fully air-gapped, its network line cut.
──────────────────────────────────────────────────────────────────────── */

const W = 380;
const H = 440;
const GATE = { x: 160, y: 180 };
const MODEL = { x: 283, y: 118 };

const INPUTS = [
  { id: "prompt", label: "User prompt", y: 78 },
  { id: "file", label: "Uploaded file", y: 130 },
  { id: "mcp", label: "MCP connector", y: 182 },
  { id: "inject", label: "Injected prompt", y: 234, hostile: true },
  { id: "tool", label: "Agent tool call", y: 286 },
] as const;

type Stage = "travel" | "inside" | "blocked" | null;

const ease = [0.22, 1, 0.36, 1] as const;

export default function BoundaryDiagram({ className }: { className?: string }) {
  const reduced = useReducedMotionSafe();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const [stage, setStage] = useState<Stage>(null);
  const [admitted, setAdmitted] = useState(0);
  const [rejected, setRejected] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || reduced) return;
    let alive = true;
    let t: ReturnType<typeof setTimeout>;
    const wait = (ms: number) =>
      new Promise<void>((r) => {
        t = setTimeout(r, ms);
      });

    const run = async () => {
      let i = 0;
      while (alive) {
        const input = INPUTS[i];
        setActive(i);
        setStage("travel");
        await wait(1000);
        if (!alive) break;
        if ("hostile" in input && input.hostile) {
          setStage("blocked");
          setRejected((n) => n + 1);
          await wait(1500);
        } else {
          setStage("inside");
          setAdmitted((n) => n + 1);
          await wait(1300);
        }
        setStage(null);
        await wait(350);
        i = (i + 1) % INPUTS.length;
      }
    };
    run();
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [mounted, reduced]);

  const current = INPUTS[active];
  const isHostile = "hostile" in current && current.hostile;
  const gateHot = stage === "travel" || stage === "inside";
  const gateBlocked = stage === "blocked";

  const log = reduced
    ? "4 admitted · 1 rejected at the gate · all logged"
    : stage === "blocked"
      ? "rejected · injected prompt · LLM01 · logged"
      : stage === "inside"
        ? `admitted · ${current.label.toLowerCase()} · identity ok · schema ok`
        : stage === "travel"
          ? `inbound · ${current.label.toLowerCase()}`
          : "waiting for the next request";

  const label = {
    fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
    fontSize: 11.5,
    fontWeight: 500,
  } as const;
  const tiny = { ...label, fontSize: 10, fontWeight: 400 } as const;

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox={`0 34 ${W} ${H - 34}`}
        fill="none"
        className="h-auto w-full text-foreground"
        role="img"
        aria-label="Every input passes one gate before it reaches the model, agent, data and tools inside your boundary. The same system can run fully air-gapped."
      >
        <defs>
          <linearGradient id="bd-perimeter" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--signal)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--signal)" stopOpacity="0.04" />
          </linearGradient>
          <radialGradient id="bd-gate-glow">
            <stop offset="0" stopColor="var(--signal)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--signal)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bd-block-glow">
            <stop offset="0" stopColor="var(--danger)" stopOpacity="0.6" />
            <stop offset="1" stopColor="var(--danger)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Column headers ── */}
        <text x="14" y="52" fill="var(--muted-foreground)" style={tiny}>
          Everything that wants in
        </text>
        <text x="200" y="52" fill="var(--signal)" style={tiny}>
          Your boundary
        </text>

        {/* ── Inputs → gate ── */}
        {INPUTS.map((input, i) => {
          const hostile = "hostile" in input && input.hostile;
          const isActive = i === active && stage !== null;
          const d = `M112 ${input.y} C 132 ${input.y}, 132 ${GATE.y}, ${GATE.x - 18} ${GATE.y}`;
          return (
            <g key={input.id}>
              <path
                d={d}
                stroke={hostile ? "var(--danger)" : "currentColor"}
                strokeOpacity={isActive ? 0.9 : hostile ? 0.35 : 0.22}
                strokeWidth={isActive ? 1.75 : 1.25}
                strokeDasharray="3 5"
                className={reduced ? undefined : "dash-animate"}
                style={{ transition: "stroke-opacity .4s, stroke-width .4s" }}
              />
              <rect
                x="14"
                y={input.y - 13}
                width="98"
                height="26"
                rx="7"
                fill="var(--background)"
                stroke={hostile ? "var(--danger)" : "currentColor"}
                strokeOpacity={isActive ? 0.9 : hostile ? 0.5 : 0.22}
                style={{ transition: "stroke-opacity .4s" }}
              />
              <circle
                cx="26"
                cy={input.y}
                r="2.5"
                fill={hostile ? "var(--danger)" : isActive ? "var(--signal)" : "currentColor"}
                fillOpacity={isActive || hostile ? 1 : 0.4}
              />
              <text
                x="35"
                y={input.y + 4}
                fill={hostile ? "var(--danger)" : "currentColor"}
                fillOpacity={isActive ? 1 : 0.75}
                style={{ ...tiny, fontSize: 9.5 }}
              >
                {input.label}
              </text>
            </g>
          );
        })}

        {/* ── The gate ── */}
        <g>
          <circle
            cx={GATE.x}
            cy={GATE.y}
            r="30"
            fill={gateBlocked ? "url(#bd-block-glow)" : "url(#bd-gate-glow)"}
            opacity={gateHot || gateBlocked || reduced ? 1 : 0.25}
            style={{ transition: "opacity .4s" }}
          />
          <circle
            cx={GATE.x}
            cy={GATE.y}
            r="15"
            fill="var(--background)"
            stroke={gateBlocked ? "var(--danger)" : "var(--signal)"}
            strokeWidth="1.75"
            style={{ transition: "stroke .3s" }}
          />
          {/* gate bar: open when admitting, closed when blocking or idle */}
          <motion.line
            x1={GATE.x}
            y1={GATE.y - 8}
            x2={GATE.x}
            y2={GATE.y + 8}
            stroke={gateBlocked ? "var(--danger)" : "var(--signal)"}
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ rotate: stage === "inside" ? 90 : 0 }}
            transition={{ duration: 0.35, ease }}
            style={{ originX: `${GATE.x}px`, originY: `${GATE.y}px` }}
          />
          {gateHot && !reduced && (
            <circle cx={GATE.x} cy={GATE.y} r="15" stroke="var(--signal)" strokeWidth="1" fill="none">
              <animate attributeName="r" from="15" to="28" dur="1.1s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.7" to="0" dur="1.1s" repeatCount="indefinite" />
            </circle>
          )}
          <text x={GATE.x} y={GATE.y + 34} textAnchor="middle" fill="var(--signal)" style={tiny}>
            one gate
          </text>
          <text x={GATE.x} y={GATE.y + 46} textAnchor="middle" fill="var(--muted-foreground)" style={{ ...tiny, fontSize: 8.5 }}>
            identity · schema · intent
          </text>
        </g>

        {/* gate → boundary */}
        <path
          d={`M${GATE.x + 15} ${GATE.y} H 200`}
          stroke="var(--signal)"
          strokeOpacity={stage === "inside" ? 1 : 0.4}
          strokeWidth="1.5"
          style={{ transition: "stroke-opacity .3s" }}
        />

        {/* ── Perimeter ── */}
        <rect x="200" y="60" width="166" height="250" rx="20" fill="url(#bd-perimeter)" />
        <rect
          x="200"
          y="60"
          width="166"
          height="250"
          rx="20"
          stroke="var(--signal)"
          strokeOpacity={stage === "inside" ? 1 : 0.7}
          strokeWidth="1.5"
          style={{ transition: "stroke-opacity .3s" }}
        />

        {/* internal wiring */}
        <g stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.25">
          <path d={`M${MODEL.x} ${MODEL.y + 16} V 184`} />
          <path d="M283 184 H 240 V 190" />
          <path d="M283 184 H 326 V 190" />
          <path d="M240 214 V 250 H 283 V 256" />
          <path d="M326 214 V 250 H 283" />
        </g>

        {[
          { ...MODEL, t: "Model", r: 16 },
          { x: 240, y: 202, t: "Agent", r: 12 },
          { x: 326, y: 202, t: "Your data", r: 12 },
          { x: 283, y: 270, t: "Tools · MCP", r: 12 },
        ].map((n, i) => (
          <g key={n.t}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill="var(--background)"
              stroke={i === 0 && stage === "inside" ? "var(--signal)" : "currentColor"}
              strokeOpacity={i === 0 && stage === "inside" ? 1 : 0.6}
              strokeWidth="1.5"
              style={{
                transition: "stroke .3s, stroke-opacity .3s",
                animation:
                  reduced || i === 0
                    ? undefined
                    : `bento-node-pulse 3.2s ease-in-out ${i * 0.5}s infinite`,
              }}
            />
            {i === 0 ? (
              <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d={`M${n.x} ${n.y - 7} V ${n.y + 7}`} />
                <path d={`M${n.x - 6} ${n.y - 3.5} L${n.x + 6} ${n.y + 3.5}`} />
                <path d={`M${n.x - 6} ${n.y + 3.5} L${n.x + 6} ${n.y - 3.5}`} />
                <circle cx={n.x} cy={n.y} r="2.2" fill="var(--signal)" stroke="none" />
              </g>
            ) : (
              <circle cx={n.x} cy={n.y} r="2.5" fill="currentColor" fillOpacity="0.7" />
            )}
            <text
              x={n.x}
              y={n.y + n.r + 13}
              textAnchor="middle"
              fill="currentColor"
              fillOpacity="0.85"
              style={{ ...tiny, fontSize: 9.5 }}
            >
              {n.t}
            </text>
          </g>
        ))}

        {/* ── Air-gapped copy ── */}
        <path d={`M${GATE.x} ${GATE.y + 50} V 300`} stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.25" />
        <g stroke="var(--danger)" strokeWidth="1.5" strokeLinecap="round">
          <path d={`M${GATE.x - 7} 306 L${GATE.x + 7} 314`} />
          <path d={`M${GATE.x - 7} 314 L${GATE.x + 7} 306`} />
        </g>
        <path d={`M${GATE.x} 320 V 382 H 200`} stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.25" strokeDasharray="2 4" />
        <text x={GATE.x - 12} y="342" textAnchor="end" fill="var(--muted-foreground)" style={{ ...tiny, fontSize: 8.5 }}>
          network
        </text>
        <text x={GATE.x - 12} y="353" textAnchor="end" fill="var(--danger)" style={{ ...tiny, fontSize: 8.5 }}>
          cut
        </text>

        <rect x="200" y="340" width="166" height="84" rx="14" fill="url(#bd-perimeter)" />
        <rect x="200" y="340" width="166" height="84" rx="14" stroke="var(--signal)" strokeOpacity="0.55" strokeWidth="1.25" strokeDasharray="4 4" />
        <text x="214" y="362" fill="var(--signal)" style={{ ...tiny, fontSize: 9.5 }}>
          Air-gapped · same system
        </text>
        <text x="214" y="375" fill="var(--muted-foreground)" style={{ ...tiny, fontSize: 8.5 }}>
          on your hardware, no network
        </text>
        {[228, 262, 296, 330].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy="400" r="7" fill="var(--background)" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.25" />
            {i < 3 && <path d={`M${x + 7} 400 H ${x + 27}`} stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.25" />}
          </g>
        ))}

        {/* ── Travelling packet ── */}
        <AnimatePresence>
          {stage && !reduced && (
            <motion.g
              key={`${active}-${current.id}`}
              initial={{ x: 96, y: current.y, opacity: 0 }}
              animate={
                stage === "travel"
                  ? { x: GATE.x - 22, y: GATE.y, opacity: 1 }
                  : stage === "inside"
                    ? { x: MODEL.x, y: MODEL.y, opacity: 1 }
                    : { x: GATE.x - 22, y: GATE.y, opacity: 1, scale: [1, 1.6, 1] }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: stage === "travel" ? 0.95 : 0.7, ease }}
              style={{ x: 96, y: current.y }}
            >
              <circle r="9" fill={isHostile ? "var(--danger)" : "var(--signal)"} fillOpacity="0.25" />
              <circle r="4" fill={isHostile ? "var(--danger)" : "var(--signal)"} />
            </motion.g>
          )}
        </AnimatePresence>

        {/* rejected mark */}
        <AnimatePresence>
          {stage === "blocked" && (
            <motion.g
              key="blocked"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ originX: `${GATE.x - 22}px`, originY: `${GATE.y - 22}px` }}
            >
              <rect x={GATE.x - 66} y={GATE.y - 40} width="60" height="18" rx="5" fill="var(--danger)" />
              <text x={GATE.x - 36} y={GATE.y - 27.5} textAnchor="middle" fill="white" style={{ ...tiny, fontSize: 8.5, fontWeight: 600 }}>
                rejected
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* audit line */}
      <div className="mt-2 flex items-center gap-3 rounded-xl border border-foreground/[0.07] bg-background/60 px-4 py-2.5 font-mono text-[11px] tracking-[0.04em]">
        <span
          aria-hidden
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            stage === "blocked" ? "bg-danger" : stage === "inside" || reduced ? "bg-verify" : "bg-amber-400",
          )}
          style={!reduced && stage === "travel" ? { animation: "dot-pulse 1.2s ease-in-out infinite" } : undefined}
        />
        <span className="text-foreground/45">audit</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={log}
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
            className={cn(
              "min-w-0 flex-1 truncate",
              stage === "blocked" ? "text-danger" : stage === "inside" ? "text-verify" : "text-foreground/80",
            )}
          >
            {log}
          </motion.span>
        </AnimatePresence>
        {!reduced && (
          <span className="hidden shrink-0 text-foreground/45 sm:inline">
            {admitted} in · {rejected} out
          </span>
        )}
      </div>
    </div>
  );
}
