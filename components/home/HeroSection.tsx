"use client";

import { useEffect, useState } from "react";
import ButtonWithArrow from "./ButtonWithArrow";

export default function HeroSection() {
  const texts = ["Premium cosmetics packaging", "프리미엄 화장품 패키징"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="메인"
      className="relative flex items-center justify-center min-h-svh overflow-hidden"
    >
      {/* 콘텐츠 영역 */}
      <div className="w-full text-center">
        {/* 타이틀 영역 */}
        <div className="relative flex items-center justify-center h-[52px] lg:h-[80px] transition-all duration-500">
          {texts.map((text, index) => (
            <p
              key={index}
              className={`absolute w-full font-semibold text-2xl md:text-4xl lg:text-5xl transition-opacity duration-1000
                ${
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

        {/* 서브 텍스트 */}
        <p className="mt-2 text-sm md:text-lg text-foreground2">
          Cosmetics container subsidiary material
        </p>

        {/* 버튼 영역 */}
        <div className="mt-4 flex justify-center space-x-3">
          <ButtonWithArrow>제품 보기</ButtonWithArrow>
          <ButtonWithArrow>문의하기</ButtonWithArrow>
        </div>
      </div>

      {/* 백그라운드 연무 효과 */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <div className="absolute w-[200%] h-[200%] bg-[#E0F7FA] opacity-30 rounded-full animate-mist" />
        <div className="absolute w-[170%] h-[170%] bg-[#BBDEFB] opacity-25 rounded-full animate-mist" />
      </div>
    </section>
  );
}
