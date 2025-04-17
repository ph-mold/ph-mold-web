"use client";

import { createContext, useContext, useRef, RefObject } from "react";

const StickyButtonRefContext =
  createContext<RefObject<HTMLDivElement | null> | null>(null);

export function StickyButtonProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <StickyButtonRefContext.Provider value={ref}>
      {children}
    </StickyButtonRefContext.Provider>
  );
}

export function useStickyButtonRef(): RefObject<HTMLDivElement | null> {
  const context = useContext(StickyButtonRefContext);
  if (!context) {
    throw new Error(
      "useStickyButtonRef must be used within StickyButtonProvider"
    );
  }
  return context;
}
