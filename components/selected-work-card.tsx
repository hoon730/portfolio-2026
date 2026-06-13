"use client";

import { motion } from "framer-motion";
import { Project } from "@/content/projects";
import { Reveal } from "@/components/motion/reveal";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface SelectedWorkCardProps {
  project: Project;
}

export function SelectedWorkCard({ project }: SelectedWorkCardProps) {
  return (
    <motion.article
      className="group border-t border-foreground py-12 md:py-16"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-16">
        <div className="flex-1">
          <div className="flex items-baseline gap-6">
            <span className="text-sm font-medium uppercase tracking-[0.15em] text-muted">
              {project.number}
            </span>
            <Reveal className="pb-[0.04em] transition-transform duration-300 ease-out group-hover:translate-x-2">
              <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-none tracking-tight transition-colors group-hover:text-accent">
                {project.title}
              </h2>
            </Reveal>
          </div>

          <p className="mt-4 text-lg font-medium md:text-xl">{project.subtitle}</p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
            <span>{project.role}</span>
            <span>{project.period}</span>
          </div>

          {project.metrics && (
            <p className="mt-4 text-sm font-medium">{project.metrics}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border border-foreground px-2 py-0.5 text-xs uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 md:items-end md:pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b border-foreground pb-0.5 text-sm uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
            >
              라이브 ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b border-muted pb-0.5 text-sm uppercase tracking-[0.15em] text-muted transition-colors hover:border-foreground hover:text-foreground"
            >
              GitHub ↗
            </a>
          )}
          <a
            href={`/work/${project.slug}`}
            className="mt-4 inline-block border-b border-foreground pb-0.5 text-sm font-medium uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
          >
            케이스 스터디 →
          </a>
        </div>
      </div>
    </motion.article>
  );
}
