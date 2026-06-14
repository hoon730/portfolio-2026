"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { projects } from "@/content/projects";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { TransitionLink } from "@/components/transition-link";

export default function Home() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <main
      className="min-h-screen"
      style={{ paddingTop: "4.5rem", paddingBottom: "10rem" }}
    >
      {/* perspective on the ul gives depth to rotateY children */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          perspective: "1200px",
          perspectiveOrigin: "right center",
        }}
      >
        {projects.map((project, i) => (
          <li
            key={project.slug}
            style={{ paddingLeft: "3.75rem", paddingRight: "3.75rem" }}
          >
            {/* 3D container: entry opacity-in + persistent rotateY -45 → 0 on hover */}
            <motion.div
              style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
              initial={{ rotateY: -45, opacity: 0 }}
              animate={{
                rotateY: hoveredSlug === project.slug ? 0 : -45,
                opacity: 1,
              }}
              transition={{
                rotateY: { duration: 0.75, ease: EASE_OUT_EXPO },
                opacity: { duration: 0.5, delay: 0.25 + i * 0.08, ease: "easeOut" },
              }}
              onHoverStart={() => setHoveredSlug(project.slug)}
              onHoverEnd={() => setHoveredSlug(null)}
            >
              <TransitionLink
                href={`/work/${project.slug}`}
                className="block font-black tracking-tight"
                style={{
                  fontSize: "clamp(3.5rem, 10vw, 9rem)",
                  color: "var(--color-foreground)",
                  lineHeight: "1.0",
                  paddingBottom: "0.06em",
                  opacity:
                    hoveredSlug !== null && hoveredSlug !== project.slug
                      ? 0.25
                      : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                {project.title}
              </TransitionLink>
            </motion.div>
          </li>
        ))}
      </ul>
    </main>
  );
}
