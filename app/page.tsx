"use client";
import { ReactNode, useEffect, useState } from "react";

interface ButtonWithArrowProps {
  children: ReactNode;
}

export function ButtonWithArrow({ children }: ButtonWithArrowProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="px-8 py-3 bg-signature text-white font-medium rounded-full flex items-center justify-center relative overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="transition-all duration-300">{children}</span>

      {/* 화살표 아이콘 - 기본적으로 숨김, 마우스 오버 시 나타남 */}
      <svg
        className={`absolute size-4 left-full top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
          hovered ? "opacity-100 -translate-x-6" : "opacity-0"
        }`}
        fill="#ffffff"
        viewBox="0 0 330 330"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
          c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
          C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
          C255,161.018,253.42,157.202,250.606,154.389z"
        />
      </svg>
    </button>
  );
}

export default function Home() {
  const texts = ["Premium cosmetics packaging", "프리미엄 화장품 패키징"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
      <div className="w-full h-svh flex items-center justify-center relative overflow-hidden top-[-64px]">
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
      <div className="h-svh " />
    </main>
  );
}
