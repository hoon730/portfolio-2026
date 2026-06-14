"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface PageTransitionCtx {
  navigateTo: (href: string) => void;
  /** true while the current page plays its exit animation before the route swaps */
  leaving: boolean;
  /** reliable current path (tracked here because usePathname can lag a client push) */
  currentPath: string;
}

const PageTransitionContext = createContext<PageTransitionCtx>({
  navigateTo: () => {},
  leaving: false,
  currentPath: "/",
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const LEAVE_HOME = 720;
const LEAVE_OTHER = 240;

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [leaving, setLeaving] = useState(false);
  // track the destination ourselves so header state is correct immediately
  const [currentPath, setCurrentPath] = useState(pathname);
  const busy = useRef(false);

  // keep in sync with the real pathname (covers back/forward + full loads)
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const navigateTo = useCallback(
    async (href: string) => {
      if (busy.current) return;
      busy.current = true;

      // 1. exit animation (home list folds, header lifts)
      setLeaving(true);
      await sleep(currentPath === "/" ? LEAVE_HOME : LEAVE_OTHER);

      // 2. swap route + commit the new path immediately
      setCurrentPath(href);
      router.push(href);
      await sleep(60);
      setLeaving(false);
      busy.current = false;
    },
    [router, currentPath]
  );

  return (
    <PageTransitionContext.Provider value={{ navigateTo, leaving, currentPath }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(PageTransitionContext);
