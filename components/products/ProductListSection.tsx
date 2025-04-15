"use client";

import useSWR from "swr";
import ProductGrid from "./ProductGrid";
import SubCategoryTabs from "./SubCategoryTabs";
import { IGetCategory } from "@/types/api/category";
import { IGetProduct } from "@/types/api/product";
import {
  GET_CATEGORY_BY_PARENT_KEY,
  getCategoryByParentKey
} from "@/lib/api/categories";
import {
  GET_PRODUCTS_BY_CATEGORY,
  getProductsByCategory
} from "@/lib/api/products";
import SubCategoryTabsSkeleton from "./SubCategoryTabs.skeleton";
import ProductGridSkeleton from "./ProductGrid.skeleton";
import { notFound } from "next/navigation";
import WithSkeleton from "../common/WithSkeleton";

interface Props {
  currentTab: string;
  currentSubTab: string;
}

export default function ProductListSection({
  currentTab,
  currentSubTab
}: Props) {
  const categoryKey = currentSubTab === "all" ? currentTab : currentSubTab;

  const {
    data: subTabs,
    isLoading: isSubTabsLoading,
    error: subTabsError
  } = useSWR<IGetCategory[]>([GET_CATEGORY_BY_PARENT_KEY, currentTab], () =>
    getCategoryByParentKey(currentTab)
  );

  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError
  } = useSWR<IGetProduct[]>([GET_PRODUCTS_BY_CATEGORY, categoryKey], () =>
    getProductsByCategory(categoryKey)
  );

  if (subTabsError || productsError) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-10">
      <WithSkeleton
        isLoading={isSubTabsLoading}
        skeleton={<SubCategoryTabsSkeleton />}
      >
        <SubCategoryTabs currentTab={currentTab} subTabs={subTabs} />
      </WithSkeleton>

      <div className="my-4">
        <WithSkeleton
          isLoading={isProductsLoading}
          skeleton={<ProductGridSkeleton />}
        >
          <ProductGrid products={products ?? []} />
        </WithSkeleton>
      </div>
    </div>
  );
}
