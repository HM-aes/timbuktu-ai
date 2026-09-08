"use client";

import { motion } from "motion/react";
import Navbar from "./navbar";

// Slow, premium ease — heavy deceleration
const ease = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, ease }}
      className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-md"
    >
      <Navbar />
      <div className="header-glow-line" aria-hidden="true" />
    </motion.header>
  );
}
