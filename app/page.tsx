"use client";

import HeroSection from "@/components/home/HeroSection";
import ProductCategorySection from "@/components/home/ProductSection";
import StickyNav from "@/components/home/StickyNav";
import { useRef } from "react";

export default function Home() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  return (
    <main>
      <div ref={parentRef}>
        <HeroSection />
        <ProductCategorySection />
        <section id="문의" className="h-svh bg-[#ebf4fa]" />
      </div>
      {parentRef && (
        <div className="hidden md:block">
          <StickyNav sectionsContainerRef={parentRef} />
        </div>
      )}
    </main>
  );
}
