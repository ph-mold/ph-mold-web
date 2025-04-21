"use client";

import ProductImageGallery from "./ProductImageGallery";
import ProductInfoPanel from "./ProductInfoPanel";
import { useStickyButtonRef } from "@/context/StickyButtonContext";

interface Props {
  productKey: string;
}

export default function ProductDetailSection({ productKey }: Props) {
  const ref = useStickyButtonRef();

  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 md:px-10">
      <div
        ref={ref}
        className="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 md:gap-12"
      >
        <ProductImageGallery productKey={productKey} />
        <div className="h-fit">
          <ProductInfoPanel productKey={productKey} />
        </div>
      </div>
    </div>
  );
}
