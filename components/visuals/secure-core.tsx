import { Box, IsoScene, Plate, Shadow } from "@/components/visuals/iso";

/**
 * SecureCore — the AI core inside the layers that protect it.
 *
 * An exploded stack, read bottom-up: traffic from the outside network is
 * funnelled to four gates in the boundary (04), every action passes the
 * audit ring (03) and the guardrails (02) before reaching the core (01).
 * Layer numbers match the legend cells under the stage.
 */

// Outside network — nodes beyond the boundary, each wired to one gate.
// Coordinates in a 440-unit square that maps onto the 44em ground plate.
const GATES = { n: [220, 70], e: [370, 220], s: [220, 370], w: [70, 220] } as const;
const NODES: { at: [number, number]; gate: keyof typeof GATES; live?: boolean }[] = [
  { at: [40, 70], gate: "n", live: true },
  { at: [300, 18], gate: "n" },
  { at: [420, 120], gate: "e" },
  { at: [410, 330], gate: "e", live: true },
  { at: [320, 424], gate: "s" },
  { at: [96, 420], gate: "s", live: true },
  { at: [18, 300], gate: "w" },
];

/** Elbow route: along x first, then y, into the gate. */
function route([x1, y1]: readonly [number, number], [x2, y2]: readonly [number, number]) {
  return `M${x1} ${y1} H${x2} V${y2}`;
}

function LayerTag({
  n,
  children,
  at = "bottom-[0.9em] left-[1em]",
}: {
  n: string;
  children: string;
  at?: string;
}) {
  return (
    <span className={`absolute ${at} flex items-center gap-[0.5em] whitespace-nowrap font-mono text-[1.05em] uppercase tracking-[0.14em] text-muted-foreground`}>
      <span className="text-signal">{n}</span>
      {children}
    </span>
  );
}

export default function SecureCore({ className }: { className?: string }) {
  return (
    <IsoScene size={44} rx={57} rz={-42} className={className}>
      {/* Ground — engineering grid and the outside network */}
      <Plate
        w={44}
        className="panel-grid rounded-[2em]"
        style={{
          maskImage: "radial-gradient(closest-side, black 55%, transparent)",
          WebkitMaskImage: "radial-gradient(closest-side, black 55%, transparent)",
        }}
      >
        <svg viewBox="0 0 440 440" className="absolute inset-0 size-full" fill="none">
          {NODES.map(({ at, gate, live }) => (
            <g key={`${at[0]}-${at[1]}`}>
              <path
                d={route(at, GATES[gate])}
                stroke={live ? "var(--signal)" : "var(--line-strong)"}
                strokeOpacity={live ? 0.7 : 1}
                strokeWidth="1.5"
                className={live ? "dash-animate" : undefined}
              />
              <circle cx={at[0]} cy={at[1]} r="5" fill="var(--surface-secondary)" stroke="var(--line-strong)" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
      </Plate>

      {/* 04 — Boundary: hosted or air-gapped, four gates in */}
      <Plate
        z={1.6}
        w={30}
        className="rounded-[1.2em] border border-[var(--line-strong)]"
        style={{ background: "color-mix(in srgb, var(--surface) 55%, transparent)" }}
      >
        {(
          [
            ["left-1/2 top-0", "-translate-x-1/2 -translate-y-1/2"],
            ["right-0 top-1/2", "translate-x-1/2 -translate-y-1/2"],
            ["bottom-0 left-1/2", "-translate-x-1/2 translate-y-1/2"],
            ["left-0 top-1/2", "-translate-x-1/2 -translate-y-1/2"],
          ] as const
        ).map(([pos, shift]) => (
          <span
            key={pos}
            className={`absolute ${pos} ${shift} size-[1.3em] rounded-[0.25em] border border-signal/70 bg-background`}
          >
            <span className="absolute inset-[0.35em] rounded-[0.1em] bg-signal" />
          </span>
        ))}
        <LayerTag n="04">Boundary</LayerTag>
      </Plate>

      {/* 03 — Audit trail: a ring of ticks, one per recorded action */}
      <Plate z={4.4} w={23}>
        <svg viewBox="0 0 230 230" className="iso-spin absolute inset-0 size-full" fill="none">
          <circle cx="115" cy="115" r="112" stroke="var(--line-strong)" strokeWidth="1.2" />
          <circle cx="115" cy="115" r="100" stroke="var(--line-strong)" strokeWidth="7" strokeDasharray="1.4 9.07" />
          {/* the stretch of the log being written right now */}
          <circle
            cx="115"
            cy="115"
            r="112"
            stroke="var(--signal)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="16 84"
          />
        </svg>
      </Plate>
      <Plate z={4.4} w={23}>
        <LayerTag n="03" at="-bottom-[2.6em] right-[1em]">Audit trail</LayerTag>
      </Plate>

      {/* 02 — Guardrails: input, tools, output */}
      <Plate
        z={7.4}
        w={15}
        className="panel-grid rounded-[0.9em] border border-[var(--line-strong)]"
        style={{ backgroundColor: "color-mix(in srgb, var(--surface-secondary) 88%, transparent)" }}
      >
        <LayerTag n="02">Guardrails</LayerTag>
      </Plate>

      {/* 01 — The AI core, floating above its guardrails */}
      <Shadow z={7.45} w={11} />
      <div className="iso-float">
        <Box
          z={9.4}
          w={6.4}
          h={2.6}
          top="linear-gradient(135deg, var(--amber-200), var(--signal))"
          front="color-mix(in srgb, var(--signal) 55%, var(--surface))"
          side="color-mix(in srgb, var(--signal) 30%, var(--surface))"
          topClassName="shadow-[0_0_4em_0.6em_color-mix(in_srgb,var(--signal)_38%,transparent)]"
        >
          <span className="absolute inset-[1.3em] rounded-[0.3em] border border-black/25 bg-black/10" />
          <span className="pulse-dot absolute left-1/2 top-1/2 size-[1em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/45" />
        </Box>
        <Plate
          z={15}
          w={12}
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--signal) 22%, transparent), transparent)",
          }}
        />
        <Plate z={12.4} x={6.8} y={-3.6} w={9} d={2.4}>
          <span className="absolute inset-0 flex items-center gap-[0.5em] whitespace-nowrap font-mono text-[1.05em] uppercase tracking-[0.14em] text-foreground/85">
            <span className="text-signal">01</span>AI core
          </span>
        </Plate>
      </div>
    </IsoScene>
  );
}
