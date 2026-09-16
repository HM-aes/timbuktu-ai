import Section, { SectionHead } from "@/components/layout/section";
import Panel from "@/components/panel";
import ThreatLedger from "@/components/diagrams/threat-ledger";

const TAGS = ["OWASP LLM Top 10 · 2025", "Threat model first", "Findings written for the board"];

export default function Security() {
  return (
    <Section id="security">
      <SectionHead
        title={
          <>
            Reviewed against the <span className="accent">OWASP Top 10</span> for LLM applications before a line of code is written.
          </>
        }
      >
        <p>
          Most AI projects add a security review at the end, when the only
          options left are a filter here and a warning label there. We start
          with the threat model.
        </p>
      </SectionHead>

      <div className="cells cells-split cells-split-even">
        <div className="cell">
          <div className="lg:sticky lg:top-24">
            <p className="cell-body max-w-[36rem] text-[15.5px]">
              Each of the ten risks OWASP lists for LLM applications gets a
              specific, named control in the architecture, and that control
              decides which library, which database and which hosting model we
              use.
            </p>
            <p className="cell-body mt-4 max-w-[36rem] text-[15.5px]">
              The result is a system whose boundaries can be explained in one
              page to the people who sign it off, and whose findings can be
              handed to an auditor without translation.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <li key={t} className="pill">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="cell cell-media">
          <Panel
            caption="Threat → control"
            status="10 / 10 in place"
            statusTone="verify"
            flush
          >
            <ThreatLedger />
          </Panel>
        </div>
      </div>
    </Section>
  );
}
