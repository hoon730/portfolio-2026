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
const RISE_AFTER_CONTENT = 900; // work: rise to top after the detail content is in
const DROP_AFTER_LIST = 1600; // home: drop to bottom after the list pours in
const SEQ_GAP = 450; // delay between the info fade and the name slide

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
  const { navigateTo, currentPath } = usePageTransition();
  const isHome = currentPath === "/";

  const ui = mode === "light-mode" ? "#0a0a0a" : "#f2f2f2";

  const [atTop, setAtTop] = useState(!isHome); // block position
  const [infoOpen, setInfoOpen] = useState(isHome); // role/location opacity
  const [homeKey, setHomeKey] = useState(0);
  const prevHome = useRef(isHome);
  const atTopRef = useRef(atTop);
  atTopRef.current = atTop;

  // route-change timing
  useEffect(() => {
    const ts: ReturnType<typeof setTimeout>[] = [];
    if (isHome) {
      if (!prevHome.current) {
        setHomeKey((k) => k + 1);
        setAtTop(true);
        setInfoOpen(false);
        ts.push(
          setTimeout(() => {
            setInfoOpen(true);
            setAtTop(false);
          }, DROP_AFTER_LIST)
        );
      } else {
        setAtTop(false);
        setInfoOpen(true);
      }
    } else {
      setAtTop(false);
      setInfoOpen(true);
      ts.push(
        setTimeout(() => {
          const doc = document.documentElement;
          const nb =
            window.innerHeight + window.scrollY >= doc.scrollHeight - window.innerHeight;
          setAtTop(!nb);
          setInfoOpen(nb);
        }, RISE_AFTER_CONTENT)
      );
    }
    prevHome.current = isHome;
    return () => ts.forEach(clearTimeout);
  }, [isHome]);

  // scroll on work pages: reaching the bottom restores the home layout in sequence —
  // the role/location fade in first, then the name + nav slide down.
  useEffect(() => {
    if (isHome) return;
    let entered = false;
    let seqT: ReturnType<typeof setTimeout> | undefined;
    const enterT = setTimeout(() => {
      entered = true;
    }, RISE_AFTER_CONTENT);
    const onScroll = () => {
      if (!entered) return;
      const doc = document.documentElement;
      const nb =
        window.innerHeight + window.scrollY >= doc.scrollHeight - window.innerHeight * 0.85;
      if (nb && atTopRef.current) {
        setInfoOpen(true); // 1) fade the rest in
        seqT = setTimeout(() => setAtTop(false), SEQ_GAP); // 2) then slide name down
      } else if (!nb && !atTopRef.current) {
        setAtTop(true); // 1) slide name up
        seqT = setTimeout(() => setInfoOpen(false), SEQ_GAP); // 2) then fade the rest out
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(enterT);
      if (seqT) clearTimeout(seqT);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  return (
    <>
      {/* ── Identity block (moves bottom-left ⇄ top-left) ── */}
      <div
        className="fixed left-[3.75rem] top-0 z-40"
        style={{
          width: "min(660px, 64vw)",
          pointerEvents: "none",
          transform: atTop ? "translateY(7.5vh)" : "translateY(64vh)",
          transition: MOVE,
        }}
      >
        {/* Logo — YEOM / DONG / HOON (same size on every page) */}
        <a
          href="/"
          aria-label="YEOM DONG HOON — home"
          className="inline-block uppercase"
          style={{
            pointerEvents: "auto",
            color: ui,
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "2.5rem",
            lineHeight: 0.85,
            letterSpacing: "0.005em",
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

        {/* Info row: 01 about·02 contact | 프론트엔드·염동훈 | 대한민국 서울·email */}
        <div
          key={`row-${homeKey}`}
          className="mt-7 flex gap-9 text-[0.875rem] leading-[1.3]"
          style={{ color: ui, pointerEvents: "auto" }}
        >
          {/* nav block — always visible, rides with the name */}
          <SlideUp delay={1.55}>
            <nav className="flex flex-col gap-1.5">
              <button
                onClick={onAboutToggle}
                className="inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-60"
              >
                <span style={{ fontSize: "0.625rem", opacity: 0.85 }}>01</span>
                <span>about</span>
              </button>
              <a
                href="mailto:ehdgns730@gmail.com"
                className="inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-60"
              >
                <span style={{ fontSize: "0.625rem", opacity: 0.85 }}>02</span>
                <span>contact</span>
              </a>
            </nav>
          </SlideUp>

          {/* role + location — fade independently of the name's move */}
          <motion.div
            initial={false}
            animate={{ opacity: infoOpen ? 1 : 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="flex gap-9"
            style={{ pointerEvents: infoOpen ? "auto" : "none" }}
          >
            <SlideUp delay={1.63}>
              <div>
                프론트엔드
                <br />
                염동훈
              </div>
            </SlideUp>
            <SlideUp delay={1.71}>
              <div>
                대한민국 서울
                <br />
                <a href="mailto:ehdgns730@gmail.com">ehdgns730@gmail.com</a>
              </div>
            </SlideUp>
          </motion.div>
        </div>
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

      {/* ── Back button — top-right while the work header is compact at the top ── */}
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
          pointerEvents: atTop ? "auto" : "none",
          opacity: atTop ? 1 : 0,
          transform: atTop ? "scale(1)" : "scale(0.7)",
          transition:
            "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>←</span>
      </button>
    </>
  );
}
