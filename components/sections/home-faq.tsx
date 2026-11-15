import Section from "@/components/layout/section";
import { Reveal } from "@/components/reveal";
import FaqList from "@/components/faq-list";

const FAQ = [
  {
    question: "Do our documents leave our infrastructure?",
    answer:
      "No. Every system runs hosted in the EU inside hard tenant boundaries, or fully air-gapped on hardware you operate. Nothing is used to train a model.",
  },
  {
    question: "Hosted or air-gapped — which do we need?",
    answer:
      "Hosted when you want managed operations and your data can sit in an EU region under contract. Air-gapped when the data cannot leave the building. Both run the same code.",
  },
  {
    question: "What happens on the first call?",
    answer:
      "About thirty minutes with the person who builds the system. Bring the architecture you are planning or the one already in production. You leave knowing whether it is a fit and what the first step would be.",
  },
  {
    question: "How does an engagement run?",
    answer:
      "A short architecture review first, written up in language your stakeholders can follow. Then a fixed-scope build, delivered into your environment with the audit trail and documentation an auditor would ask for.",
  },
];

export default function HomeFaq() {
  return (
    <Section id="faq" className="tone-base">
      <div className="gutter section-block grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-12">
        <Reveal distance={12} className="lg:col-span-4">
          <h2 className="title text-foreground">Before you book</h2>
          <p className="lede mt-4 max-w-[30rem]">The questions every first call starts with.</p>
        </Reveal>
        <Reveal delay={0.1} distance={12} className="lg:col-span-8">
          <FaqList items={FAQ} />
        </Reveal>
      </div>
    </Section>
  );
}
