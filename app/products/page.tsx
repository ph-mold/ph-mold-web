"use client";

import { useMemo, useCallback } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const MENU_ITEMS = {
  all: "전체",
  syringe: "주사기",
  ampoule: "앰플",
  vial: "바이알",
  others: "기타"
};

export default function Products() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const selectedTab = params.get("tab") ?? "all"; // ← 기본값 처리

  const handleTabSelect = useCallback(
    (tab: string) => {
      params.set("tab", tab);
      router.replace(`?${params.toString()}`);
    },
    [params, router]
  );

  return (
    <div className="relative h-fit w-full">
      <SectionTitle className="hidden py-8 md:block">제품</SectionTitle>
      <div className="border-background2 scrollbar-hide sticky top-16 z-9 h-12 w-full overflow-x-scroll border-b-2 bg-white/60 backdrop-blur-md">
        <ul className="w mx-auto flex h-full max-w-[1280px] flex-row gap-3 px-4 md:px-10">
          {Object.entries(MENU_ITEMS).map(([key, value]) => (
            <li
              key={key}
              className={clsx(
                "text-foreground2 cursor-pointer px-3 py-3 font-semibold text-nowrap",
                selectedTab === key &&
                  "border-signature text-signature border-b-2 font-bold"
              )}
              onClick={() => {
                handleTabSelect(key);
              }}
            >
              {value}
            </li>
          ))}
        </ul>
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
