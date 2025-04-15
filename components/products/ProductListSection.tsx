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

  if (subTabsError || productsError) return <p>에러가 발생했습니다.</p>;
  if (isSubTabsLoading || isProductsLoading) return <p>로딩 중...</p>;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-10">
      {subTabs && <SubCategoryTabs currentTab={currentTab} subTabs={subTabs} />}
      <ProductGrid products={products ?? []} />
    </div>
  );
}
