"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/content/projects";
import { usePageTransition } from "@/lib/page-transition";

function yearOf(period: string): string {
  const m = period.match(/20\d{2}/);
  return m ? m[0] : "2025";
}

const N = projects.length;
const REST_DEG = -45; // lying back
const FLAT_DEG = -30; // gentle scroll flatten near center
const HOVER_DEG = -18; // hover pushes the line toward the viewer (not fully flat)
const FOLD_DEG = -100; // exit: folds past flat, away from viewer

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn = (t: number) => t * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// entry: list pours down, filling bottom→top, while unfolding
const INTRO_DELAY = 120;
const INTRO_STAGGER = 120;
const INTRO_MS = 780;
// exit: list folds back, disappearing bottom→top
const LEAVE_STAGGER = 100;
const LEAVE_ITEM_MS = 430;

export function HomeStage() {
  const { navigateTo, leaving } = usePageTransition();
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const hovered = useRef<number | null>(null);
  const startTime = useRef<number>(0);
  const leaveStart = useRef<number>(0);
  const exiting = useRef(false); // latched: once leaving starts it never reverts
  const curDeg = useRef<number[]>(projects.map(() => REST_DEG));
  const curOp = useRef<number[]>(projects.map(() => 0));
  const originY = useRef(50);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // latch the exit so the list never snaps back to visible before the route swaps
  useEffect(() => {
    if (leaving && !exiting.current) {
      exiting.current = true;
      leaveStart.current = performance.now();
    }
  }, [leaving]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    startTime.current = performance.now();
    let cancelled = false;

    const tick = (now: number) => {
      if (cancelled) return; // stop rescheduling once unmounted (no orphan rAF loops)
      const vh = window.innerHeight;
      const center = vh / 2;
      const elapsed = now - startTime.current;

      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - vh;
      const frac = maxScroll > 0 ? doc.scrollTop / maxScroll : 0;
      originY.current = lerp(originY.current, 32 + frac * 36, 0.08);
      viewport.style.perspectiveOrigin = `50% ${originY.current.toFixed(2)}%`;

      const threshold = vh * 0.42;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;

        // ── EXIT: fold back, bottom item first (latched) ──
        if (exiting.current) {
          const le = now - leaveStart.current;
          const delay = (N - 1 - i) * LEAVE_STAGGER;
          const p = easeIn(clamp01((le - delay) / LEAVE_ITEM_MS));
          const deg = lerp(curDeg.current[i], FOLD_DEG, p);
          el.style.transform = `translateY(${(p * -45).toFixed(1)}px) rotateY(${deg.toFixed(2)}deg)`;
          el.style.opacity = (1 - p).toFixed(3);
          return;
        }

        // ── target angle / opacity (hover or scroll-focus) ──
        let degT: number;
        let opT: number;
        if (hovered.current === i) {
          degT = HOVER_DEG;
          opT = 1;
        } else {
          const r = el.getBoundingClientRect();
          const itemCenter = r.top + r.height / 2;
          const dist = Math.min(Math.abs(itemCenter - center) / threshold, 1);
          const focus = easeInOut(1 - dist);
          degT = lerp(REST_DEG, FLAT_DEG, focus);
          opT = lerp(0.62, 1, focus);
        }
        curDeg.current[i] = lerp(curDeg.current[i], degT, 0.07);
        curOp.current[i] = lerp(curOp.current[i], opT, 0.1);

        // ── ENTRY: pour down (from above) + unfold, filling bottom→top ──
        const introDelay = INTRO_DELAY + (N - 1 - i) * INTRO_STAGGER;
        const it = easeOut(clamp01((elapsed - introDelay) / INTRO_MS));
        const ty = (1 - it) * -64; // falls from above into place
        const deg = lerp(-92, curDeg.current[i], it); // unfolds into the lean

        el.style.transform = `translateY(${ty.toFixed(2)}px) rotateY(${deg.toFixed(2)}deg)`;
        el.style.opacity = (curOp.current[i] * it).toFixed(3);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      style={{ perspective: "100vw", perspectiveOrigin: "50% 50%", overflow: "hidden" }}
    >
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: "24vh 6vw 28vh 0",
          textAlign: "right",
          transformStyle: "preserve-3d",
          pointerEvents: "none",
        }}
      >
        {projects.map((project, i) => {
          const lines = project.titleLines ?? [project.title];
          const isOutline = hoverIdx === i; // rest = filled, hover = hollow outline
          return (
            <li
              key={project.slug}
              style={{
                transformStyle: "preserve-3d",
                lineHeight: "0.82",
                marginBottom: i < N - 1 ? "3.5vh" : 0,
                pointerEvents: "none",
              }}
            >
              <div
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                style={{
                  transform: `rotateY(${REST_DEG}deg)`,
                  transformOrigin: "right center",
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity",
                  opacity: 0,
                }}
              >
                <a
                  href={`/work/${project.slug}`}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    fontFamily: "var(--font-display), sans-serif",
                    textTransform: "uppercase",
                    fontSize: "clamp(2.75rem, 9vw, 8.5rem)",
                    letterSpacing: "-0.035em",
                    lineHeight: 0.82,
                    whiteSpace: "nowrap",
                    pointerEvents: "auto",
                    color: "var(--color-foreground)",
                    WebkitTextStroke: "2px var(--color-foreground)",
                    WebkitTextFillColor: isOutline ? "transparent" : "var(--color-foreground)",
                    transition: "-webkit-text-fill-color 0.4s ease",
                  }}
                  onMouseEnter={() => {
                    hovered.current = i;
                    setHoverIdx(i);
                  }}
                  onMouseLeave={() => {
                    hovered.current = null;
                    setHoverIdx(null);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(`/work/${project.slug}`);
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: "0.18em",
                      left: "-1.9em",
                      fontSize: "0.16em",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      lineHeight: 1,
                      opacity: 0.55,
                      fontFamily: "var(--font-mono), monospace",
                      WebkitTextFillColor: "var(--color-foreground)",
                      WebkitTextStrokeWidth: "0",
                    }}
                  >
                    {project.number}
                  </span>
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: "0.2em",
                      left: "-0.28em",
                      width: "2px",
                      height: "0.8em",
                      backgroundColor: "var(--color-foreground)",
                      transform: "rotate(25deg)",
                    }}
                  />
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      bottom: "-0.15em",
                      right: "0.05em",
                      fontSize: "0.12em",
                      fontWeight: 500,
                      letterSpacing: "0.05em",
                      lineHeight: 1,
                      opacity: 0.5,
                      fontFamily: "var(--font-mono), monospace",
                      WebkitTextFillColor: "var(--color-foreground)",
                      WebkitTextStrokeWidth: "0",
                    }}
                  >
                    {yearOf(project.period)}
                  </span>
                  {lines.map((line, li) => (
                    <span key={li} style={{ display: "block" }}>
                      {line}
                    </span>
                  ))}
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
