"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "@ph-mold/ph-ui";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const bannerScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const bannerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{
        scale: bannerScale,
        opacity: bannerOpacity
      }}
      id="메인"
      className="relative h-[500px] overflow-hidden md:h-[600px]"
    >
      {/* 연무 효과 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-mist absolute h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E0F7FA] opacity-30" />
        <div className="animate-mist absolute h-[170%] w-[170%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#BBDEFB] opacity-25" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-foreground mb-6 text-center text-5xl font-bold md:text-7xl"
        >
          팜앤몰드
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-foreground2 mb-8 max-w-[800px] text-center text-xl md:text-2xl"
        >
          프리미엄 화장품 패키징의 새로운 기준을 만듭니다
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-4"
        >
          <Link href="/products">
            <Button>제품 보기</Button>
          </Link>
          <Link href="/about">
            <Button variant="outlined">회사 소개</Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
