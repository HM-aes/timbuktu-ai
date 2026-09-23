import type { ReactNode } from "react";
import { Box, IsoScene, Plate, Shadow } from "@/components/visuals/iso";
import { cn } from "@/lib/utils";

/**
 * SecurityStack — the AI core inside four protective layers.
 *
 * Read top-down it is the path of a request into the system: data enters
 * through validated gates (01), meets a model with allow-listed tools (02),
 * inside an application that filters output and asks for approval (03), all
 * of it monitored and logged by operations (04). Plates carry `data-layer`
 * so a scroll timeline can assemble them around the core in that order.
 */

const mono = "font-mono uppercase tracking-[0.14em]";

function LayerTag({ n, children, className }: { n: string; children: string; className?: string }) {
  return (
    <span
      className={cn(
        mono,
        "absolute bottom-[1em] left-[1.1em] flex items-center gap-[0.5em] whitespace-nowrap text-[1.15em] text-foreground/80",
        className,
      )}
    >
      <span className="text-signal">{n}</span>
      {children}
    </span>
  );
}

function Chip({ children, tone = "default", className }: { children: ReactNode; tone?: "default" | "signal" | "verify"; className?: string }) {
  return (
    <span
      className={cn(
        mono,
        "absolute flex items-center gap-[0.5em] whitespace-nowrap rounded-[0.4em] border px-[0.7em] py-[0.35em] text-[0.95em]",
        tone === "default" && "border-[var(--line-strong)] bg-surface text-muted-foreground",
        tone === "signal" && "border-signal/45 bg-surface text-signal",
        tone === "verify" && "border-verify/45 bg-surface text-verify",
        className,
      )}
    >
      {children}
    </span>
  );
}

const TRACE = [8, 12, 9, 15, 11, 18, 13, 16, 12, 20, 14, 17, 13, 19];

export default function SecurityStack({ className }: { className?: string }) {
  return (
    <IsoScene size={42} rx={58} rz={-40} className={className}>
      <Shadow w={50} />

      {/* 04 — Operations: the monitored floor everything stands on */}
      <Plate
        data-layer="4"
        w={42}
        className="panel-grid rounded-[1.4em] border border-[var(--line-strong)]"
        style={{ backgroundColor: "color-mix(in srgb, var(--surface) 72%, transparent)" }}
      >
        <svg viewBox="0 0 140 24" className="absolute bottom-[4.4em] right-[1.6em] h-[3em] w-[12em]" fill="none">
          <polyline
            points={TRACE.map((v, i) => `${i * 10},${24 - v}`).join(" ")}
            stroke="var(--verify)"
            strokeOpacity="0.8"
            strokeWidth="1.5"
          />
        </svg>
        <Chip tone="verify" className="bottom-[1em] right-[1.6em]">
          <span className="pulse-dot size-[0.6em] rounded-full bg-verify" />
          Audit log · live
        </Chip>
        <LayerTag n="04">Operations</LayerTag>
      </Plate>

      {/* 03 — Application: output filtering, approval before side effects */}
      <Plate
        data-layer="3"
        z={4.2}
        w={31}
        className="rounded-[1.2em] border border-[var(--line-strong)]"
        style={{ backgroundColor: "color-mix(in srgb, var(--surface-secondary) 78%, transparent)" }}
      >
        <Chip className="bottom-[4em] right-[1.3em]">Output filter ✓</Chip>
        <Chip tone="signal" className="bottom-[1em] right-[1.3em]">Approval required</Chip>
        <LayerTag n="03">Application</LayerTag>
      </Plate>

      {/* 02 — Model: allow-listed tools around the reasoning */}
      <Plate
        data-layer="2"
        z={8.4}
        w={21}
        className="panel-grid rounded-[1em] border border-[var(--line-strong)]"
        style={{ backgroundColor: "color-mix(in srgb, var(--surface-secondary) 88%, transparent)" }}
      >
        <svg viewBox="0 0 210 210" className="iso-spin absolute inset-0 size-full" fill="none">
          <circle cx="105" cy="105" r="72" stroke="var(--line-strong)" strokeWidth="1.2" strokeDasharray="3 7" />
          {[0, 90, 180, 270].map((deg) => (
            <rect
              key={deg}
              x="99"
              y="27"
              width="12"
              height="12"
              rx="2"
              fill="var(--surface)"
              stroke="var(--signal)"
              strokeOpacity="0.7"
              transform={`rotate(${deg} 105 105)`}
            />
          ))}
        </svg>
        <LayerTag n="02">Model</LayerTag>
      </Plate>

      {/* 01 — Data: every input comes through a validated gate */}
      <Plate
        data-layer="1"
        z={12.6}
        w={13}
        className="rounded-[0.8em] border border-signal/40"
        style={{ backgroundColor: "color-mix(in srgb, var(--surface-tertiary) 92%, transparent)" }}
      >
        {(
          [
            "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
            "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
            "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
            "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
          ] as const
        ).map((pos) => (
          <span key={pos} className={`absolute ${pos} size-[1.2em] rounded-[0.25em] border border-signal/70 bg-background`}>
            <span className="absolute inset-[0.32em] rounded-[0.1em] bg-signal" />
          </span>
        ))}
        <LayerTag n="01" className="bottom-auto left-[0.9em] top-[-2.6em]">
          Data
        </LayerTag>
      </Plate>

      {/* The spine: one line through every layer to the core */}
      <Box w={0.3} h={12.6} top="var(--signal)" side="color-mix(in srgb, var(--signal) 45%, transparent)" />

      {/* The AI core */}
      <div className="iso-float">
        <Shadow z={12.65} w={9} />
        <Box
          z={13.2}
          w={5.8}
          h={2.6}
          top="linear-gradient(135deg, var(--amber-200), var(--signal))"
          front="color-mix(in srgb, var(--signal) 55%, var(--surface))"
          side="color-mix(in srgb, var(--signal) 30%, var(--surface))"
          topClassName="shadow-[0_0_4em_0.6em_color-mix(in_srgb,var(--signal)_38%,transparent)]"
        >
          <span className="absolute inset-[1.2em] rounded-[0.3em] border border-black/25 bg-black/10" />
          <span className="pulse-dot absolute left-1/2 top-1/2 size-[0.9em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/45" />
        </Box>
        <Plate z={18.4} w={12} style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--signal) 20%, transparent), transparent)" }} />
        <Plate z={17} x={6.4} y={-3.4} w={9} d={2.4}>
          <span className={cn(mono, "absolute inset-0 flex items-center whitespace-nowrap text-[1.15em] text-foreground")}>
            AI core
          </span>
        </Plate>
      </div>
    </IsoScene>
  );
}
