"use client";

import { useTabNavigation } from "@/hooks/useTabNavigation";
import Tab from "../common/Tab";

const TAB_ITEMS = [
  { label: "전체", value: "all" },
  { label: "주사기", value: "syringe" },
  { label: "앰플", value: "ampoule" },
  { label: "바이알", value: "vial" },
  { label: "기타", value: "others" }
];

export default function ProductTab() {
  const { activeTab, handleTabClick } = useTabNavigation({
    tabs: TAB_ITEMS,
    mode: "query"
  });
  return (
    <div className="border-background2 sticky top-16 z-9 h-12 w-full border-b-2 bg-white/80 backdrop-blur-md">
      <div className="scrollbar-hide mx-auto max-w-[1280px] overflow-x-scroll">
        <Tab
          className="w-fit px-4 md:px-10"
          activeTab={activeTab}
          onChange={handleTabClick}
          tabs={TAB_ITEMS}
        />
      </div>
    </div>
  );
}
