"use client";

import ProductDetail from "./ProductDetail";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfoPanel from "./ProductInfoPanel";
import { useStickyButtonRef } from "@/context/StickyButtonContext";

interface Props {
  productKey: string;
}

export default function ProductDetailSection({ productKey }: Props) {
  const ref = useStickyButtonRef();

  return (
    <div className="mx-auto mb-10 flex w-full max-w-[1080px] flex-col gap-10 px-4 md:px-10">
      <div
        ref={ref}
        className="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 md:gap-12"
      >
        <ProductImageGallery productKey={productKey} />
        <ProductInfoPanel productKey={productKey} />
      </div>
      <ProductDetail productKey={productKey} />
    </div>
  );
}
