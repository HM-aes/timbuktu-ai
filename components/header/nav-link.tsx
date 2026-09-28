"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function HeaderNavLink({
  href,
  children,
  matchPrefix,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  matchPrefix?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active =
    matchPrefix && href !== "/"
      ? pathname === href || pathname.startsWith(`${href}/`)
      : pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn("nav-link whitespace-nowrap", active && "is-active", className)}
    >
      {children}
    </Link>
  );
}
