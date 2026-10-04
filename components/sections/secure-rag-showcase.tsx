"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import Section from "@/components/layout/section";
import { ChapterLabel } from "@/components/layout/chapter";
import { Reveal } from "@/components/reveal";
import { useScrollScene } from "@/lib/use-scroll-scene";
import { AccessCard, AnswerCard, AuditCard, IngestCard } from "@/components/sections/secure-rag/cards";

const STEPS: { title: string; body: string; card: ReactNode }[] = [
  {
    title: "Ingest privately",
    body: "Documents are encrypted, classified and indexed inside your own environment. Nothing goes to a third party.",
    card: <IngestCard />,
  },
  {
    title: "Check access first",
    body: "Before anything is retrieved, every candidate document is checked against the person asking.",
    card: <AccessCard />,
  },
  {
    title: "Answer with sources",
    body: "The model answers only from what that person may read, and cites the passage behind every claim.",
    card: <AnswerCard />,
  },
  {
    title: "Record everything",
    body: "Each question, decision and answer is written to a tamper-evident audit trail your auditors can export.",
    card: <AuditCard />,
  },
];

/**
 * One question followed through a secure RAG pipeline. On large screens the
 * stage pins and each dashboard slides up over the last while the step list
 * tracks progress; elsewhere, or with reduced motion, the cards simply stack
 * in reading order with their own captions.
 */
export default function SecureRagShowcase() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollScene(
    ref,
    (el) => {
      const pin = el.querySelector<HTMLElement>("[data-rag-pin]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-rag-card]", el);
      const dims = gsap.utils.toArray<HTMLElement>("[data-rag-dim]", el);
      const steps = gsap.utils.toArray<HTMLElement>("[data-rag-step]", el);
      const bar = el.querySelector<HTMLElement>("[data-rag-bar]");
      if (!pin || !bar || cards.length < 2) return;

      el.classList.add("is-stacked");
      const last = cards.length - 1;
      let active = -1;
      const setActive = (i: number) => {
        if (i === active) return;
        active = i;
        steps.forEach((s, j) => s.classList.toggle("is-active", j === i));
      };
      setActive(0);

      gsap.set(cards.slice(1), { y: () => window.innerHeight });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${window.innerHeight * last * 0.95}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.min(last, Math.round(self.progress * last))),
        },
      });

      tl.fromTo(bar, { scaleY: 1 / cards.length }, { scaleY: 1, duration: last }, 0);
      cards.slice(1).forEach((card, i) => {
        tl.fromTo(
          card,
          { y: () => window.innerHeight, clipPath: "inset(0% 0% 0% 0% round 40px)" },
          { y: 0, clipPath: "inset(0% 0% 0% 0% round 14px)", duration: 1, ease: "power1.out" },
          i,
        )
          .to(cards[i], { scale: 0.93, yPercent: -3, duration: 1 }, i)
          .to(dims[i], { opacity: 0.6, duration: 1 }, i);
      });

      return () => el.classList.remove("is-stacked");
    },
    "(min-width: 1024px)",
  );

  return (
    <Section id="secure-rag" chapter className="tone-raised">
      <div ref={ref} className="rag">
        <div className="gutter pt-[var(--space-section-y)] md:pt-[var(--space-section-y-md)] lg:pt-[var(--space-section-y-lg)]">
          <Reveal distance={10}>
            <ChapterLabel number="03" label="Secure RAG" />
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-x-12">
            <Reveal delay={0.08} distance={24} className="lg:col-span-7">
              <h2 className="display max-w-[14ch] text-foreground">
                Every answer, <span className="accent">earned.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2} distance={14} className="lg:col-span-5 lg:pb-2">
              <p className="lede max-w-[36rem]">
                What happens between a question and an answer you can trust. Follow one query through a private,
                permission-aware retrieval pipeline.
              </p>
            </Reveal>
          </div>
        </div>

        <div data-rag-pin className="rag-pin gutter">
          <div className="rag-layout">
            <div className="rag-steps">
              <span className="rag-progress" aria-hidden>
                <span data-rag-bar className="rag-progress-bar" />
              </span>
              <ol>
                {STEPS.map((s, i) => (
                  <li key={s.title} data-rag-step className="rag-step">
                    <span className="rag-step-number">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="rag-step-title">{s.title}</span>
                      <span className="rag-step-reveal">
                        <span className="rag-step-body">{s.body}</span>
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rag-stack">
              {STEPS.map((s, i) => (
                <div key={s.title} data-rag-card className="rag-card" style={{ zIndex: i + 1 }}>
                  <div className="rag-caption">
                    <ChapterLabel number={String(i + 1).padStart(2, "0")} label={s.title} />
                    <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-foreground/80">{s.body}</p>
                  </div>
                  <div className="relative">
                    {s.card}
                    <span data-rag-dim aria-hidden className="rag-card-dim" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
