import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/lenis-provider";
import Header from "@/components/header";
import Footer from "@/components/layout/footer";
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

// Apply the saved theme before paint. Light is the default. Running in <head>
// during parse means "manual" suppresses scroll restoration for THIS load.
const themeScript = `(function(){
  try {
    var dark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  } catch(e) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(plusJakartaSans.variable, jetbrains.variable)}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-background text-foreground font-sans">
        <LenisProvider>
          <Header />
          <main id="top">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
