"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import BrandMark from "@/components/brand-mark";
import { ProductsNavDesktop, ProductsNavMobile } from "@/components/header/products-nav";
import { CtaButton } from "@/components/shadcn-space/button/button-16";
import { BOOKING_URL, HOME_URL, MAIN_NAV } from "@/lib/site";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (!open) setProductsOpen(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const closeMobile = () => setOpen(false);

  return (
    <>
      <div className="frame border-0">
        <div className="gutter flex h-20 items-center justify-between gap-6">
          <BrandMark href={HOME_URL} className="shrink-0" />

          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex lg:gap-8">
            <Link href={HOME_URL} className="nav-link">
              Home
            </Link>
            <ProductsNavDesktop />
            {MAIN_NAV.filter((item) => item.label !== "Home").map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <CtaButton href={BOOKING_URL} size="sm" className="hidden sm:inline-flex">
              Book a call
            </CtaButton>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-[var(--radius-control)] border border-[var(--line)] text-foreground transition-colors hover:bg-foreground/5 md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={reduced ? INSTANT : { duration: 0.3, ease }}
            className="overflow-hidden border-t border-[var(--line)] bg-background md:hidden"
          >
            <nav aria-label="Primary" className="frame border-0">
              <ul className="gutter flex flex-col py-3">
                <li className="border-b border-[var(--line)]">
                  <Link
                    href={HOME_URL}
                    onClick={closeMobile}
                    className="flex h-12 items-center text-[15px] text-foreground"
                  >
                    Home
                  </Link>
                </li>
                <ProductsNavMobile
                  open={productsOpen}
                  onToggle={() => setProductsOpen((v) => !v)}
                  onNavigate={closeMobile}
                />
                {MAIN_NAV.filter((item) => item.label !== "Home").map((item) => (
                  <li key={item.href} className="border-b border-[var(--line)] last:border-b-0">
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      className="flex h-12 items-center text-[15px] text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-4 pb-2">
                  <CtaButton href={BOOKING_URL} onClick={closeMobile} className="w-full">
                    Book a call
                  </CtaButton>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
