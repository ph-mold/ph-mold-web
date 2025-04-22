"use client";

import { Tab } from "@ph-mold/ph-ui";
import { TabItem } from "@ph-mold/ph-ui/types";
import { useRouter } from "next/navigation";

const DETAIL_TABS: TabItem[] = [
  { label: "상세 정보", value: "detail" },
  { label: "문의", value: "contact" }
];

interface Props {
  activeTab: string;
}

export default function ProductDetailTabs({ activeTab }: Props) {
  const router = useRouter();
  const handleOnChangeTab = (id: string) => {
    router.push(`#${id}`);
  };
  return (
    <div className="scrollbar-hide border-background2 mx-auto w-full overflow-x-scroll border-y">
      <Tab
        className="w-fit"
        activeTab={activeTab}
        tabs={DETAIL_TABS}
        tabClassName="!px-8 py-4"
        onChange={handleOnChangeTab}
      />
    </div>
  );
}
