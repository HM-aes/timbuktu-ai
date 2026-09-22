"use client";

import { useRef } from "react";
import gsap from "gsap";
import { motion } from "motion/react";
import SecureCore from "@/components/visuals/secure-core";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";
import { useScrollScene } from "@/lib/use-scroll-scene";
import { useStageActivity } from "@/lib/use-stage-activity";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The Secure AI stage. Motion enters the object once (Framer); GSAP then
 * scrubs it against scroll: the layers draw apart and the scene turns a few
 * degrees as the section passes, like an exploded view settling open.
 */
export default function SecureAiStage() {
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  useStageActivity(stage);

  useScrollScene(stage, (root) => {
    const trigger = { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.8 };
    gsap.fromTo(
      root.querySelector("[data-scene]"),
      { "--spread": 0.7, "--rz": "-50deg" },
      { "--spread": 1.3, "--rz": "-35deg", ease: "none", scrollTrigger: trigger },
    );
    gsap.fromTo(
      root.querySelector("[data-parallax]"),
      { yPercent: 7 },
      { yPercent: -7, ease: "none", scrollTrigger: trigger },
    );
  });

  return (
    <div
      ref={stage}
      className="iso-stage stage-object aspect-[5/4] border-t border-[var(--line)] sm:aspect-[16/10] lg:aspect-[16/7]"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, y: 36, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={reduced ? INSTANT : { duration: 1.2, delay: 0.15, ease }}
      >
        <div data-parallax className="iso-root [--iso-unit:2cqw] sm:[--iso-unit:1.2cqw] lg:[--iso-unit:1.05cqw]">
          <SecureCore className="translate-y-[12%]" />
        </div>
      </motion.div>
    </div>
  );
}
