"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { AboutDrawer } from "@/components/about-drawer";
import { PageTransitionProvider } from "@/lib/page-transition";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <PageTransitionProvider>
      {children}
      <SiteHeader onAboutToggle={() => setAboutOpen((p) => !p)} />
      <AboutDrawer open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </PageTransitionProvider>
  );
}
