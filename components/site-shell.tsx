"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { AboutDrawer } from "@/components/about-drawer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      {children}
      <SiteHeader onAboutToggle={() => setAboutOpen((p) => !p)} />
      <AboutDrawer open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
