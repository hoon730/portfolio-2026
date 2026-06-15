"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useColorMode, ColorMode } from "@/lib/color-mode";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { usePageTransition } from "@/lib/page-transition";
import { useIsMobile } from "@/lib/use-is-mobile";

const MODES: { value: ColorMode; label: string; bg: string; fg: string }[] = [
  { value: "night-mode", label: "N", bg: "#0a0a0a", fg: "#f2f2f2" },
  { value: "light-mode", label: "L", bg: "#f0f0ed", fg: "#0a0a0a" },
  { value: "ultra-mode", label: "U", bg: "#002fa7", fg: "#f2ece0" },
];

const MOVE = "transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)";
// 72vh (home/bottom) − 7.5vh (work/top): counter-shift that pins the role/location
// to the bottom so it never rides the name's slide — it only fades in place.
const INFO_DROP = "64.5vh";
const LOGO_WORDS = ["YEOM", "DONG", "HOON"];
const LOGO_BASE = 1.15;
const RISE_AFTER_CONTENT = 900; // work: rise to top after the detail content is in
const DROP_AFTER_LIST = 1600; // home: drop to bottom after the list pours in
const SEQ_GAP = 150; // delay between the info fade and the name slide

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
  const isMobile = useIsMobile();
  const isHome = currentPath === "/";
  // mobile: nav rides the name only on home; work pages keep just the name bar
  const showNav = !isMobile || isHome;
  const sideInset = isMobile ? "1.25rem" : "3.75rem";
  // mobile shrinks the wordmark to a compact YDH monogram (single line)
  const words = isMobile ? ["YDH"] : LOGO_WORDS;
  // mobile work-page header sits high & compact; the name offset doubles as the
  // back-button top so the arrow lines up with YDH.
  const nameTopOffset = isMobile ? "2.5vh" : "7.5vh";

  const ui =
    mode === "light-mode" ? "#0a0a0a" : mode === "ultra-mode" ? "#f2ece0" : "#f2f2f2";

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
    // nearBottom is the stable edge-triggered gate. Using atTopRef as gate caused
    // oscillation: setAtTop inside the handler → re-render → atTopRef flips →
    // the opposite condition fires immediately → infinite bounce.
    const nearBottom = { current: false };
    const enterT = setTimeout(() => {
      entered = true;
    }, RISE_AFTER_CONTENT);
    const onScroll = () => {
      if (!entered) return;
      const doc = document.documentElement;
      const dist = doc.scrollHeight - window.innerHeight - window.scrollY;
      const isNearBottom = dist <= 200;

      if (isNearBottom && !nearBottom.current) {
        // Crossed INTO near-bottom zone (scrolling down)
        nearBottom.current = true;
        clearTimeout(seqT);
        setInfoOpen(true);
        seqT = setTimeout(() => setAtTop(false), SEQ_GAP);
      } else if (!isNearBottom && nearBottom.current) {
        // Crossed OUT of near-bottom zone (scrolling up past 200px mark)
        nearBottom.current = false;
        clearTimeout(seqT);
        setAtTop(true);
        seqT = setTimeout(() => setInfoOpen(false), SEQ_GAP);
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
      {/* ── Mobile scrims: reserve an opaque band so scrolling content never
          shows through the fixed name/nav (method A). Top band on work pages,
          bottom band on home. ── */}
      {isMobile && !isHome && (
        <div
          className="fixed left-0 right-0 top-0 z-30"
          style={{
            height: "12vh",
            background:
              "linear-gradient(to bottom, var(--color-background) 0%, var(--color-background) 82%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      )}
      {isMobile && isHome && (
        <div
          className="fixed bottom-0 left-0 right-0 z-30"
          style={{
            height: "42vh",
            background:
              "linear-gradient(to top, var(--color-background) 0%, var(--color-background) 76%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* ── Identity block (moves bottom-left ⇄ top-left) ── */}
      <div
        className="fixed top-0 z-40"
        style={{
          left: sideInset,
          width: isMobile ? "calc(100% - 2.5rem)" : "min(660px, 64vw)",
          pointerEvents: "none",
          transform: atTop ? `translateY(${nameTopOffset})` : "translateY(72vh)",
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
            // mobile: roomier line-box so the monogram sits centered with equal
            // top/bottom breathing room (no "cropped bottom" feel)
            lineHeight: isMobile ? 1.3 : 0.85,
            letterSpacing: "-0.05em",
          }}
          onClick={(e) => {
            e.preventDefault();
            if (!isHome) navigateTo("/");
          }}
        >
          {isHome ? (
            <div key={homeKey}>
              {words.map((word, wi) => (
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
            words.map((w) => (
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
          {/* nav block — rides with the name (mobile: home only) */}
          {showNav && (
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
          )}

          {/* role + location — pinned to the bottom; the counter-shift cancels the
              block's slide so this only fades in place (never rides the name down).
              Hidden on mobile: it lives in the about overlay + the contact link. */}
          {!isMobile && (
          <div
            style={{
              transform: atTop ? `translateY(${INFO_DROP})` : "translateY(0)",
              transition: MOVE,
            }}
          >
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
          )}
        </div>
      </div>

      {/* ── Color modes — bottom-right ── */}
      <div
        className="fixed bottom-[2.875rem] z-40 flex items-center gap-1.5"
        style={{ right: sideInset, pointerEvents: "auto" }}
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
          top: isMobile ? nameTopOffset : "5vh",
          right: sideInset,
          width: "2.75rem",
          height: "2.75rem",
          border: `1.5px solid ${ui}`,
          color: ui,
          background: "transparent",
          pointerEvents: !isHome ? "auto" : "none",
          opacity: !isHome ? 1 : 0,
          transform: !isHome ? "scale(1)" : "scale(0.7)",
          transition:
            "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>←</span>
      </button>
    </>
  );
}
