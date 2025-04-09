import { Typography } from "@/components/common/Typography";
import ProductSubCategorySection from "@/components/products/ProductSubCategorySection";
import ProductGrid from "@/components/products/ProductGrid";
import ProductTab from "@/components/products/ProductTab";
import { Suspense } from "react";
import { getRootCategory } from "../lib/api/categories";

interface ProductsProps {
  searchParams: Promise<{
    tab?: string;
  }>;
}

export async function generateMetadata({ searchParams }: ProductsProps) {
  const tabs = await getRootCategory();
  const tab = (await searchParams).tab ?? "all";
  const tabName = tabs.find((t) => t.key === tab)?.name ?? "전체";
  return {
    title: `제품 - ${tabName}`,
    description: `${tabName} 제품을 확인해보세요.`
  };
}

export default async function Products() {
  const tabs = await getRootCategory();
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
        <ProductTab tabs={tabs} />
      </Suspense>

      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-10">
        <ProductSubCategorySection />
        <ProductGrid />
      </div>
    </div>
  );
}
