import { SectionLabel } from "@/components/section-label";
import { HeroHeading } from "@/components/motion/hero-heading";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col px-6 py-8 md:px-12 md:py-10">
      <header>
        <SectionLabel number="00">Yeom Dong Hoon</SectionLabel>
      </header>

      <div className="flex flex-1 items-center py-16 md:py-12">
        <HeroHeading />
      </div>

      <footer className="grid grid-cols-1 gap-8 text-sm md:grid-cols-2 md:items-end">
        <div className="space-y-1">
          <div className="font-medium">Yeom Dong Hoon</div>
          <div className="text-muted">Frontend Developer · Seoul</div>
          <a
            href="mailto:ehdgns730@gmail.com"
            className="mt-3 inline-block border-b border-foreground pb-0.5 transition-colors hover:border-accent hover:text-accent"
          >
            ehdgns730@gmail.com
          </a>
        </div>
        <nav className="flex flex-col gap-3 md:items-end">
          <a
            href="#work"
            className="inline-block w-fit border-b border-foreground pb-1 text-sm uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
          >
            01 / Selected Work ↓
          </a>
          <a
            href="#contact"
            className="inline-block w-fit border-b border-muted pb-1 text-sm uppercase tracking-[0.15em] text-muted transition-colors hover:border-foreground hover:text-foreground"
          >
            02 / Contact
          </a>
        </nav>
      </footer>
    </section>
  );
}
