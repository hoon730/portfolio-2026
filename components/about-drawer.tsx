"use client";

import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

const SKILLS = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind",
  "Zustand",
  "Supabase",
  "Babylon.js",
  "PWA",
];

interface AboutDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function AboutDrawer({ open, onClose }: AboutDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            style={{ background: "rgba(0,0,0,0.35)" }}
          />

          {/* Panel */}
          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-50 overflow-y-auto"
            style={{
              width: "min(680px, 100vw)",
              background: "var(--color-background)",
              color: "var(--color-foreground)",
              padding: "3.75rem 3.75rem 6rem",
            }}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="mb-12 text-[0.75rem] uppercase tracking-[0.12em] transition-opacity hover:opacity-60"
              style={{ color: "var(--color-muted)" }}
            >
              ← back
            </button>

            {/* Heading */}
            <h2
              className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.9] tracking-tight"
              style={{ color: "var(--color-foreground)" }}
            >
              제품을 운영까지<br />책임지는<br />프론트엔드
            </h2>

            <div className="mt-10 space-y-5 text-[0.9375rem] leading-relaxed">
              <p style={{ color: "var(--color-muted)" }}>
                풋살 동호회에서 매주 부딪히던 팀 나누기 문제를 직접 풀어보다가,
                27명 중 16명이 쓰는 도구를 운영하게 됐습니다.
              </p>
              <p style={{ color: "var(--color-muted)" }}>
                이젠아카데미에서 프론트엔드·풀스택 과정을 거쳤고,
                올림플래닛 인턴 동안 사수에게
                &ldquo;왜 이렇게 만들었는지 설명할 수 있어야 한다&rdquo;는
                기준을 배웠습니다.
              </p>
              <p style={{ color: "var(--color-muted)" }}>
                만드는 일보다 운영하면서 알게 되는 일이 더 많다고 믿습니다.
              </p>
            </div>

            {/* Availability */}
            <div className="mt-12 border-t pt-8" style={{ borderColor: "var(--color-muted)" }}>
              <h3 className="text-[0.75rem] uppercase tracking-[0.12em]" style={{ color: "var(--color-muted)" }}>
                Availability —
              </h3>
              <p className="mt-3 text-sm font-medium">
                신입 프론트엔드 포지션 구직 중
              </p>
            </div>

            {/* Skills */}
            <div className="mt-8 border-t pt-8" style={{ borderColor: "var(--color-muted)" }}>
              <h3 className="text-[0.75rem] uppercase tracking-[0.12em]" style={{ color: "var(--color-muted)" }}>
                Skills —
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {SKILLS.map((s) => (
                  <span
                    key={s}
                    className="text-sm font-medium"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="mt-8 border-t pt-8" style={{ borderColor: "var(--color-muted)" }}>
              <h3 className="text-[0.75rem] uppercase tracking-[0.12em]" style={{ color: "var(--color-muted)" }}>
                Links —
              </h3>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href="mailto:ehdgns730@gmail.com"
                  className="text-sm font-medium underline-offset-4 hover:underline"
                  style={{ color: "var(--color-foreground)" }}
                >
                  ehdgns730@gmail.com ↗
                </a>
                <a
                  href="https://github.com/hoon730"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium underline-offset-4 hover:underline"
                  style={{ color: "var(--color-foreground)" }}
                >
                  github.com/hoon730 ↗
                </a>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
