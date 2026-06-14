"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useColorMode, ColorMode } from "@/lib/color-mode";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { usePageTransition } from "@/lib/page-transition";

const MODES: { value: ColorMode; label: string; bg: string; fg: string }[] = [
  { value: "night-mode", label: "N", bg: "#0a0a0a", fg: "#f2f2f2" },
  { value: "light-mode", label: "L", bg: "#f0f0ed", fg: "#0a0a0a" },
  { value: "ultra-mode", label: "U", bg: "#1d4ed8", fg: "#ffffff" },
];

const MOVE = "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)";
const LOGO_WORDS = ["YEOM", "DONG", "HOON"];
const LOGO_BASE = 1.15;

function SlideUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function LetterSlide({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface SiteHeaderProps {
  onAboutToggle: () => void;
}

export function SiteHeader({ onAboutToggle }: SiteHeaderProps) {
  const { mode, setMode } = useColorMode();
  const { navigateTo, leaving, currentPath } = usePageTransition();
  const isHome = currentPath === "/";

  const ui = mode === "light-mode" ? "#0a0a0a" : "#f2f2f2";
  const atTop = !isHome || leaving;

  // replay the entrance each time we land on home
  const [homeKey, setHomeKey] = useState(0);
  const prevHome = useRef(isHome);
  useEffect(() => {
    if (isHome && !prevHome.current) setHomeKey((k) => k + 1);
    prevHome.current = isHome;
  }, [isHome]);

  return (
    <>
      {/* ── Identity block (moves bottom-left ⇄ top-left) ── */}
      <div
        className="fixed left-[3.75rem] top-0 z-40"
        style={{
          width: "min(620px, 60vw)",
          pointerEvents: "none",
          // both targets are fixed vh (no self-height calc) so the move stays smooth
          transform: atTop ? "translateY(7.5vh)" : "translateY(64vh)",
          transition: MOVE,
        }}
      >
        {/* Logo — YEOM / DONG / HOON */}
        <a
          href="/"
          aria-label="YEOM DONG HOON — home"
          className="inline-block uppercase"
          style={{
            pointerEvents: "auto",
            color: ui,
            fontFamily: "var(--font-display), sans-serif",
            fontSize: atTop ? "1.2rem" : "2.5rem",
            lineHeight: 0.85,
            letterSpacing: "0.005em",
            transition: "font-size 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onClick={(e) => {
            e.preventDefault();
            if (!isHome) navigateTo("/");
          }}
        >
          {isHome ? (
            <div key={homeKey}>
              {LOGO_WORDS.map((word, wi) => (
                <span key={wi} className="flex">
                  {word.split("").map((ch, ci) => (
                    <LetterSlide key={ci} delay={LOGO_BASE + (wi * 4 + ci) * 0.04}>
                      {ch}
                    </LetterSlide>
                  ))}
                </span>
              ))}
            </div>
          ) : (
            LOGO_WORDS.map((w) => (
              <span key={w} className="block">
                {w}
              </span>
            ))
          )}
        </a>

        {/* Role + contact — collapses when at top (work pages) */}
        <motion.div
          key={`meta-${homeKey}`}
          initial={false}
          animate={{ opacity: atTop ? 0 : 1, height: atTop ? 0 : "auto" }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          style={{ overflow: "hidden" }}
        >
          <div
            className="mt-6 flex gap-10 text-[0.875rem] leading-[1.2]"
            style={{ color: ui, pointerEvents: "auto" }}
          >
            <div>
              <SlideUp delay={1.75}>프론트엔드</SlideUp>
              <SlideUp delay={1.8}>염동훈</SlideUp>
            </div>
            <div>
              <SlideUp delay={1.86}>서울</SlideUp>
              <SlideUp delay={1.91}>
                <a href="mailto:ehdgns730@gmail.com">ehdgns730@gmail.com</a>
              </SlideUp>
            </div>
          </div>
        </motion.div>

        {/* Nav — 01 about / 02 contact. Left-aligned; stays visible and rides to the top */}
        <nav
          key={`nav-${homeKey}`}
          className="mt-5 flex flex-col gap-1 text-[0.875rem] leading-[1.2]"
          style={{ color: ui, pointerEvents: "auto" }}
        >
          <SlideUp delay={1.97}>
            <button
              onClick={onAboutToggle}
              className="inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-60"
            >
              <span style={{ fontSize: "0.625rem", opacity: 0.85 }}>01</span>
              <span>about</span>
            </button>
          </SlideUp>
          <SlideUp delay={2.02}>
            <a
              href="mailto:ehdgns730@gmail.com"
              className="inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-60"
            >
              <span style={{ fontSize: "0.625rem", opacity: 0.85 }}>02</span>
              <span>contact</span>
            </a>
          </SlideUp>
        </nav>
      </div>

      {/* ── Color modes — bottom-right ── */}
      <div
        className="fixed bottom-[2.875rem] right-[3.75rem] z-40 flex items-center gap-1.5"
        style={{ pointerEvents: "auto" }}
      >
        {MODES.map(({ value, label, bg, fg }, i) => (
          <SlideUp key={value} delay={0.6 + i * 0.06}>
            <button
              onClick={() => setMode(value)}
              title={value.replace("-mode", "")}
              className="flex h-[1.25rem] w-[1.25rem] items-center justify-center rounded-full text-[0.6rem] font-bold transition-opacity"
              style={{
                background: bg,
                color: fg,
                border: `1.5px solid ${ui}`,
                opacity: mode === value ? 1 : 0.35,
              }}
            >
              {label}
            </button>
          </SlideUp>
        ))}
      </div>

      {/* ── Back button — top-right on work pages ── */}
      <button
        aria-label="홈으로 돌아가기"
        onClick={() => navigateTo("/")}
        className="fixed z-40 flex items-center justify-center rounded-full"
        style={{
          top: "5vh",
          right: "3.75rem",
          width: "2.75rem",
          height: "2.75rem",
          border: `1.5px solid ${ui}`,
          color: ui,
          background: "transparent",
          pointerEvents: isHome ? "none" : "auto",
          opacity: isHome ? 0 : 1,
          transform: isHome ? "scale(0.7)" : "scale(1)",
          transition:
            "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>←</span>
      </button>
    </>
  );
}
