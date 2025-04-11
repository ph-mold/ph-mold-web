"use client";

import Image from "next/image";
import Tab from "../common/Tab";
import { IGetCategory } from "@/types/api/category";
import { mapCategoriesToSubTabItems } from "@/lib/mapper/categoryToTabItem";

interface SubCategoryTabProps {
  subTabs: IGetCategory[];
}

export default function SubCategoryTab({ subTabs }: SubCategoryTabProps) {
  const tabItems = mapCategoriesToSubTabItems(subTabs, {
    all: () => (
      <div className="size-24 flex-none p-4 sm:size-32">
        <div className="bg-background2 flex size-full items-center justify-center rounded-full">
          <span className="text-signature">ALL</span>
        </div>
      </div>
    ),
    default: (url) => (
      <div className="size-24 flex-none sm:size-32">
        {url && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`}
            alt={""}
            width={240}
            height={240}
          />
        )}
      </div>
    )
  });
  return (
    <div className="border-background2 scrollbar-hide w-full overflow-x-scroll overflow-y-hidden border-b-2">
      <Tab
        className="pt-2 pb-3"
        showIndicator={false}
        tabClassName="flex-col !text-sm !p-0"
        activeTabClassName="!font-medium !text-foreground2"
        tabs={tabItems}
      />
    </div>
  );
}
