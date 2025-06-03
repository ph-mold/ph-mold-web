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
  Gem,
  LucideIcon
} from "lucide-react";
import { CoreValue } from "./CoreValueCard";

export type HistoryItem = {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
};

export type CompanyInfo = {
  icon: LucideIcon;
  label: string;
  value: string;
  bgColor: string;
  iconColor: string;
};

export const COMPANY_HISTORY: HistoryItem[] = [
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

export const CORE_VALUES: CoreValue[] = [
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

export const COMPANY_INFO: CompanyInfo[] = [
  {
    icon: Building2,
    label: "회사명",
    value: "(주)팜앤몰드",
    bgColor: "bg-sky-300",
    iconColor: "text-sky-700"
  },
  {
    icon: Calendar,
    label: "설립일",
    value: "2024년 1월",
    bgColor: "bg-emerald-300",
    iconColor: "text-emerald-700"
  },
  {
    icon: Users,
    label: "대표이사",
    value: "이건영",
    bgColor: "bg-purple-300",
    iconColor: "text-purple-800"
  },
  {
    icon: Briefcase,
    label: "주요 사업",
    value: "화장품 용기 제조, 금형 설계 및 제작",
    bgColor: "bg-orange-300",
    iconColor: "text-orange-800"
  },
  {
    icon: MapPin,
    label: "주소",
    value: "경기도 안양시 동안구 흥안대로 457-27, 1105호",
    bgColor: "bg-red-300",
    iconColor: "text-red-800"
  },
  {
    icon: Phone,
    label: "연락처",
    value: "010-5254-5147",
    bgColor: "bg-teal-300",
    iconColor: "text-teal-800"
  }
];
