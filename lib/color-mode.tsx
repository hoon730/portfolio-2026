"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type ColorMode = "night-mode" | "light-mode" | "ultra-mode";

interface ColorModeCtx {
  mode: ColorMode;
  setMode: (m: ColorMode) => void;
}

const ColorModeContext = createContext<ColorModeCtx>({
  mode: "night-mode",
  setMode: () => {},
});

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ColorMode>("ultra-mode");

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("color-mode") as ColorMode | null;
    if (saved) setModeState(saved);
  }, []);

  // Apply class to body whenever mode changes
  useEffect(() => {
    document.body.classList.remove("night-mode", "light-mode", "ultra-mode");
    document.body.classList.add(mode);
    localStorage.setItem("color-mode", mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, setMode: setModeState }}>
      {children}
    </ColorModeContext.Provider>
  );
}

export const useColorMode = () => useContext(ColorModeContext);
