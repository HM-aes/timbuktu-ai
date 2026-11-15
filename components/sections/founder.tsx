import { ArrowUpRight, Check } from "lucide-react";
import Section from "@/components/layout/section";
import { ChapterLabel } from "@/components/layout/chapter";
import { Reveal } from "@/components/reveal";
import { APPROACH_URL, CONTACT_EMAIL, FOUNDER } from "@/lib/site";

const FACTS = [
  "Architecture, code and deployment by the same person — no handoff between the call and the build.",
  "Django, Pydantic, Qdrant and scikit-learn in production; hosted inside hard boundaries or fully air-gapped.",
  "Every system reviewed against the OWASP Top 10 for LLM applications before it is built.",
  "KVK-registered in the Netherlands, operating from Porto.",
];

/**
 * Who builds it. The site keeps saying "one specialist"; this is where that
 * specialist is named, so a buyer knows who they are booking a call with.
 */
export default function Founder() {
  const links = [
    { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    FOUNDER.linkedin ? { label: "LinkedIn", href: FOUNDER.linkedin } : null,
    FOUNDER.github ? { label: "GitHub", href: FOUNDER.github } : null,
  ].filter((l): l is { label: string; href: string } => Boolean(l));

  return (
    <Section id="founder" chapter className="tone-raised">
      <div className="gutter pb-[var(--space-section-y)] pt-[var(--space-section-y)] md:pb-[var(--space-section-y-md)] md:pt-[var(--space-section-y-md)] lg:pb-[var(--space-section-y-lg)] lg:pt-[var(--space-section-y-lg)]">
        <Reveal distance={10}>
          <ChapterLabel number="03" label="Who builds it" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-x-12">
          <Reveal delay={0.08} distance={24} className="lg:col-span-7">
            <h2 className="display max-w-[16ch] text-foreground">
              One specialist, from <span className="accent">architecture to production.</span>
            </h2>
            <p className="lede mt-6 max-w-[36rem]">
              {FOUNDER.name} designs and builds every system Timbuktu AI ships: the retrieval pipeline, the
              access control, the deployment and the security review. The person on the first call is the
              person who writes the code.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="nav-link inline-flex items-center gap-1.5 text-[15px]"
                  rel={l.href.startsWith("http") ? "me noopener" : undefined}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                >
                  {l.label}
                  <ArrowUpRight size={14} aria-hidden />
                </a>
              ))}
              <a href={APPROACH_URL} className="nav-link inline-flex items-center gap-1.5 text-[15px]">
                How the work is done
                <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.18} distance={16} className="lg:col-span-5">
            <div className="rounded-[var(--radius-panel)] border border-[var(--line)] bg-surface p-6 sm:p-7">
              <p className="text-[1.125rem] font-medium tracking-tight text-foreground">{FOUNDER.name}</p>
              <p className="mt-1 text-[14px] text-muted-foreground">{FOUNDER.role}</p>
              <ul className="mt-6 space-y-4">
                {FACTS.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-verify/50 text-verify">
                      <Check size={11} strokeWidth={2.75} />
                    </span>
                    <span className="cell-body text-[14.5px] leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
