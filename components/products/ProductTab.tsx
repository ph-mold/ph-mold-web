"use client";

import { useTabNavigation } from "@/hooks/useTabNavigation";
import Tab from "../common/Tab";
import { IGetRootCategory } from "@/types/api/category";
import { mapCategoriesToTabItems } from "@/lib/mapper/categoryToTabItem";

interface ProductTabProps {
  tabs: IGetRootCategory[];
}

export default function ProductTab({ tabs }: ProductTabProps) {
  const tabItems = mapCategoriesToTabItems(tabs);
  const { activeTab, handleTabClick } = useTabNavigation({
    tabs: tabItems,
    mode: "query"
  });
  return (
    <div className="border-background2 sticky top-16 z-9 h-12 w-full border-b-2 bg-white/80 backdrop-blur-md">
      <div className="scrollbar-hide mx-auto max-w-[1280px] overflow-x-scroll">
        <Tab
          className="w-fit px-4 md:px-10"
          activeTab={activeTab}
          onChange={handleTabClick}
          tabs={tabItems}
        />
      </div>
    </div>
  );
}
