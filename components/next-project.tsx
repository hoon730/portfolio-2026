"use client";

import { useState } from "react";
import { usePageTransition } from "@/lib/page-transition";
import { getProjectBySlug } from "@/content/projects";

interface NextProjectProps {
  slug: string;
  title: string;
  subtitle?: string;
}

const REST_DEG = -45;
const HOVER_DEG = -14;

/**
 * Bottom-of-page "next project" — a full home-list-style 3D item:
 * lies back, stands up + fills on hover, wraps long names.
 * Fill is the inverse of the home list (rest = outline, hover = filled).
 */
export function NextProject({ slug, title }: NextProjectProps) {
  const { navigateTo } = usePageTransition();
  const [hover, setHover] = useState(false);
  const lines = getProjectBySlug(slug)?.titleLines ?? [title];

  return (
    <section
      style={{
        marginTop: "18vh",
        padding: "0 6vw 6vh",
        perspective: "100vw",
        perspectiveOrigin: "50% 50%",
        overflow: "hidden",
        textAlign: "right",
      }}
    >
      <div
        className="text-[0.95rem] mb-2"
        style={{ color: "var(--color-foreground)", opacity: 0.85 }}
      >
        next project
      </div>
      <a
        href={`/work/${slug}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={(e) => {
          e.preventDefault();
          navigateTo(`/work/${slug}`);
        }}
        style={{
          display: "inline-block",
          fontFamily: "var(--font-display), sans-serif",
          textTransform: "uppercase",
          fontSize: "clamp(3rem, 12vw, 10rem)",
          lineHeight: 0.82,
          letterSpacing: "-0.035em",
          transformOrigin: "right center",
          transform: `rotateY(${hover ? HOVER_DEG : REST_DEG}deg)`,
          color: "var(--color-foreground)",
          WebkitTextStroke: "2px var(--color-foreground)",
          WebkitTextFillColor: hover ? "var(--color-foreground)" : "transparent",
          transition:
            "transform 0.7s cubic-bezier(0.16,1,0.3,1), -webkit-text-fill-color 0.4s ease",
        }}
      >
        {lines.map((l, i) => (
          <span key={i} style={{ display: "block" }}>
            {l}
          </span>
        ))}
      </a>
    </section>
  );
}
