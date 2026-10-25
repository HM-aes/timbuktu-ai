import { cn } from "@/lib/utils";

/**
 * The Timbuktu gateway — the single source of the mark's geometry.
 *
 * A T drawn as Sahelian architecture on a 48-unit grid: three tapered
 * pinnacles on a parapet, beam-like arms that project past the walls, a
 * trunk whose walls batter outward to the ground, and a pointed passage cut
 * through it. The passage holds the light (the orange core). Light falls
 * from the left, so the right half of the mass is the shaded face.
 *
 * The navbar mark, the footer mark and the hero monument all draw these
 * exact paths; only the material changes.
 */
export const GATEWAY = {
  viewBox: "0 0 48 48",
  /** Silhouette with the passage cut out (even-odd). */
  body:
    "M21.5 3 L26.5 3 L28.6 11 L35.6 11 L36.4 7 L39.6 7 L40.4 11 L45 11 L45 16 L32.4 19 L37.8 46 L10.2 46 L15.6 19 L3 16 L3 11 L7.6 11 L8.4 7 L11.6 7 L12.4 11 L19.4 11 Z " +
    "M19 46 L20.6 27 L24 22.5 L27.4 27 L29 46 Z",
  /** The passage opening. */
  door: "M19 46 L20.6 27 L24 22.5 L27.4 27 L29 46 Z",
  /** The lit core, set back inside the passage. */
  core: "M21.2 46 L22.3 29.6 L24 27.2 L25.7 29.6 L26.8 46 Z",
} as const;

/**
 * Flat SVG mark. `simple` fills the whole passage with light, which keeps
 * the opening legible at favicon / ≤20px sizes.
 */
export default function TimbuktuMark({
  className,
  simple = false,
  title,
}: {
  className?: string;
  simple?: boolean;
  /** Give a title only when the mark stands alone; otherwise it is decorative. */
  title?: string;
}) {
  return (
    <svg
      viewBox={GATEWAY.viewBox}
      className={cn("tk-mark", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <path className="tk-mark-stone" d={GATEWAY.body} fillRule="evenodd" />
      <path
        className="tk-mark-shade"
        d={GATEWAY.body}
        fillRule="evenodd"
        style={{ clipPath: "inset(0 0 0 50%)" }}
      />
      <path className="tk-mark-core" d={simple ? GATEWAY.door : GATEWAY.core} />
    </svg>
  );
}
