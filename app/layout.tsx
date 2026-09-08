import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "@heroui/styles";
import "./theme-light.css";
import "./theme-dark.css";
import "./globals.css";
import LenisProvider from "@/components/lenis-provider";
import Header from "@/components/header";
import { cn } from "@/lib/utils";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Timbuktu AI Solutions — Secure AI systems, architected from the first commit",
  description:
    "Timbuktu AI Solutions designs and builds secure AI systems — RAG, agents, and access control that run in production, hosted with hard boundaries or fully air-gapped on your own infrastructure.",
};

// Force dark mode always, and always start a fresh load at the top.
// Running in <head> during parse means "manual" suppresses the browser's
// scroll restoration for THIS load, not just the next one.
const themeScript = `(function(){
  try {
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  } catch(e) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn("dark", plusJakartaSans.variable, jetbrains.variable)}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-background bg-grid-dots text-foreground font-sans">
        <LenisProvider>
          <Header />
          <main id="top">{children}</main>
          <footer className="border-t border-white/[.08] py-10">
            <div className="shell flex flex-col gap-3 text-[12.5px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>
                Timbuktu AI Solutions · KVK-registered, Netherlands · operating
                from Porto
              </p>
              <p className="text-foreground/50">
                Your data stays yours. © {new Date().getFullYear()}
              </p>
            </div>
          </footer>
        </LenisProvider>
      </body>
    </html>
  );
}
