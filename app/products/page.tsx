import { Typography } from "@/components/common/Typography";
import ProductSubCategorySection from "@/components/products/ProductSubCategorySection";
import ProductGrid from "@/components/products/ProductGrid";
import ProductTab from "@/components/products/ProductTab";
import { Suspense } from "react";

export default function Products() {
  return (
    <div className="relative h-fit w-full">
      <Typography
        variant={"h1"}
        textAlign={"center"}
        className="hidden py-8 font-semibold md:block"
      >
        제품
      </Typography>

      <Suspense fallback={null}>
        <ProductTab />
      </Suspense>

      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-10">
        <ProductSubCategorySection />
        <ProductGrid />
      </div>
    </div>
  );
}
