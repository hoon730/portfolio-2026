import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseStudy, caseStudies } from "@/content/case-studies";
import { TransitionLink } from "@/components/transition-link";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const nextStudy = getCaseStudy(study.next);

  return (
    <main
      className="min-h-screen"
      style={{ paddingTop: "6rem", paddingBottom: "12rem" }}
    >
      {/* ── Cover ── */}
      <section style={{ padding: "0 3.75rem 5rem" }}>
        <h1
          className="font-black tracking-tight leading-[0.9]"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 11rem)",
            color: "var(--color-foreground)",
          }}
        >
          {study.title}
        </h1>

        <p
          className="mt-4 text-xl font-medium"
          style={{ color: "var(--color-muted)" }}
        >
          {study.subtitle}
        </p>

        {/* Meta row */}
        <div
          className="mt-10 flex flex-wrap gap-x-12 gap-y-4 border-t pt-8 text-sm"
          style={{ borderColor: "var(--color-muted)" }}
        >
          <div>
            <div
              className="text-[0.7rem] uppercase tracking-[0.12em]"
              style={{ color: "var(--color-muted)" }}
            >
              Role
            </div>
            <div className="mt-1 font-medium" style={{ color: "var(--color-foreground)" }}>
              {study.role}
            </div>
          </div>
          <div>
            <div
              className="text-[0.7rem] uppercase tracking-[0.12em]"
              style={{ color: "var(--color-muted)" }}
            >
              Period
            </div>
            <div className="mt-1 font-medium" style={{ color: "var(--color-foreground)" }}>
              {study.period}
            </div>
          </div>
          <div>
            <div
              className="text-[0.7rem] uppercase tracking-[0.12em]"
              style={{ color: "var(--color-muted)" }}
            >
              Stack
            </div>
            <div className="mt-1 font-medium" style={{ color: "var(--color-foreground)" }}>
              {study.stack.join(" · ")}
            </div>
          </div>
          <div className="flex flex-col gap-2 self-end ml-auto">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-[0.12em] border-b pb-0.5 transition-opacity hover:opacity-60"
                style={{
                  borderColor: "var(--color-foreground)",
                  color: "var(--color-foreground)",
                }}
              >
                라이브 ↗
              </a>
            )}
            {study.githubUrl && (
              <a
                href={study.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-[0.12em] border-b pb-0.5 transition-opacity hover:opacity-60"
                style={{
                  borderColor: "var(--color-muted)",
                  color: "var(--color-muted)",
                }}
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>

        {/* Cover image */}
        {study.coverImage && (
          <div className="mt-12 w-full overflow-hidden rounded-sm" style={{ aspectRatio: "16/9", position: "relative" }}>
            <Image
              src={study.coverImage}
              alt={study.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </div>
        )}
      </section>

      {/* ── Sections ── */}
      {study.sections.map((section) => (
        <div key={section.label}>
          {/* Text section */}
          <section
            className="border-t"
            style={{
              padding: "4rem 3.75rem",
              borderColor: "var(--color-muted)",
            }}
          >
            <div
              className="text-[0.7rem] uppercase tracking-[0.15em] mb-4"
              style={{ color: "var(--color-muted)" }}
            >
              {section.label}
            </div>
            <h2
              className="font-black leading-tight tracking-tight"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 3.25rem)",
                color: "var(--color-foreground)",
              }}
            >
              {section.heading}
            </h2>
            <div className="mt-8 max-w-2xl space-y-5">
              {section.body.map((para, i) => (
                <p
                  key={i}
                  className="leading-relaxed"
                  style={{
                    fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                    color: "var(--color-muted)",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* Image modules after section text */}
          {section.images && section.images.length > 0 && (
            <div
              style={{ padding: "0 3.75rem 4rem" }}
              className={
                section.images.length > 1 && !section.images[0].wide
                  ? "grid grid-cols-2 gap-4"
                  : "flex flex-col gap-6"
              }
            >
              {section.images.map((img, idx) => (
                <figure
                  key={idx}
                  className={img.wide || section.images!.length === 1 ? "col-span-2" : ""}
                >
                  <div
                    className="overflow-hidden rounded-sm"
                    style={{
                      position: "relative",
                      aspectRatio: img.wide ? "16/9" : "4/3",
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt ?? section.heading}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  {img.caption && (
                    <figcaption
                      className="mt-3 text-[0.75rem] uppercase tracking-[0.1em]"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* ── Takeaway ── */}
      <section
        className="border-t"
        style={{
          padding: "4rem 3.75rem",
          borderColor: "var(--color-muted)",
        }}
      >
        <div
          className="text-[0.7rem] uppercase tracking-[0.15em] mb-6"
          style={{ color: "var(--color-muted)" }}
        >
          Takeaway
        </div>
        <blockquote
          className="font-black leading-snug tracking-tight"
          style={{
            fontSize: "clamp(1.25rem, 3vw, 2.25rem)",
            color: "var(--color-foreground)",
            borderLeft: "3px solid var(--color-foreground)",
            paddingLeft: "1.5rem",
          }}
        >
          &ldquo;{study.takeaway}&rdquo;
        </blockquote>
      </section>

      {/* ── Next project ── */}
      {nextStudy && (
        <section
          className="border-t"
          style={{
            padding: "4rem 3.75rem",
            borderColor: "var(--color-muted)",
          }}
        >
          <div
            className="text-[0.7rem] uppercase tracking-[0.15em] mb-4"
            style={{ color: "var(--color-muted)" }}
          >
            next project
          </div>
          <TransitionLink
            href={`/work/${nextStudy.slug}`}
            className="block"
          >
            <div
              className="font-black leading-none tracking-tight transition-opacity hover:opacity-60"
              style={{
                fontSize: "clamp(3rem, 9vw, 8rem)",
                color: "var(--color-foreground)",
              }}
            >
              {nextStudy.title} →
            </div>
            <div
              className="mt-2 text-sm"
              style={{ color: "var(--color-muted)" }}
            >
              {nextStudy.subtitle}
            </div>
          </TransitionLink>
        </section>
      )}
    </main>
  );
}
