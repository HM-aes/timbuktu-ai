"use client";

import { motion, useReducedMotion } from "motion/react";
import SectionRule from "@/components/section-rule";
import ScrollReveal from "@/components/scroll-reveal";

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
      className="h-full w-full text-foreground/[0.42] transition-colors duration-500 group-hover/card:text-foreground/[0.55]"
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

function glowMove(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--bx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--by", `${e.clientY - r.top}px`);
}

function Move({
  children,
  delay = 0,
  x = 0,
  y = 24,
  className = "",
  glow = false,
}: {
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  className?: string;
  glow?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      onMouseMove={glow ? glowMove : undefined}
      initial={reduced ? false : { opacity: 0, x, y }}
      whileInView={reduced ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Philosophy() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden border-t border-foreground/10 py-6"
    >
      {/* Ambient aurora */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-[10%] top-[20%] h-[26rem] w-[26rem] rounded-full bg-amber-500/[.06] blur-[130px]"
          style={{ animation: "bento-aurora-a 26s ease-in-out infinite" }}
        />
      </div>

      <SectionRule label="APPROACH" align="left" />

      <div className="px-6 pb-24 sm:px-10 lg:px-16">
        <Move
          delay={0.1}
          x={-40}
          y={0}
          glow
          className="bento-tile group/card glass-card-hover grid w-full gap-10 rounded-3xl border border-white/[.08] bg-[color-mix(in_srgb,var(--surface)_68%,transparent)] p-8 backdrop-blur-md sm:p-10 lg:p-14 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-14 lg:gap-20"
        >
          <div>
            <ScrollReveal
              text="Everyone is racing to add AI. Almost no one is securing it."
              className="font-display text-2xl font-medium leading-[1.2] tracking-tight text-foreground sm:text-3xl lg:text-[2.3rem]"
            />

            <div aria-hidden className="mt-7 h-px w-12 bg-amber-400/70" />

            <div className="mt-7 max-w-[40rem] space-y-4 text-base leading-[1.7] text-muted-foreground">
              <p>
                Models, agents, and connectors like MCP are wired into
                production systems every week — with sensitive data passing
                straight through them. The security review, when it comes,
                arrives after the architecture is already set.
              </p>
              <p>
                By then the choices are narrow. A system that touches your
                documents, your compliance data, or your clients&apos; files
                needs its boundaries drawn at design time — while you can still
                govern where data moves, where it rests, and who can reach it.
              </p>
              <p className="text-foreground/90">
                That&apos;s how AES builds. Every system keeps your data under
                your control: hosted with hard boundaries, or fully air-gapped
                on your own infrastructure when the work demands it. No data
                sold, no data shared, nothing to explain to a board later.
              </p>
            </div>
          </div>

          <div
            aria-hidden
            className="mx-auto w-full max-w-[21rem] md:max-w-none"
          >
            <BoundaryMotif reduced={reduced} />
          </div>
        </Move>

        {/* Pull-quote */}
        <Move delay={0.05} y={28} className="mt-16 max-w-3xl">
          <div aria-hidden className="h-px w-12 bg-amber-400/70" />
          <p className="mt-5 font-display text-xl font-medium leading-snug text-foreground/90 sm:text-2xl lg:text-[1.75rem]">
            Making AI capable is the easy half. Making it something you can put
            in front of an auditor is the half you design in from the start.
          </p>
        </Move>

        {/* Supporting points */}
        <div className="mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
          {POINTS.map((p, i) => (
            <Move
              key={p.title}
              delay={i * 0.08}
              y={20}
              glow
              className="bento-tile group/card rounded-2xl border border-white/[.08] bg-[color-mix(in_srgb,var(--surface)_78%,transparent)] p-6 backdrop-blur-md"
            >
              <span aria-hidden className="block size-1.5 rounded-full bg-amber-400" />
              <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </Move>
          ))}
        </div>
      </div>
    </section>
  );
}
