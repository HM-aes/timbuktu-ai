import Section, { SectionHead } from "@/components/layout/section";
import ScrollReveal from "@/components/scroll-reveal";
import Panel from "@/components/panel";
import BoundaryDiagram from "@/components/diagrams/boundary";

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

export default function Philosophy() {
  return (
    <Section id="philosophy">
      <SectionHead
        title={
          <>
            Everyone is racing to add AI. Almost no one is <span className="accent">securing it.</span>
          </>
        }
      >
        <p>
          Models, agents and connectors like MCP are wired into production
          systems every week, with sensitive data passing straight through them.
          The security review, when it comes, arrives after the architecture is
          already set.
        </p>
      </SectionHead>

      {/* Diagram + principles: media cell left, three stacked rows right */}
      <div className="cells cells-split">
        <div className="cell cell-media">
          <Panel
            caption="How a request is governed"
            status="live"
            grid
            flush
            bodyClassName="p-5 sm:p-8 lg:p-10"
          >
            <BoundaryDiagram />
          </Panel>
        </div>
        <div className="cell p-0">
          <div className="cell border-r-0">
            <p className="cell-body max-w-[36rem] text-[15.5px]">
              By then the choices are narrow. A system that touches your
              documents, your compliance data or your clients&apos; files needs
              its boundaries drawn at design time, while you can still govern
              where data moves, where it rests, and who can reach it.
            </p>
            <p className="mt-4 max-w-[36rem] text-[15.5px] leading-[1.65] text-foreground/90">
              That is how Timbuktu AI Solutions builds. Every system keeps your
              data under your control: hosted inside hard boundaries, or fully
              air-gapped on your own infrastructure when the work demands it. No
              data sold, no data shared, nothing to explain to a board later.
            </p>
          </div>
          {POINTS.map((p) => (
            <div key={p.title} className="cell border-r-0 py-6 last:border-b-0 lg:py-7">
              <h3 className="cell-title text-foreground">{p.title}</h3>
              <p className="cell-body mt-2">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Statement */}
      <div className="bg-dots border-t border-[var(--line)]">
        <div className="gutter section-block mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <ScrollReveal
            as="p"
            text="Making AI capable is the easy half. Making it something you can put in front of an auditor is the half you design in from the start."
            className="statement text-foreground"
          />
        </div>
      </div>
    </Section>
  );
}
