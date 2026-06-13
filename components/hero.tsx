import { Section } from "@/components/section";
import { SectionLabel } from "@/components/section-label";

export function Hero() {
  return (
    <Section className="py-24 md:py-40">
      <SectionLabel number="00">Yeom Dong Hoon</SectionLabel>

      <h1 className="mt-12 text-6xl font-black leading-[0.95] tracking-tight md:text-[clamp(4rem,11vw,10rem)]">
        제품을 운영까지
        <br />
        책임지는 프론트엔드
      </h1>

      <p className="mt-12 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
        유저를 보고 데이터 모델을 다시 쓰고,
        <br />
        왜 이렇게 만들었는지 설명할 수 있는 코드를 씁니다.
      </p>

      <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:gap-8">
        <a
          href="#work"
          className="inline-flex w-fit items-center gap-2 border-b border-foreground pb-1 text-sm font-medium uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
        >
          작업 보기 ↓
        </a>
        <a
          href="#contact"
          className="inline-flex w-fit items-center gap-2 border-b border-muted pb-1 text-sm font-medium uppercase tracking-[0.15em] text-muted transition-colors hover:border-foreground hover:text-foreground"
        >
          연락하기
        </a>
      </div>
    </Section>
  );
}
