"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  /** 인라인 텍스트면 span, 블록이면 div */
  as?: "span" | "div";
}

/**
 * 마스크 슬라이드 reveal — 부모가 자식을 overflow-hidden으로 가리고,
 * 자식이 아래(110%)에서 0으로 묵직하게 슬라이드해 "닦이듯" 등장.
 * vanholtz의 핵심 등장 패턴.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.9,
  className,
  as = "div",
}: RevealProps) {
  const Wrapper = as === "span" ? motion.span : motion.div;
  const Inner = as === "span" ? motion.span : motion.div;

  return (
    <Wrapper className={`${as === "span" ? "inline-block" : "block"} overflow-hidden ${className ?? ""}`}>
      <Inner
        className={as === "span" ? "inline-block" : "block"}
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration, ease: EASE_OUT_EXPO, delay }}
      >
        {children}
      </Inner>
    </Wrapper>
  );
}
