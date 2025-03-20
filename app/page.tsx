"use client";
import ButtonWithArrow from "@/components/ButtonWithArrow";
import ProductGrid from "@/components/ProductGrid";
import StickyNav from "@/components/StickyNav";
import { useEffect, useRef, useState } from "react";

const products = [
  { id: "1", name: "주사기", image: "/sample1.png" },
  { id: "2", name: "앰플", image: "/sample1.png" },
  { id: "3", name: "바이알", image: "/sample1.png" },
  { id: "4", name: "청결제주사기", image: "/sample1.png" },
];

export default function Home() {
  const texts = ["Premium cosmetics packaging", "프리미엄 화장품 패키징"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const parentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true); // 애니메이션 시작

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsAnimating(false); // 애니메이션 종료 후 텍스트 변경
      }, 1000); // 애니메이션 지속 시간 (1s) 후 텍스트 변경
    }, 4000); // 4초 주기로 변경

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main>
      <div ref={parentRef}>
        <div
          id="메인"
          className="w-full h-svh flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute w-full max-w-[1080px] text-center">
            <div className="relative w-full flex items-center justify-center transition-all duration-500 lg:h-[80px] h-[52px]">
              {texts.map((text, index) => (
                <p
                  key={index}
                  className={`absolute w-full lg:text-5xl md:text-4xl text-2xl font-semibold transition-opacity duration-1000 ${
                    currentIndex === index
                      ? isAnimating
                        ? "opacity-0 animate-fade-out"
                        : "opacity-100 animate-fade-in"
                      : "opacity-0"
                  }`}
                >
                  {text}
                </p>
              ))}
            </div>

            <p className="text-base md:text-lg text-foreground2">
              Cosmetics container subsidiary material
            </p>
            <div className="flex flex-row space-x-3 mt-4 justify-center">
              <ButtonWithArrow>제품 보기</ButtonWithArrow>
              <ButtonWithArrow>문의하기</ButtonWithArrow>
            </div>
          </div>

          {/* 블루 연무 효과 */}
          <div className="absolute inset-0 pointer-events-none z-[-1]">
            <div className="absolute w-[200%] h-[200%] bg-[#E0F7FA] opacity-30 animate-mist rounded-full"></div>
            <div className="absolute w-[170%] h-[170%] bg-[#BBDEFB] opacity-25 animate-mist rounded-full"></div>
          </div>
        </div>
        <div id="제품" className="h-fit min-h-svh">
          <p className="text-3xl text-center pt-[70px] mb-8">제품</p>
          <ProductGrid products={products} />
          <div className="mx-auto w-fit my-10">
            <ButtonWithArrow>더보기</ButtonWithArrow>
          </div>
        </div>
        <div id="문의" className="h-svh bg-[#ebf4fa]" />
      </div>
      {parentRef && (
        <div className="hidden md:block">
          <StickyNav sectionsContainerRef={parentRef} />
        </div>
      )}
    </main>
  );
}
