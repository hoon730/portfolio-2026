"use client";

import { usePageTransition } from "@/lib/page-transition";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TransitionLink({ href, children, className, style }: Props) {
  const { navigateTo } = usePageTransition();

  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        navigateTo(href);
      }}
    >
      {children}
    </a>
  );
}
