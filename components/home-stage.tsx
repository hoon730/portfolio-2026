"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/content/projects";
import { TransitionLink } from "@/components/transition-link";

// derive the decorative year tick from the period string
function yearOf(period: string): string {
  const m = period.match(/20\d{2}/);
  return m ? m[0] : "2025";
}

const REST_DEG = -44; // lying back (vanholtz baseline)
const FLAT_DEG = -28; // gently flatten the focused line
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function HomeStage() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const originY = useRef(50);
  const targetOriginY = useRef(50);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const tick = () => {
      const vh = window.innerHeight;
      const center = vh / 2;

      // perspective-origin parallax: scroll fraction → vanishing point moves top→bottom
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - vh;
      const frac = maxScroll > 0 ? doc.scrollTop / maxScroll : 0;
      targetOriginY.current = 30 + frac * 40; // 30%..70%
      originY.current = lerp(originY.current, targetOriginY.current, 0.08);
      viewport.style.perspectiveOrigin = `50% ${originY.current.toFixed(2)}%`;

      // per-item: stand up (flatten) as it nears vertical center
      const threshold = vh * 0.4;
      for (const el of itemRefs.current) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const itemCenter = r.top + r.height / 2;
        const dist = Math.min(Math.abs(itemCenter - center) / threshold, 1);
        const focus = easeInOut(1 - dist); // 1 at center → 0 far
        const deg = lerp(REST_DEG, FLAT_DEG, focus);
        const opacity = lerp(0.62, 1, focus);
        el.style.transform = `rotateY(${deg.toFixed(2)}deg)`;
        el.style.opacity = opacity.toFixed(3);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={viewportRef}
      style={{
        perspective: "min(58vw, 960px)",
        perspectiveOrigin: "50% 50%",
        overflow: "hidden",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: "26vh 6vw 30vh 0",
          textAlign: "right",
          transformStyle: "preserve-3d",
          pointerEvents: "none",
        }}
      >
        {projects.map((project, i) => (
          <li
            key={project.slug}
            style={{
              transformStyle: "preserve-3d",
              lineHeight: "0.86",
              marginBottom: i < projects.length - 1 ? "4vh" : 0,
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
                opacity: 0.62,
                pointerEvents: "none",
              }}
            >
              <TransitionLink
                href={`/work/${project.slug}`}
                style={{
                  position: "relative",
                  display: "inline-block",
                  color: "var(--color-foreground)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  fontWeight: 900,
                  fontSize: "clamp(2.75rem, 8.6vw, 8rem)",
                  letterSpacing: "0.01em",
                  lineHeight: 0.9,
                  whiteSpace: "nowrap",
                  pointerEvents: "auto",
                }}
              >
                {/* decorative slash tick (vanholtz ::after) */}
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "0.23em",
                    left: "-0.32em",
                    width: "2px",
                    height: "0.82em",
                    backgroundColor: "var(--color-foreground)",
                    transform: "rotate(25deg)",
                  }}
                />
                {/* year label (vanholtz data-info) */}
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "1.15em",
                    right: "0.05em",
                    fontSize: "0.14em",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    lineHeight: 1,
                    opacity: 0.55,
                  }}
                >
                  {yearOf(project.period)}
                </span>
                {project.title}
              </TransitionLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
