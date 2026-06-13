import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-start justify-center px-6 md:px-12">
      <div className="text-sm uppercase tracking-[0.15em] text-muted">404</div>
      <h1 className="mt-4 text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tight">
        Not Found
      </h1>
      <Link
        href="/"
        className="mt-10 inline-block border-b border-foreground pb-1 text-sm uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
      >
        ← Home
      </Link>
    </section>
  );
}
