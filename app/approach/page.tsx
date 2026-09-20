import type { Metadata } from "next";
import Philosophy from "@/components/sections/philosophy";
import Security from "@/components/sections/security";
import PythonStack from "@/components/sections/python-stack";
import Stack from "@/components/sections/stack";
import Process from "@/components/sections/process";
import Contact from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Approach — how we design and build secure AI | Timbuktu AI",
  description:
    "Engineering philosophy, OWASP LLM review, Python stack choices, and agent security controls — how Timbuktu AI systems are architected before the first commit.",
};

export default function ApproachPage() {
  return (
    <>
      <Philosophy />
      <Security />
      <PythonStack />
      <Stack />
      <Process />
      <Contact />
    </>
  );
}
