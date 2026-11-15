import { Box, IsoScene, Shadow } from "@/components/visuals/iso";

/**
 * SecurityStack — the AI core inside four protective layers.
 *
 * Read top-down it is the path of a request into the system: data enters
 * through validated gates (01), meets a model with allow-listed tools (02),
 * inside an application that filters output and asks for approval (03), all
 * of it monitored and logged by operations (04).
 *
 * Every layer is a solid slab with real thickness, so the stack reads as a
 * physical object from any angle. The slabs carry drawn shapes only: names
 * live on the flat HTML overlay in ArchitectureStage, where they stay
 * horizontal and legible at every screen size. Slabs carry `data-layer`, so
 * the stage can open, focus and dim them.
 */

/** Slab thickness and the rise between layers, in scene em. */
const THICK = 1;
const RISE = 7;

const gridLines = (strength: number) =>
  `linear-gradient(color-mix(in srgb, var(--foreground) ${strength}%, transparent) 1px, transparent 1px) 0 0 / 3em 3em,` +
  `linear-gradient(90deg, color-mix(in srgb, var(--foreground) ${strength}%, transparent) 1px, transparent 1px) 0 0 / 3em 3em`;

/** Top face: an engineering grid over an opaque fill, so layers never muddy each other. */
const topFace = (fill: string, grid = 6) => `${gridLines(grid)}, ${fill}`;
const sideFace = (fill: string, amount: number) => `color-mix(in srgb, ${fill} ${amount}%, black)`;

const FILL = {
  ops: "var(--surface)",
  app: "var(--surface-secondary)",
  model: "var(--surface-tertiary)",
  data: "color-mix(in srgb, var(--surface-tertiary) 94%, var(--signal))",
} as const;

const TRACE = [8, 12, 9, 15, 11, 18, 13, 16, 12, 20, 14, 17, 13, 19];

function Row({ w, tone = "muted" }: { w: number; tone?: "muted" | "verify" | "signal" }) {
  return (
    <span className="flex items-center gap-[0.9em]">
      <span
        className={
          tone === "verify"
            ? "size-[0.7em] rounded-full bg-verify"
            : tone === "signal"
              ? "size-[0.7em] rounded-full bg-signal"
              : "size-[0.7em] rounded-full bg-foreground/30"
        }
      />
      <span className="h-[0.55em] rounded-full bg-foreground/20" style={{ width: `${w}em` }} />
    </span>
  );
}

export default function SecurityStack({ className }: { className?: string }) {
  const top = THICK + RISE * 3;
  return (
    <IsoScene size={36} rx={58} rz={-40} className={className}>
      <Shadow w={44} />

      {/* 04 — Operations: the monitored floor everything stands on */}
      <Box
        data-layer="4"
        w={36}
        h={THICK}
        top={topFace(FILL.ops, 5)}
        side={sideFace(FILL.ops, 62)}
        front={sideFace(FILL.ops, 78)}
        className="iso-slab"
      >
        <>
          <span className="absolute bottom-[5em] left-[5em] flex flex-col gap-[1.3em]">
            <Row w={14} tone="verify" />
            <Row w={9} />
            <Row w={12} />
            <Row w={7} />
          </span>
          <svg viewBox="0 0 140 24" className="absolute right-[4.5em] top-[5em] h-[4em] w-[17em]" fill="none">
            <polyline
              points={TRACE.map((v, i) => `${i * 10},${24 - v}`).join(" ")}
              stroke="var(--verify)"
              strokeOpacity="0.9"
              strokeWidth="1.8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <span className="pulse-dot absolute right-[4.5em] top-[10.2em] size-[0.9em] rounded-full bg-verify" />
          <span data-layer-anchor className="absolute bottom-0 right-0 size-px" />
        </>
      </Box>

      {/* 03 — Application: output filtering, approval before side effects */}
      <Box
        data-layer="3"
        z={RISE}
        w={27}
        h={THICK}
        top={topFace(FILL.app, 6)}
        side={sideFace(FILL.app, 62)}
        front={sideFace(FILL.app, 78)}
        className="iso-slab"
      >
        <>
          <span className="absolute left-[4em] top-[4em] flex flex-col gap-[1.3em]">
            <Row w={11} />
            <Row w={8} />
            <Row w={13} />
          </span>
          <span className="absolute bottom-[4em] right-[4em] flex items-center gap-[1em] rounded-[0.7em] border border-signal/70 bg-background px-[1.2em] py-[0.9em]">
            <svg viewBox="0 0 16 16" className="size-[2em]" fill="none" stroke="var(--signal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8.5l3.2 3.2L13 4.8" />
            </svg>
            <span className="h-[0.55em] w-[5.5em] rounded-full bg-signal/70" />
          </span>
          <span data-layer-anchor className="absolute bottom-0 right-0 size-px" />
        </>
      </Box>

      {/* 02 — Model: allow-listed tools around the reasoning */}
      <Box
        data-layer="2"
        z={RISE * 2}
        w={19}
        h={THICK}
        top={topFace(FILL.model, 7)}
        side={sideFace(FILL.model, 62)}
        front={sideFace(FILL.model, 78)}
        className="iso-slab"
      >
        <>
          <svg viewBox="0 0 210 210" className="iso-spin absolute inset-0 size-full" fill="none">
            <circle cx="105" cy="105" r="72" stroke="var(--foreground)" strokeOpacity="0.32" strokeWidth="1.6" strokeDasharray="3 7" />
            {[0, 90, 180, 270].map((deg) => (
              <rect
                key={deg}
                x="97"
                y="25"
                width="16"
                height="16"
                rx="3"
                fill="var(--background)"
                stroke="var(--signal)"
                strokeOpacity="0.9"
                strokeWidth="1.6"
                transform={`rotate(${deg} 105 105)`}
              />
            ))}
          </svg>
          <span className="absolute left-1/2 top-1/2 size-[1.4em] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/40" />
          <span data-layer-anchor className="absolute bottom-0 right-0 size-px" />
        </>
      </Box>

      {/* 01 — Data: every input comes through a validated gate */}
      <Box
        data-layer="1"
        z={RISE * 3}
        w={12}
        h={THICK}
        top={topFace(FILL.data, 8)}
        side={sideFace(FILL.data, 62)}
        front={sideFace(FILL.data, 78)}
        className="iso-slab iso-slab-data"
      >
        <>
          {(
            [
              "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
              "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
              "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
              "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
            ] as const
          ).map((pos) => (
            <span key={pos} className={`absolute ${pos} size-[1.6em] rounded-[0.3em] border border-signal bg-background`}>
              <span className="absolute inset-[0.4em] rounded-[0.12em] bg-signal" />
            </span>
          ))}
          <span className="absolute inset-[3.6em] flex flex-col justify-center gap-[1em]">
            <span className="h-[0.5em] rounded-full bg-foreground/35" />
            <span className="h-[0.5em] w-[70%] rounded-full bg-foreground/25" />
            <span className="h-[0.5em] w-[85%] rounded-full bg-foreground/25" />
          </span>
          <span data-layer-anchor className="absolute bottom-0 right-0 size-px" />
        </>
      </Box>

      {/* The spine: one line through every layer. The stage fades it in once
          each layer has been named, to show they protect one another. */}
      <Box className="iso-spine" w={0.3} h={top + 0.6} top="var(--signal)" side="color-mix(in srgb, var(--signal) 45%, transparent)" />

      {/* The AI core */}
      <div className="iso-float">
        <Shadow z={top + 0.05} w={9} />
        <Box
          z={top + 0.6}
          w={6.4}
          h={2.8}
          top="linear-gradient(135deg, var(--amber-200), var(--signal))"
          front="color-mix(in srgb, var(--signal) 58%, var(--surface))"
          side="color-mix(in srgb, var(--signal) 32%, var(--surface))"
          topClassName="shadow-[0_0_4em_0.6em_color-mix(in_srgb,var(--signal)_38%,transparent)]"
        >
          <span className="absolute inset-[1.3em] rounded-[0.3em] border border-black/30 bg-black/10" />
          <span className="pulse-dot absolute left-1/2 top-1/2 size-[1em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50" />
        </Box>
      </div>
    </IsoScene>
  );
}
