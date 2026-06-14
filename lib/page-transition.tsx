"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
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
  const [opacity, setOpacity] = useState(0);
  const [visible, setVisible] = useState(false);
  const [duration, setDuration] = useState(0.45);
  const busy = useRef(false);

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
