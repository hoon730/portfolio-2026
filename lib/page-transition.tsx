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
  // intro curtain covers the screen on first paint, then lifts
  const [opacity, setOpacity] = useState(1);
  const [visible, setVisible] = useState(true);
  const [duration, setDuration] = useState(0.7);
  const busy = useRef(false);

  // ── intro reveal on mount ──
  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    // hold the curtain briefly, then fade it out
    t1 = setTimeout(() => {
      setDuration(0.7);
      setOpacity(0);
    }, 120);
    t2 = setTimeout(() => setVisible(false), 950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const navigateTo = useCallback(
    async (href: string) => {
      if (busy.current) return;
      busy.current = true;

      // 1. Show curtain
      setVisible(true);
      setDuration(0.45);
      setOpacity(1);
      await sleep(480);

      // 2. Navigate
      router.push(href);
      await sleep(280);

      // 3. Hide curtain
      setDuration(0.6);
      setOpacity(0);
      await sleep(650);

      setVisible(false);
      busy.current = false;
    },
    [router]
  );

  return (
    <PageTransitionContext.Provider value={{ navigateTo, isTransitioning: busy.current }}>
      {children}
      {visible && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{ backgroundColor: "var(--color-background)", zIndex: 200 }}
          animate={{ opacity }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </PageTransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(PageTransitionContext);
