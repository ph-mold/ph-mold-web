import { Typography } from "@/components/common/Typography";
import SubCategoryTab from "@/components/products/SubCategoryTab";
import ProductGrid from "@/components/products/ProductGrid";
import MainCategoryTab from "@/components/products/MainCategoryTab";
import { getCategoryByParentKey, getRootCategory } from "@/lib/api/categories";
import { Suspense } from "react";
import { notFound } from "next/navigation";

interface ProductsProps {
  searchParams: Promise<{
    tab?: string;
  }>;
}

export async function generateMetadata({ searchParams }: ProductsProps) {
  const tabs = await getRootCategory();
  const tab = (await searchParams).tab;
  const tabName = tabs?.find((t) => t.key === tab)?.name ?? "전체";
  return {
    title: `제품 - ${tabName}`,
    description: `${tabName} 제품을 확인해보세요.`
  };
}

export default async function Products({ searchParams }: ProductsProps) {
  const tabs = await getRootCategory();
  const currentTab = (await searchParams).tab ?? "all";
  const subTabs = await getCategoryByParentKey(currentTab);
  if (!subTabs) notFound();
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
        {tabs && <MainCategoryTab tabs={tabs} />}
      </Suspense>

      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-10">
        {subTabs && <SubCategoryTab subTabs={subTabs} />}
        <ProductGrid />
      </div>
    </div>
  );
}
