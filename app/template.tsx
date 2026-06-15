"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const isHome = usePathname() === "/";

  // Home: skip opacity fade — HomeStage's rAF pour-in is the sole reveal.
  // Work pages: fade in so the curtain handoff looks clean.
  if (isHome) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
