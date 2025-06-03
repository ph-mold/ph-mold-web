"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Rocket,
  HandshakeIcon,
  Building2,
  Calendar,
  Users,
  MapPin,
  Phone,
  Briefcase,
  Target,
  Lightbulb,
  Gem
} from "lucide-react";

const COMPANY_HISTORY = [
  {
    year: "2024",
    title: "P&M Mold 설립",
    description: "화장품 용기 제조 사업 시작",
    icon: <Rocket />,
    gradient: "from-sky-300 to-blue-400"
  },
  {
    year: "2024",
    title: "생산 시설 구축",
    description: "최신 설비 도입 및 생산라인 구축",
    icon: <Building2 />,
    gradient: "from-violet-300 to-purple-400"
  },
  {
    year: "2023",
    title: "사업 계획 수립",
    description: "시장 조사 및 연구",
    icon: <Target />,
    gradient: "from-rose-300 to-pink-400"
  },
  {
    year: "2023",
    title: "기술 연구소 설립",
    description: "연구개발 인프라 구축",
    icon: <Lightbulb />,
    gradient: "from-emerald-300 to-teal-400"
  }
];

const CORE_VALUES = [
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "혁신",
    description: "끊임없는 연구개발을 통한 혁신적인 제품 개발",
    gradient: "from-amber-300 to-orange-400"
  },
  {
    icon: <HandshakeIcon className="h-8 w-8" />,
    title: "신뢰",
    description: "고객과의 신뢰를 바탕으로 한 장기적인 파트너십",
    gradient: "from-sky-300 to-blue-400"
  },
  {
    icon: <Gem className="h-8 w-8" />,
    title: "품질",
    description: "최고의 품질을 위한 철저한 품질 관리",
    gradient: "from-violet-300 to-purple-400"
  }
];

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
      <div className="mx-auto w-full">
        {/* 회사 소개 배너 */}
        <motion.section
          style={{
            scale: bannerScale,
            opacity: bannerOpacity
          }}
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
              className="text-foreground2 max-w-[800px] text-center text-xl md:text-2xl"
            >
              프리미엄 화장품 패키징의 새로운 기준을 만듭니다
            </motion.p>
          </div>
        </motion.section>

        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-10">
          <div className="space-y-32">
            {/* 회사 개요 */}
            <section className="relative">
              <div className="mb-16 text-center">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 text-4xl font-bold md:text-5xl"
                >
                  회사 개요
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-foreground2 text-lg"
                >
                  혁신적인 기술로 미래를 선도합니다
                </motion.p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="border-background2 rounded-2xl border bg-white p-8 shadow-lg transition-all duration-200 hover:shadow-xl">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-300">
                      <Building2 className="h-6 w-6 text-sky-700" />
                    </div>
                    <div>
                      <h3 className="text-foreground2 text-sm font-medium">
                        회사명
                      </h3>
                      <p className="text-xl font-bold">(주)팜앤몰드</p>
                    </div>
                  </div>
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-300">
                      <Calendar className="h-6 w-6 text-emerald-700" />
                    </div>
                    <div>
                      <h3 className="text-foreground2 text-sm font-medium">
                        설립일
                      </h3>
                      <p className="text-xl font-bold">2025년</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-300">
                      <Users className="h-6 w-6 text-purple-800" />
                    </div>
                    <div>
                      <h3 className="text-foreground2 text-sm font-medium">
                        대표이사
                      </h3>
                      <p className="text-xl font-bold">이건영</p>
                    </div>
                  </div>
                </div>

                <div className="border-background2 rounded-2xl border bg-white p-8 shadow-lg transition-all duration-200 hover:shadow-xl">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-300">
                      <Briefcase className="h-6 w-6 text-orange-800" />
                    </div>
                    <div>
                      <h3 className="text-foreground2 text-sm font-medium">
                        주요 사업
                      </h3>
                      <p className="text-xl font-bold">
                        화장품 용기 제조, 금형 설계 및 제작
                      </p>
                    </div>
                  </div>
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-300">
                      <MapPin className="h-6 w-6 text-red-800" />
                    </div>
                    <div>
                      <h3 className="text-foreground2 text-sm font-medium">
                        주소
                      </h3>
                      <p className="text-xl font-bold">
                        경기도 안양시 동안구 흥안대로 457-27, 1105호
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-300">
                      <Phone className="h-6 w-6 text-teal-800" />
                    </div>
                    <div>
                      <h3 className="text-foreground2 text-sm font-medium">
                        연락처
                      </h3>
                      <p className="text-xl font-bold">010-5254-5147</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 핵심 가치 */}
            <section className="relative">
              <div className="mb-16 text-center">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 text-4xl font-bold md:text-5xl"
                >
                  핵심 가치
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-foreground2 text-lg"
                >
                  우리가 추구하는 가치입니다
                </motion.p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {CORE_VALUES.map((value, i) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.1 }}
                    className="group border-background2 relative overflow-hidden rounded-2xl border bg-white p-8 shadow-lg transition-all duration-200 hover:shadow-xl"
                  >
                    <div className="relative z-10">
                      <div
                        className={`mb-6 inline-flex rounded-xl bg-gradient-to-r ${value.gradient} p-3 text-white`}
                      >
                        {value.icon}
                      </div>
                      <h3 className="mb-4 text-2xl font-bold">{value.title}</h3>
                      <p className="text-foreground2 text-lg">
                        {value.description}
                      </p>
                    </div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                    />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 연혁 */}
            <section className="relative">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold md:text-5xl">연혁</h2>
                <p className="text-foreground2 text-lg">우리의 발자취입니다</p>
              </div>

              <div className="relative">
                {/* 타임라인 라인 */}
                <div className="to-signature absolute left-4 h-full w-0.5 bg-gradient-to-b from-blue-600 md:left-1/2 md:-translate-x-1/2" />

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
                      <div className="absolute h-8 w-8 rounded-full bg-white shadow-md" />
                      <div
                        className={`absolute h-4 w-4 rounded-full bg-gradient-to-r ${item.gradient}`}
                      />
                    </div>

                    {/* 데스크톱: 타임라인 점 */}
                    <div className="absolute left-1/2 hidden h-12 w-12 -translate-x-1/2 items-center justify-center md:flex">
                      <div
                        className={`absolute h-12 w-12 rounded-full bg-gradient-to-r ${item.gradient} opacity-20`}
                      />
                      <div className="absolute h-8 w-8 rounded-full bg-white shadow-md" />
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
                      <div className="border-background2 w-full overflow-hidden rounded-2xl border bg-white p-6 shadow-lg transition-all duration-200 hover:shadow-xl md:inline-block md:max-w-fit md:min-w-[320px]">
                        <div
                          className={`mb-4 inline-flex rounded-xl bg-gradient-to-r ${item.gradient} p-3 text-white`}
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
