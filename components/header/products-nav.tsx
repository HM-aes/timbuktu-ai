"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { PRODUCTS, productHref } from "@/lib/products";
import { PRODUCTS_INDEX } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe, INSTANT } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type ProductsNavProps = {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function ProductsNavDesktop({ onNavigate }: { onNavigate?: () => void }) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotionSafe();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, close]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  return (
    <div ref={rootRef} className="relative" onKeyDown={onKeyDown}>
      <div className="flex items-center gap-0.5">
        <Link href={PRODUCTS_INDEX} className="nav-link" onClick={onNavigate}>
          Products
        </Link>
        <button
          type="button"
          className="grid size-8 place-items-center rounded-[var(--radius-control)] text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls={menuId}
          aria-label={open ? "Close products menu" : "Open products menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <ChevronDown
            size={16}
            className={cn("transition-transform duration-200", open && "rotate-180")}
            aria-hidden
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Products"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 4 }}
            transition={reduced ? INSTANT : { duration: 0.22, ease }}
            className="absolute left-0 top-[calc(100%+0.35rem)] z-50 w-[min(100vw-2rem,22rem)] rounded-[var(--radius-panel)] border border-[var(--line)] bg-background p-1.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.65)]"
          >
            {PRODUCTS.map((p) => (
              <Link
                key={p.slug}
                href={productHref(p.slug)}
                role="menuitem"
                className="block rounded-[var(--radius-control)] px-3 py-2.5 transition-colors hover:bg-foreground/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                onClick={() => {
                  close();
                  onNavigate?.();
                }}
              >
                <span className="block text-[15px] font-medium text-foreground">{p.name}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
                  {p.promise}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProductsNavMobile({
  open,
  onToggle,
  onNavigate,
}: {
  open: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}) {
  return (
    <li className="border-b border-[var(--line)]">
      <button
        type="button"
        className="flex h-12 w-full items-center justify-between text-[15px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/60"
        aria-expanded={open}
        onClick={onToggle}
      >
        Products
        <ChevronDown
          size={16}
          className={cn("text-muted-foreground transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open && (
        <ul className="border-t border-[var(--line)] pb-2">
          <li>
            <Link
              href={PRODUCTS_INDEX}
              onClick={onNavigate}
              className="flex min-h-11 items-center px-3 text-[14px] text-muted-foreground hover:text-foreground"
            >
              All products
            </Link>
          </li>
          {PRODUCTS.map((p) => (
            <li key={p.slug}>
              <Link
                href={productHref(p.slug)}
                onClick={onNavigate}
                className="block px-3 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/60"
              >
                <span className="block text-[14px] font-medium text-foreground">{p.name}</span>
                <span className="mt-0.5 block text-[13px] text-muted-foreground">{p.promise}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function ProductsNav(props: ProductsNavProps) {
  if (props.variant === "desktop") {
    return <ProductsNavDesktop onNavigate={props.onNavigate} />;
  }
  return null;
}
