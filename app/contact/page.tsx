import type { Metadata } from "next";
import Contact from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact — book a call | Timbuktu AI",
  description:
    "Book a short call or email Timbuktu AI directly. Talk to the person who designs and builds the system.",
};

export default function ContactPage() {
  return <Contact />;
}
