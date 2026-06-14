"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface PageTransitionCtx {
  navigateTo: (href: string) => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionCtx>({
  navigateTo: () => {},
  isTransitioning: false,
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // curtain is always mounted; only its opacity changes (smooth both ways)
  const [opacity, setOpacity] = useState(1); // covers on first paint
  const [coverDur, setCoverDur] = useState(0.7);
  const busy = useRef(false);

  // ── intro: lift the curtain on mount ──
  useEffect(() => {
    const t = setTimeout(() => {
      setCoverDur(0.7);
      setOpacity(0);
    }, 120);
    return () => clearTimeout(t);
  }, []);

  const navigateTo = useCallback(
    async (href: string) => {
      if (busy.current) return;
      busy.current = true;

      // 1. cover (fade curtain in)
      setCoverDur(0.5);
      setOpacity(1);
      await sleep(560);

      // 2. swap the page underneath the cover
      router.push(href);
      await sleep(420);

      // 3. reveal (fade curtain out)
      setCoverDur(0.7);
      setOpacity(0);
      await sleep(720);

      busy.current = false;
    },
    [router]
  );

  return (
    <PageTransitionContext.Provider value={{ navigateTo, isTransitioning: busy.current }}>
      {children}
      <motion.div
        aria-hidden
        className="fixed inset-0"
        style={{
          backgroundColor: "var(--color-background)",
          zIndex: 200,
          pointerEvents: "none",
        }}
        initial={false}
        animate={{ opacity }}
        transition={{ duration: coverDur, ease: EASE_OUT_EXPO }}
      />
    </PageTransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(PageTransitionContext);
