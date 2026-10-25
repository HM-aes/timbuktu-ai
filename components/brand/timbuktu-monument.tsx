import { useId, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { GATEWAY } from "@/components/brand/timbuktu-mark";

/** Depth of the gateway, built from slices of the mark's own silhouette. */
const SLICES = 22;
const STEP_EM = 0.28; // 1em = 1 mark unit, so the passage is ~6 units deep

/**
 * TimbuktuMonument — the gateway mark as a physical object at night.
 *
 * No 3D library: the exact GATEWAY paths are stacked as slices along Z inside
 * a preserve-3d stage, so the walls, beams and passage jambs are real
 * geometry that turns with the camera. The light is a plate at the back of
 * the passage; everything orange on the object is that light reaching it.
 *
 * Purely decorative — the page names the company in text elsewhere.
 * Camera angle is driven by CSS variables (--tk-tilt-x, --tk-tilt-y,
 * --tk-scroll-y) so the hero's GSAP scene can steer it.
 */
export default function TimbuktuMonument({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const lit = `tk-lit-${id}`;
  const glow = `tk-glow-${id}`;
  const grain = `tk-grain-${id}`;
  const clip = `tk-clip-${id}`;

  return (
    <div aria-hidden className={cn("tk-monument", className)}>
      <div className="tk-monument-float">
        <div className="tk-monument-stage">
          <div className="tk-monument-object">
            {/* Light source — at the back of the passage */}
            <svg
              viewBox={GATEWAY.viewBox}
              className="tk-monument-layer tk-monument-light"
              style={{ transform: `translateZ(${-(SLICES - 0.5) * STEP_EM}em)` }}
            >
              <defs>
                <radialGradient id={glow} cx="24" cy="46" r="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="var(--tk-light-hot)" />
                  <stop offset="0.45" stopColor="var(--signal)" />
                  <stop offset="1" stopColor="var(--tk-light-deep)" />
                </radialGradient>
              </defs>
              <path d={GATEWAY.door} fill={`url(#${glow})`} />
            </svg>

            {/* Passage floor — the lit ground running back to the light */}
            <span
              className="tk-monument-passage-floor"
              style={{ height: `${(SLICES - 0.5) * STEP_EM}em` }}
            />

            {/* Mass — the same silhouette, slice by slice. Back slices pick up
                the passage light; front slices stay in the night. */}
            {Array.from({ length: SLICES - 1 }, (_, n) => {
              const i = SLICES - 1 - n; // paint back to front
              const t = i / (SLICES - 1);
              return (
                <svg
                  key={i}
                  viewBox={GATEWAY.viewBox}
                  className="tk-monument-layer tk-monument-slice"
                  style={
                    {
                      transform: `translateZ(${-i * STEP_EM}em)`,
                      "--tk-warm": `${Math.round(Math.pow(t, 2.4) * 46)}%`,
                    } as CSSProperties
                  }
                >
                  <path d={GATEWAY.body} fillRule="evenodd" />
                </svg>
              );
            })}

            {/* Face — carved stone, lit from the left, with a bevel catching light */}
            <svg viewBox={GATEWAY.viewBox} className="tk-monument-layer tk-monument-face">
              <defs>
                <linearGradient id={lit} x1="6" y1="4" x2="40" y2="46" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="var(--tk-stone-hi)" />
                  <stop offset="0.55" stopColor="var(--tk-stone)" />
                  <stop offset="1" stopColor="var(--tk-stone-lo)" />
                </linearGradient>
                <filter id={grain} x="0" y="0" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="7" />
                  <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.45  0 0 0 0 0.4  0 0 0 0.55 0" />
                  <feComposite in2="SourceGraphic" operator="in" />
                </filter>
                <clipPath id={clip}>
                  <path d={GATEWAY.body} fillRule="evenodd" clipRule="evenodd" />
                </clipPath>
              </defs>
              <path d={GATEWAY.body} fillRule="evenodd" fill={`url(#${lit})`} />
              <path
                d={GATEWAY.body}
                fillRule="evenodd"
                className="tk-monument-shade"
                style={{ clipPath: "inset(0 0 0 50%)" }}
              />
              <path d={GATEWAY.body} fillRule="evenodd" fill="#000" filter={`url(#${grain})`} className="tk-monument-grain" />
              {/* Bevel: a hairline stroke kept inside the edge by the clip */}
              <g clipPath={`url(#${clip})`}>
                <path d={GATEWAY.body} fillRule="evenodd" className="tk-monument-bevel" />
                <path d={GATEWAY.door} className="tk-monument-reveal" />
              </g>
            </svg>
          </div>
        </div>

        {/* Ground: a still reflection and the light spilling out of the passage */}
        <svg viewBox={GATEWAY.viewBox} className="tk-monument-reflection">
          <path d={GATEWAY.body} fillRule="evenodd" className="tk-monument-reflection-body" />
          <path d={GATEWAY.door} className="tk-monument-reflection-core" />
        </svg>
        <div className="tk-monument-ground">
          <span className="tk-monument-spill" />
        </div>
      </div>
    </div>
  );
}
