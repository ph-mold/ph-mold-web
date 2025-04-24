"use client";

import { IGetProductInfo } from "@/types/api/product";
import { useMemo, useState } from "react";
import useSWR from "swr";
import {
  GET_PRODUCT_INFO_BY_KEY,
  getProductInfoByKey
} from "@/lib/api/products";
import ProductInfoPanelSkeleton from "./ProductInfoPanel.skeleton";
import { notFound } from "next/navigation";
import { Button, WithSkeleton } from "@ph-mold/ph-ui";
import RequestSampleModal from "./RequestSampleModal";

interface Props {
  productKey: string;
}
export default function ProductInfoPanel({ productKey }: Props) {
  const {
    data: info,
    isLoading: isInfoLoading,
    error: infoError
  } = useSWR<IGetProductInfo | undefined>(
    [GET_PRODUCT_INFO_BY_KEY, productKey],
    () => getProductInfoByKey(productKey)
  );

  const detailItems = useMemo(() => {
    const specDetails =
      info?.specs.map((spec) => ({
        key: spec.specType.key,
        label: spec.specType.label,
        value: `${spec.value}${spec.specType.unit ?? ""}`
      })) ?? [];

    const basicDetails = [
      { key: "material", label: "재질", value: info?.material || "" },
      { key: "origin", label: "제조국", value: info?.origin || "" },
      {
        key: "moq",
        label: "최소 주문 수량 (MOQ)",
        value: info?.moq?.toLocaleString() ?? ""
      }
    ];

    return [...specDetails, ...basicDetails];
  }, [info]);

  if (infoError) {
    notFound();
  }

  const [open, setOpen] = useState(false);
  const handleOnClickSample = () => {
    setOpen(true);
  };

  return (
    <WithSkeleton
      isLoading={isInfoLoading}
      skeleton={<ProductInfoPanelSkeleton />}
    >
      {info && (
        <>
          <RequestSampleModal info={info} open={open} setOpen={setOpen} />
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
            <Button onClick={handleOnClickSample} size="medium" fullWidth>
              샘플 요청
            </Button>
          </div>
        </>
      )}
    </WithSkeleton>
  );
}
