import { ShieldAlert } from "lucide-react";
import { CtaButton } from "@/components/shadcn-space/button/button-16";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-6">
      <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-border bg-surface-secondary/50 text-muted-foreground">
        <ShieldAlert className="size-8" />
      </div>
      <h1 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        404
      </h1>
      <p className="mt-4 text-muted-foreground">
        The page you are looking for could not be found.
      </p>
      <div className="mt-8">
        <CtaButton href="/">Return home</CtaButton>
      </div>
    </div>
  );
}
