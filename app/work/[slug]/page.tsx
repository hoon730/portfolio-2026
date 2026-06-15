import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseStudy, caseStudies } from "@/content/case-studies";
import { Reveal } from "@/components/reveal";
import { NextProject } from "@/components/next-project";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

// shared centered text column (vanholtz narrow copy column)
const COL: React.CSSProperties = {
  maxWidth: "760px",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
};

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const nextStudy = getCaseStudy(study.next);

  return (
    <main className="pt-[24vh] max-md:pt-[13vh]" style={{ paddingBottom: "16vh" }}>
      {/* ── Cover ── */}
      <section style={{ ...COL, maxWidth: "1100px" }}>
        <Reveal y={60}>
          <h1
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(2.75rem, 9vw, 7.5rem)",
              letterSpacing: "0.005em",
              lineHeight: 0.92,
              textTransform: "uppercase",
              color: "var(--color-foreground)",
            }}
          >
            {study.title}
          </h1>
          <p
            className="mt-5"
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              fontWeight: 500,
              color: "var(--color-muted)",
            }}
          >
            {study.subtitle}
          </p>
        </Reveal>

        {/* Meta row */}
        <Reveal y={40} delay={0.1}>
          <div
            className="mt-12 flex flex-wrap gap-x-12 gap-y-5 border-t pt-8"
            style={{ borderColor: "var(--color-muted)" }}
          >
            <Meta label="Role" value={study.role} />
            <Meta label="Period" value={study.period} />
            <Meta label="Stack" value={study.stack.join(" · ")} />
            <div className="flex flex-col gap-2 self-end ml-auto">
              {study.liveUrl && <ExtLink href={study.liveUrl} label="라이브 ↗" strong />}
              {study.githubUrl && <ExtLink href={study.githubUrl} label="GitHub ↗" />}
            </div>
          </div>
        </Reveal>

        {study.coverImage && (
          <Reveal y={80} delay={0.15}>
            <Figure src={study.coverImage} alt={study.title} ratio="16/9" className="mt-14" />
          </Reveal>
        )}
      </section>

      {/* ── Sections ── */}
      {study.sections.map((section) => (
        <div key={section.label}>
          {/* narrow copy column */}
          <section style={{ ...COL, marginTop: "16vh" }}>
            <Reveal y={70}>
              <div
                className="text-[0.7rem] uppercase tracking-[0.18em] mb-5"
                style={{ color: "var(--color-muted)" }}
              >
                {section.label}
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3.4vw, 2.75rem)",
                  fontWeight: 800,
                  lineHeight: 1.06,
                  letterSpacing: "-0.01em",
                  color: "var(--color-foreground)",
                }}
              >
                {section.heading}
              </h2>
              <div className="mt-7 space-y-5">
                {section.body.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
                      lineHeight: 1.65,
                      color: "var(--color-muted)",
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          </section>

          {/* wide media for this section */}
          {section.images && section.images.length > 0 && (
            <section
              style={{
                maxWidth: "calc(1440px + 12vw)",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "8vh",
                paddingLeft: "6vw",
                paddingRight: "6vw",
              }}
              className={
                section.images.length > 1 && !section.images[0].wide
                  ? "grid grid-cols-1 md:grid-cols-2 gap-5"
                  : "flex flex-col gap-12"
              }
            >
              {section.images.map((img, idx) => (
                <Reveal key={idx} y={70}>
                  <Figure
                    src={img.src}
                    alt={img.alt ?? section.heading}
                    ratio={img.wide ? "16/9" : "4/3"}
                    caption={img.caption}
                  />
                </Reveal>
              ))}
            </section>
          )}
        </div>
      ))}

      {/* ── Takeaway ── */}
      <section style={{ ...COL, marginTop: "18vh" }}>
        <Reveal y={60}>
          <div
            className="text-[0.7rem] uppercase tracking-[0.18em] mb-7"
            style={{ color: "var(--color-muted)" }}
          >
            Takeaway
          </div>
          <blockquote
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
              fontWeight: 800,
              lineHeight: 1.22,
              letterSpacing: "-0.01em",
              color: "var(--color-foreground)",
              borderLeft: "3px solid var(--color-foreground)",
              paddingLeft: "1.5rem",
            }}
          >
            &ldquo;{study.takeaway}&rdquo;
          </blockquote>
        </Reveal>
      </section>

      {/* ── Next project ── */}
      {nextStudy && (
        <NextProject
          slug={nextStudy.slug}
          title={nextStudy.title}
          subtitle={nextStudy.subtitle}
        />
      )}
    </main>
  );
}

/* ── small presentational helpers ── */

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="text-[0.7rem] uppercase tracking-[0.12em]"
        style={{ color: "var(--color-muted)" }}
      >
        {label}
      </div>
      <div className="mt-1 font-medium" style={{ color: "var(--color-foreground)" }}>
        {value}
      </div>
    </div>
  );
}

function ExtLink({ href, label, strong }: { href: string; label: string; strong?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm uppercase tracking-[0.12em] border-b pb-0.5 transition-opacity hover:opacity-60"
      style={{
        borderColor: strong ? "var(--color-foreground)" : "var(--color-muted)",
        color: strong ? "var(--color-foreground)" : "var(--color-muted)",
      }}
    >
      {label}
    </a>
  );
}

function Figure({
  src,
  alt,
  ratio,
  caption,
  className,
}: {
  src: string;
  alt: string;
  ratio: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div
        className="overflow-hidden rounded-sm"
        style={{ position: "relative", aspectRatio: ratio, background: "rgba(0,0,0,0.08)" }}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 80vw" />
      </div>
      {caption && (
        <figcaption
          className="mt-3 text-[0.75rem] uppercase tracking-[0.1em]"
          style={{ color: "var(--color-muted)" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
