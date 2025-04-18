"use client";

import {
  GET_PRODUCT_INFO_BY_KEY,
  getProductInfoByKey
} from "@/lib/api/products";
import { IGetProductInfo } from "@/types/api/product";
import { notFound } from "next/navigation";
import useSWR from "swr";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfoPanel from "./ProductInfoPanel";
import WithSkeleton from "../common/WithSkeleton";

interface Props {
  productKey: string;
}

export default function ProductDetailSection({ productKey }: Props) {
  const {
    data: info,
    isLoading: isInfoLoading,
    error: infoError
  } = useSWR<IGetProductInfo>([GET_PRODUCT_INFO_BY_KEY, productKey], () =>
    getProductInfoByKey(productKey)
  );

  if (infoError) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 md:px-10">
      <div className="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 md:gap-12">
        <ProductImageGallery />
        <WithSkeleton isLoading={isInfoLoading} skeleton={<>로딩중</>}>
          <ProductInfoPanel info={info ?? {}} />
        </WithSkeleton>
      </div>
      <div className="h-[2000px]">{productKey}</div>
    </div>
  );
}
