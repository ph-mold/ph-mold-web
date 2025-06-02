import { motion } from "framer-motion";
import { Lightbulb, PackageCheck, Puzzle } from "lucide-react";

const WHY_PM_CARDS = [
  {
    icon: <Puzzle className="h-full w-full stroke-[1.8px]" />,
    title: "세상의 모든 용기, 당신을 위해 제작합니다.",
    desc: "유리, 플라스틱, 고무 등 다양한 소재의 용기를 맞춤형으로 제작합니다.",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    icon: <Lightbulb className="h-full w-full stroke-[1.8px]" />,
    title: "우리는 다릅니다.",
    desc: "남들과는 다른 차별화된 디자인과 제작 방식으로 기존의 틀을 넘어 새로운 패키징 솔루션을 제공합니다.",
    gradient: "from-blue-400 to-blue-600"
  },
  {
    icon: <PackageCheck className="h-full w-full stroke-[1.8px]" />,
    title: "저비용 & 편의성, 최적화된 패키징 솔루션",
    desc: "금형 설계부터 사출, 충진, 포장까지 원스톱 처리. 시간과 비용을 모두 절감할 수 있는 합리적인 시스템을 제공합니다.",
    gradient: "from-purple-400 to-purple-600"
  }
];

export default function WhyPMSection() {
  return (
    <section
      id="P&M"
      className="border-background2 flex h-fit flex-col gap-8 border-t-2 py-20"
    >
      <div className="mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-4xl font-bold md:text-5xl"
        >
          Why <span className="text-signature">P&M</span>
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

      <div className="mx-4 grid max-w-[1080px] grid-cols-1 gap-8 md:mx-auto md:grid-cols-3">
        {WHY_PM_CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.1 }}
            className="group border-background2 relative overflow-hidden rounded-2xl border bg-white p-8 shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            <div className="relative z-10">
              <div
                className={`mb-6 inline-flex rounded-xl bg-gradient-to-r ${card.gradient} p-3 text-white`}
              >
                <div className="size-8">{card.icon}</div>
              </div>
              <h3 className="mb-4 text-2xl font-bold">{card.title}</h3>
              <p className="text-foreground2 text-lg">{card.desc}</p>
            </div>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
