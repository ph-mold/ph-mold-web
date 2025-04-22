"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@ph-mold/ph-ui";

const TITLES = ["Premium cosmetics packaging", "프리미엄 화장품 패키징"];

// 애니메이션 타이밍 상수
const FADE_DURATION = 1000; // ms (1초 동안 페이드 인/아웃)
const SWITCH_INTERVAL = 4000; // ms (4초마다 교체)

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % TITLES.length);
        setIsAnimating(false);
      }, FADE_DURATION);

      return () => clearTimeout(timeout);
    }, SWITCH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="메인"
      className="relative -top-16 flex min-h-svh items-center justify-center overflow-hidden"
    >
      <div className="w-full text-center">
        {/* 타이틀 */}
        <div className="relative flex h-[52px] items-center justify-center lg:h-[80px]">
          {TITLES.map((text, index) => {
            const isActive = currentIndex === index;
            const shouldAnimateOut = isActive && isAnimating;

            return (
              <p
                key={index}
                className={`absolute w-full text-2xl font-semibold transition-opacity duration-1000 md:text-4xl lg:text-5xl ${
                  isActive
                    ? shouldAnimateOut
                      ? "animate-fade-out opacity-0"
                      : "animate-fade-in opacity-100"
                    : "opacity-0"
                }`}
              >
                {text}
              </p>
            );
          })}
        </div>

        {/* 서브 텍스트 */}
        <p className="text-foreground2 mt-2 text-sm md:text-lg">
          Cosmetics container subsidiary material
        </p>

        {/* 버튼 */}
        <div className="mt-4 flex justify-center space-x-3">
          <Link href={"/products"}>
            <Button>제품 보기</Button>
          </Link>
          <Button disabled>문의하기</Button>
        </div>
      </div>

      {/* 연무 효과 */}
      <div className="pointer-events-none absolute inset-0 z-[-1]">
        <div className="animate-mist absolute h-[200%] w-[200%] rounded-full bg-[#E0F7FA] opacity-30" />
        <div className="animate-mist absolute h-[170%] w-[170%] rounded-full bg-[#BBDEFB] opacity-25" />
      </div>
    </section>
  );
}
