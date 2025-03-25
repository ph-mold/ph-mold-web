import { ReactNode } from "react";

interface WhyPMCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
}

export default function WhyPMCard({ icon, title, desc }: WhyPMCardProps) {
  return (
    <div className="flex w-full flex-col gap-6 p-6 md:w-1/3">
      <div className="bg-background2 flex h-64 w-full items-center rounded-lg">
        <div className="text-signature mx-auto size-28">{icon}</div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-foreground2">{desc}</p>
      </div>
    </div>
  );
}
