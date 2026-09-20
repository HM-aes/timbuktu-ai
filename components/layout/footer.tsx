import BrandMark from "@/components/brand-mark";
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  FOOTER_NAV,
  PRODUCT_ROUTES,
  mailto,
} from "@/lib/site";

const PRODUCTS = [
  { label: "NIS2 Analyzer", href: PRODUCT_ROUTES["nis2-analyzer"] },
  { label: "Lex Legal", href: PRODUCT_ROUTES["lex-legal"] },
  { label: "DocSense", href: PRODUCT_ROUTES.docsense },
  { label: "TankSlim", href: PRODUCT_ROUTES.tankslim },
];

const CONTACT = [
  { label: "Book a call", href: BOOKING_URL },
  { label: "Email us directly", href: mailto("Timbuktu AI Solutions — enquiry") },
  { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
];

function Column({ heading, links }: { heading: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-[15px] font-medium text-foreground">{heading}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="nav-link text-[14px]">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="section relative overflow-hidden">
      <div className="frame">
        <div className="gutter section-block pb-0">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
            <div className="max-w-xs">
              <BrandMark href="/" />
              <p className="cell-body mt-5">
                Secure AI systems — RAG, agents and access control — architected
                and built by one specialist. Online, or fully air-gapped.
              </p>
            </div>
            <Column heading="Site" links={FOOTER_NAV} />
            <Column heading="Products" links={PRODUCTS} />
            <Column heading="Contact" links={CONTACT} />
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-[var(--line)] py-6 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>Timbuktu AI Solutions · KVK-registered, Netherlands · operating from Porto</p>
            <p>Your data stays yours. © {new Date().getFullYear()}</p>
          </div>
        </div>

        <div aria-hidden className="gutter select-none overflow-hidden pt-4">
          <p className="translate-y-[18%] text-center font-display text-[clamp(5rem,20vw,17rem)] font-semibold leading-none tracking-[-0.05em] text-foreground/[0.045]">
            Timbuktu
          </p>
        </div>
      </div>
    </footer>
  );
}
