"use client";

import { motion } from "motion/react";
import SectionRule from "@/components/section-rule";
import ScrollReveal from "@/components/scroll-reveal";
import Panel from "@/components/panel";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* Perimeter diagram — reads left to right, then down:
   ungoverned input converges on one governed gate, is admitted into your
   boundary where the model / agent / MCP run, and can also stand fully
   detached as an air-gapped deployment. Labels track the paragraph beside
   it. Ambient SVG language of the Solutions tiles; SMIL gated on reduced. */
function BoundaryMotif({ reduced }: { reduced: boolean }) {
  const label = {
    fontFamily:
      "var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif",
    fontSize: 9.5,
    fontWeight: 500,
    letterSpacing: "0.12em",
  } as const;

  return (
    <svg
      viewBox="0 0 300 332"
      fill="none"
      className="h-full w-full text-foreground/[0.5] transition-colors duration-500 group-hover/card:text-foreground/[0.62]"
      aria-hidden
    >
      {/* ungoverned input — dashed streams converging on the gate */}
      <text x="6" y="70" fill="var(--muted-foreground)" style={label}>
        UNGOVERNED INPUT
      </text>
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {[92, 126, 160, 194].map((y, i) => (
          <path key={y} d={`M0 ${y} L112 150`} strokeDasharray="5 7">
            {!reduced && (
              <animate
                attributeName="stroke-dashoffset"
                from="24"
                to="0"
                dur={`${1.05 + i * 0.18}s`}
                repeatCount="indefinite"
              />
            )}
          </path>
        ))}
      </g>

      {/* one governed gate */}
      <text x="52" y="132" fill="var(--signal)" style={label}>
        ONE GATE
      </text>
      <circle cx="112" cy="150" r="5" fill="var(--signal)" />
      <path d="M112 150 H150" stroke="var(--signal)" strokeWidth="2" />
      {!reduced && (
        <circle r="2.6" fill="var(--signal)">
          <animate
            attributeName="cx"
            from="114"
            to="148"
            dur="1.9s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            from="150"
            to="150"
            dur="1.9s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="1.9s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* your boundary */}
      <text x="150" y="92" fill="var(--signal)" style={label}>
        YOUR BOUNDARY
      </text>
      <rect
        x="150"
        y="104"
        width="140"
        height="120"
        rx="18"
        stroke="var(--signal)"
        strokeWidth="2"
      />

      {/* the system within — model / agent / MCP */}
      <g stroke="currentColor" strokeWidth="2">
        <path d="M186 140 L254 140 M186 140 L220 172 M254 140 L220 172" />
      </g>
      {[
        { cx: 186, cy: 140, t: "model", tx: 186, ty: 126 },
        { cx: 254, cy: 140, t: "agent", tx: 254, ty: 126 },
      ].map((n, i) => (
        <g key={n.t}>
          <circle
            cx={n.cx}
            cy={n.cy}
            r="8"
            stroke="currentColor"
            strokeWidth="2"
            style={
              reduced
                ? undefined
                : {
                    animation: `bento-node-pulse 2.8s ease-in-out ${i * 0.6}s infinite`,
                  }
            }
          />
          <text
            x={n.tx}
            y={n.ty}
            fill="var(--muted-foreground)"
            textAnchor="middle"
            style={{ ...label, fontSize: 8.5, letterSpacing: "0.06em" }}
          >
            {n.t}
          </text>
        </g>
      ))}
      <rect
        x="206"
        y="170"
        width="28"
        height="22"
        rx="4"
        stroke="var(--signal)"
        strokeWidth="2"
      />
      <text
        x="220"
        y="212"
        fill="var(--muted-foreground)"
        textAnchor="middle"
        style={{ ...label, fontSize: 8.5, letterSpacing: "0.06em" }}
      >
        MCP
      </text>

      {/* air-gapped — a deliberate, marked break */}
      <path d="M240 224 V246" stroke="currentColor" strokeWidth="2" />
      <path
        d="M231 251 H249 M231 257 H249"
        stroke="var(--signal)"
        strokeWidth="1.5"
        opacity="0.85"
      />
      <path d="M240 262 V282" stroke="currentColor" strokeWidth="2" />
      <circle cx="240" cy="296" r="11" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="240" cy="296" r="3.5" fill="currentColor" fillOpacity="0.55" />
      <text
        x="240"
        y="324"
        fill="var(--signal)"
        textAnchor="middle"
        style={label}
      >
        AIR-GAPPED
      </text>
    </svg>
  );
}

const POINTS = [
  {
    title: "Secure by design",
    body: "The boundaries are drawn before the first line of code — where they still shape how data moves — not audited in afterward.",
  },
  {
    title: "Your data stays yours",
    body: "Hosted with hard boundaries, or fully air-gapped on your own hardware. It never leaves your control.",
  },
  {
    title: "Built to be understood",
    body: "Every system explained in the language of the people who approve it, not only the engineers who build it.",
  },
];

function Move({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotionSafe();
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={reduced ? { opacity: 1, y: 0 } : undefined}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={reduced ? INSTANT : { duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Philosophy() {
  // SMIL <animate> children are conditional; the safe hook keeps server and
  // first client render identical, then honours the preference after mount.
  const reduced = useReducedMotionSafe();

  return (
    <section id="philosophy" className="relative overflow-hidden">
      {/* Ambient aurora */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-[10%] top-[20%] h-[26rem] w-[26rem] rounded-full bg-amber-500/[.06] blur-[130px]"
          style={{ animation: "bento-aurora-a 26s ease-in-out infinite" }}
        />
      </div>

      <SectionRule index="01" label="Approach" />

      <div className="shell pb-24 sm:pb-28">
        <div className="split">
          <div>
            <ScrollReveal
              text="Everyone is racing to add AI. Almost no one is securing it."
              className="font-display text-[1.9rem] font-medium leading-[1.15] tracking-[-0.015em] text-foreground sm:text-4xl lg:text-[2.6rem]"
            />

            <div className="measure-wide mt-8 space-y-5 text-base leading-[1.75] text-muted-foreground">
              <p>
                Models, agents and connectors like MCP are wired into
                production systems every week, with sensitive data passing
                straight through them. The security review, when it comes,
                arrives after the architecture is already set.
              </p>
              <p>
                By then the choices are narrow. A system that touches your
                documents, your compliance data or your clients&apos; files
                needs its boundaries drawn at design time, while you can still
                govern where data moves, where it rests, and who can reach it.
              </p>
              <p className="text-foreground/90">
                That is how Timbuktu AI Solutions builds. Every system keeps
                your data under your control: hosted inside hard boundaries, or
                fully air-gapped on your own infrastructure when the work
                demands it. No data sold, no data shared, nothing to explain to
                a board later.
              </p>
            </div>
          </div>

          <Panel
            caption="Boundary"
            status="one gate · your perimeter · air-gap option"
            grid
            delay={0.1}
            bodyClassName="p-6 sm:p-8"
          >
            <div aria-hidden className="mx-auto w-full max-w-[22rem] lg:max-w-none">
              <BoundaryMotif reduced={reduced} />
            </div>
          </Panel>
        </div>

        {/* Pull-quote */}
        <Move delay={0.05} y={28} className="mt-20 max-w-3xl">
          <div aria-hidden className="h-px w-12 bg-amber-400/70" />
          <p className="mt-5 font-display text-xl font-normal leading-snug text-foreground/90 sm:text-2xl lg:text-[1.7rem]">
            Making AI capable is the easy half. Making it something you can put
            in front of an auditor is the half you design in from the start.
          </p>
        </Move>

        {/* Principles */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {POINTS.map((p, i) => (
            <Panel key={p.title} delay={i * 0.08} y={20} bodyClassName="p-6 sm:p-7">
              <span aria-hidden className="block h-px w-8 bg-amber-400/80" />
              <h3 className="mt-5 font-display text-[17px] font-medium text-foreground">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
