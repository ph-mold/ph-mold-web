"use client";

import { useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Tab from "@/components/common/Tab";
import { Typography } from "@/components/common/Typography";

const TAB_ITEMS = [
  { label: "전체", value: "all" },
  { label: "주사기", value: "syringe" },
  { label: "앰플", value: "ampoule" },
  { label: "바이알", value: "vial" },
  { label: "기타", value: "others" }
];

export default function Products() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const handleTabSelect = useCallback(
    (tab: string) => {
      params.set("tab", tab);
      router.replace(`?${params.toString()}`);
    },
    [params, router]
  );

  return (
    <div className="relative h-fit w-full">
      <Typography
        variant={"h1"}
        textAlign={"center"}
        className="hidden py-8 font-semibold md:block"
      >
        제품
      </Typography>
      <div className="border-background2 sticky top-16 z-9 h-12 w-full border-b-2 bg-white/60 backdrop-blur-md">
        <div className="scrollbar-hide mx-auto max-w-[1280px] overflow-x-scroll">
          <Tab
            className="w-fit px-4 md:px-10"
            onChange={handleTabSelect}
            tabs={TAB_ITEMS}
          />
        </div>
      </div>
      <div className="border-background2 scrollbar-hide mx-auto w-full max-w-[1280px] overflow-x-scroll overflow-y-hidden border-b-2 px-4 md:px-10">
        <Tab
          className="py-2"
          showIndicator={false}
          tabClassName="flex-col !text-sm !p-0"
          activeTabClassName="!font-medium !text-foreground2"
          tabs={[
            {
              label: "PP 주사기",
              value: "s",
              icon: (
                <div className="size-24 flex-none sm:size-32">
                  <Image
                    src={"/sample1.png"}
                    alt={""}
                    width={240}
                    height={240}
                  />
                </div>
              )
            },
            {
              label: "PP 주사기",
              value: "s1",
              icon: (
                <div className="size-24 flex-none sm:size-32">
                  <Image
                    src={"/sample1.png"}
                    alt={""}
                    width={240}
                    height={240}
                  />
                </div>
              )
            },
            {
              label: "PP 주사기",
              value: "s2",
              icon: (
                <div className="size-24 flex-none sm:size-32">
                  <Image
                    src={"/sample1.png"}
                    alt={""}
                    width={240}
                    height={240}
                  />
                </div>
              )
            }
          ]}
        />
      </div>
      <div className="h-[2000px]"> </div>
    </div>
  );
}
