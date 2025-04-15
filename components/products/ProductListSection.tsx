"use client";

import useSWR from "swr";
import ProductGrid from "./ProductGrid";
import { IGetProduct } from "@/types/api/product";
import {
  GET_PRODUCTS_BY_CATEGORY,
  getProductsByCategory
} from "@/lib/api/products";
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
    data: products,
    isLoading: isProductsLoading,
    error: productsError
  } = useSWR<IGetProduct[]>([GET_PRODUCTS_BY_CATEGORY, categoryKey], () =>
    getProductsByCategory(categoryKey)
  );

  if (productsError) {
    notFound();
  }

  return (
    <>
      <div className="my-4">
        <WithSkeleton
          isLoading={isProductsLoading}
          skeleton={<ProductGridSkeleton />}
        >
          <ProductGrid products={products ?? []} />
        </WithSkeleton>
      </div>
    </>
  );
}
