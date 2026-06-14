"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/content/projects";
import { usePageTransition } from "@/lib/page-transition";

function yearOf(period: string): string {
  const m = period.match(/20\d{2}/);
  return m ? m[0] : "2025";
}

const REST_DEG = -45; // lying back (vanholtz baseline)
const FLAT_DEG = -30; // gentle scroll flatten near center
const HOVER_DEG = -38; // subtle stand-up on hover (close to rest)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const INTRO_MS = 750;
const INTRO_STAGGER = 95;
const INTRO_DELAY = 350;

export function HomeStage() {
  const { navigateTo } = usePageTransition();
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const hovered = useRef<number | null>(null);
  const startTime = useRef<number>(0);
  const curDeg = useRef<number[]>(projects.map(() => REST_DEG));
  const curOp = useRef<number[]>(projects.map(() => 0));
  const originY = useRef(50);
  // hoverIdx drives the text style (outline vs solid) — infrequent, re-render is cheap
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    startTime.current = performance.now();

    const tick = (now: number) => {
      const vh = window.innerHeight;
      const center = vh / 2;
      const elapsed = now - startTime.current;

      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - vh;
      const frac = maxScroll > 0 ? doc.scrollTop / maxScroll : 0;
      const targetOY = 32 + frac * 36;
      originY.current = lerp(originY.current, targetOY, 0.08);
      viewport.style.perspectiveOrigin = `50% ${originY.current.toFixed(2)}%`;

      const threshold = vh * 0.42;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        let degT: number;
        let opT: number;
        if (hovered.current === i) {
          degT = HOVER_DEG; // only the hovered line moves, subtly
          opT = 1;
        } else {
          const r = el.getBoundingClientRect();
          const itemCenter = r.top + r.height / 2;
          const dist = Math.min(Math.abs(itemCenter - center) / threshold, 1);
          const focus = easeInOut(1 - dist);
          degT = lerp(REST_DEG, FLAT_DEG, focus);
          opT = lerp(0.62, 1, focus);
        }

        // slow, smooth easing toward target (gentle like the reference)
        curDeg.current[i] = lerp(curDeg.current[i], degT, 0.06);
        curOp.current[i] = lerp(curOp.current[i], opT, 0.1);

        const introT = easeOut(
          clamp01((elapsed - INTRO_DELAY - i * INTRO_STAGGER) / INTRO_MS)
        );
        const ty = (1 - introT) * 55;

        el.style.transform = `translateY(${ty.toFixed(2)}px) rotateY(${curDeg.current[i].toFixed(2)}deg)`;
        el.style.opacity = (curOp.current[i] * introT).toFixed(3);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={viewportRef}
      style={{
        perspective: "100vw",
        perspectiveOrigin: "50% 50%",
        overflow: "hidden",
      }}
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
          // reversed hover: hovered line is hollow outline, the rest stay solid black
          const isOutline = hoverIdx === i;
          return (
            <li
              key={project.slug}
              style={{
                transformStyle: "preserve-3d",
                lineHeight: "0.82",
                marginBottom: i < projects.length - 1 ? "3.5vh" : 0,
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
                    WebkitTextFillColor: isOutline
                      ? "transparent"
                      : "var(--color-foreground)",
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
                  {/* numbering (01, 02 …) */}
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
                  {/* decorative slash tick */}
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
                  {/* year label */}
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
                  {/* title — split into lines */}
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
