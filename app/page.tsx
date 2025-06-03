"use client";

import ContactSection from "@/components/home/ContactSection";
import HeroSection from "@/components/home/HeroSection";
import ProductCategorySection from "@/components/home/ProductCategorySection";
import StickyNav from "@/components/common/StickyNav";
import WhyPMSection from "@/components/home/WhyPMSection";
import { useRef } from "react";

export default function Home() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <div ref={parentRef}>
        <HeroSection />
        <ProductCategorySection />
        <WhyPMSection />
        <ContactSection />
      </div>
      {parentRef && (
        <div className="hidden md:block">
          <StickyNav sectionsContainerRef={parentRef} />
        </div>
      )}
    </>
  );
}
