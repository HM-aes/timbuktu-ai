"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  /** Layer number, read by the stage's scroll timeline (`[data-layer]`). */
  "data-layer"?: number;
  onClick?: () => void;
  /** Maximum pointer tilt in degrees. 0 turns tilt off. */
  tilt?: number;
};

/**
 * GlassCard — a frosted-glass surface with a light that follows the pointer.
 *
 * Structure and colour live in CSS (`.crd`, `--accent`); the stage's GSAP
 * timeline drives `--card-in`, `--focus` and `--dim` on it. Motion adds the
 * one thing CSS cannot: a spring-smoothed tilt and a glare that tracks a
 * mouse. Touch and pen skip both, as does a visitor who asked for reduced
 * motion. The tilt is a plain `transform`, so it composes with the
 * `translate` and `scale` the timeline sets and never fights it.
 */
export function GlassCard({ children, className, tilt = 5, onClick, "data-layer": layer }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spring = { stiffness: 170, damping: 19, mass: 0.6 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const glare = useSpring(0, { stiffness: 120, damping: 20 });
  const light = useMotionTemplate`radial-gradient(16em circle at ${mx}% ${my}%, color-mix(in srgb, var(--accent) 34%, transparent), transparent 62%)`;

  const track = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduceMotion || e.pointerType !== "mouse") return;
    const box = el.getBoundingClientRect();
    if (box.width === 0 || box.height === 0) return;
    const px = (e.clientX - box.left) / box.width;
    const py = (e.clientY - box.top) / box.height;
    mx.set(px * 100);
    my.set(py * 100);
    rotateY.set((px - 0.5) * tilt * 2);
    rotateX.set(-(py - 0.5) * tilt * 2);
    glare.set(1);
  };

  const rest = () => {
    rotateX.set(0);
    rotateY.set(0);
    glare.set(0);
  };

  return (
    <motion.div
      ref={ref}
      data-layer={layer}
      onClick={onClick}
      onPointerMove={track}
      onPointerLeave={rest}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn("crd", className)}
    >
      <motion.span aria-hidden className="crd-glare" style={{ backgroundImage: light, opacity: glare }} />
      <span aria-hidden className="crd-sheen" />
      {children}
    </motion.div>
  );
}
