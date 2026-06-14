"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface PageTransitionCtx {
  navigateTo: (href: string) => void;
  /** true while the current page plays its exit animation before the route swaps */
  leaving: boolean;
}

const PageTransitionContext = createContext<PageTransitionCtx>({
  navigateTo: () => {},
  leaving: false,
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// time the home list takes to fold away before navigating
const LEAVE_HOME = 720;
const LEAVE_OTHER = 240;

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [leaving, setLeaving] = useState(false);
  const busy = useRef(false);

  const navigateTo = useCallback(
    async (href: string) => {
      if (busy.current) return;
      busy.current = true;

      // 1. play the exit animation (home list folds back, header lifts up)
      setLeaving(true);
      await sleep(pathname === "/" ? LEAVE_HOME : LEAVE_OTHER);

      // 2. swap route — the new page plays its own entrance
      router.push(href);
      await sleep(60);
      setLeaving(false);
      busy.current = false;
    },
    [router, pathname]
  );

  return (
    <PageTransitionContext.Provider value={{ navigateTo, leaving }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(PageTransitionContext);
