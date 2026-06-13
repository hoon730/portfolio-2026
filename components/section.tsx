import { clsx } from "clsx";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function Section({ children, id, className }: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "mx-auto w-full max-w-6xl px-6 md:px-12",
        className,
      )}
    >
      {children}
    </section>
  );
}
