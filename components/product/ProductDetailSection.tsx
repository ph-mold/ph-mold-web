"use client";

import {
  GET_PRODUCT_IMAGES_BY_KEY,
  GET_PRODUCT_INFO_BY_KEY,
  getProductImagesByKey,
  getProductInfoByKey
} from "@/lib/api/products";
import { IGetProductImage, IGetProductInfo } from "@/types/api/product";
import { notFound } from "next/navigation";
import useSWR from "swr";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfoPanel from "./ProductInfoPanel";
import WithSkeleton from "../common/WithSkeleton";
import ProductInfoPanelSkeleton from "./ProductInfoPanel.skeleton";
import { useStickyButtonRef } from "@/context/StickyButtonContext";
import ProductImageGallerySkeleton from "./ProductImageGallery.skeleton";

interface Props {
  productKey: string;
}

export default function ProductDetailSection({ productKey }: Props) {
  const {
    data: images,
    isLoading: isImagesLoading,
    error: imagesError
  } = useSWR<IGetProductImage[] | undefined>(
    [GET_PRODUCT_IMAGES_BY_KEY, productKey],
    () => getProductImagesByKey(productKey)
  );

  const {
    data: info,
    isLoading: isInfoLoading,
    error: infoError
  } = useSWR<IGetProductInfo | undefined>(
    [GET_PRODUCT_INFO_BY_KEY, productKey],
    () => getProductInfoByKey(productKey)
  );

  if (infoError || imagesError) {
    notFound();
  }
  const ref = useStickyButtonRef();

  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 md:px-10">
      <div className="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 md:gap-12">
        <WithSkeleton
          isLoading={isImagesLoading}
          skeleton={<ProductImageGallerySkeleton />}
        >
          {images && <ProductImageGallery images={images} />}
        </WithSkeleton>
        <div className="h-fit">
          <WithSkeleton
            isLoading={isInfoLoading}
            skeleton={<ProductInfoPanelSkeleton />}
          >
            {info && <ProductInfoPanel info={info} />}
          </WithSkeleton>
          <span ref={ref} />
        </div>
      </div>
      <div className="h-[2000px]" />
    </div>
  );
}
