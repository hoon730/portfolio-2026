"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useColorMode, ColorMode } from "@/lib/color-mode";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { usePageTransition } from "@/lib/page-transition";

const MODES: { value: ColorMode; label: string; bg: string; fg: string }[] = [
  { value: "night-mode", label: "N", bg: "#0a0a0a", fg: "#f2f2f2" },
  { value: "light-mode", label: "L", bg: "#f0f0ed", fg: "#0a0a0a" },
  { value: "ultra-mode", label: "U", bg: "#1d4ed8", fg: "#ffffff" },
];

const MOVE = "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)";

function SlideUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
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
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { navigateTo } = usePageTransition();

  // vanholtz: in ultra/night the UI text is light, in light-mode it's dark
  const ui = mode === "light-mode" ? "#0a0a0a" : "#f2f2f2";

  return (
    <>
      {/* ── Identity block: logo + meta + nav. Sits bottom-left on home, slides to top-left on work pages ── */}
      <div
        className="fixed left-[3.75rem] top-0 z-40"
        style={{
          pointerEvents: "none",
          transform: isHome
            ? "translateY(calc(100vh - 100% - 9vh))"
            : "translateY(7.5vh)",
          transition: MOVE,
        }}
      >
        {/* Logo — YEOM / DONG / HOON, stacked */}
        <a
          href="/"
          aria-label="YEOM DONG HOON — home"
          className="block uppercase"
          style={{
            pointerEvents: "auto",
            color: ui,
            fontFamily: "var(--font-display), sans-serif",
            fontSize: isHome ? "clamp(1.9rem, 2.6vw, 2.5rem)" : "1.2rem",
            lineHeight: 0.85,
            letterSpacing: "0.01em",
            transition: "font-size 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onClick={(e) => {
            e.preventDefault();
            if (!isHome) navigateTo("/");
          }}
        >
          <SlideUp delay={0.5}>YEOM</SlideUp>
          <SlideUp delay={0.58}>DONG</SlideUp>
          <SlideUp delay={0.66}>HOON</SlideUp>
        </a>

        {/* Meta — role + email (home only; collapses on work pages) */}
        <motion.div
          initial={false}
          animate={{ opacity: isHome ? 1 : 0, height: isHome ? "auto" : 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          style={{ overflow: "hidden" }}
        >
          <div
            className="mt-5 text-[0.8rem] uppercase tracking-[0.08em] leading-relaxed"
            style={{ color: ui, opacity: 0.7, pointerEvents: "auto" }}
          >
            <SlideUp delay={0.74}>프론트엔드 개발자 · 서울</SlideUp>
            <SlideUp delay={0.8}>
              <a href="mailto:ehdgns730@gmail.com" className="lowercase">
                ehdgns730@gmail.com
              </a>
            </SlideUp>
          </div>
        </motion.div>

        {/* Nav — 01 about / 02 contact */}
        <nav
          className="mt-5 flex flex-col gap-1.5 text-[0.85rem] tracking-[0.04em]"
          style={{ color: ui, pointerEvents: "auto" }}
        >
          <SlideUp delay={0.86}>
            <button
              onClick={onAboutToggle}
              className="group flex items-center gap-2 transition-opacity hover:opacity-60"
            >
              <span style={{ opacity: 0.5, fontFamily: "var(--font-mono), monospace" }}>
                01
              </span>
              <span>about</span>
            </button>
          </SlideUp>
          <SlideUp delay={0.92}>
            <a
              href="mailto:ehdgns730@gmail.com"
              className="group flex items-center gap-2 transition-opacity hover:opacity-60"
            >
              <span style={{ opacity: 0.5, fontFamily: "var(--font-mono), monospace" }}>
                02
              </span>
              <span>contact</span>
            </a>
          </SlideUp>
        </nav>
      </div>

      {/* ── Color modes — fixed bottom-right ── */}
      <div
        className="fixed bottom-[2.875rem] right-[3.75rem] z-40 flex items-center gap-1.5"
        style={{ pointerEvents: "auto" }}
      >
        {MODES.map(({ value, label, bg, fg }, i) => (
          <SlideUp key={value} delay={0.68 + i * 0.06}>
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

      {/* ── Back button — top-right, work pages only ── */}
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
