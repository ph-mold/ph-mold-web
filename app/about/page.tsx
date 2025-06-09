"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IconCard } from "@/components/about/IconCard";
import { SectionTitle } from "@/components/about/SectionTitle";
import { CoreValueCard } from "@/components/about/CoreValueCard";
import {
  COMPANY_HISTORY,
  COMPANY_INFO,
  CORE_VALUES
} from "@/components/about/constants";
import StickyNav from "@/components/common/StickyNav";

export default function About() {
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
        {/* 회사 소개 배너 */}
        <motion.section
          id="소개"
          style={{
            scale: bannerScale,
            opacity: bannerOpacity
          }}
          className="relative h-[500px] overflow-hidden md:h-[600px]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="animate-mist bg-mist-primary absolute h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30" />
            <div className="animate-mist bg-mist-secondary absolute h-[170%] w-[170%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25" />
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
              className="text-foreground2 max-w-[800px] text-center text-xl md:text-2xl"
            >
              프리미엄 화장품 패키징의 새로운 기준을 만듭니다
            </motion.p>
          </div>
        </motion.section>

        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-10">
          <div className="space-y-32">
            {/* 회사 개요 */}
            <section id="개요" className="relative">
              <SectionTitle
                title="회사 개요"
                subtitle="혁신적인 기술로 미래를 선도합니다"
              />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="border-background2 bg-background h-fit rounded-2xl border p-8 shadow-lg transition-all duration-200 hover:shadow-xl">
                  {COMPANY_INFO.slice(0, 3).map((info, index) => (
                    <IconCard
                      key={index}
                      icon={<info.icon />}
                      title={info.value}
                      subtitle={info.label}
                      iconBgColor={info.bgColor}
                      iconColor={info.iconColor}
                      className={index === 2 ? "!mb-0" : "mb-8"}
                    />
                  ))}
                </div>
                <div className="border-background2 bg-background h-fit rounded-2xl border p-8 shadow-lg transition-all duration-200 hover:shadow-xl">
                  {COMPANY_INFO.slice(3).map((info, index) => (
                    <IconCard
                      key={index}
                      icon={<info.icon />}
                      title={info.value}
                      subtitle={info.label}
                      iconBgColor={info.bgColor}
                      iconColor={info.iconColor}
                      className={index === 2 ? "!mb-0" : "mb-8"}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 핵심 가치 */}
            <section id="가치">
              <SectionTitle title="핵심 가치" subtitle="우리가 추구하는 가치" />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {CORE_VALUES.map((value, index) => (
                  <CoreValueCard key={index} value={value} index={index} />
                ))}
              </div>
            </section>

            {/* 연혁 */}
            <section id="연혁" className="relative">
              <SectionTitle title="연혁" subtitle="우리의 발자취입니다" />
              <div className="relative">
                {/* 타임라인 라인 */}
                <div className="to-signature from-signature absolute left-4 h-full w-0.5 bg-gradient-to-b md:left-1/2 md:-translate-x-1/2" />

                {COMPANY_HISTORY.map((item, index) => (
                  <div
                    key={index}
                    className="relative mb-16 flex w-full flex-col md:flex-row md:items-center"
                  >
                    {/* 모바일: 타임라인 점 */}
                    <div className="absolute left-4 flex h-12 w-12 -translate-x-1/2 items-center justify-center md:hidden">
                      <div
                        className={`absolute h-12 w-12 rounded-full bg-gradient-to-r ${item.gradient} opacity-20`}
                      />
                      <div className="bg-background absolute h-8 w-8 rounded-full shadow-md" />
                      <div
                        className={`absolute h-4 w-4 rounded-full bg-gradient-to-r ${item.gradient}`}
                      />
                    </div>

                    {/* 데스크톱: 타임라인 점 */}
                    <div className="absolute left-1/2 hidden h-12 w-12 -translate-x-1/2 items-center justify-center md:flex">
                      <div
                        className={`absolute h-12 w-12 rounded-full bg-gradient-to-r ${item.gradient} opacity-20`}
                      />
                      <div className="bg-background absolute h-8 w-8 rounded-full shadow-md" />
                      <div
                        className={`absolute h-4 w-4 rounded-full bg-gradient-to-r ${item.gradient}`}
                      />
                    </div>

                    {/* 컨텐츠 */}
                    <div
                      className={`w-full px-8 pl-16 md:w-1/2 md:px-0 ${
                        index % 2 === 0
                          ? "md:pr-16 md:text-right"
                          : "md:ml-auto md:pl-16 md:text-left"
                      }`}
                    >
                      <div className="border-background2 bg-background w-full overflow-hidden rounded-2xl border p-6 shadow-lg transition-all duration-200 hover:shadow-xl md:inline-block md:max-w-fit md:min-w-[320px]">
                        <div
                          className={`mb-4 inline-flex rounded-xl bg-gradient-to-r ${item.gradient} text-reverseForeground p-3`}
                        >
                          {item.icon}
                        </div>
                        <div className="text-signature mb-2 text-lg font-bold">
                          {item.year}
                        </div>
                        <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                        <p className="text-foreground2">{item.description}</p>
                      </div>
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
