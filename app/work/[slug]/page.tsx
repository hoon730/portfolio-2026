import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseStudy, caseStudies } from "@/content/case-studies";
import { getProjectBySlug } from "@/content/projects";
import { Section } from "@/components/section";
import { SectionLabel } from "@/components/section-label";
import { FadeUp } from "@/components/motion/fade-up";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const nextStudy = getCaseStudy(study.next);
  const project = getProjectBySlug(slug);

  return (
    <>
      {/* Cover */}
      <section className="flex min-h-[60vh] flex-col justify-end px-6 py-12 md:px-12 md:py-16">
        <FadeUp>
          <Link
            href="/#work"
            className="mb-12 inline-block text-sm uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
          >
            ← Back
          </Link>
        </FadeUp>
        <FadeUp delay={0.05}>
          <SectionLabel number={project?.number ?? "—"}>
            Selected Work
          </SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="mt-6 text-[clamp(3rem,10vw,9rem)] font-black leading-none tracking-tight">
            {study.title}
          </h1>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mt-4 text-xl font-medium md:text-2xl">{study.subtitle}</p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 border-t border-foreground pt-8 text-sm">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted">Role</div>
              <div className="mt-1 font-medium">{study.role}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted">Period</div>
              <div className="mt-1 font-medium">{study.period}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted">Stack</div>
              <div className="mt-1 font-medium">{study.stack.join(" · ")}</div>
            </div>
            <div className="flex flex-col gap-2 self-end ml-auto">
              {study.liveUrl && (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-b border-foreground pb-0.5 text-sm uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
                >
                  라이브 ↗
                </a>
              )}
              {study.githubUrl && (
                <a
                  href={study.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-b border-muted pb-0.5 text-sm uppercase tracking-[0.15em] text-muted transition-colors hover:border-foreground hover:text-foreground"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Sections */}
      {study.sections.map((section) => (
        <Section key={section.label} className="py-16 md:py-20">
          <FadeUp>
            <SectionLabel number={section.label}>{""}</SectionLabel>
            <h2 className="mt-6 text-[clamp(1.75rem,4vw,3.5rem)] font-black leading-tight tracking-tight">
              {section.heading}
            </h2>
          </FadeUp>
          <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed md:text-lg">
            {section.body.map((para, i) => (
              <FadeUp key={i} delay={0.05 * (i + 1)}>
                <p>{para}</p>
              </FadeUp>
            ))}
          </div>
        </Section>
      ))}

      {/* Takeaway */}
      <Section className="py-16 md:py-24">
        <FadeUp>
          <blockquote className="border-l-4 border-foreground pl-6 text-[clamp(1.25rem,3vw,2rem)] font-black leading-snug tracking-tight md:pl-10">
            &ldquo;{study.takeaway}&rdquo;
          </blockquote>
        </FadeUp>
      </Section>

      {/* Next Case */}
      {nextStudy && (
        <section className="border-t border-foreground px-6 py-16 md:px-12 md:py-20">
          <FadeUp>
            <div className="text-sm uppercase tracking-[0.15em] text-muted">
              Next Case
            </div>
            <Link
              href={`/work/${nextStudy.slug}`}
              className="group mt-4 block"
            >
              <div className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-none tracking-tight transition-colors hover:text-accent">
                {nextStudy.title} →
              </div>
              <div className="mt-2 text-muted">{nextStudy.subtitle}</div>
            </Link>
          </FadeUp>
        </section>
      )}

      <footer className="border-t border-foreground px-6 py-8 text-xs text-muted md:px-12">
        © 2026 Yeom Dong Hoon
      </footer>
    </>
  );
}
