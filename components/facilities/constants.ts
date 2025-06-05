import { type Facility } from "./types";

export const FACILITIES: Facility[] = [
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
] as const;
