import { Hero } from "@/components/hero";
import { SelectedWorkCard } from "@/components/selected-work-card";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { SectionLabel } from "@/components/section-label";
import { FadeUp } from "@/components/motion/fade-up";
import { selectedWork, moreProjects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Selected Work */}
      <Section id="work" className="py-4">
        <FadeUp>
          <SectionLabel number="01">Selected Work</SectionLabel>
        </FadeUp>
        {selectedWork.map((project) => (
          <SelectedWorkCard key={project.slug} project={project} />
        ))}
      </Section>

      {/* More Projects */}
      <Section className="py-16 md:py-24">
        <FadeUp>
          <SectionLabel number="02">More Projects</SectionLabel>
        </FadeUp>
        <div className="mt-2">
          {moreProjects.map((project, i) => (
            <FadeUp key={project.slug} delay={i * 0.1}>
              <ProjectCard project={project} />
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* About */}
      <Section id="about" className="py-16 md:py-24">
        <FadeUp>
          <SectionLabel number="03">About</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="mt-12 max-w-2xl space-y-6 text-base leading-relaxed md:text-lg">
            <p>
              풋살 동호회에서 매주 부딪히던 팀 나누기 문제를 직접 풀어보다가,
              27명 중 16명이 쓰는 도구를 운영하게 됐습니다.
            </p>
            <p>
              이젠아카데미에서 프론트엔드·풀스택 과정을 거쳤고,
              올림플래닛 인턴 동안 사수에게{" "}
              <em>&quot;왜 이렇게 만들었는지 설명할 수 있어야 한다&quot;</em>는
              기준을 배웠습니다.
            </p>
            <p>
              만드는 일보다 운영하면서 알게 되는 일이 더 많다고 믿습니다.
              그래서 유저의 실제 행동을 확인하고 데이터 모델을 다시 쓰는 일을
              좋아합니다.
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "React",
              "TypeScript",
              "Next.js",
              "Tailwind",
              "Zustand",
              "Supabase",
              "Babylon.js",
              "PWA",
            ].map((skill) => (
              <span
                key={skill}
                className="border border-foreground px-3 py-1 text-sm uppercase tracking-wider"
              >
                {skill}
              </span>
            ))}
          </div>
        </FadeUp>
      </Section>

      {/* Contact */}
      <Section id="contact" className="border-t border-foreground py-16 md:py-24">
        <FadeUp>
          <SectionLabel number="04">Contact</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-8 text-[clamp(2rem,6vw,5rem)] font-black leading-tight tracking-tight">
            같이 만들어볼까요?
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-10">
            <a
              href="mailto:ehdgns730@gmail.com"
              className="inline-block border-b border-foreground pb-1 text-sm uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
            >
              ehdgns730@gmail.com ↗
            </a>
            <a
              href="https://github.com/hoon730"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b border-muted pb-1 text-sm uppercase tracking-[0.15em] text-muted transition-colors hover:border-foreground hover:text-foreground"
            >
              GitHub ↗
            </a>
          </div>
        </FadeUp>
      </Section>

      <footer className="border-t border-foreground px-6 py-8 text-xs text-muted md:px-12">
        © 2026 Yeom Dong Hoon
      </footer>
    </>
  );
}
