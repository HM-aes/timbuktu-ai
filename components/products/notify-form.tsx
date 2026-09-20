"use client";

import { useId, useState } from "react";
import { CtaButton } from "@/components/shadcn-space/button/button-16";
import { CONTACT_EMAIL, mailto } from "@/lib/site";

export default function NotifyForm() {
  const id = useId();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = "TankSlim — notify me at launch";
    const body = email.trim()
      ? `Please notify me at launch: ${email.trim()}`
      : "Please notify me when TankSlim launches.";
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor={`${id}-email`} className="label normal-case tracking-[0.06em]">
          Email for launch updates
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="mt-2 h-[var(--control-h)] w-full max-w-md rounded-[var(--radius-control)] border border-[var(--line)] bg-background/60 px-4 text-[15px] text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        />
      </div>
      <CtaButton type="submit">Get notified</CtaButton>
      <p className="cell-body text-[13px]">
        Opens your email client to {CONTACT_EMAIL}. Or{" "}
        <a href={mailto("TankSlim — notify me at launch")} className="text-foreground underline-offset-2 hover:underline">
          email us directly
        </a>
        .
      </p>
    </form>
  );
}
