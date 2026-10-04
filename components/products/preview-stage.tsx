"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useScrollScene } from "@/lib/use-scroll-scene";
import { cn } from "@/lib/utils";

/**
 * Stages one product interface. As the row scrolls in, the window rises out
 * of a tilted, clipped plate and settles flat; once it lands an amber scan
 * line sweeps it, and on fine pointers it tilts toward the cursor with a
 * soft glare. Reduced motion leaves the window static and fully visible.
 */
export default function PreviewStage({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollScene(ref, (el) => {
    const plate = el.querySelector<HTMLElement>("[data-stage-plate]");
    const tilt = el.querySelector<HTMLElement>("[data-stage-tilt]");
    const scan = el.querySelector<HTMLElement>("[data-stage-scan]");
    if (!plate || !tilt || !scan) return;

    gsap.fromTo(
      plate,
      { rotateX: 16, scale: 0.88, yPercent: 10, clipPath: "inset(6% 7% 0% 7% round 28px)" },
      {
        rotateX: 0,
        scale: 1,
        yPercent: 0,
        clipPath: "inset(-8% -8% -14% -8% round 14px)",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "center 58%", scrub: 1 },
      },
    );

    gsap.to(plate, {
      yPercent: -4,
      ease: "none",
      scrollTrigger: { trigger: el, start: "center 58%", end: "bottom top", scrub: 1 },
    });

    gsap.fromTo(
      scan,
      { top: "0%", opacity: 0 },
      {
        keyframes: [
          { opacity: 1, duration: 0.15 },
          { top: "100%", duration: 1.3, ease: "power2.inOut" },
          { opacity: 0, duration: 0.3 },
        ],
        scrollTrigger: { trigger: el, start: "center 62%", toggleActions: "play none none none" },
      },
    );

    if (!window.matchMedia("(pointer: fine)").matches) return;

    gsap.set(tilt, { transformPerspective: 1400 });
    const rx = gsap.quickTo(tilt, "rotateX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(tilt, "rotateY", { duration: 0.6, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      rx((0.5 - y) * 6);
      ry((x - 0.5) * 8);
      tilt.style.setProperty("--gx", `${x * 100}%`);
      tilt.style.setProperty("--gy", `${y * 100}%`);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };

    tilt.addEventListener("pointermove", move);
    tilt.addEventListener("pointerleave", leave);
    return () => {
      tilt.removeEventListener("pointermove", move);
      tilt.removeEventListener("pointerleave", leave);
    };
  });

  return (
    <div ref={ref} className={cn("preview-stage", className)}>
      <div data-stage-plate className="preview-stage-plate">
        <div data-stage-tilt className="preview-stage-tilt">
          {children}
          <span data-stage-scan aria-hidden className="preview-stage-scan" />
          <span aria-hidden className="preview-stage-glare" />
        </div>
      </div>
    </div>
  );
}
