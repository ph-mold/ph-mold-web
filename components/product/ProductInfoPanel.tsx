"use client";

import { IGetProductInfo } from "@/types/api/product";
import Button from "../common/Button";
import { useMemo } from "react";

interface Props {
  info: IGetProductInfo;
}
export default function ProductInfoPanel({ info }: Props) {
  const detailItems = useMemo(() => {
    const specDetails =
      info.specs?.map((spec) => ({
        key: spec.specType.key,
        label: spec.specType.label,
        value: `${spec.value}${spec.specType.unit ?? ""}`
      })) ?? [];

    const basicDetails = [
      { key: "origin", label: "제조국", value: info.origin || "" },
      {
        key: "moq",
        label: "최소 주문 수량 (MOQ)",
        value: info.moq?.toLocaleString() ?? ""
      }
    ];

    return [...specDetails, ...basicDetails];
  }, [info]);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-foreground2 text-sm">{info.code}</p>
        <p className="text-lg font-bold">{info.name}</p>
        <div className="flex flex-wrap space-y-1 space-x-1 py-2">
          {info.tags?.map((tag) => (
            <p
              key={tag.key}
              className="bg-background2 text-signature h-7 rounded-md px-2 py-1 text-sm text-nowrap"
            >
              {tag.name}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-2">
        {detailItems.map((item) => (
          <div key={item.key} className="flex flex-row justify-between">
            <p className="text-sm font-semibold">{item.label}</p>
            <p className="text-sm">{item.value}</p>
          </div>
        ))}
      </div>
      <Button size="medium" fullWidth>
        샘플 요청
      </Button>
    </div>
  );
}
