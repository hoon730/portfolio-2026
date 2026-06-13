import { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group border-t border-foreground py-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-baseline gap-4">
            <span className="text-sm font-medium uppercase tracking-[0.15em] text-muted">
              {project.number}
            </span>
            <h3 className="text-2xl font-black leading-none tracking-tight transition-colors group-hover:text-accent md:text-3xl">
              {project.title}
            </h3>
          </div>
          <p className="mt-2 text-sm text-muted">{project.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border border-foreground px-2 py-0.5 text-xs uppercase tracking-wider opacity-60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2 pt-1 text-right">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b border-muted pb-0.5 text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:border-foreground hover:text-foreground"
            >
              라이브 ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b border-muted pb-0.5 text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:border-foreground hover:text-foreground"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
