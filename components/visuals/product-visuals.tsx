import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Box, IsoScene, Plate, Shadow } from "@/components/visuals/iso";
import { cn } from "@/lib/utils";

/**
 * Product objects — one iso scene per product, same materials (hairline
 * plates, graphite surfaces, one amber signal), different compositions:
 * floating interface panes, a walled vault, a pipeline, a tower of layers.
 * Decorative only; each scene is aria-hidden and the panel carries the copy.
 */

export type ProductVisualKind = "applications" | "security" | "automation" | "intelligence";

/**
 * Per-scene staging: where the under-light sits so the glow follows the
 * object, the scene unit (em per 1% of stage width) that fills the stage,
 * and a vertical nudge that centres the object once its height is counted.
 */
export const STAGE: Record<ProductVisualKind, { x: string; y: string; unit: string; shift: string }> = {
  applications: { x: "58%", y: "46%", unit: "1.75cqw", shift: "0%" },
  security: { x: "50%", y: "46%", unit: "1.65cqw", shift: "-6%" },
  automation: { x: "50%", y: "54%", unit: "1.55cqw", shift: "2%" },
  intelligence: { x: "50%", y: "44%", unit: "1.45cqw", shift: "14%" },
};

const pane = "rounded-[1em] border border-[var(--line)]";
const mono = "font-mono uppercase tracking-[0.14em]";

/** A row of placeholder text, drawn as a bar. */
function Bar({ w, className }: { w: string; className?: string }) {
  return <span className={cn("block h-[0.8em] rounded-full bg-foreground/[0.12]", className)} style={{ width: w }} />;
}

/* ── 01 Applications — an interface people actually use ──────────────── */
function Applications() {
  const lines = ["92%", "78%", "86%", "64%", "88%", "70%", "82%", "54%"];
  return (
    <IsoScene size={46} depth={40} rx={50} rz={-30}>
      <Shadow x={-2} y={3} w={36} d={34} />

      {/* the source document */}
      <Plate x={-8} y={4} z={0.5} w={22} d={29} className={cn(pane, "bg-surface p-[2em]")}>
        <span className="flex items-center gap-[0.8em]">
          <span className="size-[1.6em] rounded-[0.3em] border border-[var(--line-strong)]" />
          <span className={cn(mono, "text-[1.1em] text-muted-foreground")}>contract.pdf</span>
        </span>
        <span className="mt-[2em] flex flex-col gap-[1.2em]">
          {lines.map((w, i) =>
            i === 4 ? (
              <Bar key={i} w={w} className="bg-signal/45 shadow-[0_0_1.2em_color-mix(in_srgb,var(--signal)_35%,transparent)]" />
            ) : (
              <Bar key={i} w={w} />
            ),
          )}
        </span>
      </Plate>

      {/* the question */}
      <Plate x={4} y={-13} z={5} w={21} d={6.5} className={cn(pane, "flex items-center bg-surface-secondary px-[1.6em]")}>
        <span className="whitespace-nowrap text-[1.35em] text-foreground/85">What is the notice period?</span>
      </Plate>

      {/* the sourced answer, floating over its document */}
      <div className="iso-float">
        <Plate
          x={10}
          y={6}
          z={9.5}
          w={24}
          d={15}
          className="rounded-[1em] border border-signal/45 bg-surface-secondary p-[1.8em]"
        >
          <span className={cn(mono, "text-[1em] text-signal")}>Answer</span>
          <span className="mt-[1.4em] flex flex-col gap-[1em]">
            <Bar w="94%" className="bg-foreground/25" />
            <Bar w="80%" className="bg-foreground/25" />
          </span>
          <span className={cn(mono, "absolute bottom-[1.6em] left-[1.8em] rounded-[0.4em] border border-signal/40 px-[0.7em] py-[0.35em] text-[0.95em] text-signal")}>
            § 4.2 · p. 14
          </span>
        </Plate>
      </div>
    </IsoScene>
  );
}

/* ── 02 Security — per-file access inside a hard boundary ────────────── */
const INSIDE: [number, number][] = [[-6.5, -6], [6.5, -6], [-6.5, 6], [6.5, 6]];
const OUTSIDE: [number, number][] = [[-19, -4], [-13, -17], [5, -19.5], [19, -9], [18, 10], [-4, 19.5], [-17, 13]];

function Security() {
  return (
    <IsoScene size={48} rx={58} rz={-45}>
      <Plate
        w={48}
        className="panel-grid"
        style={{
          maskImage: "radial-gradient(closest-side, black 50%, transparent)",
          WebkitMaskImage: "radial-gradient(closest-side, black 50%, transparent)",
        }}
      />

      {/* files outside the boundary — present, but unreachable */}
      {OUTSIDE.map(([x, y]) => (
        <Plate key={`${x}${y}`} x={x} y={y} z={0.3} w={3} d={3.8} className="rounded-[0.35em] border border-[var(--line-strong)] bg-surface/60" />
      ))}

      {/* the boundary */}
      <Plate z={0.5} w={34} className="rounded-full border border-dashed border-[var(--line-strong)]">
        {[0, 90, 180, 270].map((deg) => (
          <span
            key={deg}
            className="absolute left-1/2 top-1/2 size-[1em] rounded-full bg-signal"
            style={{ transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-17em)` }}
          />
        ))}
      </Plate>

      {/* the vault floor and its grants */}
      <Plate z={0.9} w={22} className="rounded-[1.4em] border border-[var(--line-strong)] bg-surface/80">
        <svg viewBox="0 0 220 220" className="absolute inset-0 size-full" fill="none">
          {INSIDE.map(([x, y]) => (
            <path
              key={`${x}${y}`}
              d={`M110 110 L${110 + x * 10} ${110 + y * 10}`}
              stroke="var(--verify)"
              strokeOpacity="0.55"
              strokeWidth="1.5"
              className="dash-animate"
            />
          ))}
        </svg>
      </Plate>
      {INSIDE.map(([x, y]) => (
        <Box
          key={`${x}${y}`}
          x={x}
          y={y}
          z={0.9}
          w={3.2}
          d={4}
          h={0.6}
          top="var(--surface-tertiary)"
          topClassName="border-verify/60"
        />
      ))}

      {/* the access policy at the centre */}
      <Shadow z={0.95} w={9} />
      <div className="iso-float">
        <Box
          z={2}
          w={6}
          h={2.6}
          top="linear-gradient(135deg, var(--amber-200), var(--signal))"
          front="color-mix(in srgb, var(--signal) 55%, var(--surface))"
          side="color-mix(in srgb, var(--signal) 30%, var(--surface))"
          topClassName="shadow-[0_0_3em_0.4em_color-mix(in_srgb,var(--signal)_35%,transparent)]"
        >
          <span className="absolute inset-[1.2em] rounded-[0.3em] border border-black/25" />
        </Box>
      </div>
    </IsoScene>
  );
}

/* ── 03 Automation — documents in, report out ────────────────────────── */
const PIPELINE: { x: number; h: number; label: string; glyph: ReactNode }[] = [
  {
    x: -22.5,
    h: 3.6,
    label: "Upload",
    glyph: (
      <span className="flex flex-col gap-[0.6em]">
        <Bar w="100%" />
        <Bar w="80%" />
        <Bar w="90%" />
      </span>
    ),
  },
  {
    x: -7.5,
    h: 5,
    label: "Map",
    glyph: (
      <span className="grid grid-cols-4 gap-[0.7em]">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className={cn("aspect-square rounded-[0.2em]", i === 5 ? "bg-signal/70" : "bg-foreground/15")} />
        ))}
      </span>
    ),
  },
  {
    x: 7.5,
    h: 5,
    label: "Gaps",
    glyph: (
      <span className="flex flex-col gap-[0.6em]">
        {["bg-critical", "bg-high", "bg-medium"].map((c, i) => (
          <span key={c} className="flex items-center gap-[0.6em]">
            <span className={cn("size-[0.9em] shrink-0 rounded-full", c)} />
            <Bar w={`${80 - i * 18}%`} />
          </span>
        ))}
      </span>
    ),
  },
  {
    x: 22.5,
    h: 7,
    label: "Report",
    glyph: (
      <span className="flex flex-col gap-[0.6em]">
        <Bar w="100%" className="bg-verify/50" />
        <Bar w="72%" />
        <Bar w="86%" />
      </span>
    ),
  },
];

function Automation() {
  return (
    <IsoScene size={62} depth={24} rx={60} rz={-30}>
      <Plate w={62} d={24} className="panel-grid rounded-[1.4em]" style={{ maskImage: "radial-gradient(closest-side, black 55%, transparent)", WebkitMaskImage: "radial-gradient(closest-side, black 55%, transparent)" }} />

      {/* the track */}
      <Plate z={0.2} w={50} d={2.4} className="rounded-full border border-[var(--line)] bg-surface/70">
        <svg viewBox="0 0 500 24" preserveAspectRatio="none" className="absolute inset-0 size-full" fill="none">
          <path d="M8 12 H492" stroke="var(--signal)" strokeOpacity="0.55" strokeWidth="1.5" className="dash-animate" />
        </svg>
      </Plate>

      {PIPELINE.map(({ x, h, label, glyph }, i) => (
        <Fragment key={label}>
          <Shadow x={x + 0.6} y={0.8} w={12} d={12} />
          <Box x={x} z={0.4} w={10} d={10} h={h} top="var(--surface-secondary)" topClassName="p-[1.3em]">
            <span className={cn(mono, "block text-[1em] text-muted-foreground")}>
              <span className="text-signal">0{i + 1}</span> {label}
            </span>
            <span className="mt-[1.2em] block">{glyph}</span>
          </Box>
        </Fragment>
      ))}

      {/* work moving between stages */}
      {[0, -2.4].map((delay) => (
        <div
          key={delay}
          className="iso-travel absolute left-1/2 top-1/2 -ml-[1.1em] -mt-[1.1em] size-[2.2em] rounded-[0.4em] bg-signal shadow-[0_0_1.6em_color-mix(in_srgb,var(--signal)_60%,transparent)]"
          style={
            {
              "--from": "-22.5em",
              "--to": "22.5em",
              "--tz": "0.9em",
              animationDelay: `${delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </IsoScene>
  );
}

/* ── 04 Intelligence — raw data condensed into one clear answer ──────── */
const SCATTER: [number, number][] = [
  [30, 40], [62, 28], [90, 52], [120, 34], [150, 60], [184, 42], [210, 70], [40, 90], [72, 110],
  [104, 86], [140, 118], [170, 96], [200, 128], [36, 150], [66, 178], [98, 160], [130, 196],
  [160, 170], [196, 186], [224, 150], [50, 214], [118, 226], [180, 222], [226, 212],
];
const NODES: [number, number][] = [[50, 60], [130, 40], [210, 70], [80, 140], [170, 130], [60, 210], [140, 200], [215, 190]];
const EDGES: [number, number][] = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [3, 4], [3, 5], [4, 6], [5, 6], [6, 7], [4, 7]];

function Intelligence() {
  const layer = "rounded-[0.9em] border border-[var(--line-strong)]";
  return (
    <IsoScene size={26} rx={54} rz={-40}>
      <Shadow w={34} />

      {/* raw data */}
      <Plate z={0} w={26} className={cn(layer, "bg-surface")}>
        <svg viewBox="0 0 260 260" className="absolute inset-0 size-full">
          {SCATTER.map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="3.5" fill="var(--foreground)" fillOpacity="0.28" />
          ))}
        </svg>
      </Plate>

      {/* signals */}
      <Plate z={6} w={26} className={cn(layer, "bg-surface/55")}>
        <svg viewBox="0 0 260 260" className="absolute inset-0 size-full" fill="none">
          {[70, 120, 90, 160, 110, 190, 140].map((h, i) => (
            <line key={i} x1={40 + i * 30} x2={40 + i * 30} y1={220} y2={220 - h} stroke="var(--foreground)" strokeOpacity="0.3" strokeWidth="9" strokeLinecap="round" />
          ))}
        </svg>
      </Plate>

      {/* patterns */}
      <Plate z={12} w={26} className={cn(layer, "bg-surface/45")}>
        <svg viewBox="0 0 260 260" className="absolute inset-0 size-full" fill="none">
          {EDGES.map(([a, b]) => (
            <line key={`${a}-${b}`} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} stroke="var(--foreground)" strokeOpacity="0.3" strokeWidth="1.5" />
          ))}
          {NODES.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="7" fill="var(--surface-secondary)" stroke={i === 4 ? "var(--signal)" : "var(--line-strong)"} strokeWidth="2" />
          ))}
        </svg>
      </Plate>

      {/* the answer */}
      <div className="iso-float">
        <Plate
          z={18}
          w={26}
          className={cn(layer, "border-signal/45 bg-surface-secondary/90")}
        >
          <svg viewBox="0 0 260 260" className="absolute inset-0 size-full" fill="none">
            <circle cx="170" cy="130" r="46" stroke="var(--signal)" strokeOpacity="0.35" strokeWidth="1.5" />
            <circle cx="170" cy="130" r="26" stroke="var(--signal)" strokeOpacity="0.6" strokeWidth="1.5" />
            <circle cx="170" cy="130" r="10" fill="var(--signal)" />
          </svg>
          <span className={cn(mono, "absolute bottom-[1.4em] left-[1.6em] text-[1.05em] text-signal")}>Better move</span>
        </Plate>
      </div>
    </IsoScene>
  );
}

const SCENES: Record<ProductVisualKind, () => ReactNode> = {
  applications: Applications,
  security: Security,
  automation: Automation,
  intelligence: Intelligence,
};

export function ProductVisual({ kind }: { kind: ProductVisualKind }) {
  const Scene = SCENES[kind];
  return <Scene />;
}
