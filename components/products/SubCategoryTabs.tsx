"use client";

import Image from "next/image";
import Tab from "../common/Tab";
import { IGetCategory } from "@/types/api/category";
import { mapCategoriesToSubTabItems } from "@/lib/mapper/categoryToTabItem";
import { imageLoader } from "@/lib/imageLoader";
import { useTabNavigation } from "@/hooks/useTabNavigation";

interface Props {
  currentTab: string;
  subTabs?: IGetCategory[];
}

export default function SubCategoryTabs({ currentTab, subTabs }: Props) {
  const tabItems =
    subTabs &&
    mapCategoriesToSubTabItems(subTabs, {
      all: () => (
        <div className="size-20 flex-none p-4 sm:size-28">
          <div className="bg-background2 flex size-full items-center justify-center rounded-full">
            <span className="text-signature">ALL</span>
          </div>
        </div>
      ),
      default: (category) => (
        <div className="size-20 flex-none sm:size-28">
          {category && (
            <div className="relative h-full w-full">
              <Image
                loader={imageLoader}
                src={category.imageUrl}
                alt={category.name}
                fill
                style={{ objectFit: "cover" }}
                loading="eager"
              />
            </div>
          )}
        </div>
      )
    });

  const { activeTab, handleTabClick } = useTabNavigation({
    tabs: tabItems,
    mode: "path",
    basePath: `/products/${currentTab}`
  });

  return (
    <div className="border-background2 scrollbar-hide w-full overflow-x-scroll overflow-y-hidden border-b-2">
      <Tab
        className="pt-2 pb-3"
        activeTab={activeTab}
        onChange={handleTabClick}
        showIndicator={false}
        tabClassName="flex-col !text-sm !p-0"
        activeTabClassName="!text-signature"
        tabs={tabItems}
      />
    </div>
  );
}
