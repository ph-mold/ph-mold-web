import { LightbulbIcon, PackageIcon, PuzzlePieceIcon } from "@/utils/svgr";
import SectionTitle from "../common/SectionTitle";
import WhyPMCard from "./WhyPMCard";

const WHY_PM_CARDS = [
  {
    icon: <PuzzlePieceIcon className="fill-signature h-full w-full" />,
    title: "세상의 모든 용기, 당신을 위해 제작합니다.",
    desc: "유리, 플라스틱, 고무 등 다양한 소재의 용기를 맞춤형으로 제작합니다."
  },
  {
    icon: <LightbulbIcon className="fill-signature h-full w-full" />,
    title: "우리는 다릅니다.",
    desc: "남들과는 다른 차별화된 디자인과 제작 방식으로 기존의 틀을 넘어 새로운 패키징 솔루션을 제공합니다."
  },
  {
    icon: <PackageIcon className="fill-signature h-full w-full" />,
    title: "저비용 & 편의성, 최적화된 패키징 솔루션",
    desc: "금형 설계부터 사출, 충진, 포장까지 원스톱 처리. 시간과 비용을 모두 절감할 수 있는 합리적인 시스템을 제공합니다."
  }
];

export default function WhyPMSection() {
  return (
    <section
      id="P&M"
      className="border-background2 flex h-fit flex-col gap-8 border-t-2 py-20"
    >
      <SectionTitle>
        Why <span className="text-signature">P&M</span>
      </SectionTitle>
      <div className="mx-4 flex max-w-[1080px] flex-col md:mx-auto md:flex-row">
        {WHY_PM_CARDS.map((card, index) => (
          <WhyPMCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
}
