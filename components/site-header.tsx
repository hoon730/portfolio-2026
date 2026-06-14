"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useColorMode, ColorMode } from "@/lib/color-mode";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { usePageTransition } from "@/lib/page-transition";

const MODES: { value: ColorMode; label: string; bg: string; fg: string }[] = [
  { value: "night-mode", label: "N", bg: "#0a0a0a", fg: "#f2f2f2" },
  { value: "light-mode", label: "L", bg: "#f0f0ed", fg: "#0a0a0a" },
  { value: "ultra-mode", label: "U", bg: "#1d4ed8", fg: "#ffffff" },
];

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

  return (
    <header
      className="fixed bottom-0 left-0 right-0 z-40 flex items-end"
      style={{ pointerEvents: "none" }}
    >
      {/* Logo — floats above the bottom bar */}
      <Link
        href="/"
        className="absolute left-[3.75rem] font-black text-[0.875rem] uppercase tracking-[0.12em] leading-none"
        style={{
          bottom: "calc(100% + 1.75rem)",
          color: "var(--color-foreground)",
          pointerEvents: "auto",
        }}
      >
        <SlideUp delay={0.05}>염동훈</SlideUp>
      </Link>

      {/* Bottom bar */}
      <div
        className="w-full flex items-end justify-between"
        style={{ padding: "1.5rem 3.75rem 2.875rem", pointerEvents: "auto" }}
      >
        {/* Left: meta info */}
        <div className="flex gap-8 text-[0.75rem] uppercase tracking-[0.1em]">
          <SlideUp delay={0.15}>
            <span style={{ color: "var(--color-muted)" }}>
              프론트엔드 개발자 · 서울
            </span>
          </SlideUp>
          <SlideUp delay={0.22}>
            <a
              href="mailto:ehdgns730@gmail.com"
              className="transition-opacity hover:opacity-100"
              style={{ color: "var(--color-muted)" }}
            >
              ehdgns730@gmail.com
            </a>
          </SlideUp>
        </div>

        {/* Right: about + color modes */}
        <div className="flex items-center gap-6 text-[0.75rem] uppercase tracking-[0.1em]">
          {/* About / Back */}
          <SlideUp delay={0.28}>
            {isHome ? (
              <button
                onClick={onAboutToggle}
                className="transition-opacity hover:opacity-100"
                style={{ color: "var(--color-muted)" }}
              >
                about
              </button>
            ) : (
              <a
                href="/"
                className="transition-opacity hover:opacity-100 cursor-pointer"
                style={{ color: "var(--color-muted)" }}
                onClick={(e) => { e.preventDefault(); navigateTo("/"); }}
              >
                ← home
              </a>
            )}
          </SlideUp>

          {/* Color mode toggles */}
          <div className="flex items-center gap-1.5">
            {MODES.map(({ value, label, bg, fg }, i) => (
              <SlideUp key={value} delay={0.34 + i * 0.06}>
                <button
                  onClick={() => setMode(value)}
                  title={value.replace("-mode", "")}
                  className="flex h-[1.25rem] w-[1.25rem] items-center justify-center rounded-full text-[0.6rem] font-bold transition-opacity"
                  style={{
                    background: bg,
                    color: fg,
                    border: "1.5px solid var(--color-foreground)",
                    opacity: mode === value ? 1 : 0.35,
                  }}
                >
                  {label}
                </button>
              </SlideUp>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
