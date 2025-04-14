"use client";

import { getCategoryByParentKey } from "@/lib/api/categories";
import ProductGrid from "./ProductGrid";
import SubCategoryTab from "./SubCategoryTab";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/api/products";
import { useEffect, useState } from "react";
import { IGetCategory } from "@/types/api/category";
import { IGetProduct } from "@/types/api/product";

interface Props {
  currentTab: string;
  currentSubTab: string;
}

export default function SubTabSection({ currentTab, currentSubTab }: Props) {
  const [subTabs, setSubTabs] = useState<IGetCategory[]>();
  const [products, setProducts] = useState<IGetProduct[]>();

  useEffect(() => {
    async function loadData() {
      const subTabs = await getCategoryByParentKey(currentTab);
      if (!subTabs) notFound();
      setSubTabs(subTabs);
    }
    loadData();
  }, [currentTab]);

  useEffect(() => {
    async function fetchProducts() {
      const categoryKey = currentSubTab === "all" ? currentTab : currentSubTab;

      const products = await getProductsByCategory(categoryKey);
      setProducts(products);
    }

    fetchProducts();
  }, [currentSubTab, currentTab]);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-10">
      {subTabs && <SubCategoryTab subTabs={subTabs} />}
      <ProductGrid products={products} />
    </div>
  );
}
