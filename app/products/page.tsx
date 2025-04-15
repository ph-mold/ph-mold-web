import ProductListSection from "@/components/products/ProductListSection";
import SubCategoryTabs from "@/components/products/SubCategoryTabs";
import { getCategoryByParentKey } from "@/lib/api/categories";

export default async function Products() {
  const subTabs = await getCategoryByParentKey("all");
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-10">
      <SubCategoryTabs currentTab="all" subTabs={subTabs} />
      <ProductListSection currentTab="all" currentSubTab="all" />
    </div>
  );
}
