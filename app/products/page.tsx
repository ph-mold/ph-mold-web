"use client";

import Tab from "@/components/common/Tab";
import { Typography } from "@/components/common/Typography";
import ProductSubCategorySection from "@/components/products/ProductSubCategorySection";
import ProductGrid from "@/components/products/ProductGrid";
import { useTabNavigation } from "@/hooks/useTabNavigation";

const TAB_ITEMS = [
  { label: "전체", value: "all" },
  { label: "주사기", value: "syringe" },
  { label: "앰플", value: "ampoule" },
  { label: "바이알", value: "vial" },
  { label: "기타", value: "others" }
];

export default function Products() {
  const { activeTab, handleTabClick } = useTabNavigation({
    tabs: TAB_ITEMS,
    mode: "query"
  });

  return (
    <div className="relative h-fit w-full">
      <Typography
        variant={"h1"}
        textAlign={"center"}
        className="hidden py-8 font-semibold md:block"
      >
        제품
      </Typography>
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
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-10">
        <ProductSubCategorySection />
        <ProductGrid />
      </div>
    </div>
  );
}
