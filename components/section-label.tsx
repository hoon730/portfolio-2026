import { clsx } from "clsx";

interface SectionLabelProps {
  number: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ number, children, className }: SectionLabelProps) {
  return (
    <div
      className={clsx(
        "flex items-baseline gap-3 text-sm font-medium uppercase tracking-[0.1em]",
        className,
      )}
    >
      <span className="text-muted">{number}</span>
      <span className="text-foreground">{children}</span>
    </div>
  );
}
