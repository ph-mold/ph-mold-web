"use client";

import Image from "next/image";
import { IGetCategory } from "@/types/api/category";
import { mapCategoriesToSubTabItems } from "@/lib/mapper/categoryToTabItem";
import { imageLoader } from "@/lib/imageLoader";
import { useTabNavigation } from "@/hooks/useTabNavigation";
import { Tab } from "@ph-mold/ph-ui";

interface Props {
  currentTab: string;
  subTabs: IGetCategory[];
}

export default function SubCategoryTabs({ currentTab, subTabs }: Props) {
  const tabItems =
    subTabs &&
    mapCategoriesToSubTabItems(subTabs, {
      all: () => (
        <div className="size-20 flex-none p-4 sm:size-28">
          <div className="flex size-full items-center justify-center overflow-hidden rounded-full bg-transparent transition-all duration-200">
            <div className="flex size-full items-center justify-center bg-transparent bg-none group-[.active]:bg-gradient-to-r group-[.active]:from-sky-300 group-[.active]:to-blue-400">
              <span className="group-[.active]:text-reverseForeground bg-gradient-primary bg-gradient-to-r bg-clip-text font-medium text-transparent group-[.active]:bg-none">
                ALL
              </span>
            </div>
          </div>
        </div>
      ),
      default: (category) => (
        <div className="size-20 flex-none sm:size-28">
          {category && (
            <div className="relative h-full w-full overflow-hidden transition-all duration-200">
              <Image
                loader={imageLoader}
                src={category.imageUrl}
                alt={category.name}
                fill
                style={{ objectFit: "cover" }}
                loading="eager"
                className="transition-transform duration-200 group-hover:scale-105"
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
    <div className="border-border-light w-full overflow-x-scroll overflow-y-hidden border-b-2">
      <Tab
        className="pt-2 pb-3"
        activeTab={activeTab}
        onChange={handleTabClick}
        showIndicator={false}
        tabClassName="flex-col !text-sm !p-0 group transition-transform duration-200 hover:scale-105"
        activeTabClassName="!text-signature active"
        tabs={tabItems}
      />
    </div>
  );
}
