"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  /** distance to travel up, px */
  y?: number;
}

/**
 * Scroll-reveal wrapper mirroring vanholtz's `.reveal` modules:
 * starts opacity 0 + translateY, animates in once when it enters the viewport.
 */
export function Reveal({ children, className, style, delay = 0, y = 80 }: RevealProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}
