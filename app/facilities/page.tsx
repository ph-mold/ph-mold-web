"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SectionTitle } from "@/components/about/SectionTitle";
import StickyNav from "@/components/common/StickyNav";
import { imageLoader } from "@/lib/imageLoader";

const FACILITIES = [
  {
    id: "pp-filling",
    title: "PP 충진기",
    image: "/images/facilities/pp-filling.png",
    description: "고품질 PP 충진 시스템"
  },
  {
    id: "detector",
    title: "검출기",
    image: "/images/facilities/detector.png",
    description: "정밀한 품질 검사 시스템"
  },
  {
    id: "labeler",
    title: "라벨기",
    image: "/images/facilities/labeler.png",
    description: "자동화된 라벨링 시스템"
  },

  {
    id: "ampoule-filling",
    title: "앰플충진기",
    image: "/images/facilities/ampoule-filling.png",
    description: "정밀한 앰플 충진 시스템"
  },
  {
    id: "syringe-filling",
    title: "주사기 충진기",
    image: "/images/facilities/syringe-filling.png",
    description: "첨단 주사기 충진 설비"
  }
];

export default function Facilities() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const bannerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const bannerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="flex h-full flex-col overflow-x-hidden overflow-y-auto"
    >
      <StickyNav sectionsContainerRef={containerRef} />
      <div className="mx-auto w-full">
        {/* 생산설비 배너 */}
        <motion.section
          id="생산설비"
          style={{
            scale: bannerScale,
            opacity: bannerOpacity
          }}
          className="relative h-[500px] overflow-hidden md:h-[600px]"
        >
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
              생산설비
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-foreground2 max-w-[800px] text-center text-xl md:text-2xl"
            >
              최첨단 설비로 최고의 품질을 보장합니다
            </motion.p>
          </div>
        </motion.section>

        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-10">
          <div className="space-y-32">
            {/* 설비 목록 */}
            <section id="설비목록" className="relative">
              <SectionTitle
                title="주요 설비"
                subtitle="최신 기술로 구현하는 완벽한 생산 시스템"
              />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {FACILITIES.map((facility) => (
                  <div
                    key={facility.id}
                    className="border-background2 group h-fit overflow-hidden rounded-2xl border bg-white shadow-lg transition-all duration-200 hover:shadow-xl"
                  >
                    <div className="relative h-[300px] w-full overflow-hidden">
                      <Image
                        loader={imageLoader}
                        src={facility.image}
                        alt={facility.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="mb-4 text-2xl font-bold">
                        {facility.title}
                      </h3>
                      <p className="text-foreground2">{facility.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
