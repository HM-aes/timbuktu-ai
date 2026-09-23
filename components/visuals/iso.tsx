import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Iso primitives — flat hairline plates and boxes placed in real CSS 3D.
 *
 * Every number is in `em` and measured from the centre of the scene, so a
 * scene scales with the font-size of the `.iso-root` it sits in. Styling
 * lives in globals.css (`.iso-*`); these components only set the variables.
 * Server-safe: no hooks, no browser APIs.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

export function IsoScene({
  size,
  depth,
  rx = 56,
  rz = -42,
  className,
  style,
  children,
}: {
  /** Footprint width in em. */
  size: number;
  /** Footprint depth in em (defaults to `size`). */
  depth?: number;
  rx?: number;
  rz?: number;
  className?: string;
  style?: Vars;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden
      data-scene
      className={cn("iso-scene", className)}
      style={
        {
          width: `${size}em`,
          height: `${depth ?? size}em`,
          "--rx": `${rx}deg`,
          "--rz": `${rz}deg`,
          ...style,
        } as Vars
      }
    >
      {children}
    </div>
  );
}

type Placement = {
  x?: number;
  y?: number;
  z?: number;
  w: number;
  d?: number;
};

const place = ({ x = 0, y = 0, z = 0, w, d }: Placement): Vars => ({
  "--x": x,
  "--y": y,
  "--z": z,
  "--w": w,
  "--d": d ?? w,
});

/** A flat plate lying in the scene, centred on (x, y), raised to z. */
export function Plate({
  className,
  style,
  children,
  "data-layer": layer,
  ...p
}: Placement & { className?: string; style?: Vars; children?: ReactNode; "data-layer"?: string }) {
  return (
    <div data-layer={layer} className={cn("iso-plate", className)} style={{ ...place(p), ...style }}>
      {children}
    </div>
  );
}

/** A solid block: footprint w × d, height h. `top` carries the face content. */
export function Box({
  h,
  top,
  side,
  front,
  className,
  topClassName,
  children,
  ...p
}: Placement & {
  h: number;
  top?: string;
  side?: string;
  front?: string;
  className?: string;
  topClassName?: string;
  children?: ReactNode;
}) {
  const style: Vars = { ...place(p), "--h": h };
  if (top) style["--top"] = top;
  if (side) style["--side"] = side;
  if (front) style["--front"] = front;
  return (
    <div className={cn("iso-box", className)} style={style}>
      <div className="f f-n" />
      <div className="f f-e" />
      <div className="f f-w" />
      <div className="f f-s" />
      <div className={cn("f f-top", topClassName)}>{children}</div>
    </div>
  );
}

/** Soft contact shadow under a raised object. */
export function Shadow(p: Placement) {
  return <Plate {...p} className="iso-shadow" />;
}
