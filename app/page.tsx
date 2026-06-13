"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/content/projects";
import { EASE_OUT_EXPO } from "@/lib/motion";

export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{ paddingTop: "4.5rem", paddingBottom: "10rem" }}
    >
      <ul className="group/list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {projects.map((project, i) => (
          <li
            key={project.slug}
            className="overflow-hidden"
            style={{
              paddingLeft: "3.75rem",
              paddingRight: "3.75rem",
              lineHeight: "0.88",
              paddingBottom: "0.06em",
            }}
          >
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 1,
                ease: EASE_OUT_EXPO,
                delay: 0.35 + i * 0.1,
              }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="block font-black tracking-tight transition-opacity duration-300 group-hover/list:opacity-30 hover:!opacity-100"
                style={{
                  fontSize: "clamp(3.5rem, 10vw, 9rem)",
                  color: "var(--color-foreground)",
                  lineHeight: "1.0",
                }}
              >
                {project.title}
              </Link>
            </motion.div>
          </li>
        ))}
      </ul>
    </main>
  );
}
