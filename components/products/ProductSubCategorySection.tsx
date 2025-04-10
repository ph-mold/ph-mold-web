"use client";

import Image from "next/image";
import Tab from "../common/Tab";
import { IGetCategory } from "@/types/api/category";
import { mapCategoriesToSubTabItems } from "@/lib/mapper/categoryToTabItem";

interface ProductSubCategorySectionProps {
  subTabs: IGetCategory[];
}

export default function ProductSubCategorySection({
  subTabs
}: ProductSubCategorySectionProps) {
  const tabItems = mapCategoriesToSubTabItems(subTabs, (url) => (
    <div className="size-24 flex-none sm:size-32">
      {url && (
        <Image
          src={`http://localhost:3001${url}`}
          alt={""}
          width={240}
          height={240}
        />
      )}
    </div>
  ));
  return (
    <div className="border-background2 scrollbar-hide w-full overflow-x-scroll overflow-y-hidden border-b-2">
      <Tab
        className="py-2"
        showIndicator={false}
        tabClassName="flex-col !text-sm !p-0"
        activeTabClassName="!font-medium !text-foreground2"
        tabs={tabItems}
      />
    </div>
  );
}
