"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "motion/react";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const blurPx = useTransform(progress, range, [4, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  return (
    <motion.span
      style={{ opacity, filter }}
      className="reveal-word inline-block"
    >
      {children}
    </motion.span>
  );
}

/**
 * Cinematic scroll-reveal heading — words illuminate one by one as the
 * block passes through the viewport.
 *
 * The DOM is identical on server and client regardless of motion
 * preference; `prefers-reduced-motion` is honoured in CSS (`.reveal-word`
 * is forced fully visible in globals.css), which avoids hydration
 * mismatches and unhydrated scroll targets.
 */
export default function ScrollReveal({
  text,
  as = "h2",
  className = "",
}: {
  text: string;
  as?: "h2" | "h3" | "p";
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.45"],
  });

  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`${w}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {w}
          </Word>
        );
      })
        /* Real whitespace between word spans: the browser lays out normal
           inter-word gaps, wraps at them, and the text node reads as
           "Everyone is racing…" for copy, search and screen readers. */
        .flatMap((node, i) => (i === 0 ? [node] : [" ", node]))}
    </Tag>
  );
}
