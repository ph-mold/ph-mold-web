"use client";
import ButtonWithArrow from "@/components/home/ButtonWithArrow";
import HeroSection from "@/components/home/HeroSection";
import ProductGrid from "@/components/home/ProductGrid";
import StickyNav from "@/components/home/StickyNav";
import { useRef } from "react";

const products = [
  { id: "1", name: "주사기", image: "/sample1.png" },
  { id: "2", name: "앰플", image: "/sample1.png" },
  { id: "3", name: "바이알", image: "/sample1.png" },
  { id: "4", name: "청결제주사기", image: "/sample1.png" },
];

export default function Home() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  return (
    <main>
      <div ref={parentRef}>
        <HeroSection />
        <section id="제품" className="h-fit min-h-svh">
          <p className="text-3xl text-center pt-[70px] mb-8">제품</p>
          <ProductGrid products={products} />
          <div className="mx-auto w-fit my-10">
            <ButtonWithArrow>더보기</ButtonWithArrow>
          </div>
        </section>
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
