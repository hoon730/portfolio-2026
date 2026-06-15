"use client";

import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

const SKILLS = [
  "React", "TypeScript", "Next.js", "Tailwind",
  "Zustand", "Supabase", "Babylon.js", "PWA",
];

interface AboutDrawerProps {
  open: boolean;
  onClose: () => void;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        exit={{ y: "105%" }}
        transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

export function AboutDrawer({ open, onClose }: AboutDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ background: "var(--color-background)", color: "var(--color-foreground)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Close — top right, same style as back button */}
          <motion.button
            aria-label="닫기"
            onClick={onClose}
            className="fixed z-10 flex items-center justify-center rounded-full"
            style={{
              top: "5vh",
              right: "3.75rem",
              width: "2.75rem",
              height: "2.75rem",
              border: "1.5px solid var(--color-foreground)",
              color: "var(--color-foreground)",
              background: "transparent",
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: 0.1 }}
          >
            <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>←</span>
          </motion.button>

          {/* Content — centered, max-width, vertically padded */}
          <div
            style={{
              maxWidth: "720px",
              margin: "0 auto",
              padding: "12vh 2rem 8vh",
            }}
          >
            {/* Heading */}
            <h2
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "2.5rem",
              }}
            >
              <Reveal delay={0.08}>제품을 운영까지</Reveal>
              <Reveal delay={0.14}>책임지는</Reveal>
              <Reveal delay={0.2}>프론트엔드</Reveal>
            </h2>

            {/* Bio */}
            <div style={{ marginBottom: "3rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <FadeUp delay={0.3}>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--color-muted)" }}>
                  풋살 동호회에서 매주 부딪히던 팀 나누기 문제를 직접 풀어보다가,
                  27명 중 16명이 쓰는 도구를 운영하게 됐습니다.
                </p>
              </FadeUp>
              <FadeUp delay={0.38}>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--color-muted)" }}>
                  이젠아카데미에서 프론트엔드·풀스택 과정을 거쳤고,
                  올림플래닛 인턴 동안 사수에게&nbsp;
                  &ldquo;왜 이렇게 만들었는지 설명할 수 있어야 한다&rdquo;는 기준을 배웠습니다.
                </p>
              </FadeUp>
              <FadeUp delay={0.46}>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--color-muted)" }}>
                  만드는 일보다 운영하면서 알게 되는 일이 더 많다고 믿습니다.
                </p>
              </FadeUp>
            </div>

            {/* Divider */}
            <motion.div
              style={{ height: "1px", background: "var(--color-foreground)", opacity: 0.12, marginBottom: "2.5rem" }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.5 }}
            />

            {/* Info row — Availability / Skills / Links */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2.5rem" }}>
              {/* Availability */}
              <div>
                <FadeUp delay={0.54}>
                  <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.4, marginBottom: "0.75rem" }}>
                    Availability
                  </p>
                  <p style={{ fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.5 }}>
                    신입 프론트엔드<br />포지션 구직 중
                  </p>
                </FadeUp>
              </div>

              {/* Skills */}
              <div>
                <FadeUp delay={0.58}>
                  <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.4, marginBottom: "0.75rem" }}>
                    Skills
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem 0.75rem" }}>
                    {SKILLS.map((s) => (
                      <span key={s} style={{ fontSize: "0.875rem", fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                </FadeUp>
              </div>

              {/* Links */}
              <div>
                <FadeUp delay={0.62}>
                  <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.4, marginBottom: "0.75rem" }}>
                    Links
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <a
                      href="mailto:ehdgns730@gmail.com"
                      style={{ fontSize: "0.875rem", fontWeight: 500 }}
                      className="transition-opacity hover:opacity-60"
                    >
                      ehdgns730@gmail.com ↗
                    </a>
                    <a
                      href="https://github.com/hoon730"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "0.875rem", fontWeight: 500 }}
                      className="transition-opacity hover:opacity-60"
                    >
                      github.com/hoon730 ↗
                    </a>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
