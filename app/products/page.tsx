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
      <div className="border-background2 scrollbar-hide sticky top-16 z-9 h-12 w-full overflow-x-scroll overflow-y-hidden border-b-2 bg-white/60 backdrop-blur-md">
        <Tab
          className="px-4 md:px-10"
          onChange={handleTabSelect}
          tabs={TAB_ITEMS}
        />
      </div>
      <div className="mx-auto max-w-[1280px]">
        <div className="border-background2 scrollbar-hide h-fit overflow-x-scroll border-b-2 py-2 sm:py-4">
          <ul className="flex h-fit flex-row px-4 md:px-10">
            <li className="flex h-fit w-fit flex-col text-center">
              <div className="size-24 flex-none sm:size-36">
                <Image src={"/sample1.png"} alt={""} width={240} height={240} />
              </div>
              <p className="text-sm">PP 주사기</p>
            </li>
            <li className="flex h-fit w-fit flex-col text-center">
              <div className="size-24 flex-none sm:size-36">
                <Image src={"/sample1.png"} alt={""} width={240} height={240} />
              </div>
              <p className="text-sm">PP 주사기</p>
            </li>
            <li className="flex h-fit w-fit flex-col text-center">
              <div className="size-24 flex-none sm:size-36">
                <Image src={"/sample1.png"} alt={""} width={240} height={240} />
              </div>
              <p className="text-sm">PP 주사기</p>
            </li>
            <li className="flex h-fit w-fit flex-col text-center">
              <div className="size-24 flex-none sm:size-36">
                <Image src={"/sample1.png"} alt={""} width={240} height={240} />
              </div>
              <p className="text-sm">PP 주사기</p>
            </li>
            <li className="flex h-fit w-fit flex-col text-center">
              <div className="size-24 flex-none sm:size-36">
                <Image src={"/sample1.png"} alt={""} width={240} height={240} />
              </div>
              <p className="text-sm">PP 주사기</p>
            </li>
            <li className="flex h-fit w-fit flex-col text-center">
              <div className="size-24 flex-none sm:size-36">
                <Image src={"/sample1.png"} alt={""} width={240} height={240} />
              </div>
              <p className="text-sm">PP 주사기</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-[2000px]"> </div>
    </div>
  );
}
