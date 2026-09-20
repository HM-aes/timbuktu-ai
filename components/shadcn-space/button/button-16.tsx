"use client";

import * as React from "react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

const ctaShellClass =
  "relative h-auto cursor-pointer overflow-hidden rounded-full border border-border px-6 py-3 transition-all duration-300 hover:bg-transparent hover:text-inherit";

const ctaLabelClass =
  "relative z-10 flex items-center justify-center gap-2 transition-colors duration-500 group-hover:text-primary-foreground [&_svg[data-arrow]]:transition-transform group-hover:[&_svg[data-arrow]]:translate-x-0.5";

export type CtaButtonProps = {
  href?: string;
  className?: string;
  children: React.ReactNode;
  size?: "default" | "sm";
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children">;

export function CtaButton({
  href,
  className,
  children,
  size = "default",
  onMouseEnter,
  ...rest
}: CtaButtonProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const surfaceRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduced = useReducedMotionSafe();

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    if (surfaceRef.current) {
      const rect = surfaceRef.current.getBoundingClientRect();
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    onMouseEnter?.(e as React.MouseEvent<HTMLButtonElement>);
  };

  const shellClass = cn(
    ctaShellClass,
    size === "sm" && "px-4 py-2 text-sm",
    className
  );

  const ripple = !reduced && (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute size-10 scale-0 rounded-full bg-primary transition-transform duration-700 ease-in-out group-hover:scale-[15]"
      )}
      style={{
        left: pos.x - 20,
        top: pos.y - 20,
      }}
    />
  );

  const label = <span className={ctaLabelClass}>{children}</span>;

  if (href) {
    const anchorRest = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Button asChild variant="outline" className={cn(shellClass, "group")}>
        <a
          ref={surfaceRef}
          href={href}
          onMouseEnter={handleMouseEnter}
          {...anchorRest}
        >
          {ripple}
          {label}
        </a>
      </Button>
    );
  }

  return (
    <Button
      ref={surfaceRef}
      variant="outline"
      onMouseEnter={handleMouseEnter}
      className={cn(shellClass, "group")}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {ripple}
      {label}
    </Button>
  );
}

const ButtonDemo = () => <CtaButton>Get Started</CtaButton>;

export default ButtonDemo;
