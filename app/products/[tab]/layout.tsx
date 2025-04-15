import SubCategoryTabs from "@/components/products/SubCategoryTabs";
import { getCategoryByParentKey } from "@/lib/api/categories";
import { notFound } from "next/navigation";

export default async function ProductsTabLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ tab: string }>;
}>) {
  const { tab } = await params;
  const subTabs = await getCategoryByParentKey(tab);

  if (!subTabs) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-10">
      <SubCategoryTabs currentTab={tab} subTabs={subTabs} />
      {children}
    </div>
  );
}
