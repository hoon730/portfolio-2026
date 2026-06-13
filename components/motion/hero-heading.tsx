"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

const lines = ["제품을 운영까지", "책임지는 프론트엔드"];

export function HeroHeading() {
  return (
    <h1 className="w-full origin-left text-[clamp(3rem,13vw,11rem)] font-black leading-[0.88] tracking-tight md:-rotate-2">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.05em]">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.15 + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
