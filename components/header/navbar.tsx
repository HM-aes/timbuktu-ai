"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import BrandMark from "@/components/brand-mark";
import { BOOKING_URL } from "@/lib/site";

const SECTIONS = [
  { label: "Approach", href: "#philosophy" },
  { label: "Security", href: "#security" },
  { label: "Stack", href: "#stack" },
  { label: "Solutions", href: "#solutions" },
  { label: "Contact", href: "#contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const LOGO_AT   = 0.5;
const NAV_START = 0.85;
const NAV_STEP  = 0.18;
const CTA_AT    = NAV_START + SECTIONS.length * NAV_STEP + 0.2;

const item = (delay: number) => ({
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.0, delay, ease },
});

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Main navbar bar ── */}
      <div className="shell flex h-16 items-center justify-between">

        {/* ── Brand identity badge ── */}
        <BrandMark href="#top" {...item(LOGO_AT)} className="shrink-0" />

        {/* ── Desktop nav links — floating rounded pill ── */}
        <nav
          aria-label="Sections"
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md md:flex"
        >
          {SECTIONS.map((section, i) => (
            <motion.a
              key={section.label}
              href={section.href}
              {...item(NAV_START + i * NAV_STEP)}
              className="rounded-full px-4 py-1.5 text-sm font-light text-white/80 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
            >
              {section.label}
            </motion.a>
          ))}
        </nav>

        {/* ── Right side: CTA + mobile hamburger ── */}
        <motion.div {...item(CTA_AT)} className="flex items-center gap-3 sm:gap-4">
          {/* CTA — hidden on very small screens, shown from sm upward */}
          {/* TODO(placeholder): BOOKING_URL — set real Calendly/Cal.com link in lib/site.ts */}
          <a
            href={BOOKING_URL}
            className="hidden sm:inline-flex btn-glow-primary rounded-lg px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider transition-all hover:scale-105"
          >
            Book a call
          </a>
          {/* Hamburger — md and below */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(v => !v)}
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-lg text-zinc-300 transition-colors hover:text-white"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </div>

      {/* ── Mobile slide-down menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease }}
            className="md:hidden overflow-hidden border-t border-white/[0.06]"
            style={{ background: "rgba(24,24,27,0.97)" }}
          >
            <nav className="flex flex-col gap-1.5 px-4 py-4">
              {SECTIONS.map((section, i) => (
                <motion.a
                  key={section.label}
                  href={section.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease }}
                  onClick={() => setOpen(false)}
                  className="flex items-center rounded-full px-4 py-3 text-sm font-light text-white/80 transition-colors duration-150 hover:bg-white/[0.08] hover:text-white"
                >
                  {section.label}
                </motion.a>
              ))}
              {/* CTA in mobile menu */}
              {/* TODO(placeholder): BOOKING_URL — set real Calendly/Cal.com link in lib/site.ts */}
              <a
                href={BOOKING_URL}
                onClick={() => setOpen(false)}
                className="mt-2 btn-glow-primary flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-wider"
              >
                Book a call
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
