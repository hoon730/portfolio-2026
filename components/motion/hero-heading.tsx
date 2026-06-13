"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const word = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const lines = ["제품을 운영까지", "책임지는 프론트엔드"];

export function HeroHeading() {
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full origin-left text-[clamp(3rem,13vw,11rem)] font-black leading-[0.88] tracking-tight md:-rotate-2"
    >
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          {line.split(" ").map((w, wi) => (
            <motion.span key={wi} variants={word} className="inline-block">
              {w}
              {wi < line.split(" ").length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
