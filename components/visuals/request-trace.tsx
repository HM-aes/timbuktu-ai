import type { SecurityLayer } from "@/components/sections/architecture-stage";

/**
 * RequestTrace — one request followed through the four layers.
 *
 * The Application, Model and Data layers are stacked in the order a request
 * meets them, joined by a conduit, all inside the dashed Operations
 * boundary. Each layer names what it is built with, what it checks and the
 * OWASP LLM risk that closes. The audit log at the foot of the boundary is
 * Operations doing its job: one line per hop.
 *
 * Markup only. Layers carry `data-layer` (1 = Application … 4 = Operations)
 * and ArchitectureStage drives them through the custom properties described
 * beside `.trc` in globals.css. With no script the finished, verified state
 * is what renders.
 */

/** The example request. Illustrative, like the product dashboards. */
const ASK = { who: "j.miller · associate", text: "Which clauses cover early termination?" };
const ANSWER = { meta: "4 sources cited", text: "Clauses 14.2 and 14.5 apply. Both passages attached." };

const LOG: { t: string; who: string; msg: string; flag?: string }[] = [
  { t: "09:12:04.112", who: "app", msg: "session verified · schema valid" },
  { t: "09:12:04.139", who: "model", msg: "input screened · no injection" },
  { t: "09:12:04.188", who: "data", msg: "6 passages matched · ", flag: "2 withheld" },
  { t: "09:12:04.731", who: "model", msg: "answer from 4 passages · schema valid" },
  { t: "09:12:04.760", who: "app", msg: "returned · 4 sources cited" },
];

function Node({ className }: { className?: string }) {
  return (
    <span aria-hidden className={className ? `trc-node ${className}` : "trc-node"}>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3.5 8.5 3 3 6-7" />
      </svg>
    </span>
  );
}

function Segment() {
  return (
    <span aria-hidden className="trc-seg">
      <i className="trc-flow" />
      <i className="trc-ret" />
    </span>
  );
}

function LayerBody({ layer }: { layer: SecurityLayer }) {
  return (
    <div className="trc-body">
      <div className="trc-head">
        <span className="trc-n">{layer.n}</span>
        <span className="trc-name">{layer.name}</span>
        <ul className="trc-tools" aria-label="Built with">
          {layer.tools.map((tool) => (
            <li key={tool} className="trc-tool">
              {tool}
            </li>
          ))}
        </ul>
      </div>
      <div className="trc-detail">
        <ul className="trc-checks">
          {layer.checks.map((check) => (
            <li key={check}>{check}</li>
          ))}
        </ul>
        <p className="trc-closes">
          <b>Closes</b>
          {layer.closes.map((risk) => (
            <span key={risk}>{risk}</span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default function RequestTrace({
  layers,
  onSelect,
  onReplay,
}: {
  layers: SecurityLayer[];
  /** Free mode: tapping a layer opens it. */
  onSelect?: (n: number) => void;
  /** Free mode with motion: play the trace again. */
  onReplay?: () => void;
}) {
  const boundary = layers[layers.length - 1];
  const inner = layers.slice(0, -1);
  if (!boundary) return null;
  const boundaryN = Number(boundary.n);

  return (
    <div data-scene="" className="trc" role="group" aria-label="One request traced through the four security layers">
      <div className="trc-frame" data-layer={boundaryN}>
        <div className="trc-ops" onClick={onSelect ? () => onSelect(boundaryN) : undefined}>
          <Node />
          <LayerBody layer={boundary} />
        </div>

        <div className="trc-slot" data-slot="">
          <Node className="trc-origin" />
          <Segment />
          <div className="trc-msgs">
            <div className="trc-ask">
              <p className="trc-kicker">
                <b>Request</b>
                <span>{ASK.who}</span>
              </p>
              <p className="trc-line">{ASK.text}</p>
            </div>
            <div className="trc-answer">
              <p className="trc-kicker">
                <b>Answer</b>
                <span>{ANSWER.meta}</span>
              </p>
              <p className="trc-line">{ANSWER.text}</p>
            </div>
          </div>
        </div>

        {inner.map((layer, i) => {
          const n = Number(layer.n);
          return (
            <div key={layer.n} className="trc-card" data-layer={n} onClick={onSelect ? () => onSelect(n) : undefined}>
              <Node />
              {i < inner.length - 1 ? <Segment /> : null}
              <LayerBody layer={layer} />
            </div>
          );
        })}

        <div className="trc-log">
          <div className="trc-log-head">
            <span>Audit log</span>
            {onReplay ? (
              <button type="button" className="trc-replay" onClick={onReplay}>
                <svg aria-hidden viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 8a5.5 5.5 0 1 0 1.7-4" />
                  <path d="M2.5 2.5v3h3" />
                </svg>
                Replay trace
              </button>
            ) : (
              <span>Example trace</span>
            )}
          </div>
          <ol className="trc-lines">
            {LOG.map((line, i) => (
              <li key={line.t} data-log={i}>
                <time>{line.t}</time>
                <span className="trc-who">{line.who.toUpperCase()}</span>
                <span className="trc-msg">
                  {line.msg}
                  {line.flag ? <em>{line.flag}</em> : null}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
